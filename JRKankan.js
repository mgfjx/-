// ==UserScript==
// @name         jrkankan去弹出
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  jrkankan去弹出
// @author       mgfjx
// @include      http://www.jrkankan.com/*
// @include      http://www.jrkan2023.com/*
// @include      http://play.sportsteam357.com/play/*
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle
// @grant        GM_getResourceURL
// @icon         http://www.jrkankan.com/favicon.ico
// @run-at document-body

// ==/UserScript==

(function () {
    "use strict";

    console.log("Jrkankan油猴...");

    // var script = document.createElement('script');
    // script.text = "window.confirm=function(){return true};"
    // document.appendChild(script);
    window.confirm=function(){return true;}
    var script=$('<script>window.confirm=function(){return true;}<\/script>');
        $('body').prepend(script);
    setTimeout(() => {
        
    }, 4000);

    GM_addStyle(`
  `);
})();
