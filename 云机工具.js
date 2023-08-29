// ==UserScript==
// @name         云机工具
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  云机工具
// @author       You
// @match        https://yunji.alibaba-inc.com/avns*
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';
    console.log("云机油猴...");

    setTimeout(() => {
        $(".xxx").append('<button type="button" class="ant-btn ant-dropdown-trigger ant-btn-primary xxlbtn" style="margin-left: 20px"><span>文件写入授权</span></button>');
        $(".xldiv").click(function () {
            console.log("shit");
        });
    }, 1000);


    GM_addStyle(`
    .xxx {
    display: flex !important;
    }
  `);

})();