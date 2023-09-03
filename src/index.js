import Resources from './resources.js'
import { replaceHTML, addStyle } from './utils.js';
import packageJSON from '../package.json'

switch (location.href) {
    case 'https://tankionline.com/ru/':
    case 'https://tankionline.com/ru/#':
        replaceHTML(
            `${packageJSON.usercontent}/website/tankionline.com.ru.html`,
            `${packageJSON.usercontent}/website/css/style_ru.css`
        );
        break;

    case 'https://tankionline.com/en/':
    case 'https://tankionline.com/en/#':
        replaceHTML(
            `${packageJSON.usercontent}/website/tankionline.com.en.html`,
            `${packageJSON.usercontent}/website/css/style.css`
        );
        break;
    
    default:
        unsafeWindow.pixelPast = new Resources;
}