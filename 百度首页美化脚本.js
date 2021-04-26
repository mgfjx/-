// ==UserScript==
// @name         百度首页美化脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  百度首页美化脚本
// @author       You
// @include      https://www.baidu.com/
// @match
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle

// ==/UserScript==

(function () {
  "use strict";

  //百度首页
  if (window.location.host == "www.baidu.com") {
    console.log("百度油猴...");

    try {
      $("#s_mp").remove();
      $(".user-name").remove();
    } catch {
      console.log("百度油猴出现异常!");
    }

    $("body").append('<div class="xldiv"></div>');

    $(".xldiv").css({
      height: "20px",
      width: "20px",
      "background-color": "#ff0000",
      position: "absolute",
      right: "20px",
      bottom: "20px",
      "border-radius": "10px",
    });

    $("#s_main").css({ display: "none" });
    $(".xldiv").click(function () {
      let display = $("#s_main").css("display");
      if (display == "none") {
        $("#s_main").css("display", "block");
      } else {
        $("#s_main").css({ display: "none" });
      }
    });

    GM_addStyle(`
      #s-top-left, .s-weather-wrapper, #s_side_wrapper, #bottom_layer,
      .ipt_rec, .c-color-text, .s-mblock-title .s-opacity-border4-bottom,
      .s-top-nav, .tips-manager-area, #s-hotsearch-wrapper, .soutu-btn {
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
})();
