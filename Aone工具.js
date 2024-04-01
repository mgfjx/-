// ==UserScript==
// @name         Aone工具
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Aone工具
// @author       You
// @match        https://work.aone.alibaba-inc.com/issue/*
// @match        https://aone.alibaba-inc.com/v2/bug/*
// @match        https://aone.alibaba-inc.com/v2/project/*
// @match        https://aone.alibaba-inc.com/v2
// @match        https://yuque.antfin-inc.com/*
// @match        https://aone.alibaba-inc.com/v2/workitem*
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
    let alert = `<div class="aone-overlay-wrapper opened" id="xxl_alert_ele"><div role="alert" aria-hidden="false" class="aone-message aone-message-success aone-toast aone-medium aone-title-content aone-overlay-inner aone-message-wrapper " style="position: absolute; left: 793px; top: 30px;"><i class="aone-icon aone-medium aone-message-symbol aone-message-symbol-icon"></i><div class="aone-message-title">
    ${title}</div></div></div>`;
    $("body").append(alert);
    setTimeout(() => {
      $('#xxl_alert_ele').fadeTo(250, 0, function () {
        $('#xxl_alert_ele').remove();
      });
    }, 2500);
  }

  //添加油猴组件区域
  function addTampermonkeyArea() {
    console.log("addTampermonkeyArea() 执行了");
    let workArea = '<div class="xxl_work_area"></div>';
    let count = 0;
    let interval = setInterval(() => {
      let titleArea = $('#workitemDetailToolBarId #workitemTitle');
      if (titleArea.length == 0) {
        // console.log("titleArea 不存在 count: " + count);
      } else {
        console.log("titleArea 创建了 count: " + count);
        let curWorkArea = $('.xxl_work_area');
        if (curWorkArea.length == 0) {
          $('#workitemDetailToolBarId').prepend(workArea);
          $('.xxl_work_area').css({
            backgroundColor: "#f7f7f7",
            height: "50px",
            float: "left",
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px"
          });
          $('.workitemDetail--workitemDetailContent--e5OG0Yq').attr("style", "padding-top: 106px !important;");
        }
        //添加复制按钮
        addCopyButton();
        clearInterval(interval);
      }
      count = count + 1;
      if (count >= 20) {
        clearInterval(interval);
      }
    }, 240);
  }
  addTampermonkeyArea();

  //添加复制BugId和标题按钮
  function addCopyButton() {
    let url = window.location.href;
    console.log("url: " + url);
    let rightToolbar = $('.xxl_work_area');
    let btn = '<i class="aone-icon aone-medium"><div class="xxl_copy_btn_v2 aone-btn aone-medium aone-btn-primary isFourCNCharBtn is-yunxiao"><span class="aone-btn-helper">复制Id&amp;标题</span></div></i>';
    $(btn).prependTo(rightToolbar);
    $(".xxl_copy_btn_v2").parent().on("click", function (e) {
      console.log("x: " + e.pageX + ", y: " + e.pageY);
      let title = $('#workitemTitle').text();
      let items = $('.AttributeFormat--attributeItem--14pG5s3 .AttributeFormat--displayText--1Banb6j');
      if (items.length == 0) return;
      let ele = items[0];
      console.log(ele);
      let bugId = $(ele).attr('title');
      let cpStr = bugId + ' - ' + title;
      addIndicator(`已复制BugId和标题!`);
      GM_setClipboard(cpStr);
    });
  }

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
        // console.log("无active选中态! count: " + count);
      } else {
        let active = $('.nav-tabs .active a');
        $(active).attr("style", "border:2px solid #ff0000 !important;");
        console.log("li: ", li);
        clearInterval(interval);
      }
      count = count + 1;
      // console.log(`modifyActiveStyle 执行了${count}次!`);
      if (count >= 20) {
        clearInterval(interval);
      }
    }, 2000);
  }

  window.onload = function () { //事件处理函数
    console.log('window.onload');
    urlChanged();
  }
  window.addEventListener("hashchange", urlChanged);
  function urlChanged() {
    let url = window.location.href;
    let reg = new RegExp("https://aone.alibaba-inc.com/project/\\d+/issue\\?");
    if (url.match(reg)) {
      console.log("link change matched");

    } else {
      console.log("not matched link: " + url);
    }
  }

  //修改工作台样式
  function modifyWorkbanchStyle() {
    console.log("modifyWorkbanchStyle excute.");
    let count = 0;
    let interval = setInterval(() => {
      let table = $('.aone-table-body');
      if (table.length == 0) {
        console.log("table 不存在 count: " + count);
      } else {
        console.log("table 创建了 count: " + count);
        let trArray = $('.aone-table-body .aone-table-row');
        for (let i = 0; i < trArray.length; i++) {
          const tr = trArray[i];
          if (i % 2 == 0) {
            $(tr).addClass('aone-table-row-odd');
          } else {
            $(tr).addClass('aone-table-row-even');
          }
        }
        clearInterval(interval);
      }
      count = count + 1;
      if (count >= 20) {
        clearInterval(interval);
      }
    }, 500);
  }
  modifyWorkbanchStyle();

  function dealWorkbanchSwitch() {
    console.log("dealWorkbanchSwitch excute.");
    //甘特图和列表切换
    {
      let count = 0;
      let interval = setInterval(() => {
        let tabs = $('.Dashboard--leftColumn--2pXTcCf .aone-card-body .aone-card-header');
        if (tabs.length == 0) {
          // console.log("tabs 不存在 count: " + count);
        } else {
          console.log("tabs 创建了 count: " + count);
          clearInterval(interval);
          $('.aone-tabs-nav-wrap .aone-tabs-tab-inner').on('click', function() {
            setTimeout(() => {
              modifyWorkbanchStyle();
            }, 200);
          });
        }
        count = count + 1;
        if (count >= 20) {
          clearInterval(interval);
        }
      }, 500);
    }

    //缺陷和任务切换
    {
      let count = 0;
      let interval = setInterval(() => {
        let tabs = $('.aone-tabs-nav li');
        if (tabs.length == 0) {
          // console.log("tabs2 不存在 count: " + count);
        } else {
          console.log("tabs2 创建了 count: " + count);
          clearInterval(interval);
          $('.aone-tabs-nav li').on('click', function() {
            console.log("点击了");
            setTimeout(() => {
              modifyWorkbanchStyle();
            }, 200);
          });
        }
        count = count + 1;
        if (count >= 20) {
          clearInterval(interval);
        }
      }, 500);
    }
  }
  dealWorkbanchSwitch();
  GM_addStyle(`
    .aone-table-row-odd {
      background: #f7faf7 !important;
    }

    .aone-table-row-even {
      background: #fcfdfc !important;
    }

    .hovered {
      background: #dae9d9 !important;
    }
  `);

  //bug过滤修改
  function modifyBugFilterStyle() {
    console.log("modifyWorkbanchStyle excute.");
    let count = 0;
    let interval = setInterval(() => {
      let toolbar = $('.topArea--workitemListTopAreaWrap--3vtibJU');
      if (toolbar.length == 0) {
        // console.log("toolbar 不存在 count: " + count);
      } else {
        clearInterval(interval);
        console.log("toolbar 创建了 count: " + count);
        collectButLinks();
        let filterOriginBtn = $('.aone-btn.aone-medium.aone-btn-normal.isOnlyIcon.is-yunxiao')[1];
        $(filterOriginBtn).on('click', function() {
          setTimeout(() => {
            let filterBtn = $('.filter--workitemListFilterButtons--3d0AnUP .isTwoToThreeCNCharBtn');
            $(filterBtn).on('click', function() {
              setTimeout(() => {
                afterClickedFilterBtn();
              }, 200);
            });
          }, 1000);
        });
      }
      count = count + 1;
      if (count >= 20) {
        clearInterval(interval);
      }
    }, 500);
  }

  //列表分组是否加载完成
  function modifyGroupStyle() {
    console.log("modifyGroupStyle excute.");
    let count = 0;
    let interval = setInterval(() => {
      let group = $('.aone-tabs-nav-wrap');
      if (group.length == 0) {
        console.log("group 不存在 count: " + count);
      } else {
        clearInterval(interval);
        console.log("group 创建了 count: " + count);
        $('.aone-tabs-nav-wrap li').on('click', function() {
          setTimeout(() => {
            afterClickedFilterBtn();
          }, 500);
        });
      }
      count = count + 1;
      if (count >= 20) {
        clearInterval(interval);
      }
    }, 500);
  }
  modifyGroupStyle();

  //点击过滤按钮后执行操作
  function afterClickedFilterBtn() {
    modifyWorkbanchStyle();
  }
  modifyBugFilterStyle();


  //复制当前页所有bug连接
  function collectButLinks() {
    var father = $(".km-toolbar .btn-group .btn-primary");
    console.log("father: " + father);

    //导出link按钮
    let btn = '<i class="aone-icon aone-medium"><div class="xxl_copy_btn_filter aone-btn aone-medium aone-btn-primary isFourCNCharBtn is-yunxiao"><span class="aone-btn-helper">导出links</span></div></i>';
    $('.workitemList--workitemCategory--38_ZBpK').append(btn);
    $(".xxl_copy_btn_filter").attr("style", "margin-left: 10px !important;");

    //点击导出link按钮
    $(".xxl_copy_btn_filter").click(function () {
      console.log("列出所有links");
      let bugList = $('.aone-table-body tr');
      let array = [];
      let str = "";
      for (let i = 0; i < bugList.length; i++) {
        let ele = bugList[i];
        let lastTd = $(ele).find('td').last(0);
        // console.log(lastTd);
        let bugId = $(lastTd).find('span').text();
        let link = "https://work.aone.alibaba-inc.com/issue/" + bugId;
        array[i] = link;
        // console.log(link);
        str = str + '\n' + link
      }
      // console.log(str);
      addIndicator("您已复制所有bug链接!");
      GM_setClipboard(str);
    });

    {
      //导出link按钮
      let btn = '<i class="aone-icon aone-medium"><div class="xxl_copy_id_title_btn_filter aone-btn aone-medium aone-btn-primary isFourCNCharBtn is-yunxiao"><span class="aone-btn-helper">导出id&title</span></div></i>';
      $('.workitemList--workitemCategory--38_ZBpK').append(btn);
      $(".xxl_copy_id_title_btn_filter").attr("style", "margin-left: 10px !important;");

      //点击导出link按钮
      $(".xxl_copy_id_title_btn_filter").click(function () {
        console.log("列出所有links");
        let bugList = $('.aone-table-body tr');
        let count = 0;
        let str = "";
        for (let i = 0; i < bugList.length; i++) {
          let ele = bugList[i];
          let titleTd = $(ele).find('td').first();
          let statusTd = $(ele).find('td').eq(1);
          let lastTd = $(ele).find('td').last();

          let title = $(titleTd).find('span').text();
          let status = $(statusTd).find('span').text();
          let bugId = $(lastTd).find('span').text();

          let tastStr = bugId + " - " + status + " - " + title;
          console.log(tastStr);
          if (str.length > 0) {
            str = str + '\n' + tastStr;
          } else {
            str = tastStr;
          }
          count = count + 1;
        }
        // console.log(str);
        addIndicator("您已复制" + count + "个id和标题!");
        GM_setClipboard(str);
      });
    }
  }

})();
