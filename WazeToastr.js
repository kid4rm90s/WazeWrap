// ==UserScript==
// @name         WazeToastr
// @namespace    https://greasyfork.org/users/30701-justins83-waze
// @version      2025.03.22.00
// @description  A toastr notification library for WME scripts
// @author       JustinS83/MapOMatic
// @include      https://beta.waze.com/*editor*
// @include      https://www.waze.com/*editor*
// @exclude      https://www.waze.com/*user/editor/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

/* global WazeToastr */
/* global $ */
/* jshint esversion:6 */

var WazeToastr = {};

(function() {
    'use strict';
    const MIN_VERSION = '2019.05.01.01';
    // const WT_URL = 'https://cdn.jsdelivr.net/gh/WazeDev/WazeToastr@latest/WazeToastrLib.js';
    const WT_URL = 'https://kid4rm90s.github.io/WazeToastr/WazeToastrLib.js';

    async function init(){
        const sandboxed = typeof unsafeWindow !== 'undefined';
        const pageWindow = sandboxed ? unsafeWindow : window;
        const wtAvailable = pageWindow.WazeToastr && (!pageWindow.WazeToastr.Version || pageWindow.WazeToastr.Version > MIN_VERSION);

        if (wtAvailable) {
            WazeToastr = pageWindow.WazeToastr;
        } else {
            pageWindow.WazeToastr = WazeToastr;
        }
        if (sandboxed) window.WazeToastr = WazeToastr;
        if (!wtAvailable) await $.getScript(WT_URL);
    }
    
    function bootstrap(tries = 1) {
        if (typeof $ != 'undefined')
            init();
        else if (tries < 1000)
            setTimeout(function () { bootstrap(tries++); }, 100);
        else
            console.log('WazeToastr launcher failed to load');
    }
    
    bootstrap();
    
})();
