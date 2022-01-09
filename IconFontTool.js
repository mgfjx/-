// ==UserScript==
// @name         IconFont工具
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  IconFont工具
// @author       You
// @include      https://www.iconfont.cn/*
// @match
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle
// @grant       unsafeWindow

// ==/UserScript==

(function () {
  "use strict";
  console.log("IconFont油猴...");

  let interval = setInterval(() => {
    let eles = $('.download-btns .btn');
    if (eles.length > 0) {
      // console.log("进入图标下载页面!");
      // console.log(eles);
      let xxlBtn = $('.xxl_btn');
      // console.log(xxlBtn);
      if (xxlBtn.length == 0) {
        console.log('添加下载按钮!');
        addDownloadBtn(eles[2]);
      }
    }
  }, 500);

  function downloadiOSPng(png) {
    console.log('开始下载');
    downIcon('png');
  }

  function addDownloadBtn(ele) {
    $(ele).after('<span class="btn btn-normal mr20 xxl_btn">生成iOS 3倍图</span>');
    $('.xxl_btn').click(function(){
        console.log('开始下载');
        downIcon('png');
    });
  }
  
  GM_addStyle(`
    #head_wrapper .s_btn {
      background-color: rgba(0,0,0,1) !important;
    }

  `);
})();