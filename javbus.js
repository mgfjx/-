// ==UserScript==
// @name         JavBus
// @namespace    http://tampermonkey.net/
// @version      2024-02-03
// @description  try to take over the world!
// @author       You
// @match        https://www.javbus.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=javbus.com
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    //循环监听是否有video-logo按钮
    let count = 0;
  let interval = setInterval(() => {
    let trArr = $('#magnet-table>tr');
    if (trArr && trArr.length > 0) {
        console.log("查到tr了，结束循环. tr length: " + trArr.length);
        clearInterval(interval);
        trArr.each(function() {
            // 查找当前tr中的第一个td
            var firstTd = $(this).find('td:first');
            // 在第一个td中添加一个按钮
            firstTd.append($('<button type="button">复制磁力链接</button>').click(function(event) {
                event.stopPropagation();
                var hrefValue = $(this).siblings('a').attr('href');
                console.log(hrefValue);
                GM_setClipboard(hrefValue);
            }));
        });
    } else {
        count++;
        console.log("循环次数: " + count);
        if (count == 20) {
            clearInterval(interval);
        }
    }
  }, 500);

})();
