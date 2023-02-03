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
  "use strict";
  const LOG_TAG = "xxl_log_tag:";
  console.log(LOG_TAG, "油猴脚本: AnoeBug统计工具");

  function addCollectBtn() {
    let rightToolbar = $('.toolbar--tools--3UNY7Ll');
    let btn = '<i class="aone-icon aone-medium xxl_list_bug_btn_li"><div class="xxl_list_bug_link_btn aone-btn aone-medium aone-btn-primary isFourCNCharBtn is-yunxiao"><span class="aone-btn-helper">添加到统计库</span></div></i>';
    $(btn).prependTo(rightToolbar);
    $(".xxl_list_bug_btn_li").attr("style", "margin-right: 5px !important;");
    let str = "";
    $(".xxl_list_bug_link_btn").click(addBugToLocal);
  }

  function addCollectPageBtn() {
    let rightToolbar = $('.toolbar--tools--3UNY7Ll');
    let btn = '<i class="aone-icon aone-medium xxl_list_bug_btn_li"><div class="xxl_list_bug_page_btn aone-btn aone-medium aone-btn-primary isFourCNCharBtn is-yunxiao"><span class="aone-btn-helper">打开统计库</span></div></i>';
    $(btn).prependTo(rightToolbar);
    $(".xxl_list_bug_page_btn").css({});
    let str = "";
    $(".xxl_list_bug_page_btn").click(openPage);
  }

  function openPage() {
    console.log(LOG_TAG, "openPage func()");
    let ele = $(".xl_blocal_bg");
    if (!ele || ele.length == 0) {
      createBugListUI();
      listExistBug();
      addEventMethod();
    }
    let display = $(ele).css("display");
    if (display == "none") {
      $(ele).css("display", "block");
    } else {
      $(ele).css({ display: "none" });
    }
  }

  function addBugToLocal() {
    console.log(LOG_TAG, "addBugToLocal func()");
    let bugTitle = $('#workitemTitle').text();
    let items = $('.AttributeFormat--attributeItem--14pG5s3 .AttributeFormat--displayText--1Banb6j');
    if (items.length == 0) return;
    let ele = items[0];
    console.log(ele);
    let bugId = $(ele).attr('title');
    let resolverEle = $('.AttributeFormat--attributeItem--14pG5s3 .aone-select-trigger-search input')[0];
    let resolver = $(resolverEle).attr('aria-valuetext');
    console.log('addBugToLocal resolver: ' + resolver);
    let bugInfoObj = {};
    bugInfoObj.bugTitle = bugTitle;
    bugInfoObj.bugId = bugId;
    bugInfoObj.resolver = resolver;
    bugInfoObj.addTime = new Date().valueOf();
    bugInfoObj.updateTime = bugInfoObj.addTime;
    if (bugId.length <= 0) {
      console.log(LOG_TAG, "addBugToLocal bugId is null.");
      return;
    }
    addBugObjToLocal(bugInfoObj);
  }

  function addBugObjToLocal(bugInfoObj) {
    console.log(LOG_TAG, "addBugObjToLocal:");
    let array = GM_getValue("XLBugList", []);
    console.log(LOG_TAG, "local bug count: " + array.length);
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
      if (bugInfoObj.reopen != undefined) exsitObj.reopen = bugInfoObj.reopen;
      if (bugInfoObj.relReopen != undefined) exsitObj.relReopen = bugInfoObj.relReopen;
      if (bugInfoObj.flow != undefined) exsitObj.flow = bugInfoObj.flow;
      if (bugInfoObj.decline != undefined) exsitObj.decline = bugInfoObj.decline;
      if (bugInfoObj.relDecline != undefined) exsitObj.relDecline = bugInfoObj.relDecline;
      array[existIndex] = exsitObj;
      console.log(LOG_TAG, "exist bugInfoObj: ", exsitObj);
    } else {
      array.push(bugInfoObj);
      console.log(LOG_TAG, "bugInfoObj: " + JSON.stringify(bugInfoObj));
    }
    GM_setValue("XLBugList", array);
  }

  let interval = setInterval(() => {
    let xxlBtn = $(".xxl_list_bug_link_btn");
    if (xxlBtn.length == 0) {
      // console.log(LOG_TAG, '添加下载按钮!');
      addCollectPageBtn();
      addCollectBtn();
      clearInterval(interval);
    }
  }, 200);

  //添加bugUI
  function createBugListUI() {
    console.log(LOG_TAG, "createBugListUI func()");
    try {
      let html = `
    <div class="xl_blocal_bg">
      <div class="xl_blocal_container_bg">
          <div class="xl_blocal_header">
              <div class="xl_blocal_header_top xl_blocal_header_item">
              <div>
                  <span>搜索: </span>
                  <input class="xl_blocal_header_search_input" type="text" />
              </div>
              <div>
                  <span>添加时间: </span>
                  <input type="date" /><span> - </span><input type="date" />
              </div>
              </div>
              <div class="xl_blocal_header_bottom xl_blocal_header_item">
                  <div>
                      <div>
                          <div class="xl_blocal_check_container" type="reopen">
                              <input class="xl_blocal_header_reopen" type="checkbox"/>
                              <span class="">reopen</span>
                          </div>
                          <div class="xl_blocal_check_container" type="relReopen">
                              <input class="xl_blocal_header_rel_reopen" type="checkbox"/>
                              <span>有效reopen</span>
                          </div>
                          <div class="xl_blocal_check_container" type="decline">
                              <input class="xl_blocal_header_decline" type="checkbox"/>
                              <span>衰退</span>
                          </div>
                          <div class="xl_blocal_check_container" type="relDecline">
                              <input class="xl_blocal_header_rel_decline" type="checkbox"/>
                              <span>有效衰退</span>
                          </div>
                          <div class="xl_blocal_check_container" type="flow">
                              <input class="xl_blocal_header_flow" type="checkbox"/>
                              <span>流转</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="xl_blocal_body">
              <div class="xl_blocal_ul">

              </div>
          </div>
      </div>
    </div>
    `;
      $("body").append(html);
    } catch (error) {
      console.log(LOG_TAG, "error: ", error);
    }
  }

  //bug筛选
  GM_addStyle(
    `
    .xl_blocal_bg {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgb(0, 0, 0, 0.6);
      z-index: 20000;
      /* display: none; */
      /* display: flex; */
      /* align-items: flex-end; */
  }

  .xl_blocal_container_bg {
      /* flex: 1; */
      background-color: #fff;
      /* margin-left: 60%; */
      /* margin-left: 800px; */
      /* margin-right: 100px; */
      /* overflow: hidden; */
      float: right;
      width: 800px;
      height: 100%;
      padding: 0;
      font-size: 14px;
  }

  .xl_blocal_header {
      background-color: bisque;
      margin: auto;
      height: 80px;;
  }

  .xl_blocal_header div {
      height: 50%;
  }

  .xl_blocal_header_top {
      background-color: aqua;
  }

  .xl_blocal_header_bottom {
      /* background-color: rgb(23, 111, 18); */
  }

  .xl_blocal_header_item div {
      float: left;
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 12px;
  }

  .xl_blocal_header_item input {
      font-size: 12px;
  }

  .xl_blocal_check_container {
      height: 100%;
      padding-left: 10px;
      padding-right: 10px;
  }

  .xl_blocal_check_container span {
      padding-bottom: 3px;
      padding-left: 5px;
  }

  .xl_blocal_check_container input:hover {
      cursor: pointer;
  }

  .xl_blocal_check_container span:hover {
      cursor: pointer;
  }

  .xl_blocal_check_container input {
      margin: 3px;
  }

  .xl_blocal_li_bottom .xl_blocal_check_container {
      float: left;
      height: 100%;
      display: flex;
      align-items: center;
  }

  .xl_blocal_body {
      background-color: rgb(245, 245, 245);
      margin: auto;
      height: calc(100% - 80px);
      display: flex;
      overflow: hidden;
  }

  .xl_blocal_ul {
      flex: 1;
      margin: 0;
      padding: 0;
      /* background-color: coral; */
      overflow: scroll;
  }

  .xl_blocal_li {
      background-color: #fff;
      height: 80px;
      width: 100%;
      margin-bottom: 5px;
      /* background-color: cornflowerblue; */
  }

  .xl_blocal_li_top {
      height: 40%;
      /* background-color: aliceblue; */
  }

  .xl_blocal_li_top div {
      float: left;
      height: 100%;
      display: flex;
      align-items: center;
  }

  .xl_blocal_li_top_check_container {
      width: 30px;
  }

  .xl_blocal_li_top_check_container input {
      margin: 0 auto;
  }

  .xl_blocal_li_top_check:hover {
      cursor: pointer;
  }

  .xl_blocal_li_top_link_container {
      width: calc(100% - 30px);
  }

  .xl_blocal_li_top_link {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-decoration-line: none;
  }

  .xl_blocal_li_top_link:hover {
      text-decoration-line: underline;
  }

  .xl_blocal_li_bottom {
      height: 60%;
      /* background-color: rgb(252, 222, 195); */
  }

  .xl_blocal_li_bottom div {

  }

  .xl_blocal_li_bottom_info {
      height: 40%;
      background-color: rgb(114, 47, 238);
  }

  .xl_blocal_li_bottom_info_span {
      font-size: 10px;
      margin-left: 10px;
      color: rgb(175, 175, 175);
  }

  .xl_blocal_li_bottom_tag_container {
      height: 60%;
      /* float: left; */
      display: flex;
      align-items: center;
  }

  .xl_blocal_li_bottom_tag_container span {
      color: rgb(175, 175, 175);
  }

  `
  );

  //加载bug list
  function listExistBug() {
    //读取保存在本地的bug
    let bugList = GM_getValue("XLBugList", {});
    console.log(`一共保存了${bugList.length}个bug.`);
    createButItemsByList(bugList);
  }

  function createButItemsByList(bugList) {
    let allItems = "";
    if (!bugList || bugList.length <= 0) {
      return;
    }
    for (let i = bugList.length - 1; i >= 0; i--) {
      let bugObj = bugList[i];
      let bugId = bugObj.bugId;
      let bugLink = `https://work.aone.alibaba-inc.com/issue/${bugId}`;
      let index = bugList.length - 1 - i + 1;
      let bugTitle = `${index}. ${bugId} - ${bugObj.bugTitle}`;
      let resolver = bugObj.resolver;
      let addTime = timestampToTime(bugObj.addTime);
      let updateTime = bugObj.updateTime;
      let reopen = bugObj.reopen;
      let relReopen = bugObj.relReopen;
      let decline = bugObj.decline;
      let relDecline = bugObj.relDecline;
      let flow = bugObj.flow;
      let reopenCheck = reopen ? "checked" : "";
      let relReopenCheck = relReopen ? "checked" : "";
      let declineCheck = decline ? "checked" : "";
      let relDeclineCheck = relDecline ? "checked" : "";
      let flowCheck = flow ? "checked" : "";
      let item = `
                      <div class="xl_blocal_li" id=${bugId} >
                          <div class="xl_blocal_li_top">
                              <div class="xl_blocal_li_top_check_container">
                                  <input class="xl_blocal_li_top_check" type="checkbox" style="" />
                              </div>
                              <div class="xl_blocal_li_top_link_container">
                                  <a class="xl_blocal_li_top_link" target="_blank" href=${bugLink} title=${bugObj.bugTitle}>
                                      ${bugTitle}
                                  </a>
                              </div>
                          </div>
                          <div class="xl_blocal_li_bottom">
                              <div class=".xl_blocal_li_bottom_info">
                                  <span class="xl_blocal_li_bottom_info_span">添加时间: ${addTime}</span>
                                  <span class="xl_blocal_li_bottom_info_span">指派给: ${resolver}</span>
                              </div>
                              <div class="xl_blocal_li_bottom_tag_container">
                                  <div class="xl_blocal_check_container" type="reopen">
                                      <input class="xl_blocal_li_check_reopen" type="checkbox" ${reopenCheck} />
                                      <span>reopen</span>
                                  </div>
                                  <div class="xl_blocal_check_container" type="relReopen">
                                      <input class="xl_blocal_li_check_rel_reopen" type="checkbox" ${relReopenCheck} />
                                      <span>有效reopen</span>
                                  </div>
                                  <div class="xl_blocal_check_container" type="decline">
                                      <input class="xl_blocal_li_check_rel_declin" type="checkbox" ${declineCheck} />
                                      <span>衰退</span>
                                  </div>
                                  <div class="xl_blocal_check_container" type="relDecline">
                                      <input class="xl_blocal_li_check_rel_rel_decline" type="checkbox" ${relDeclineCheck} />
                                      <span>有效衰退</span>
                                  </div>
                                  <div class="xl_blocal_check_container" type="flow">
                                      <input class="xl_blocal_li_check_flow" type="checkbox" ${flowCheck} />
                                      <span>流转</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  `;
      allItems = allItems + item;
    }
    $(".xl_blocal_ul").append(allItems);
  }

  function addEventMethod() {
    $(".xl_blocal_bg").on("click", () => {
      $(".xl_blocal_bg").css("display", "none");
    });

    $(".xl_blocal_container_bg").on("click", () => {
      event.stopPropagation();
    });

    $(".xl_blocal_check_container input").change(function (e) {
      let checked = $(this).is(":checked");
      console.log(checked); // 如果true 则选中状态，false 则没有选中
      checkoutCheckbox(e.target, checked);
    });

    //点击CheckBox，改变状态
    $(".xl_blocal_ul").on("click", ".xl_blocal_check_container span", clickOnCheckboxSpan);
    $(".xl_blocal_header .xl_blocal_check_container span").on("click", clickOnCheckboxSpan);

    //搜索事件
    $(".xl_blocal_header_search_input").on("input propertychange", function () {
      var $this = $(this);
      let input = $this.val();
      window.inputtime = new Date().valueOf();
      if (window.bugInterval) {
        clearInterval(window.bugInterval);
        window.bugInterval = undefined;
      }
      window.bugInterval = setInterval(() => {
        let curremttime = new Date().valueOf();
        if (curremttime - window.inputtime > 1000) {
          clearInterval(window.bugInterval);
          window.bugInterval = undefined;
          console.log(LOG_TAG, `search text: ${input}`);
          checkSearchData();
        }
      }, 200);
    });
  }

  function clickOnCheckboxSpan(e) {
    let input = $(e.target).parent().children("input");
    let checked = $(input).is(":checked");
    $(input).prop({ checked: !checked });
    checkoutCheckbox(input, !checked);
  }

  // checkbox 事件
  function checkoutCheckbox(ele, checked) {
    let className = $(ele).attr("class");
    let checkType = $(ele).closest('.xl_blocal_check_container').attr("type");
    console.log(LOG_TAG, `checked: ${checked}, checkType: ${checkType} className: ${className}`);
    if (className == "xl_blocal_header_reopen" || className == "xl_blocal_header_rel_reopen" ||
        className == "xl_blocal_header_flow" || className == "xl_blocal_header_decline" ||
        className == "xl_blocal_header_rel_decline") {
      checkSearchData();
    } else {
      let bugId = $(ele).closest('.xl_blocal_li').attr('id');
      let bugList = GM_getValue("XLBugList", []);
      let bugObj;
      for (let i = 0; i < bugList.length; i++) {
        const item = bugList[i];
        if (item.bugId == bugId) {
          item[checkType] = checked;
          bugObj = item;
          break;
        }
      }
      if (bugObj) {
        console.log(bugObj);
        addBugObjToLocal(bugObj);
      }
    }
  }

  // 根据header checkbox搜索数据
  function checkSearchData() {
    console.log(LOG_TAG, "checkSearchData()");
    let searchText = $('.xl_blocal_header_search_input').val();
    //获取所有搜索CheckBox container
    let checkContainers = $('.xl_blocal_header_bottom .xl_blocal_check_container');
    //获取需要筛选的属性
    let props = []
    for (let i = 0; i < checkContainers.length; i++) {
      const container = checkContainers[i];
      let type = $(container).attr('type');
      let checked = $(container).find('input').is(":checked");
      if (checked) {
        props.push(type);
      }
    }
    console.log(LOG_TAG, `search text: ${searchText}, props: ${JSON.stringify(props)}`);
    let bugList = GM_getValue("XLBugList", []);
    let searchData = [];
    for (let i = 0; i < bugList.length; i++) {
      const item = bugList[i];
      let matched = true;
      for (const key of props) {
        if (!item[key]) {
          matched = false;
          break;
        }
      }
      let allText = item.bugId + item.bugTitle + item.resolver;
      if (matched) {
        if (searchText.length > 0) {
          if (allText.indexOf(searchText) == -1) {
            matched = false;
          }
        }
      } else {
        matched = false;
      }
      if (matched) {
        console.log(LOG_TAG, `searchData count: ${searchData.length}, matched: ${matched}`);
        searchData.push(item);
      }
    }
    console.log(LOG_TAG, `共搜索到${searchData.length}个结果.`);
    $(".xl_blocal_ul").empty();
    createButItemsByList(searchData);
  }

  /* 时间戳转换为时间 */
  function timestampToTime(timestamp) {
    timestamp = timestamp ? timestamp : null;
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  }

})();
