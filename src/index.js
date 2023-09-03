import Resources from './resources.js'
import { replaceHTML } from './utils.js';
import packageJSON from '../package.json'

switch (location.href) {
    case 'https://tankionline.com/ru/':
        replaceHTML(`${packageJSON.usercontent}/website/tankionline.com.ru.html`)
        break;

    case 'https://tankionline.com/en/':
        replaceHTML(`${packageJSON.usercontent}/website/tankionline.com.en.html`)
        break;
    
    default:
        unsafeWindow.pixelPast = new Resources;
}