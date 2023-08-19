import Utils from './utils.js'
import resources from './Resources/resources.js';

class Core {
    resourceOverride = [];
    mapsWhiteList = [];
    currentMap = '';
    resources = null;
    reloadableResources = [
        '10001979', // slope.3ds
        '10001889', // wall.3ds
        '10001988', // cliff.3ds
        '10001919', // nubu_12.3ds
        '10002048', // bilboard.3ds
        '10001925', // fab_tow.3ds
        '10001916', // nubu_10.3ds
        '10001928', // vilhou.3ds
        '10001895', // nubu_2.3ds
        '10001922', // nubu_14.3ds
        '10001901', // nubu_4.3ds
        '10001898', // nubu_3.3ds
        '10001907', // nubu_6.3ds
        '10001910', // nubu_8.3ds
        '10001892', // nubu_1.3ds
        '10001913', // nubu_9.3ds
        '10001904', // nubu_5.3ds
        '10002045', // brid.3ds
        '10002039', // tunnel.3ds
        '10002042', // wall.3ds
        '10002051', // tube.3ds
        '10002000', // tower.3ds
        '10001997', // smhouse5.3ds
        '10001994', // smhouse2.3ds
        '10001880', // wall_gate.3ds
    ];

    utils = new Utils;
    
    constructor() {
        // Замена текстур-пака карт
        for (const [key, value] of Object.entries(resources.maps)) {
            for (let index = value.to.length - 1; index >= 0; index--) {
                this.utils.overrideAtlas(
                    this,
                    this.resourceOverride, 
                    this.mapsWhiteList, 
                    `${value.from}${index !== 0 ? `/atlas${index + 1}` : '/atlas'}.webp`,
                    `${value.to[index]}`
                )
            }
        }

        // Замена 3ds моделей (для того чтобы текстуры легли адекватно)
        const overrideModel = library => {
            for (const [key, value] of Object.entries(library)) {
                this.utils.overrideModel(
                    this,
                    this.resourceOverride, 
                    this.mapsWhiteList, 
                    `${key}.3ds`,
                    value
                )
            }
        }
    
        overrideModel(resources.buildings);
        overrideModel(resources.elements);
        overrideModel(resources.landscape);
        overrideModel(resources.props);

        // Замена моделей "стандартных скинов" на "легаси скины (оригинальные)"
        const overrideHullOrTurret = property => {
            for (const [key, value] of Object.entries(property)) {
                for (let index = value.from.length - 1; index >= 0; index--) {
                    this.utils.overrideHullOrTurret(
                        this.resourceOverride, 
                        value.from[index],
                        value.to
                    )
                }
            }
        }

        overrideHullOrTurret(resources.turrets);
        overrideHullOrTurret(resources.hulls);

        const originalFetch = unsafeWindow.fetch;
        const __this__ = this;
        unsafeWindow.fetch = async (input, init) => {
            try {
            let isOverriden = false,
                originalUrl = input;

            for (let index = this.resourceOverride.length - 1; index >= 0; index--) {
                if (input.search(this.resourceOverride[index].from) !== -1) {
                    if (this.resourceOverride[index].callback && this.resourceOverride[index].callback() !== true)
                        break;

                    input = this.resourceOverride[index].to;
                    isOverriden = true;
                    const decoded = this.utils.decodeResourceUrl(originalUrl);
                    console.log(`Resource overriden from ${originalUrl} to ${input}`, new Long(decoded.low, decoded.high).toString());
                    if (this.resourceOverride[index].external === true)
                        return GM_fetch(input, init)
                    break;
                }
            }

            const decoded = this.utils.decodeResourceUrl(originalUrl);
            isOverriden === false && console.debug(`Resource ${input} not matched`, new Long(decoded?.low, decoded?.high)?.toString());
        } catch (e) {
            console.error(e);
        }
            return originalFetch(input, init);
        }

        Object.defineProperty(Object.prototype, '$metadata$', {
			configurable: true,
			enumerable: false,
			set: function(value) {
				Object.defineProperty(this, '$metadata$', {
                    configurable: true, 
                    enumerable: true, 
                    writable: true, 
                    value
                });

				if (value.simpleName === 'ResourceRegistryCommonImpl') {
                    unsafeWindow.ResourceRegistryCommonImpl = this;
                    setTimeout(() => {
                        delete Object.prototype.$metadata$;
                        const func = Object.entries(this.prototype)[2][0];
                        this.prototype[`${func}_copy`] = this.prototype[func];

                        this.prototype[func] = function () {
                            if (!this.resources) {
                                __this__.resources = Object.values(this)[2];
                                __this__.resources.__proto__.remove =  Object.values(__this__.resources.__proto__)[8];
                                __this__.resources.__proto__.get =  Object.values(__this__.resources.__proto__)[3];
                            }
                            return this[`${func}_copy`].apply(this, arguments);
                        }
                    }, 100);
                }

                if (value.simpleName === 'World') {
                    setTimeout(() => {
                        const reset = Object.entries(this.prototype)[35][0];
                        this.prototype[`${reset}_copy`] = this.prototype[reset];
    
                        this.prototype[reset] = function() {
                            __this__.reloadableResources.forEach(resource => {
                                resource = __this__.utils.toLong(resource);
                                while (__this__.resources.get(resource)) {
                                    console.log(resource);
                                    __this__.resources.remove(resource);
                                }
                            })
                            __this__.currentMap = '';
                            return this[`${reset}_copy`].apply(this, arguments);
                        }
                    }, 100);
                }

                if (value.simpleName === 'Long')
					unsafeWindow.Long = this;
			}, 
            get: () => ({})
        });
    }
}

unsafeWindow.legacy = new Core;