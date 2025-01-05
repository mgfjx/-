// ==UserScript==
// @name         云机工具
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  云机工具
// @author       You
// @match        https://yunji.alibaba-inc.com/avn*
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';
    console.log("云机油猴...");

    function randomColor() {
        var randomColor = 'rgb(' +
                Math.floor(Math.random() * 256) + ',' +
                Math.floor(Math.random() * 256) + ',' +
                Math.floor(Math.random() * 256) +
                ')';
        return randomColor;
    }

    function addSideMenuBar(params) {
        var newElement = $(`
        <div class="menu-container new" title="随机修改背景色">
            <div class="menu-item xldiv">
                <i class="anticon">
                    <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class="">
                        <circle cx="0.5em" cy="0.3em" r="0.2em" fill="white" />
                        <rect x="0.2em" y="0.5em" width="0.6em" height="0.3em" fill="white" />
                    </svg>
                </i>
            </div>
        </div>
        `);
        $(".side-menu").append(newElement);
        $(".xldiv").click(function () {
            // 修改背景色
            $('#showScreen0').css('background-color', randomColor());
            $('#showScreen1').css('background-color', randomColor());
            $('#showScreen2').css('background-color', randomColor());
            $('#showScreen3').css('background-color', randomColor());
        });
    }

    function checkSideMenu(params) {
        let count = 0;
        //循环监听是否有video-logo按钮
        let interval = setInterval(() => {
            let menu = $(".side-menu");
            if (menu.length > 0) {
                addSideMenuBar();
                clearInterval(interval);
                return;
            }
            count++;
            if (count > 10) {
                clearInterval(interval);
            }
        }, 200);
    }
    checkSideMenu();


    GM_addStyle(`
  `);

})();
