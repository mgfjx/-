// ==UserScript==
// @name         综合美化脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  综合美化脚本
// @author       You
// @include      *://*.zhihu.com/*
// @include      https://www.baidu.com/
// @include      *://www.jianshu.com/go-wild?*
// @include      *://blog.csdn.net/*
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
      .AdblockBanner, .Footer {
        display: none !important;
      }
    `);
  }

  //百度首页
  if (window.location.host == "www.baidu.com") {
    console.log("百度油猴...");
    document.getElementById("s_mp").remove();
    GM_addStyle(`
      #s-top-left, #u1, #s_side_wrapper, #bottom_layer, .s-menu-container,
      .ipt_rec, .c-color-text, .s-mblock-title .s-opacity-border4-bottom,
      .s-top-nav, .tips-manager-area {
          display: none !important;
      }
      .s-block-container, #s_main {
          padding: 0;
      }
      .s-skin-hasbg .s-top-wrap{
          background: rgba(0,0,0,0);
      }
      .s-skin-hasbg #s_main {
          background: rgba(0,0,0,.2);
      }
      .nav-text {
        color: rgba(200,200,200,1);
      }
      .nav-icon>img, .nav-icon-normal {
          border-radius: 16px !important;
      }
      .s-content {
        padding-bottom: 0px;
      }
    `);
  }

  //简书
  if (window.location.host == "www.jianshu.com") {
    console.log("简书油猴...");

    (function () {
      var btn = $("._3OuyzjzFBDdQwRGk08HXHz_0");
      var count = 2;
      var time = setInterval(function () {
        btn.text(count + "秒后自动打开");
        count--;
        if (count == 0) {
          clearInterval(time);
          var url = $("._2VEbEOHfDtVWiQAJxSIrVi_0").val();
          window.location.href = url;
        }
      }, 1000);
    })();
    GM_addStyle(`

    `);
  }

  //csdn
  if (window.location.host == "blog.csdn.net") {
    console.log("csdn油猴...");
    GM_addStyle(`
        .toolbar-advert {
          display: none !important;
        }
      `);
  }
})();
