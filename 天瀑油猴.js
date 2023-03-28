// ==UserScript==
// @name         天瀑油猴脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  天瀑油猴脚本
// @author       mgfjx
// @include      https://nui.opens.alios.cn/center/demand/index
// @include      https://nui.opens.alios.cn/center/skill/index
// @include      https://nui.opens.alios.cn/*
// @match
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle

// ==/UserScript==

(function () {
  "use strict";
  console.log("天瀑油猴...");

  //查找多媒体技能
  function findMultimediaSkill() {
    console.log("findMultimediaSkill() 执行了");
    let count = 0;
    let interval = setInterval(() => {
      var tableBodies = document.querySelectorAll(".el-table__body");
      if (!tableBodies || tableBodies.length == 0) {
        // console.log("tatableListble 不存在 count: " + count);
      } else {
        var trElements = tableBodies[0].querySelectorAll("tr");
        if (!trElements || trElements.length == 0) {
          // console.log("trElements 不存在 count: " + count);
        } else {
          console.log("技能列表创建了 count: " + count);
          for (var i = 0; i < trElements.length; i++) {
            var tdElements = trElements[i].querySelectorAll("td");
            var divContent = tdElements[2].querySelector("div").innerHTML;
            var markTd = tdElements[1];
            //判断多媒体技能
            let color = "";
            if (divContent === "multimediaControl") {
              color = "red";
            } else if (divContent === "fm") {
              color = "green";
            } else if (divContent === "abook") {
              color = "purple";
            } else if (divContent === "music") {
              color = "blue";
            } else {
              continue;
            }
            markTd.style.color = color;
            markTd.style.fontWeight = "bold";
            markTd.style.fontSize = "17px";
          }
          clearInterval(interval);
        }
      }
      count = count + 1;
      if (count >= 50) {
        clearInterval(interval);
      }
    }, 240);
  }
  findMultimediaSkill();

  //添加点击事件
  function findTabMenu() {
    console.log("findTabMenu() 执行了");
    let count = 0;
    let interval = setInterval(() => {
      var parentElement = document.querySelector(
        "#app > section > main > div > section > aside > ul > li:nth-child(4) > ul > div"
      );
      if (!parentElement || parentElement.length == 0) {
        // console.log("tatableListble 不存在 count: " + count);
      } else {
        console.log("menu tab创建了 count: " + count);
        parentElement.addEventListener("click", function (event) {
          findMultimediaSkill();
        });
        clearInterval(interval);
      }
      count = count + 1;
      if (count >= 50) {
        clearInterval(interval);
      }
    }, 240);
  }
  findTabMenu();
})();
