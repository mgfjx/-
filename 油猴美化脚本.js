// ==UserScript==
// @name         综合美化脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  综合美化脚本
// @author       You
// @include      *://*.zhihu.com/*
// @include      *://blog.csdn.net/*
// @include      *://www.pgyer.com/*
// @include      https://www.google.com.*/?*
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
      .Question-main .Question-sideColumn {
              display: none !important;
      }
      .Topstory-mainColumn, .Question-mainColumn {
        width: 100% !important;
      }
    `);
  }

  //csdn
  if (window.location.host == "blog.csdn.net") {
    console.log("csdn油猴...");
    javascript: document.body.contentEditable = "true";
    document.designMode = "on";
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

  //谷歌
  let host = window.location.host;
  if (host.indexOf("www.google.com") != -1) {
    // $("body").attr(
    //   "background",
    //   "https://dss3.bdstatic.com/iPoZeXSm1A5BphGlnYG/skin/206.jpg?2"
    // );
    console.log("谷歌油猴...");
    GM_addStyle(`
        .lJ9FBc, #SIvCob, .iblpc, .XDyW0e, .uU7dJb, .pHiOh {
          display: none !important;
        }
        .EzVRq, .gb_d {
          color: rgba(255,255,255,255) !important;
        }
        .c93Gbe {
          background-color: rgba(0,0,0,0) !important;
        }
        body {
          background-image: url("https://dss3.bdstatic.com/iPoZeXSm1A5BphGlnYG/skin/206.jpg?2") !important;
        }
      `);
  }
})();
