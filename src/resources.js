import { parseFile, toLong, decodeResourceUrl } from './utils.js';
import reducer from './lib/reducer.js';
import hook from './lib/setMetadataOf.js';
import GM_fetch from "@trim21/gm-fetch";
import packageJSON from '../package.json'

class GameObjectNotFoundError extends Error {
    constructor(objectName) {
        super(`Game object not found ${objectName || '<unnamed>'}`);
    }
}

export default class Resources {
    resourceOverride = [];
    resources = null;
    reloadableResources = [];

    originalFetch = window.fetch;

    constructor() { 
        parseFile(`${packageJSON.usercontent/*'http://127.0.0.1:7999'*/}/resources/meta.json`, this);

        unsafeWindow.fetch = this.fetch;

        reducer.init(() => {
            const __this__ = this;
            
            unsafeWindow.Long = hook.getObjectOnce('Long');
            if (!unsafeWindow.Long)
                throw new GameObjectNotFoundError('Long');

            const ResourceRegistryCommonImpl = hook.getObjectOnce('ResourceRegistryCommonImpl');
            if (!ResourceRegistryCommonImpl) {
                throw new GameObjectNotFoundError('ResourceRegistryCommonImpl');
            }
            {
                const unknownFunctionName = Object.keys(ResourceRegistryCommonImpl.prototype)?.[2];
                const unknownFunctionCall = ResourceRegistryCommonImpl.prototype[unknownFunctionName];

                ResourceRegistryCommonImpl.prototype[unknownFunctionName] = function (...args) {
                    if (!__this__.resources) {
                        __this__.resources = Object.values(this)[2];
                        const resourcesPrototype = Object.getPrototypeOf(__this__.resources);
                        resourcesPrototype.remove = Object.values(resourcesPrototype)[8];
                        resourcesPrototype.get = Object.values(resourcesPrototype)[3];
                    }
                    return unknownFunctionCall.apply(this, args);
                }
            }

            const World = hook.getObjectOnce('World');
            if (!World) {
                throw new GameObjectNotFoundError('World');
            }
            {
                const resetName = Object.keys(World.prototype)?.[35];
                const resetCall = World.prototype[resetName];

                World.prototype[resetName] = function(...args) {
                    __this__.reloadableResources.forEach(resource => {
                        resource = toLong(resource);
                        while (__this__.resources.get(resource))
                            __this__.resources.remove(resource);
                    })
                    window.сurrentMapMatches = false;
                    return resetCall.apply(this, args);
                }
            }
        })
    }

    fetch = async (input, init) => {
        try {
            let resourceOverriden = false,
                resourceUrl = input,
                resourseId = decodeResourceUrl(resourceUrl)?.toString();

            if (resourseId && unsafeWindow.Long) {
                for (let index = this.resourceOverride.length - 1; index >= 0; index--) {
                    if (resourseId === this.resourceOverride[index].id && input.search(this.resourceOverride[index].file) !== -1) {
                        if (this.resourceOverride[index].callback && this.resourceOverride[index].callback() !== true)
                            break;

                        input = this.resourceOverride[index].url;
                        resourceOverriden = true;
                        console.log(`Resource overriden from ${resourceUrl} to ${input}`, resourseId);
                        
                        if (this.resourceOverride[index].external === true)
                            return GM_fetch(input, init)

                        break;
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