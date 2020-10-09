// ==UserScript==
// @name         啪啪啪视频下载脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  啪啪啪视频下载脚本
// @author       mgfjx
// @include      https://papapa.info/vod/play*
// @match
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";

  console.log("油猴脚本开始加载...");
  GM_addStyle(`
    .center-aaaaaddddd {
      display: none !important;
    }
  `);

  var downloadBtn='<a href="javascript:;" class="btn xdownloadclass" style="cursor: hand;margin-left: 6px;padding: 6px 6px;background-color: rgb(132, 218, 70);color: #ffffff;" data-type="2" data-mid="1" data-id="107776">下载视频</a>';
  $(".btn-info").after(downloadBtn);
  var waitingview='<span class="loadwaitingview" style="display: none; margin-left: 6px;padding: 6px 6px;color: #ffffff; font-size: 12px;">正在解析视频地址...</span>';
  $(".xdownloadclass").after(waitingview);
  
  $(".xdownloadclass").click(function(){
    $(".loadwaitingview").text('正在解析视频地址...');
    $(".loadwaitingview").css("display","inline");
    $.get(
      '/vod/getPlayUrl',
      {id:player_data.vod_id},
      function (res) {
        // $(".loadwaitingview").css("display","none");
        res = JSON.parse(res);
        if (res.code == 0 ) {
            var url = res.data;
            $(".loadwaitingview").text(url);
            window.open(url);
        }
      }
  );
  });

})();
