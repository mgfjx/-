// ==UserScript==
// @name         AoneBug翻译脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  AoneBug翻译脚本
// @author       You
// @include      
// @match        https://work.aone.alibaba-inc.com/issue/*
// @match        https://aone.alibaba-inc.com/v2/bug/*
// @match        https://aone.alibaba-inc.com/v2/project/*/bug/*
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js
// @grant        GM_addStyle
// @grant        GM_getResourceURL
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard

// ==/UserScript==

(function () {
    "use strict";

    console.log("AoneBug翻译油猴...");

    window.keyCodeObj = {keyCode: 0, time: (new Date()).valueOf()};
    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (!e) {
            return;
        }
        let keyCode = e.keyCode;
        let currentTime = (new Date()).valueOf();
        let changeTime = (currentTime - window.keyCodeObj.time);
        if (keyCode == 17 && keyCode == window.keyCodeObj.keyCode && changeTime <= 300 && changeTime > 100) { //快速双击ctrl键
            console.log("keyCode: " + e.keyCode);
            showHideTranslatePage();
        }
        window.keyCodeObj.keyCode = keyCode;
        window.keyCodeObj.time = currentTime;
    };

    $("body").append(`
    <div class="xl_ab_bg">
        <div class="xl_ab_container">
        <div class="xl_ab_itemContainer xl_ab_itemContainer_1">
            <p class="xl_ab_item_title">BugID:</p>
            <textarea class="xl_ab_query" placeholder="输入...""></textarea>
            <textarea class=" xl_ab_result" placeholder="结果...""></textarea>
            <div class=" xl_ab_translate xl_ab_translate_1" onselectstart="return false;">
            <svg t="1652116407366" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1840" width="40" height="40">
                <path d="M510.532067 377.342114c17.318434 17.856693 35.576263 32.577976 54.763255 44.169989 22.11467-12.391215 41.102117-27.112498 56.961316-44.169989L510.532067 377.342114z" p-id="1841" fill="#bfbfbf"></path><path d="M512.688173 153.054885c-195.544605 0-354.064968 158.520363-354.064968 354.064968s158.520363 354.064968 354.064968 354.064968 354.065991-158.520363 354.065991-354.064968S708.231755 153.054885 512.688173 153.054885zM365.629863 317.382511c18.653849 19.986193 38.904055 42.905182 60.758806 68.753897-15.189957 11.192923-30.379914 22.784936-45.568848 34.776038-17.588587-23.715121-36.109406-47.698349-55.562457-71.951729L365.629863 317.382511zM366.430088 707.118909l-28.780487-39.173185c7.194866-6.928806 10.79281-18.11866 10.79281-33.577746l0-133.509736-33.976836 0 0-51.964512 87.540775 0 0 161.090908c12.258185-9.859555 22.914896-19.587104 31.978319-29.1806 0.26606 20.520359 1.998517 41.705867 5.196349 63.556525C408.530952 667.545612 384.283712 688.461991 366.430088 707.118909zM701.402209 645.559878l-105.528452 0 0 65.556065-55.962569 0 0-65.556065-96.734158 0 0-44.769646 96.734158 0 0-28.780487-87.940888 0 0-44.769646 87.940888 0 0-26.381857 55.962569 0 0 26.381857 96.734158 0 0 44.769646-96.734158 0 0 28.780487 105.528452 0L701.402209 645.559878zM689.411107 511.25094c-53.963029-7.460925-96.069009-18.11866-126.314871-31.978319-34.246989 15.589047-72.350818 26.916023-114.322745 33.976836-6.395664-15.189957-15.059997-30.909987-25.982768-47.168276 31.978319-4.52813 61.024865-11.192923 87.140663-19.986193-17.322527-13.990642-34.110889-31.3101-50.366108-51.964512l30.978549-16.788361-44.969191 0 0-44.369533 247.832482 0 0 43.570331c-20.786419 26.916023-44.969191 50.100048-72.550363 69.553099 26.511817 7.995091 56.428174 13.060457 89.738837 15.189957C702.068382 480.471936 695.006546 497.130338 689.411107 511.25094z" p-id="1842" fill="#bfbfbf">
                </path>
            </svg>
            </div>
        </div>
        <div class="xl_ab_itemContainer xl_ab_itemContainer_2">
            <p class="xl_ab_item_title">Root Cause:</p>
            <textarea class="xl_ab_query" placeholder="输入...""></textarea>
            <textarea class="xl_ab_result" placeholder="结果...""></textarea>
            <div class=" xl_ab_translate xl_ab_translate_2" onselectstart="return false;">
            <svg t="1652116407366" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1840" width="40" height="40">
                <path d="M510.532067 377.342114c17.318434 17.856693 35.576263 32.577976 54.763255 44.169989 22.11467-12.391215 41.102117-27.112498 56.961316-44.169989L510.532067 377.342114z" p-id="1841" fill="#bfbfbf"></path><path d="M512.688173 153.054885c-195.544605 0-354.064968 158.520363-354.064968 354.064968s158.520363 354.064968 354.064968 354.064968 354.065991-158.520363 354.065991-354.064968S708.231755 153.054885 512.688173 153.054885zM365.629863 317.382511c18.653849 19.986193 38.904055 42.905182 60.758806 68.753897-15.189957 11.192923-30.379914 22.784936-45.568848 34.776038-17.588587-23.715121-36.109406-47.698349-55.562457-71.951729L365.629863 317.382511zM366.430088 707.118909l-28.780487-39.173185c7.194866-6.928806 10.79281-18.11866 10.79281-33.577746l0-133.509736-33.976836 0 0-51.964512 87.540775 0 0 161.090908c12.258185-9.859555 22.914896-19.587104 31.978319-29.1806 0.26606 20.520359 1.998517 41.705867 5.196349 63.556525C408.530952 667.545612 384.283712 688.461991 366.430088 707.118909zM701.402209 645.559878l-105.528452 0 0 65.556065-55.962569 0 0-65.556065-96.734158 0 0-44.769646 96.734158 0 0-28.780487-87.940888 0 0-44.769646 87.940888 0 0-26.381857 55.962569 0 0 26.381857 96.734158 0 0 44.769646-96.734158 0 0 28.780487 105.528452 0L701.402209 645.559878zM689.411107 511.25094c-53.963029-7.460925-96.069009-18.11866-126.314871-31.978319-34.246989 15.589047-72.350818 26.916023-114.322745 33.976836-6.395664-15.189957-15.059997-30.909987-25.982768-47.168276 31.978319-4.52813 61.024865-11.192923 87.140663-19.986193-17.322527-13.990642-34.110889-31.3101-50.366108-51.964512l30.978549-16.788361-44.969191 0 0-44.369533 247.832482 0 0 43.570331c-20.786419 26.916023-44.969191 50.100048-72.550363 69.553099 26.511817 7.995091 56.428174 13.060457 89.738837 15.189957C702.068382 480.471936 695.006546 497.130338 689.411107 511.25094z" p-id="1842" fill="#bfbfbf">
                </path>
            </svg>
            </div>
        </div>
        <div class="xl_ab_itemContainer xl_ab_itemContainer_3">
            <p class="xl_ab_item_title">Solution:</p>
            <textarea class="xl_ab_query" placeholder="输入...""></textarea>
            <textarea class="xl_ab_result" placeholder="结果...""></textarea>
            <div class=" xl_ab_translate xl_ab_translate_3" onselectstart="return false;">
            <svg t="1652116407366" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1840" width="40" height="40">
                <path d="M510.532067 377.342114c17.318434 17.856693 35.576263 32.577976 54.763255 44.169989 22.11467-12.391215 41.102117-27.112498 56.961316-44.169989L510.532067 377.342114z" p-id="1841" fill="#bfbfbf"></path><path d="M512.688173 153.054885c-195.544605 0-354.064968 158.520363-354.064968 354.064968s158.520363 354.064968 354.064968 354.064968 354.065991-158.520363 354.065991-354.064968S708.231755 153.054885 512.688173 153.054885zM365.629863 317.382511c18.653849 19.986193 38.904055 42.905182 60.758806 68.753897-15.189957 11.192923-30.379914 22.784936-45.568848 34.776038-17.588587-23.715121-36.109406-47.698349-55.562457-71.951729L365.629863 317.382511zM366.430088 707.118909l-28.780487-39.173185c7.194866-6.928806 10.79281-18.11866 10.79281-33.577746l0-133.509736-33.976836 0 0-51.964512 87.540775 0 0 161.090908c12.258185-9.859555 22.914896-19.587104 31.978319-29.1806 0.26606 20.520359 1.998517 41.705867 5.196349 63.556525C408.530952 667.545612 384.283712 688.461991 366.430088 707.118909zM701.402209 645.559878l-105.528452 0 0 65.556065-55.962569 0 0-65.556065-96.734158 0 0-44.769646 96.734158 0 0-28.780487-87.940888 0 0-44.769646 87.940888 0 0-26.381857 55.962569 0 0 26.381857 96.734158 0 0 44.769646-96.734158 0 0 28.780487 105.528452 0L701.402209 645.559878zM689.411107 511.25094c-53.963029-7.460925-96.069009-18.11866-126.314871-31.978319-34.246989 15.589047-72.350818 26.916023-114.322745 33.976836-6.395664-15.189957-15.059997-30.909987-25.982768-47.168276 31.978319-4.52813 61.024865-11.192923 87.140663-19.986193-17.322527-13.990642-34.110889-31.3101-50.366108-51.964512l30.978549-16.788361-44.969191 0 0-44.369533 247.832482 0 0 43.570331c-20.786419 26.916023-44.969191 50.100048-72.550363 69.553099 26.511817 7.995091 56.428174 13.060457 89.738837 15.189957C702.068382 480.471936 695.006546 497.130338 689.411107 511.25094z" p-id="1842" fill="#bfbfbf">
                </path>
            </svg>
            </div>
        </div>
        <div class="xl_ab_itemContainer xl_ab_itemContainer_4">
            <p class="xl_ab_item_title">Test Suggestion:</p>
            <textarea class="xl_ab_query" placeholder="输入...""></textarea>
            <textarea class="xl_ab_result" placeholder="结果...""></textarea>
            <div class=" xl_ab_translate xl_ab_translate_4" onselectstart="return false;">
            <svg t="1652116407366" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1840" width="40" height="40">
                <path d="M510.532067 377.342114c17.318434 17.856693 35.576263 32.577976 54.763255 44.169989 22.11467-12.391215 41.102117-27.112498 56.961316-44.169989L510.532067 377.342114z" p-id="1841" fill="#bfbfbf"></path><path d="M512.688173 153.054885c-195.544605 0-354.064968 158.520363-354.064968 354.064968s158.520363 354.064968 354.064968 354.064968 354.065991-158.520363 354.065991-354.064968S708.231755 153.054885 512.688173 153.054885zM365.629863 317.382511c18.653849 19.986193 38.904055 42.905182 60.758806 68.753897-15.189957 11.192923-30.379914 22.784936-45.568848 34.776038-17.588587-23.715121-36.109406-47.698349-55.562457-71.951729L365.629863 317.382511zM366.430088 707.118909l-28.780487-39.173185c7.194866-6.928806 10.79281-18.11866 10.79281-33.577746l0-133.509736-33.976836 0 0-51.964512 87.540775 0 0 161.090908c12.258185-9.859555 22.914896-19.587104 31.978319-29.1806 0.26606 20.520359 1.998517 41.705867 5.196349 63.556525C408.530952 667.545612 384.283712 688.461991 366.430088 707.118909zM701.402209 645.559878l-105.528452 0 0 65.556065-55.962569 0 0-65.556065-96.734158 0 0-44.769646 96.734158 0 0-28.780487-87.940888 0 0-44.769646 87.940888 0 0-26.381857 55.962569 0 0 26.381857 96.734158 0 0 44.769646-96.734158 0 0 28.780487 105.528452 0L701.402209 645.559878zM689.411107 511.25094c-53.963029-7.460925-96.069009-18.11866-126.314871-31.978319-34.246989 15.589047-72.350818 26.916023-114.322745 33.976836-6.395664-15.189957-15.059997-30.909987-25.982768-47.168276 31.978319-4.52813 61.024865-11.192923 87.140663-19.986193-17.322527-13.990642-34.110889-31.3101-50.366108-51.964512l30.978549-16.788361-44.969191 0 0-44.369533 247.832482 0 0 43.570331c-20.786419 26.916023-44.969191 50.100048-72.550363 69.553099 26.511817 7.995091 56.428174 13.060457 89.738837 15.189957C702.068382 480.471936 695.006546 497.130338 689.411107 511.25094z" p-id="1842" fill="#bfbfbf">
                </path>
            </svg>
            </div>
        </div>
        <div class="xl_result_container xl_ab_itemContainer">
            <textarea class="xl_result_textarea" placeholder="结果...""></textarea>
            <div class="xl_ab_translate_5" onselectstart="return false;">
            <svg t="1652258975242" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1941" width="32" height="32"><path d="M704 202.666667a96 96 0 0 1 96 96v554.666666a96 96 0 0 1-96 96H213.333333A96 96 0 0 1 117.333333 853.333333V298.666667A96 96 0 0 1 213.333333 202.666667h490.666667z m0 64H213.333333A32 32 0 0 0 181.333333 298.666667v554.666666a32 32 0 0 0 32 32h490.666667a32 32 0 0 0 32-32V298.666667a32 32 0 0 0-32-32z" fill="#bfbfbf" p-id="1942"></path><path d="M277.333333 362.666667m32 0l298.666667 0q32 0 32 32l0 0q0 32-32 32l-298.666667 0q-32 0-32-32l0 0q0-32 32-32Z" fill="#bfbfbf" p-id="1943"></path><path d="M277.333333 512m32 0l298.666667 0q32 0 32 32l0 0q0 32-32 32l-298.666667 0q-32 0-32-32l0 0q0-32 32-32Z" fill="#bfbfbf" p-id="1944"></path><path d="M277.333333 661.333333m32 0l170.666667 0q32 0 32 32l0 0q0 32-32 32l-170.666667 0q-32 0-32-32l0 0q0-32 32-32Z" fill="#bfbfbf" p-id="1945"></path><path d="M320 138.666667h512A32 32 0 0 1 864 170.666667v576a32 32 0 0 0 64 0V170.666667A96 96 0 0 0 832 74.666667H320a32 32 0 0 0 0 64z" fill="#bfbfbf" p-id="1946"></path></svg>
        </div>
        </div>
    </div>
    `);

    window.inputtime = 0;

    function initData() {
        let url = window.location.href;
        console.log('url: ' + url);
        let res = url.indexOf('https://aone.alibaba-inc.com/v2');
        //新版Aone
        if (res == 0) {
            let bugIdTitle = $('.xl_ab_itemContainer_1 p').text();
            if (bugIdTitle.length <= 'BugID:'.length) { //说明翻译页面未打开过，需要再设置默认值
                let title = $('.workItemTitle--workitemTextInput--2V6YDlV').val();
                console.log('title: ' + title);
                if (title && title.length > 0) {
                    $('.xl_ab_itemContainer_1 .xl_ab_query').val(title);
                    translateText(title, (resultText) => {
                        $('.xl_ab_itemContainer_1').find('.xl_ab_result').val(resultText);
                        updateResult();
                    });
                }
                let budId = $($('.AttributeFormat--displayText--1Banb6j')[0]).text();
                if (budId && budId.length > 0) {
                    $('.xl_ab_itemContainer_1 p').text('BugID:' + budId);
                }
                $('.xl_ab_itemContainer_4').find('textarea').val('Test at latest version.');
            }
        } else { //旧版Anoe
            let bugIdTitle = $('.xl_ab_itemContainer_1 p').text();
            console.log('bugIdTitle: ' + bugIdTitle);
            if (bugIdTitle.length <= 'BugID:'.length) { //说明翻译页面未打开过，需要再设置默认值
                let title = $('.detail-content .next-card-title div span').text();
                console.log('title: ' + title);
                if (title && title.length > 0) {
                    $('.xl_ab_itemContainer_1 .xl_ab_query').val(title);
                    translateText(title, (resultText) => {
                        $('.xl_ab_itemContainer_1').find('.xl_ab_result').val(resultText);
                        updateResult();
                    });
                }
                let budId = $('.detail-basic-id').text();
                if (budId && budId.length > 0) {
                    $('.xl_ab_itemContainer_1 p').text('BugID:' + budId);
                }
                $('.xl_ab_itemContainer_4').find('textarea').val('Test at latest version.');
            }
        }
    }

    //判断是否隐藏翻译框
    function showHideTranslatePage() {
        console.log("执行showHideTranslatePage方法");
        let display = $(".xl_ab_bg").css("display");
        if (display == "none") {
            initData();
            $(".xl_ab_bg").css("display", "block");
        } else {
            $(".xl_ab_bg").css({ display: "none" });
        }
    }

    //点击背景隐藏翻译框
    $(".xl_ab_bg").mousedown(() => {
        showHideTranslatePage();
    });

    //防止事件传递
    $(".xl_ab_container").on("click", () => {
        event.stopPropagation();
    });
    $(".xl_ab_container").mousedown(() => {
        event.stopPropagation();
    });

    $(".xl_ab_translate").mousedown(function () { $(this).find("path").attr("fill", "#ff0000"); });
    $(".xl_ab_translate").mouseup(function () {
        $(this).find("path").attr("fill", "#bfbfbf");
        console.log("mgfjz");
        let query = $(this).parent().find('.xl_ab_query').val();
        console.log(query);
        translateText(query, (resultText) => {
            $(this).parent().find('.xl_ab_result').val(resultText);
            updateResult();
        });
    });

    $(".xl_ab_translate_5").mousedown(function () { $(this).find("path").attr("fill", "#ff0000"); });
    //复制翻译结果到剪切板
    $(".xl_ab_translate_5").mouseup(function () {
        $(this).find("path").attr("fill", "#bfbfbf");
        GM_setClipboard($('.xl_result_textarea').val());
    });
    //更新结果
    function updateResult() {
        let budId = $('.detail-basic-id').text();
        let title = 'BugID:' + budId + ': ' + $('.xl_ab_itemContainer_1 .xl_ab_result').val();
        let rootCause = "Root Cause: " + $('.xl_ab_itemContainer_2 .xl_ab_result').val();
        let solution = "Solution: " + $('.xl_ab_itemContainer_3 .xl_ab_result').val();
        let testSuggestion = "Test Suggestion: " + $('.xl_ab_itemContainer_4 .xl_ab_result').val();
        let result = `${title}\n\n${rootCause}\n${solution}\n${testSuggestion}`;

        $('.xl_ab_itemContainer .xl_result_textarea').val(result);
    }

    $(".xl_ab_query").on("input propertychange", function () {
        var $this = $(this);
        let input = $this.val();
        window.inputtime = (new Date()).valueOf();
        if (window.interval) {
            clearInterval(window.interval);
            window.interval = undefined;
        }
        window.interval = setInterval(() => {
            let curremttime = (new Date()).valueOf();
            if (curremttime - window.inputtime > 1000) {
                console.log("curremttime: " + curremttime + ', window.inputtime: ' + window.inputtime);
                clearInterval(window.interval);
                window.interval = undefined;
                translateText(input, (resultText) => {
                    $(this).parent().find('.xl_ab_result').val(resultText);
                    updateResult();
                });
            }
        }, 200);
    });

    //翻译文本
    function translateText(query, callback) {
        if (!query || query.length == 0) {
            console.log("翻译文本为空");
            return;
        }
        console.log('开始翻译：' + query);
        let appid = '20220505001203855';
        let salt = '1231231';
        let appsecret = 'kgLnrss5MVpucE8LOON1';
        let signBefore = appid + query + salt + appsecret;
        let sign = CryptoJS.MD5(signBefore).toString();
        let to = 'en';

        GM_xmlhttpRequest({
            method: "post",
            url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
            data: 'q=' + query + '&from=auto&to=' + to + '&appid=' + appid + '&salt=' + salt + '&sign=' + sign,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            onload: function (res) {
                if (res.status === 200) {
                    console.log('成功')
                    console.log(res.response);
                    let response = JSON.parse(res.response);
                    let trans_result = response["trans_result"];
                    if (!trans_result || trans_result.length == 0) {
                        console.log('result: ', firstItem);
                    } else {
                        let firstItem = trans_result[0];
                        callback(firstItem.dst);
                        console.log('result: ', firstItem);
                    }
                } else {
                    console.log('失败')
                    console.log(res)
                }
            },
            onerror: function (err) {
                console.log('error')
                console.log(err)
            }
        });
    }

    GM_addStyle(`
    .xl_ab_bg {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgb(0, 0, 0, 0.8);
        z-index: 10000;
        display: none;
      }
      
      .xl_ab_container {
        /* text-align: center; */
        /*让div内部文字居中*/
        background-color: #fff;
        border-radius: 20px;
        /* width: 800px; */
        /* height: 600px; */
        margin: 60px 200px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding: 0;  
        font-size: 14px;
      }
      
      .xl_ab_itemContainer {
        /* background-color: antiquewhite; */
        padding-left: 20px;
        /* padding-top: 15px; */
        /* border-radius: 8px; */
        position: relative;
      }
      
      .xl_ab_itemContainer p {
        margin: 8px 0;
      }
      
      .xl_ab_itemContainer textarea {
        width: calc(50% - 20px * 2);
        height: 45px;
        border-width: 0;
        /* font-size: 16px; */
        padding: 5px;
        resize: none;
        background-color: #e9e9e9;
        border-radius: 8px;
      }
      
      .xl_ab_container textarea {
        border-width: 1px;
        border-color:rgb(213, 211, 211);
      }
      
      .xl_ab_translate {
        position: absolute;
        right: 10px;
        bottom: 10px;
        cursor: pointer;
      }
      
      .xl_result_container {
        padding-top: 30px;
        position: relative;
      }
      
      .xl_result_container textarea {
        width: calc(100% - 33px * 2);
        height: 150px;
      }
      
      .xl_ab_translate_5 {
        bottom: 60px;
        right: 15px;
        position: absolute;
        cursor: pointer;
      }
              
      `);
})();
