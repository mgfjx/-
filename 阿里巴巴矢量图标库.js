// ==UserScript==
// @name         IconFont工具
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  IconFont工具
// @author       You
// @include      https://www.iconfont.cn/*
// @icon         https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @require      https://cdn.jsdelivr.net/npm/jszip@3.7.1/dist/jszip.min.js
// @grant        GM_addStyle
// @grant       unsafeWindow

// ==/UserScript==

(function () {
  "use strict";
  console.log("IconFont油猴...");

  function triggerDownload(imgURI) {
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

  //生成对应尺寸图片URI
  function getImageURIBy(width, height, callback) {
    var svg = $('.stage .icon')[0];
    //修改svg宽高为当前传入的宽高
    $(svg).attr('width', width);
    $(svg).attr('height', height);
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
      var imgURI = canvas.toDataURL('image/png');
      callback(imgURI)
    };
    img.src = url;
  }

  //开始下载
  function downloadiOSPng() {

    //获取设置的宽高
    var svg = $('.stage .icon')[0];
    let width = $(svg).attr('width');
    let height = $(svg).attr('height');;
    if (width == undefined || height == undefined) {
      width = $('.size-pick-wrap input').val();
      height = width;
    }
    console.log('图片初始宽高: ' + width + "X" + height);

    //@1x倍图
    let P1 = new Promise(function (resolve, reject) {
      getImageURIBy(width, height, function (imgURI) {
        resolve(imgURI);
      });
    });
    //@2x倍图
    let P2 = new Promise(function (resolve, reject) {
      getImageURIBy(width*2, height*2, function (imgURI) {
        resolve(imgURI);
      });
    });
    //@3x倍图
    let P3 = new Promise(function (resolve, reject) {
      getImageURIBy(width*3, height*3, function (imgURI) {
        resolve(imgURI);
      });
    });

    Promise.all([P1, P2, P3]).then(function (results) {
      let iconTitle = $('.top-title span')[0].innerText;
      console.log(iconTitle);
      var zip = new JSZip();
      var img = zip.folder(iconTitle);
      let base64_1 = results[0];
      let base64_2 = results[1];
      let base64_3 = results[2];
      base64_1 = base64_1.replace(/^data:image\/(png|jpg);base64,/, "");
      base64_2 = base64_2.replace(/^data:image\/(png|jpg);base64,/, "");
      base64_3 = base64_3.replace(/^data:image\/(png|jpg);base64,/, "");
      img.file( iconTitle + ".png", base64_1, {base64: true});
      img.file( iconTitle + "@2x.png", base64_2, {base64: true});
      img.file( iconTitle + "@3x.png", base64_3, {base64: true});
      zip.generateAsync({type:"blob"})
      .then(function(content) {
          // see FileSaver.js
          saveAs(content, iconTitle + ".zip");
      });
    });
  }

  //循环监听是否有xxl_btn按钮
  let interval = setInterval(() => {
    let img = $('.left-stage-container img');
    if (img.length > 0) { //说明当前页面为插画页面，不需要添加下载按钮
      return;
    }
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