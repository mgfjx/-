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

  var canvas = document.querySelector('canvas');

  function triggerDownload(imgURI) {
    console.log('imgURI: ' + imgURI);
    var evt = new MouseEvent('click', {
      bubbles: false,
      cancelable: true
    });

    var a = document.createElement('a');
    a.setAttribute('download', 'ios.png');
    a.setAttribute('href', imgURI);
    a.setAttribute('target', '_blank');

    a.dispatchEvent(evt);
  }

  //开始下载
  function downloadiOSPng() {
    console.log('开始下载');
    var svg = $('.stage .icon')[0];
    console.log(svg);
    let width = $(svg).attr('width');
    let height = $(svg).attr('height');
    //如果不存在，则去尺寸设置里面去取
    if (width == undefined || height == undefined) {
      width = $('.size-pick-wrap input').attr('value');
      height = width;
    }
    console.log('width: ' + width + ', height: ' + height) ;
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    var data = (new XMLSerializer()).serializeToString(svg);
    var DOMURL = window.URL || window.webkitURL || window;

    var img = new Image();
    var svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    var url = DOMURL.createObjectURL(svgBlob);

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);

      var imgURI = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');

      triggerDownload(imgURI);
    };

    img.src = url;
  }

  //循环监听是否有xxl_btn按钮
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

  //添加iOS下载按钮
  function addDownloadBtn(ele) {
    $(ele).after('<span class="btn btn-normal mr20 xxl_btn">生成iOS 3倍图</span>');
    $('.xxl_btn').click(function () {
      downloadiOSPng();
    });
  }

  GM_addStyle(`
    #head_wrapper .s_btn {
      background-color: rgba(0,0,0,1) !important;
    }

  `);
})();