// ==UserScript==
// @name         Aone工具
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Aone工具
// @author       You
// @match        https://work.aone.alibaba-inc.com/issue/*
// @icon         https://www.google.com/s2/favicons?domain=alibaba-inc.com
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';
  console.log("Aone油猴...");
  setTimeout(() => {
    let title = $('.detail-content .next-card-title div span').text();
    $('.detail-content  .next-card-title div').remove();
    $('.detail-content .next-card-title').html('<span class="xxl_btn detail-title" style="word-break: break-all;">' + title + '</span>');
    $(".xxl_btn").css({
      fontSize: 24
    });
  }, 200);

})();