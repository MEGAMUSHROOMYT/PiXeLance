import GM_fetch from '@trim21/gm-fetch';
import Long from 'long';

/**
 * author: sabaka-babaka
 * @param {String} url 
 */
export const decodeResourceUrl = url => {
    const resourcePath = url.match(/\/(\d+\/\d+\/\d+\/\d+\/\d+)/)?.[1];

    if (!resourcePath)
        return;
        
    const parts = resourcePath.split('/').map(n => parseInt(n, 8));
    const high = parts[0];
    const low = (parts[1] << 16) | (parts[2] << 8) | (parts[3]);;
    return new Long(low, high).toString();
}

export const parseFile = (url, resources) => GM_fetch(url).then(async response => {
    const json = await response.json();

    for (const file of json.files) {
        const fileUrl = `${url.replace(url.split('/').at(-1), '')}${file.replace('\\', '/')}`;

        if (file.match(/meta\d+.json/) || file.includes('meta.json'))
            parseFile(fileUrl, resources);

        resources.resourceOverride.push({
            file: file.replace('\\', '/'),
            id: json.id,
            url: fileUrl
        });
    }
})

const addStyle = url => GM_fetch(url).then(
    async response => GM.addStyle(await response.text())
)

export const replaceHTML = (url, style) => GM_fetch(url).then(
    response => {
        const html = document.querySelector('html'); 
        html.textContent = '';
        addEventListener('load', async () => {
            html.innerHTML = await response.text();
            addStyle(style);
        });
    }
)