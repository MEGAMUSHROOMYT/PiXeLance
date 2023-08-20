import { parseFile, toLong, decodeResourceUrl } from './utils.js';
import reducer from './lib/reducer.js';
import hook from './lib/setMetadataOf.js';
import GM_fetch from "@trim21/gm-fetch";
import packageJSON from '../package.json'

export default class Resources {
    resourceOverride = [];
    resources = null;
    reloadableResources = [];

    originalFetch = window.fetch;

    constructor() { 
        parseFile(`${packageJSON.usercontent}/resources/meta.json`, this);

        unsafeWindow.fetch = this.fetch;

        reducer.init(() => {
            const __this__ = this;
            
            unsafeWindow.Long = hook.getObjectOnce('Long');

            const ResourceRegistryCommonImpl = hook.getObjectOnce('ResourceRegistryCommonImpl');

            if (ResourceRegistryCommonImpl) {
                const func = Object.entries(ResourceRegistryCommonImpl.prototype)[2][0];
                ResourceRegistryCommonImpl.prototype[`${func}_copy`] = ResourceRegistryCommonImpl.prototype[func];

                ResourceRegistryCommonImpl.prototype[func] = function () {
                    if (!__this__.resources) {
                        __this__.resources = Object.values(this)[2];
                        __this__.resources.__proto__.remove = Object.values(__this__.resources.__proto__)[8];
                        __this__.resources.__proto__.get = Object.values(__this__.resources.__proto__)[3];
                    }
                    return this[`${func}_copy`].apply(this, arguments);
                }
            }
            
            const World = hook.getObjectOnce('World');

            if (World) {
                const reset = Object.entries(World.prototype)[35][0];
                World.prototype[`${reset}_copy`] = World.prototype[reset];

                World.prototype[reset] = function() {
                    __this__.reloadableResources.forEach(resource => {
                        resource = toLong(resource);
                        while (__this__.resources.get(resource))
                            __this__.resources.remove(resource);
                    })
                    window.сurrentMapMatches = false;
                    return this[`${reset}_copy`].apply(this, arguments);
                }
            }
        })
    }

    fetch = async (input, init) => {
        try {
            let resourceOverriden = false,
                resourceUrl = input,
                resourseId = decodeResourceUrl(resourceUrl)?.toString();

            if (resourseId) {
                for (let index = this.resourceOverride.length - 1; index >= 0; index--) {
                    if (resourseId === this.resourceOverride[index].id && input.search(this.resourceOverride[index].file) !== -1) {
                        if (this.resourceOverride[index].callback && this.resourceOverride[index].callback() !== true)
                            break;

                        input = this.resourceOverride[index].url;
                        resourceOverriden = true;
                        console.log(`Resource overriden from ${resourceUrl} to ${input}`, resourseId);
                        
                        return GM_fetch(input, init)
                    }
                }
            }
    
            resourceOverriden === false && console.debug(`Resource ${resourceUrl} not matched`, resourseId);
        } catch (e) {
            console.error(e);
        }
        return this.originalFetch(input, init);
    }
}