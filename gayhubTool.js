// ==UserScript==
// @name         Gayhub工具
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Gayhub工具
// @author       You
// @include      https://github.com/*
// @match
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle

// ==/UserScript==

(function () {
    "use strict";
    console.log("Gayhub油猴...");
    let clipboards = $(".input-group .js-clipboard-copy");
    console.log("所有剪切板：", clipboards.length);
    for (let index = 0; index < clipboards.length; index++) {
        if (index > 1) break;
        const item = clipboards[index];
        let value = $(item).val();
        console.log(value);
        let modifyValue = 'git clone ' + value;
        $(item).val(modifyValue);
        let modifyCopy = modifyValue + ' copied!';
        $(item).attr("data-copy-feedback", modifyCopy);
    }

    let inputs = $(".input-group input");
    console.log("所有input：", inputs.length);
    for (let index = 0; index < inputs.length; index++) {
        if (index > 1) break;
        const item = inputs[index];
        let value = $(item).val();
        console.log(value);
        $(item).val('git clone ' + value);
    }
    GM_addStyle(`
      #head_wrapper .s_btn {
        background-color: rgba(0,0,0,1) !important;
      }

    `);
})();