// ==UserScript==
// @name         百度翻译脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  百度翻译脚本
// @author       You
// @include      *
// @match
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @grant        GM_addStyle
// @grant        GM_getResourceURL
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard

// ==/UserScript==

(function () {
  "use strict";

  console.log("百度翻译油猴...");

  document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    console.log("keyCode: " + e.keyCode);
    if (e  && event.ctrlKey && e.keyCode == 18) {
      showHideTranslatePage();
    }

    if (e && e.keyCode == 13) {
      translateBtnClicked();
      event.stopPropagation();
    }

  };

  $("body").append(`
    <div class="xl_ts_bg" >
      <div class="xl_ts_container">
        <div class="ts_logo_container">
          <img class="ts_logo" src="data:image/png;base64,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">
        </div>
        <div class="xl_input_container">
          <div class="xl_input_item xl_ts_query">
            <textarea class="xl_ts_query_input" placeholder="输入...""></textarea>
          </div>
          <div class="xl_input_item xl_ts_result">
            <textarea class="xl_ts_result_input" disabled placeholder="翻译""></textarea>
            <div class="xl_result_copy" onselectstart="return false;">
              <svg t="1652022877780" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3192" width="20" height="20"><path d="M746.932 698.108" p-id="3193" fill="#5f6368"></path><path d="M925.731 288.698c-1.261-1.18-3.607-3.272-6.902-6.343-5.486-5.112-11.615-10.758-18.236-16.891-18.921-17.526-38.003-35.028-56.046-51.397-2.038-1.848-2.038-1.835-4.077-3.682-24.075-21.795-44.156-39.556-58.996-52.076-8.682-7.325-15.517-12.807-20.539-16.426-3.333-2.402-6.043-4.13-8.715-5.396-3.365-1.595-6.48-2.566-10.905-2.483C729.478 134.227 720 143.77 720 155.734l0 42.475 0 42.475 0 84.95L720 347l21.205 0L890 347l0 595L358.689 942C323.429 942 295 913.132 295 877.922L295 177l361.205 0c11.736 0 21.25-9.771 21.25-21.5s-9.514-21.5-21.25-21.5l-382.5 0L252 134l0 21.734L252 813l-52.421 0C166.646 813 140 786.928 140 754.678L140 72l566.286 0C739.29 72 766 98.154 766 130.404L766 134l40 0 0-3.596C806 76.596 761.271 33 706.286 33L119.958 33 100 33l0 19.506 0 702.172C100 808.463 144.642 852 199.579 852L252 852l0 25.922C252 936.612 299.979 984 358.689 984l552.515 0L932 984l0-21.237L932 325.635 932 304l0.433 0C932.432 299 930.196 292.878 925.731 288.698zM762 304l0-63.315L762 198.21l0-0.273c14 11.479 30.3 26.369 49.711 43.942 2.022 1.832 2.136 1.832 4.157 3.665 17.923 16.259 36.957 33.492 55.779 50.926 2.878 2.666 5.713 5.531 8.391 7.531L762 304.001z" p-id="3194" fill="#5f6368"></path><path d="M816.936 436 407.295 436c-10.996 0-19.91 8.727-19.91 19.5 0 10.77 8.914 19.5 19.91 19.5l409.641 0c11 0 19.914-8.73 19.914-19.5C836.85 444.727 827.936 436 816.936 436z" p-id="3195" fill="#5f6368"></path><path d="M816.936 553 407.295 553c-10.996 0-19.91 8.727-19.91 19.5 0 10.774 8.914 19.5 19.91 19.5l409.641 0c11 0 19.914-8.726 19.914-19.5C836.85 561.727 827.936 553 816.936 553z" p-id="3196" fill="#5f6368"></path><path d="M816.936 689 407.295 689c-10.996 0-19.91 8.729-19.91 19.503 0 10.769 8.914 19.497 19.91 19.497l409.641 0c11 0 19.914-8.729 19.914-19.497C836.85 697.729 827.936 689 816.936 689z" p-id="3197" fill="#5f6368"></path></svg>
            </div>
          </div>
        </div>
        <div class="xl_ts_indicator">
          <div class="xl_ts_indicator_container">
            <div class="xl_ts_from"><p class="xl_ts_p xl_ts_p_from">中文</p></div>
            <div class="xl_ts_change">
              <svg t="1652020699799" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1918" width="32" height="32"><path d="M618.688 149.312l0 213.376L64 362.688 64 448l896 0L618.688 149.312zM405.312 874.688l0-213.376L960 661.312 960 576 64 576 405.312 874.688z" p-id="1919" fill="#1890ff"></path></svg>
            </div>
            <div class="xl_ts_to"><p class="xl_ts_p xl_ts_p_to">English</p></div>
          </div>
        </div>

        <div class="xl_ts_btn_container">
          <button class="xl_ts_btn">
            翻译
          </button>
        </div>
      </div>
    </div>
  `);

  //判断是否隐藏翻译框
  function showHideTranslatePage () {
      console.log("执行showHideTranslatePage方法");
    let display = $(".xl_ts_bg").css("display");
    if (display == "none") {
      $(".xl_ts_bg").css("display", "block");
      setTimeout(() => {
        $(".xl_ts_query_input").focus();
      }, 150);
    } else {
      $(".xl_ts_bg").css({ display: "none" });
    }
  }

  //点击背景隐藏翻译框
  $(".xl_ts_bg").on("click", () => {
    showHideTranslatePage();
  });

  //防止事件传递
  $(".xl_ts_container").on("click", () => {
    event.stopPropagation();
  });

  //复制翻译结果到剪切板
  $(".xl_result_copy").on("click", () => {
    GM_setClipboard($('.xl_ts_result_input').val());
  });

  //切换翻译
  $(".xl_ts_change").on("click", () => {
    let from = $('.xl_ts_p_from').text();
    let to = $('.xl_ts_p_to').text();
    $('.xl_ts_p_from').text(to);
    $('.xl_ts_p_to').text(from);
    console.log('old: from=' + from + ' to=' + to);
    console.log('new: from=' + to + ' to=' + from);
  });

  function translateBtnClicked() {
    let query = $('.xl_ts_query_input').val();
    let appid = '20220505001203855';
    let salt = '1231231';
    let appsecret = 'kgLnrss5MVpucE8LOON1';
    let signBefore = appid + query + salt + appsecret;
    let sign = CryptoJS.MD5(signBefore).toString();
    let toStr = $('.xl_ts_p_to').text();
    let to = 'en';
    if (toStr == "中文") {
      to = 'zh';
      console.log('哈哈哈');
    }

    GM_xmlhttpRequest({
      method: "post",
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: 'q=' + query + '&from=auto&to=' + to + '&appid=' + appid + '&salt=' + salt + '&sign=' + sign,
      headers:  {
          "Content-Type": "application/x-www-form-urlencoded"
      },
      onload: function(res){
          if(res.status === 200){
              console.log('成功')
              console.log(res.response);
              let response = JSON.parse(res.response);
              let trans_result = response["trans_result"];
              if (!trans_result || trans_result.length == 0) {
                $('.xl_ts_result_input').val(res);
              } else {
                let firstItem = trans_result[0];
                $('.xl_ts_result_input').val(firstItem.dst);
                console.log('result: ', firstItem);
              }
          }else{
              console.log('失败')
              console.log(res)
          }
      },
      onerror : function(err){
          console.log('error')
          console.log(err)
      }
    });
  }

  $(".xl_ts_btn").on("click", () => {
    translateBtnClicked();
      event.stopPropagation();
  });

  GM_addStyle(`
    .xl_ts_bg {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgb(0, 0, 0, 0.8);
      z-index: 10000;
      display: none;
    }

    .xl_ts_container {
      text-align: center;
      /*让div内部文字居中*/
      background-color: #fff;
      border-radius: 20px;
      width: 600px;
      height: 370px;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .ts_logo_container {
      flex: 1;
      /* background-color: aquamarine; */
    }

    .ts_logo {
      height: 31px;
      margin-top: 3px;
    }

    .xl_input_container {
      /* height: 75%; */
      flex: 7;
      /* background-color: blueviolet; */
    }

    .xl_input_item {
      height: calc(50%);
      width: calc(100%);
    }

    .xl_input_item textarea {
      width: calc(100% - 20px * 2);
      height: calc(100% - 10px * 2);
      border-width: 0;
      font-size: 18px;
      padding: 5px;
      resize: none;
      background-color: #f8f9fa;
    }

    .xl_ts_query {
      /* background-color: rgb(151, 127, 146); */
    }

    .xl_ts_query textarea {

    }

    .xl_ts_result {
      position: relative;
    }

    .xl_ts_result textarea {

    }

    .xl_result_copy {
      position: absolute;
      right: 20px;
      bottom: 10px;
      width: 32px;
      height: 32px;
      border-radius: 16px;
    }

    .xl_result_copy svg {
      height: 100%;
    }

    .xl_result_copy:hover {
      background-color: #d8d8d8;
    }

    .xl_result_copy:active {
      background-color: #bfbfbf;
    }

    .xl_ts_indicator {
      /* background-color: aqua; */
      width: 100%;
      flex: 1;
      display: table-cell;
      vertical-align: middle;
    }

    .xl_ts_indicator_container {
      /* background-color: azure; */
      width: 100%;
      height: 100%;
      display: flex;
    }

    .xl_ts_indicator_container div {
      display: inline;
      /* background-color: rgb(122, 181, 239); */
      display: flex;
    }

    .xl_ts_indicator_container :first-child {
      flex: 2;
    }

    .xl_ts_indicator_container :last-child {
      flex: 2;
    }

    .xl_ts_p {
      margin: auto;
    }

    .xl_ts_p_from {
      text-align: right;
    }

    .xl_ts_p_to {
      text-align: left;
    }

    .xl_ts_change {
      flex: 1;
    }

    .xl_ts_change svg:active {
      background-color: #f8f9fa;
    }

    .xl_ts_change:hover {
      cursor: pointer;
    }

    .xl_ts_btn_container {
      flex: 2;
      /* background-color: darkturquoise; */
      text-align: center;
    }

    .xl_ts_btn {
      /* -webkit-transition-duration: 0.4s; */
      /* transition-duration: 0.4s; */
      /* padding: 16px 32px; */
      text-align: center;
      font-size: large;
      background-color: #1890ff;
      color: white;
      border: 0px solid #1890ff;
      border-radius: 5px;
      margin: 10px auto;
      height: calc(100% - 10px * 2);
      width: 300px;
    }

    .xl_ts_btn:hover {
      background-color: #41a9ff;
      color: white;
    }

    .xl_ts_btn:active {
      background-color: #0a6dd9;
      color: white;
    }
    `);
})();
