// ==UserScript==
// @name         Aone工具
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Aone工具
// @author       You
// @match        https://work.aone.alibaba-inc.com/issue/*
// @match        https://aone.alibaba-inc.com
// @match        https://yuque.antfin-inc.com/*
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';
  console.log("Aone油猴...");
  setTimeout(() => {
      //记录父元素
    let parent = $('.detail-content .next-card-title div').parent();
    let title = $('.detail-content .next-card-title div span').text();
    $('.detail-content  .next-card-title div').remove();
    $(parent).html('<span class="xxl_btn detail-title" style="word-break: break-all;"></span>');
    $('.xxl_btn').text(title);
    $(".xxl_btn").css({
      fontSize: 24
    });
  }, 200);

  GM_addStyle(`
    .next-tabs-content,
    .next-card,
    .next-table-row,
    .detail-content-card,
    .next-tabs-nav-scroll,
    #new-comment,
    .dUJuvh,
    .detail-dynamic-card .aonec-card,
    .next-col-13 > span,
    .next-input > input,
    .next-input > textarea{
      background: #CCE8CFff !important;
    }
    .k3-container{
      background: #CCE8CF77 !important;
    }
  `);

    //语雀文档
    GM_addStyle(`
    .BookReader-module_docContainer_mQ3Tk, .ant-tree-list,
    .ne-editor-wrap-content{
      background: #CCE8CF77 !important;
    }
    .ne-viewer-toc-sidebar {
      background: #CCE8CF30 !important;
    }
    .doc-head {
      background: #CCE8CFff !important;
    }
    .ne-editor-wrap-box {
      background: #e7f4e9 !important;
    }
  `);

})();