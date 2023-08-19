export default class Utils {
    toLong = str => {
        const number = BigInt(str),
              divisor = 4294967296n,
              low = Number(BigInt.asIntN(32, number % divisor)),
              high = Number(BigInt.asIntN(32, number / divisor));

        return new Long(low, high);
    }
    
    decodeResourceUrl = url => {
        let resPath = url.match(/resources\/(\d+\/\d+\/\d+\/\d+\/\d+)/)?.[1];

        if (!resPath)
            return;
            
        let parts = resPath.split('/').map(n=>parseInt(n,8));
        let version = parts[4];
        let idHigh = parts[0];
        let idLow = (parts[1]<<16)|(parts[2]<<8)|(parts[3]);

        return {
            version: version, 
            high: idHigh, 
            low: idLow
        };
    }

    overrideAtlas = (core, resources, mapsWhiteList, from, to) => {
        const map = to.split('/').at(-2);
        !mapsWhiteList.includes(map) && mapsWhiteList.push(map);
        resources.push({
            from: from,
            to: to,
            external: true,
            callback: () => (core.currentMap = map, true)
        })
    }

    overrideModel = (core, resources, mapsWhiteList, from, to) => resources.push({
        from: from,
        to: to,
        external: true,
        callback: () => {
            if (!core.currentMap)
                return;

            for (let index = mapsWhiteList.length - 1; index >= 0; index--) {
                if (mapsWhiteList[index].toUpperCase() === core.currentMap.toUpperCase())
                    return true;
            }
        }
    })

    overrideHullOrTurret = (resources, from, to, external = false) => resources.push(
        {
            from: from + 'meta.info',
            to: to + 'meta.info',
            external: external
        }, {
            from: from + 'object.3ds',
            to: to + 'object.3ds',
            external: external
        }, {
            from: from + 'lightmap.webp',
            to: to + 'lightmap.webp',
            external: external
        }
    )
}