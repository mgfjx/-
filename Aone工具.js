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
// @grant        GM_setClipboard
// ==/UserScript==

(function () {
  'use strict';
  console.log("Aone油猴...");

  function addIndicator(title) {
    $("body").append('<div class="xxl_container"><span>' + title + '</span></div>');
      let ele = $(".xxl_container");
      $(ele).css({
        backgroundColor: "antiquewhite",
        position: "absolute",
        top: "200px",
        right: "-150px",
        width: "150px",
        textAlign: "center",
        padding: "10px",
        borderRadius: "10px",
        color: "rgb(27, 105, 79)",
        opacity: "0",
      });
      let display = $(ele).css("opacity");
      $(ele).fadeTo(250, 1.0);
      $(ele).animate({right: "+=150px"}, 250);
      setTimeout(() => {
        $(ele).fadeTo(250, 0, function() {
          $(ele).remove();
        });
      }, 1250);
  }

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
    $(".xxl_btn").on("click", function () {
      console.log("你好");
      let title = $('.xxl_btn').text();
      addIndicator("您已复制标题内容!");
      GM_setClipboard(title);
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

  //bug筛选
  GM_addStyle(`
    .group-item>a{
      border:2px solid #4b8bf4 !important;
      padding: 5px 30px 5px 10px;
      border-radius: 8px !important;
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