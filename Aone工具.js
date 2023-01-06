// ==UserScript==
// @name         Aone工具
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Aone工具
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

  //弹出提示框
  function addIndicator(title) {
    $("body").append('<div class="xxl_container"><span>' + title + '</span></div>');
    let ele = $(".xxl_container");
    $(ele).css({
      backgroundColor: "antiquewhite",
      position: "absolute",
      top: "150px",
      left: "-150px",
      width: "150px",
      textAlign: "center",
      padding: "10px",
      borderRadius: "10px",
      color: "rgb(27, 105, 79)",
      opacity: "0",
    });
    let display = $(ele).css("opacity");
    $(ele).fadeTo(250, 1.0);
    $(ele).animate({ left: "+=150px" }, 250);
    setTimeout(() => {
      $(ele).fadeTo(250, 0, function () {
        $(ele).remove();
      });
    }, 1250);
  }

  setTimeout(() => {
    addTitleBugIdClickedEvent();
    //添加复制按钮
    addCopyButton();

  }, 200);

  function addTitleBugIdClickedEvent() {
    let url = window.location.href;
    console.log("url: " + url);
    let res = url.indexOf("https://aone.alibaba-inc.com/v2");
    //新版Aone
    if (res == 0) {

    } else {
      //记录父元素
      let parent = $('.detail-content .next-card-title div').parent();
      let title = $('.detail-content .next-card-title div span').text();
      $('.detail-content  .next-card-title div').css('display', 'none');
      $(parent).prepend('<span class="xxl_btn detail-title" title="单击复制标题" style="word-break: break-all;"></span>');
      $('.xxl_btn').text(title);
      $(".xxl_btn").css({
        fontSize: 24
      });
      $(".xxl_btn").on("click", function (e) {
        console.log("x: " + e.pageX + ", y: " + e.pageY);
        let title = $('.xxl_btn').text();
        addIndicator("您已复制标题内容!");
        GM_setClipboard(title);
      });
      $(".detail-basic-id").on("click", function (e) {
        console.log("x: " + e.pageX + ", y: " + e.pageY);
        let title = $('.detail-basic-id').text();
        addIndicator("您已复制BugId !");
        GM_setClipboard(title);
      });
    }
  }

  function addCopyButton() {
    let url = window.location.href;
    console.log("url: " + url);
    let res = url.indexOf("https://aone.alibaba-inc.com/v2");
    //新版Aone
    if (res == 0) {
      let rightToolbar = $('.toolbar--tools--3UNY7Ll');
      let btn = '<i class="aone-icon aone-medium"><div class="xxl_copy_btn_v2 aone-btn aone-medium aone-btn-primary isFourCNCharBtn is-yunxiao"><span class="aone-btn-helper">复制BugId&amp;标题</span></div></i>';
      $(btn).prependTo(rightToolbar);
      $(".xxl_copy_btn_v2").parent().on("click", function (e) {
        console.log("x: " + e.pageX + ", y: " + e.pageY);
        let title = $('#workitemTitle').text();
        let items = $('.AttributeFormat--attributeItem--14pG5s3 .AttributeFormat--displayText--1Banb6j');
        if (items.length == 0) return;
        let ele = items[0];
        console.log(ele);
        let bugId = $(ele).text();
        let cpStr = bugId + ' - ' + title;
        addIndicator(`您已复制[${cpStr}]内容!`);
        GM_setClipboard(cpStr);
      });
    } else {
      //旧版Aone
      let rightToolbar = $('.toolbar-section-right');
      let btn = '<div class="toolbar-section-item"><div class="xxl_copy_btn next-btn next-btn-primary next-btn-medium"><span>复制BugId&amp;标题</span></div></div>';
      $(btn).prependTo(rightToolbar);
      // $('.xxl_copy_btn').text(title);
      $(".xxl_copy_btn").on("click", function (e) {
        console.log("x: " + e.pageX + ", y: " + e.pageY);
        let title = $('.detail-content .next-card-title div span').text();
        let bugId = $('.detail-basic-id').text();
        let cpStr = bugId + ' - ' + title;
        addIndicator(`您已复制[${cpStr}]内容!`);
        GM_setClipboard(cpStr);
      });
    }
  }

  //收集bug连接
  function collectButLinks() {
    var father = $(".km-toolbar .btn-group .btn-primary");
    console.log("father: " + father);
    // $(father).append('<button class="xxl_list_bug_link_btn">打印所以bug链接</button>');
    $(father).after('<div type="button" class="btn btn-primary xxl_list_bug_link_btn">打印所以bug链接</div>');
    $(".xxl_list_bug_link_btn").css({
      marginLeft: "12px"
    });
    let str = "";
    $(".xxl_list_bug_link_btn").click(function () {
      console.log("列出所有links");
      let bugList = $(".issue-list .km-list-item");
      let array = [];
      for (let i = 0; i < bugList.length; i++) {
        let ele = bugList[i];
        let bugId = $(ele).attr("data-id");
        let link = "https://work.aone.alibaba-inc.com/issue/" + bugId;
        array[i] = link;
        // console.log(link);
        str = str + '\n' + link
      }
      // console.log(str);
      addIndicator("您已复制所有bug链接!");
      GM_setClipboard(str);
    });
  }

  function addCollectBut() {
    let interval = setInterval(() => {
      let xxlBtn = $('.xxl_list_bug_link_btn');
      if (xxlBtn.length == 0) {
        collectButLinks();
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

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
    .xxl_copy_btn_v2{
      width: auto !important;
      padding: 0 10px !important;
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

  window.staticCount = 0;

  function modifyActiveStyle() {
    console.log("modifyActiveStyle excute.");
    let count = 0;
    let interval = setInterval(() => {
      let li = $('.nav-tabs .active');
      if (li.length == 0) {
        console.log("无active选中态! count: " + count);
      } else {
        let active = $('.nav-tabs .active a');
        $(active).attr("style", "border:2px solid #ff0000 !important;");
        console.log("li: ", li);
        clearInterval(interval);
      }
      count = count + 1;
      console.log(`modifyActiveStyle 执行了${count}次!`);
      if (count >= 20) {
        clearInterval(interval);
      }
    }, 2000);
  }

  window.addEventListener("hashchange", myFunction);
  function myFunction() {
    let url = window.location.href;
    let reg = new RegExp("https://aone.alibaba-inc.com/project/\\d+/issue\\?");
    if (url.match(reg)) {
      modifyActiveStyle();
      addCollectBut();
      console.log("link change matched");
    } else {
      console.log("not matched link: " + url);
    }
  }

  modifyActiveStyle();
  addCollectBut();

  //bug筛选
  GM_addStyle(`
    .group-item>a{
      border:2px solid #4b8bf4;
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
    .nav-tabs .active a {
      border:2px solid #ff0000 !important;
    }
    .nav-tabs .group-item a {
      border:2px solid #4b8bf4 !important;
    }
  `);

})();
