// ==UserScript==
// @name         Aone工具
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Aone工具
// @author       You
// @match        https://work.aone.alibaba-inc.com/issue/*
// @match        https://aone.alibaba-inc.com
// @match        https://yuque.antfin-inc.com/*
// @match        https://aone.alibaba-inc.com/project/1147545/issue*
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
    .ne-editor-wrap-content, .DocReader-module_wrapper_t3Z8X {
      background: #CCE8CF77 !important;
    }
    .index-module_commentPanel_rHJ+M {
      background-color: #CCE8CF77 !important;
    }
    .doc-head {
      background: #CCE8CFff !important;
    }
    .ne-editor-wrap-box {
      background: #e7f4e9 !important;
    }
    .article-content, .ne-viewer-toc-sidebar {
      background: #e7f4e900 !important;
    }
  `);

  let interval = setInterval(() => {

    let items = $(".group-item");
    console.log(items);
    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        const element = items[i];
        element.attr("style","border:2px solid #4b8bf4;");;
      }
    }

    let active = $('.nav-tabs>li.active');
    let xxl_selected = $('.xxl_selected');
    if (xxl_selected.length > 0) {
      return;
    }
    if (active.length == 0) { //说明当前页面为插画页面，不需要添加下载按钮
      return;
    }
    
    $(".active>a").addClass("xxl_selected");
    $(".xxl_selected").
    $(".xxl_selected").css({
      border: "2px solid #ff0000 !important;"
    });
    console.log(active);
  }, 500);

  //bug筛选
  GM_addStyle(`
    .group-item>a{
      border:2px solid #4b8bf4;
      padding: 5px 30px 5px 10px;
      border-radius: 8px !important;
    }
    .xxl_selected {
      border: 2px solid #ff0000 !important;
    }
    .group-iteme>a:focus {
     border:2px solid #eb0e2e !important;
    }
    .km-side-nav {
      background: #e7f4e900 !important;
    }
    .km-list-item,
    .km-filter-wrap .km-filter{
      background: #e7f4e9ff !important;
    }
    .group-item {
      margin-right: 10px;
    }
    .nav-tabs > li.group-item .badge {
      right:5px !important;
    }
  `);

})();