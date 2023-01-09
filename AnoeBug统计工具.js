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
    let ele = $(".xl_blocal_bg");
    let display = $(ele).css("display");
    if (display == "none") {
      $(ele).css("display", "block");
      testHTML();
    } else {
      $(ele).css({ display: "none" });
    }
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
                      <input type="text" />
                  </div>
              </div>
              <div class="xl_blocal_header_bottom xl_blocal_header_item">
                  <div>
                      <span>添加时间: </span><input type="date" /><span> - </span><input type="date" />
                      <div>
                          <div class="xl_blocal_check_container">
                              <input class="xl_blocal_header_reopen" type="checkbox"/>
                              <span class="">reopen</span>
                          </div>
                          <div class="xl_blocal_check_container">
                              <input class="xl_blocal_header_rel_reopen" type="checkbox"/>
                              <span>有效reopen</span>
                          </div>
                          <div class="xl_blocal_check_container">
                              <input class="xl_blocal_header_flow" type="checkbox"/>
                              <span>流转</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="xl_blocal_body">
              <div class="xl_blocal_ul">
                  <div class="xl_blocal_li">
                      <div class="xl_blocal_li_top">
                          <div class="xl_blocal_li_top_check_container">
                              <input class="xl_blocal_li_top_check" type="checkbox" style="" />
                          </div>
                          <div class="xl_blocal_li_top_link_container">
                              <a class="xl_blocal_li_top_link" target="_blank" href="https://work.aone.alibaba-inc.com/issue/47136648">
                                  47136648 - 【音乐】耳机播放音乐时，进行通讯，通话通道选择全车，通话中会暂，进行通讯，通话通道选择全车，通话中会暂，进行通讯，通话通道选择全车，通话中会暂
                              </a>
                          </div>
                      </div>
                      <div class="xl_blocal_li_bottom">
                          <div class=".xl_blocal_li_bottom_info">
                              <span class="xl_blocal_li_bottom_info_span">添加时间: 2023-11-12</span>
                              <span class="xl_blocal_li_bottom_info_span">指派给: 谢小龙</span>
                          </div>
                          <div class="xl_blocal_li_bottom_tag_container">
                              <div class="xl_blocal_check_container">
                                  <input class="xl_blocal_li_check_reopen" type="checkbox" readonly="readonly"/>
                                  <span>reopen</span>
                              </div>
                              <div class="xl_blocal_check_container">
                                  <input class="xl_blocal_li_check_rel_reopen" type="checkbox" />
                                  <span>有效reopen</span>
                              </div>
                              <div class="xl_blocal_check_container">
                                  <input class="xl_blocal_li_check_flow" type="checkbox" />
                                  <span>流转</span>
                              </div>
                          </div>
                      </div>
                  </div>
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
      z-index: 10000;
      display: none;
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
      height: 80px;
  }

  .xl_blocal_header div {
      height: 50%;
  }

  .xl_blocal_header_top {
      background-color: aqua;
  }

  .xl_blocal_header_bottom {
      background-color: rgb(23, 111, 18);
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

  .xl_blocal_check_container input:hover {
      cursor: pointer;
  }

  .xl_blocal_check_container span:hover {
      cursor: pointer;
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

  .xl_blocal_li_bottom_tag_container input {
      margin-left: 10px;
  }
  `
  );

  function testHTML() {
      let allItems = '';
      for (let i = 0; i < 30; i++) {
          let bugId = "47136648";
          let bugLink = `https://work.aone.alibaba-inc.com/issue/${bugId}`;
          let bugTitle = `${i+1}. ` + "47136648 - 【音乐】耳机播放音乐时，进行通讯，通话通道选择全车，通话中会暂，进行通讯，通话通道选择全车，通话中会暂，进行通讯，通话通道选择全车，通话中会暂";
          let resolver = "谢小龙";
          let addTime = new Date().valueOf();
          let updateTime = addTime;
          let reopenCheck = Math.floor(Math.random() * 1000)%2 == 0 ? "checked" : "";
          let relReopenCheck = Math.floor(Math.random() * 1000)%2 == 0 ? "checked" : "";
          let flowCheck = Math.floor(Math.random() * 1000)%2 == 0 ? "checked" : "";
          console.log("reopenCheck: " + reopenCheck);
          let item = `
                      <div class="xl_blocal_li">
                          <div class="xl_blocal_li_top">
                              <div class="xl_blocal_li_top_check_container">
                                  <input class="xl_blocal_li_top_check" type="checkbox" style="" />
                              </div>
                              <div class="xl_blocal_li_top_link_container">
                                  <a class="xl_blocal_li_top_link" target="_blank" href=${bugLink}>
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
                                  <div class="xl_blocal_check_container">
                                      <input class="xl_blocal_li_check_reopen" type="checkbox" ${reopenCheck} />
                                      <span>reopen</span>
                                  </div>
                                  <div class="xl_blocal_check_container">
                                      <input class="xl_blocal_li_check_rel_reopen" type="checkbox" ${relReopenCheck} />
                                      <span>有效reopen</span>
                                  </div>
                                  <div class="xl_blocal_check_container">
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
        let checked = $(this).is(':checked');
        console.log(checked) // 如果true 则选中状态，false 则没有选中
        checkoutCheckbox(e.target, checked);
    });

    //点击CheckBox，改变状态
    $('.xl_blocal_check_container span').on("click", (e) => {
        let input = $(e.target).parent().children('input');
        let checked = $(input).is(':checked');
        $(input).prop({checked:!checked});
        checkoutCheckbox(input, !checked);
    });
  }

  function checkoutCheckbox(ele, checked) {
      let className = $(ele).attr('class');
      console.log('input class name: ' + className);
      if (className == 'xl_blocal_header_reopen') {

      } else if (className == 'xl_blocal_header_reopen') {

      } else if (className == 'xl_blocal_header_reopen') {

      } else {

      }
  }

  createBugListUI();
  addEventMethod();

})();
