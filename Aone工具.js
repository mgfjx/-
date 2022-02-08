// ==UserScript==
// @name         Aone工具
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Aone工具
// @author       You
// @match        https://work.aone.alibaba-inc.com/issue/*
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';
  console.log("Aone油猴...");
  setTimeout(() => {
      //记录父元素
    let parent = $('.detail-content .next-card-title div').parent();
    let title = $('.detail-content .next-card-title div span').text();
    $('.detail-content  .next-card-title div').remove();
    $(parent).html('<span class="xxl_btn detail-title" style="word-break: break-all;"></span>');
    $('.xxl_btn').text(title);
    $(".xxl_btn").css({
      fontSize: 24
    });
  }, 200);

})();