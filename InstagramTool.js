// ==UserScript==
// @name         InstagramTool
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  InstagramTool
// @author       You
// @include      https://www.instagram.com/*
// @match
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle

// ==/UserScript==

(function () {
  "use strict";
  console.log("Instagram油猴...");

  function triggerDownload(imgURI) {
    var evt = new MouseEvent('click', {
      bubbles: false,
      cancelable: true
    });

    var a = document.createElement('a');
    a.setAttribute('download', 'Instagram.jpg');
    a.setAttribute('href', imgURI);
    a.setAttribute('target', '_blank');

    a.dispatchEvent(evt);
  }

  window.onmouseover = function (e) {
    console.log(e.target.className);
    let className = e.target.className;
    if (className != undefined || className == '_9AhH0') {
      let parent = $(e.target).parent();
      let img = $(parent).find('img')[0];
      if (img.className == undefined || img.className != 'FFVAD') {
        console.log(img.className);
        return
      }
      console.log('命中' + img);
      if (img != undefined) {
        let src = $(img).attr('srcset');
        let arr = src.split(',');
        let url = arr[0].split(' ')[0];
        console.log(url);
        window.open(url);
      }
    }
  };

  GM_addStyle(`
      #head_wrapper .s_btn {
        background-color: rgba(0,0,0,1) !important;
      }

    `);
})();
