// ==UserScript==
// @name         综合美化脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  综合美化脚本
// @author       You
// @include      *://*.zhihu.com/*
// @include      https://www.baidu.com/
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
      .AdblockBanner, .Footer {
        display: none !important;
      }
    `);
  }

  //百度首页
  if (window.location.host == "www.baidu.com") {
    console.log("百度油猴...");

    try {
      $("#s_mp").remove();
      $(".user-name").remove();
    } catch {
      console.log("百度油猴出现异常!");
    }

    GM_addStyle(`
      #s-top-left, .s-weather-wrapper, #s_side_wrapper, #bottom_layer,
      .ipt_rec, .c-color-text, .s-mblock-title .s-opacity-border4-bottom,
      .s-top-nav, .tips-manager-area, #s-hotsearch-wrapper, #s_main, .soutu-btn {
          display: none !important;
      }
      .s-block-container, #s_main {
          padding: 0;
      }
      .s-skin-hasbg .s-top-wrap{
          background: rgba(0,0,0,0);
      }
      .s-skin-hasbg #s_main {
          background: rgba(0,0,0,0);
      }
      .s-code-blocks {
        box-shadow: none !important;
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
      #head_wrapper .s_btn {
        background-color: rgba(0,0,0,1) !important;
      }

      #head_wrapper .s_btn:hover {
        background-color: rgb(29 27 27) !important;
      }

      #head_wrapper #kw {
        border-color: #000000 !important;
      }

      #head_wrapper #kw:focus {
        border-color: #000000 !important;
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
          if (url) {
            window.location.href = url;
          }
        }
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
