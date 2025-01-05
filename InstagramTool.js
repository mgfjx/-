// ==UserScript==
// @name         InstagramTool
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  InstagramTool
// @author       You
// @include      https://www.instagram.com/*
// @match
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle
// @grant        GM_download
// @grant        GM_getResourceURL
// @resource     Icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAV9JREFUWEftlz1OxDAQhd+ruAtwAajYOyBKKg7CQago9xK7NHACuAvVQxPZkWPs2HEMK62SKsraM9+8+bGXOPHDE/tHM4Ckg8GT3K0JYg2AHECzjWF/K72kDWBT4MwUkPQM4B7AVdAZx1yfl7rAzYm70BaAN5LmZ3zGNkxssEU9AczeJ8nrHMCQUwA7ksfSfCgpEO6XZEr4yTmZPaECi4pqCYDB5NZvAEUFXHFeAHgi+eVzm5JU0iWAFwDfcfc0p0DSO4Abq2AADx4iNuic710bf5C8jQoxWWM1ClhU3vAIEQJEziegc4pNjuO5qk45cIqYDRtcvwDjNm5OQRBBrISfmBaxvScj76JABiIMctZ51zkQpWMYr2Fx5ibo6hREFW3peHXfHsP2/BeA0jmR+r2rAucNUHscL1Gh9ji28zq8wSzxUbt29kKSupLVGq5ZZ5ec/JWsxsJfrGn+a9YL5gehXCkwEsVaCAAAAABJRU5ErkJggg==
// @resource     IconSelected data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAWpJREFUWEftVzFuwzAMvHjpSwgDbT+QTskfio6Z+pA8pFPHfKLu0rygBQy+pItTMJACWpUsWVYSILCnwKHI45E8ygtc+VlcOT6yATDzh4AnovWUJKYAOBgA2T7kfPZhZp4BzAzcGANt226rqnoG8KDmugnNeWwKjE6stK+u6z7rut5q3TiNoeeA2JUEIP6+iegxBOBYUwBrImpi6hZjQJ9nZmHCKmdPezQDo5pqDAABE7KfAUQZMM15B+CViH5sbX2UMvM9gDcAv+70ZJeAmb8ALKWDAbxYEK5DE3xnxnhPRE9OI3p7LIUByco6PoHQAJzgPaBDjPXW8VBX+wIYRsSHCNc/gO4YZ5dAZeAyYRVTMpbf3syLMBAAoZMcDF5UB5xyHOVVN2dIQSeXwOloKce7ebfR43kRALE94fu/KAO3DSB1HY9hIXUdy77WN5gxMVJtwxeSwJUs1XGKXTN4JUvxcA6b7E+zUmD+AEGaLzAChhEZAAAAAElFTkSuQmCC

// ==/UserScript==

(function () {
  "use strict";
  console.log("Instagram油猴...");

  //在当期视图上添加一个下载按钮
  function addDownloadBtn(img) {
    let parent = $(img).parent().parent();
    //如果已经存在则不需要再添加了
    if ($(parent).find(".xl_download").length > 0) {
      return;
    }
    console.log($(img).parent());
    $(parent).append(
      '<img class="xl_download" src="' + GM_getResourceURL("Icon") + '" />'
    );
    $(".xl_download").css({
      height: "30px",
      width: "30px",
      position: "absolute",
      top: "5px",
      right: "5px",
    });

    //悬停事件
    $(".xl_download").hover(
      function () {
        $(".xl_download").attr('src', GM_getResourceURL("IconSelected"));
      },
      function () {
        $(".xl_download").attr('src', GM_getResourceURL("Icon"));
      }
    );

    $(".xl_download")
      .unbind("click")
      .click(function () {
        let src = $(img).attr("srcset");
        let url;
        if (src != undefined) {
          let arr = src.split(",");
          let index = 0;
          let preSize = 0;
          for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            let size = element.split(" ")[1].replace("w", "");
            console.log(`size: ${size}, src: ${element.split(" ")[0]}`);
            if (Number(size) > preSize) {
              preSize = Number(size);
              index = i;
            }
          }
          console.log(`index: ${index}`);
          url = arr[index].split(" ")[0];
        } else {
          url = $(img).attr("src");
        }
        console.log(url);
        // window.open(url);
       download(url);
      });
  }

  function download(link) {
    let picName = Date.now() + '.jpg';

    //使用油猴api下载资源
    GM_download(link, picName);

    //使用Image加载url后再保持图片图片数据，慢
    /*
    let img = new Image();
    img.setAttribute("crossOrigin", "Anonymous");
    img.onload = function () {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);
      let url = canvas.toDataURL("images/png");
      let a = document.createElement("a");
      let event = new MouseEvent("click");
      a.download = picName || "default.png";
      a.href = url;
      a.dispatchEvent(event);
    };
    img.src = link + "?v=" + Date.now();
    */
  }

  window.onmouseover = function (e) {
    let className = e.target.className;
    if (className != undefined || className == "_9AhH0") {
      let parent = $(e.target).parent();
      let img = $(parent).find("img")[0];
      if (img.className == undefined || img.className != "FFVAD") {
        return;
      }
      // console.log("命中" + img);
      if (img != undefined) {
        addDownloadBtn(img);
      }
    }
  };

  GM_addStyle(`
      #head_wrapper .s_btn {
        background-color: rgba(0,0,0,1) !important;
      }

    `);
})();
