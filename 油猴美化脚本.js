// ==UserScript==
// @name         综合美化脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  综合美化脚本
// @author       You
// @include      *://*.zhihu.com/*
// @include      *://www.jianshu.com/*
// @include      *://blog.csdn.net/*
// @include      *://www.pgyer.com/*
// @match
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle

// ==/UserScript==

(function () {
  "use strict";

  //知乎
  if (window.location.host == "www.zhihu.com") {
    console.log("知乎油猴...");
    GM_addStyle(`
      .AdblockBanner, .Footer, .GlobalSideBar {
        display: none !important;
      }
      .Topstory-mainColumn {
        width: 100%;
      }
    `);
  }

  //简书
  if (window.location.host == "www.jianshu.com") {
    console.log("简书油猴...");

    (function () {
      var btn = $("._3OuyzjzFBDdQwRGk08HXHz_0");
      var count = 3;
      var time = setInterval(function () {
        btn.text(count + "秒后自动打开");
        if (count == 1) {
          clearInterval(time);
          var url = $("._2VEbEOHfDtVWiQAJxSIrVi_0").text();
          if (url) {
            window.location.href = url;
          }
        }
        count--;
      }, 1000);
    })();
    GM_addStyle(`
      ._1F7CTF, ._13lIbp, ._1jKNin {
        display: none !important;
      }
    `);
  }

  //csdn
  if (window.location.host == "blog.csdn.net") {
    console.log("csdn油猴...");
    javascript:document.body.contentEditable='true';document.designMode='on';
    GM_addStyle(`
        .toolbar-advert {
          display: none !important;
        }
      `);
  }

  //蒲公英
  if (window.location.host == "www.pgyer.com") {
    console.log("蒲公英油猴...");
    GM_addStyle(`
        .ad-container {
          display: none !important;
        }
      `);
  }
})();
