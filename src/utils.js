import GM_fetch from "@trim21/gm-fetch";

/**
 * author: sabaka-babaka
 * @param {String} str 
 */
export const toLong = str => {
    const number = BigInt(str),
          divisor = 4294967296n,
          low = Number(BigInt.asIntN(32, number % divisor)),
          high = Number(BigInt.asIntN(32, number / divisor));

    return new Long(low, high);
}

/**
 * author: sabaka-babaka
 * @param {String} url 
 */
export const decodeResourceUrl = url => {
    const resourcePath = url.match(/resources\/(\d+\/\d+\/\d+\/\d+\/\d+)/)?.[1];

    if (!resourcePath)
        return;
        
    const parts = resourcePath.split('/').map(n => parseInt(n, 8));
    const high = parts[0];
    const low = (parts[1] << 16) | (parts[2] << 8) | (parts[3]);

    return new Long(low, high);
}

const findGetParameter = parameterName => {
    let result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) 
                result = decodeURIComponent(tmp[1]);
        });
    return result;
}

const RESOURCE_URL = `${findGetParameter('resources') || 'https://s.eu.tankionline.com'}`;

export const parseFile = (url, resources) => GM_fetch(url).then(async response => {
    const json = await response.json();

    for (const info of json) {
        if (info.meta)
            parseFile(`${url.split('meta.json')[0]}${info.meta}`, resources);

        if (info.reloadable)
            if (!resources.reloadableResources.includes(info.id))
                resources.reloadableResources.push(info.id);

        if (info.file) {
            if (!info.url) {
                info.external = true;
                info.url = `${url.split('meta.json')[0]}${info.file}`;
            } else {
                info.url = info.url.replace('RESOURCE_URL', RESOURCE_URL) + info.file;
            }

            resources.resourceOverride.push({
                file: info.file,
                id: info.id,
                url: info.url,
                external: info.external,
                callback: () => {
                    if (info.file.includes('atlas.webp'))
                        return window.сurrentMapMatches = true;

                    if (!info.reloadable)
                        return true;

                    if (info.file.includes('3ds'))
                        return window.сurrentMapMatches;
                    
                    return true;
                }
            });
        }
    }
})