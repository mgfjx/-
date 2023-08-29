// ==UserScript==
// @name         黑白直播插件
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.hbzb666.com/live/*
// @match        https://www.hbzb666.com/anchorLive/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hbzb666.com
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";
  console.log("黑白直播油猴...");

  setTimeout(() => {
    $(".boxbot").remove();
    $(".guessForm").remove();
  }, 200);

  //循环监听是否有video-logo按钮
  let interval = setInterval(() => {
    let img = $(".video-logo");
    if (img.length > 0) {
      //说明logo已经加载出来了
      $(".video-logo").remove();
      clearInterval(interval);
      return;
    }
  }, 1000);

  //循环监听是否有video按钮
  let interval2 = setInterval(() => {
    if (document.querySelector(`video`)) {
      try {
        const volumeAdio = document.querySelector(`video`);
        let volume = volumeAdio.volume;
        if (volume < 1.0) {
          volumeAdio.volume = 1.0;
          clearInterval(interval2);
          console.log("设置音量成功!");
        }
      } catch (error) {}
    }
  }, 1000);

  GM_addStyle(`
    .boxright1, .adcarousal, .customer-service, .scrollbar  {
      display: none !important;
    }
    .boxleft1 {
      margin-right: auto !important;
    }
    #live #go-other .signalnav ul li {
      min-width: 2% !important;
    }
  `);
})();
