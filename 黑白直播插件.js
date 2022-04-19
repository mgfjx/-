// ==UserScript==
// @name         黑白直播插件
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.hbzb666.com/live/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hbzb666.com
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";
  console.log("黑白直播油猴...");

  setTimeout(() => {
    $('.boxbot').remove();
    $('.guessForm').remove();
  }, 200);

  
})();
