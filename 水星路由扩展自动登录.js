// ==UserScript==
// @name         水星路由扩展自动登录
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  水星路由扩展自动登录
// @author       You
// @include      http://melogin.cn/*
// @include      http://miwifi.com/*
// @match
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle

// ==/UserScript==

(function () {
  "use strict";
  console.log("水星路由扩展油猴...");


  let interval = setInterval(() => {
    let input = $('#lgPwd');
    if (input.length > 0) {
      console.log("xxl", input);
      $('#lgPwd').val("136245");
      clearInterval(interval);
    }
  }, 200);

  let interval2 = setInterval(() => {
    let input = $('#password');
    if (input.length > 0) {
      console.log("xxl", input);
      $('#password').val("Xxl136245");
      clearInterval(interval2);
    }
  }, 200);

  GM_addStyle(`
  `);

})();
