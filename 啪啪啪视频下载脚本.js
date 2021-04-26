// ==UserScript==
// @name         啪啪啪视频下载脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  啪啪啪视频下载脚本
// @author       mgfjx
// @include      *://papapa.info/vod/play*
// @include      *://kuaijiez.com*
// @match
// @require      http://ajax.aspnetcdn.com/ajax/jQuery/jQuery-1.7.2.js
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";

  console.log("油猴脚本开始加载...");
  //啪啪啪视频
  if (window.location.host == "papapa.info") {
    GM_addStyle(`
    .center-aaaaaddddd {
      display: none !important;
    }
  `);

    var downloadBtn =
      '<a href="javascript:;" class="btn xdownloadclass" style="cursor: hand;margin-left: 6px;padding: 6px 6px;background-color: rgb(132, 218, 70);color: #ffffff;" data-type="2" data-mid="1" data-id="107776">下载视频</a>';
    $(".btn-info").after(downloadBtn);
    var waitingview =
      '<span class="loadwaitingview" style="display: none; margin-left: 6px;padding: 6px 6px;color: #ffffff; font-size: 12px;">正在解析视频地址...</span>';
    $(".xdownloadclass").after(waitingview);

    $(".xdownloadclass").click(function () {
      $(".loadwaitingview").text("正在解析视频地址...");
      $(".loadwaitingview").css("display", "inline");
      $.get("/vod/getPlayUrl", { id: player_data.vod_id }, function (res) {
        // $(".loadwaitingview").css("display","none");
        res = JSON.parse(res);
        if (res.code == 0) {
          var obj = res.data;
          console.log(obj);
          var url = obj.url;
          $(".loadwaitingview").text(url);
        }
      });
    });
  }

  //啪啪啪视频
  if (window.location.host == "kuaijiez.com") {
    $(".content > div > a > img").remove();

    $("xmduizz").remove();
    $("xmdui11").remove();
    GM_addStyle(`
    #sucss {
      display: none !important;
    }
  `);
  }
})();
