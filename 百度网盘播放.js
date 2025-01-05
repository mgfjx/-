<<<<<<< HEAD
// ==UserScript==
// @name         百度网盘播放
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pan.baidu.com/play/video*
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=baidu.com
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";
  console.log("百度网盘油猴...");
  GM_addStyle(`
    .currentplay .video-list-thumbnail {
      border-color: #ff0000 !important;
    }
    .video-main, #video-player {
      width: 100%  !important;
    }
  `);
})();
=======
// ==UserScript==
// @name         百度网盘播放
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pan.baidu.com/play/video*
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=baidu.com
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";
  console.log("百度网盘油猴...");
  GM_addStyle(`
    .currentplay .video-list-thumbnail {
      border-color: #ff0000 !important;
    }
  `);
})();
>>>>>>> 3f751e90f4da4aed73fef90a0eb582d6388538cf
