// ==UserScript==
// @name         PixelPast

// @version      1.0.1
// @description  PixelPast is a free and open source mod for the game "Tanks Online"
// @author       sheezzmee

// @match        https://*.test-eu.tankionline.com/browser-public/index.html?*
// @match        https://tankionline.com/play*

// @icon         https://raw.githubusercontent.com/sheezzmee/PixelPast/main/icon.png

// @require      https://cdn.jsdelivr.net/npm/@trim21/gm-fetch

// @grant        GM.xmlHttpRequest
// @grant        GM_getResourceURL
// @grant        unsafeWindow

// @run-at       document-start

// @connect      githubusercontent.com

// ==/UserScript==

GM_fetch('')

GM.xmlHttpRequest({
    method: 'GET',
    url: 'https://raw.githubusercontent.com/sheezzmee/PixelPast/main/dist/main.js',
    nocache: true,
    onload: r => eval(r.responseText)
})