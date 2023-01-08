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
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function () {
  'use strict';
  const LOG_TAG = "xxl_log_tag:";
  console.log(LOG_TAG, "油猴脚本: AnoeBug统计工具");

  function addCollectBtn() {
    var father = $(".next-card-content .toolbar-section div:eq(4)");
    // console.log(LOG_TAG, "father: ", father);
    $(father).after('<div class="toolbar-section-item"><div class="next-btn next-btn-primary next-btn-medium back-create-button xxl_list_bug_link_btn"><span>添加到统计库</span></div></div>');
    $(".xxl_list_bug_link_btn").css({

    });
    let str = "";
    $(".xxl_list_bug_link_btn").click(addBugToLocal);
  }

  function addCollectPageBtn() {
    var father = $(".next-card-content .toolbar-section div:eq(4)");
    // console.log(LOG_TAG, "father: ", father);
    $(father).after('<div class="toolbar-section-item"><div class="next-btn next-btn-primary next-btn-medium back-create-button xxl_list_bug_page_btn"><span>打开统计库</span></div></div>');
    $(".xxl_list_bug_page_btn").css({

    });
    let str = "";
    $(".xxl_list_bug_page_btn").click(openPage);
  }

  function openPage() {
    console.log(LOG_TAG, "openPage func()");
  }

  function addBugToLocal() {
    console.log(LOG_TAG, "addBugToLocal func()");
    let array = GM_getValue("XLBugList", []);
    console.log(LOG_TAG, "local bug count: " + array.length);

    let bugTitle = $('.detail-content .next-card-title div span').text();
    let bugId = $('.detail-basic-id').text();
    let resolver = $('#assignedToId .next-select-inner span').text();
    let bugInfoObj = {};
    bugInfoObj.bugTitle = bugTitle;
    bugInfoObj.bugId = bugId;
    bugInfoObj.resolver = resolver;
    bugInfoObj.addTime = new Date().valueOf();
    bugInfoObj.updateTime = bugInfoObj.addTime;
    let existIndex = -1;
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      if (item.bugId == bugInfoObj.bugId) {
        existIndex = i;
        break;
      }
    }
    if (existIndex >= 0) {
      console.log(LOG_TAG, "bug exist, excute update.");
      let exsitObj = array[existIndex];
      exsitObj.bugTitle = bugInfoObj.bugTitle;
      exsitObj.bugId = bugInfoObj.bugId;
      exsitObj.resolver = bugInfoObj.resolver;
      if (!exsitObj.addTime) {
        exsitObj.addTime = bugInfoObj.addTime;
      }
      exsitObj.updateTime = new Date().valueOf();
      array[existIndex] = exsitObj;
      console.log(LOG_TAG, "bugInfoObj: " + JSON.stringify(exsitObj));
    } else {
      array.push(bugInfoObj);
      console.log(LOG_TAG, "bugInfoObj: " + JSON.stringify(bugInfoObj));
    }
    GM_setValue("XLBugList", array);
  }

  let interval = setInterval(() => {
    let xxlBtn = $('.xxl_list_bug_link_btn');
    if (xxlBtn.length == 0) {
      // console.log(LOG_TAG, '添加下载按钮!');
      addCollectPageBtn();
      addCollectBtn();
      clearInterval(interval);
    }
  }, 200);

  //bug筛选
  GM_addStyle(`

  `);

})();
