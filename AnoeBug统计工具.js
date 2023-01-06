// ==UserScript==
// @name         AnoeBug统计工具
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  AnoeBug统计工具
// @author       You
// @match        https://work.aone.alibaba-inc.com/issue/*
// @match        https://aone.alibaba-inc.com/v2/bug/*
// @match        https://aone.alibaba-inc.com/v2/project/*/bug/*
// @match        https://aone.alibaba-inc.com
// @match        https://yuque.antfin-inc.com/*
// @match        https://aone.alibaba-inc.com/project/*/issue*
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==

(function () {
  'use strict';
  console.log("Aone油猴...");

  function addCollectBtn() {
    var father = $(".next-card-content .toolbar-section div:eq(4)");
    console.log("father: ", father);
    // $(father).append('<button class="xxl_list_bug_link_btn">打印所以bug链接</button>');
    $(father).after('<div class="toolbar-section-item"><div class="next-btn next-btn-primary next-btn-medium back-create-button xxl_list_bug_link_btn"><span>添加到统计库</span></div></div>');
    $(".xxl_list_bug_link_btn").css({

    });
    let str = "";
    $(".xxl_list_bug_link_btn").click(function () {
      console.log("列出所有links");
      let bugTitle = $('.detail-content .next-card-title div span').text();
      let bugId = $('.detail-basic-id').text();
      let resolver = $('#assignedToId .next-select-inner span').text();
      let bugInfoObj = {};
      bugInfoObj.bugTitle = bugTitle;
      bugInfoObj.bugId = bugId;
      bugInfoObj.resolver = resolver;
      console.log("bugInfoObj: " + JSON.stringify(bugInfoObj));
      GM_setClipboard(str);
    });
  }

  let interval = setInterval(() => {
    let xxlBtn = $('.xxl_list_bug_link_btn');
    // console.log(xxlBtn);
    if (xxlBtn.length == 0) {
      // console.log('添加下载按钮!');
      addCollectBtn();
      clearInterval(interval);
    }
  }, 100);

  window.addEventListener("hashchange", myFunction);
  function myFunction() {
    let url = window.location.href;
    let reg = new RegExp("https://work.aone.alibaba-inc.com/issue/\\d+");
    if (url.match(reg)) {

    } else {
        console.log("not matched link: " + url);
    }
  }

  //bug筛选
  GM_addStyle(`

  `);

})();
