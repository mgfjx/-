// ==UserScript==
// @name         简书油猴脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  简书油猴脚本
// @author       You
// @include      *://www.jianshu.com/*
// @match
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle

// ==/UserScript==

(function () {
  "use strict";
  console.log("简书油猴...");

  setTimeout(() => {
    $('._22e-Te button').click();
  }, 200);

  (function () {
    var url = $("._2VEbEOHfDtVWiQAJxSIrVi_0").text();
    if (url) {
      window.location.href = url;
    }
  })();

  GM_addStyle(`
    ._2OwGUo, ._19DgIp, ._13lIbp, ._1F7CTF, ._11TSfs {
      display: none !important;
    }
    ._gp-ck {
      width: 100% !important;
    }
    ._3VRLsv {
      width: calc(100vw - 300px) !important;
    }
    ._3Pnjry {
      left: calc((100vw - (100vw - 300px))/2 - 78px) !important;
    }
  `);

})();
