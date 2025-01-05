// ==UserScript==
// @name         天瀑油猴脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  天瀑油猴脚本
// @author       mgfjx
// @include      https://nui.opens.alios.cn/center/demand/index
// @include      https://nui.opens.alios.cn/center/skill/index
// @include      https://nui.opens.alios.cn/*
// @include      https://pre-nui.opens.alios.cn/center/demand/index
// @include      https://pre-nui.opens.alios.cn/center/skill/index
// @include      https://pre-nui.opens.alios.cn/*
// @match
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue

// ==/UserScript==

(function () {
  "use strict";
  console.log("天瀑油猴...");
  //我维护的技能
  let skills = [
    "multimediaControl", "fm", "abook", "music",
    "xinger", "online_video", "iqiyi", "bilibili",
    "car_video", "kknews", "scenemode", "srvvoice",
    "phonelink",
  ];

  //查找多媒体技能
  function findMultimediaSkill() {
    console.log("findMultimediaSkill() 执行了");
    let count = 0;
    let interval = setInterval(() => {
      if ($('div[data-v-2c48e1a1]').length <= 0 && $('div[data-v-58995d8a]').length <= 0) {
        console.log('不是技能列表页.');
        clearInterval(interval);
        return;
      }
      //添加勾选框
      let showOnlyMySkill = GM_getValue("xxlonlyMySkill", true);
      console.log("showOnlyMySkill: ", showOnlyMySkill);
      //获取搜索框内容
      let searchContent = $('.el-input__inner').val().trim();
      console.log('searchContent : ' + searchContent);
      if ($("#xxlonlyMySkill").length <= 0) {
        $(".routerContainer").append(`
        <div id='xxlonlyMySkill' style='margin-left: 30px; display: flex; justify-content: cneter; align-items: center; cursor: pointer;'>
          <input type='checkbox' style='pointer-events: none;' />
          <span style='margin-left: 5px; font-size: 14px;'>只显示我的技能</span>
        </div>
        `);
        $("#xxlonlyMySkill input").prop("checked", showOnlyMySkill);
        $("#xxlonlyMySkill").click(function () {
          let checked = $("#xxlonlyMySkill input").prop("checked");
          console.log("点击了只显示我的技能, checked: ", checked);
          $("#xxlonlyMySkill input").prop("checked", !checked);
          GM_setValue("xxlonlyMySkill", !checked);
          location.reload();
        });
      }
      var tableBodies = document.querySelectorAll(".el-table__body");
      if (!tableBodies || tableBodies.length == 0) {
        // console.log("tatableListble 不存在 count: " + count);
      } else {
        var trElements = tableBodies[0].querySelectorAll("tr");
        if (!trElements || trElements.length == 0) {
          console.log("trElements 不存在 count: " + count);
        } else {
          console.log("技能列表创建了 count: " + count + ", trElements.length: " + trElements.length);
          let colors = ["red", "green", "purple", "blue", "orange"];
          let colorIndex = 0;
          let mySkillCount = 0;
          for (var i = 0; i < trElements.length; i++) {
            //修改技能样式
            var tdElements = $(trElements[i]).find("td");
            // tdElements.style.background = "#ff00ff";
            var divContent = $(tdElements[1]).find("div").text();
            // console.log('divContent : ' + divContent);
            var markTd = tdElements[1];
            //判断多媒体技能
            let color = "";
            if (skills.includes(divContent)) {
              color = colors[colorIndex%colors.length];
              colorIndex++;
              mySkillCount ++;
            } else {
              if (showOnlyMySkill && searchContent.length <= 0) {
                console.log("不显示我的技能");
                $(tdElements).remove();
              }
              continue;
            }
            for (let j = 0; j < tdElements.length; j++) {
              const td = tdElements[j];
              td.style.color = color;
              td.style.fontWeight = "bold";
            }
            // markTd.style.fontSize = "17px";

            //添加点击事件
            var currentTr = trElements[i];
            currentTr.style.cursor = "pointer";
            currentTr.onclick = function (e) {
              console.log("点击tr e: ", e.target.nodeName);
              if (e.target.nodeName == "BUTTON") {
                return;
              }
              var tr = $(e.target).closest("tr");
              var detailTd = $(tr).find("button");
              detailTd[0].click();
            };
          }
          // let topSpan = $("#xxlonlyMySkill span");
          // topSpan.text(topSpan.text() + " (" + mySkillCount + "个)");
          clearInterval(interval);
        }
      }
      count = count + 1;
      if (count >= 25) {
        clearInterval(interval);
      }
    }, 240);
  }

  function checkMediaSkillDelay() {
    // console.log("dom change date: ", Date.now());
    window.xxlexcute = true;
    setTimeout(() => {
      if (window.xxlexcute) {
        console.log("checkMediaSkillDelay excute.");
        findMultimediaSkill();
        window.xxlexcute = false;
      }
    }, 1000);
  }

  function listenerDomChange() {
    //选择要观察变动的节点
    const targetNode = document.body;
    // 配置观察选项
    const config = { attributes: false, childList: true, subtree: true };
    // 当观察到变动时执行的回调函数
    const callback = function (mutationsList, observer) {
      checkMediaSkillDelay();
    };
    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(callback);
    //用配置文件对目标节点进行观察
    observer.observe(targetNode, config);
  }
  listenerDomChange();
})();
