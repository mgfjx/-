// ==UserScript==
// @name         百度首页美化脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  百度首页美化脚本
// @author       You
// @include      https://www.baidu.com/
// @match
// @require      http://code.jquery.com/jquery-1.11.0.min.js
// @grant        GM_addStyle
// @grant        GM_getResourceURL
// @resource     Icon data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAA6pJREFUaEPtmU2IHFUUhc95ZRSyEVSEIEoEu97tHrMyGGHEv1V04cqV+LfRhUSRCMGAIRFDUEQhiLjQhZCAILgSBReCYhCDIKjQ9V6NGkKixMUgSEgg6aorHZxmmMyk6/101DC16UXdc+75+la/V1VNXCEHrxAOrIP81ya5PpGVE1Eve3NMida9EuOTbSLq5aQCN8WEWNKQuoel3x/jkQVEh/1NWujvMQEmGsXIiNsQ65EHpO6/rKqvxoYY62j4EnvV67EeWUBaJ8dB3BIbAsBZY93GBH36PqKVbFaDY4khXqR1byV6pMgB9bJbgQMJLn8Z665N0F+QJl9arZdfAdwaG4TE8yzd27H6yYqXYqC/SKkj+ASPRWPdDQn6iTRpIo2zu0hGrzSq+mwh/t1/HaStpYaiFxVEccqI2xSlXUUUPRGtZIsa/BgbpAWfvspW78fqV+riQZJWKz1hrE/Zdy7ijwZpvVQAJOYbJfDUqMXxrtoNfffltNooEHV2q5LfTTNPPU/ie5buji4+USCNl30Esty2rxlSscjGbObc8PTMQLSWn1Rxe5cGsTVkM2C5ML58Ox3BE1Fn55U80sk9sogG29lzn4fIw0G8HFBgd0iTkFoCz9C690I049pgkNbLeO/YEtqoSz3J/SyrPV1qk/aR884+UJBfxDSaplHVQ4X4J6bVrXU+aCLq5U0FdsY2u8QK9ZURd1+KbxBI62V8p1umNFxFe4wbT8/x5pNnU3w7g+jPdnt7nnctNTMG2rbg+PNSARTYt+Z5ouGIfQ6qhRSIqB97SMPGywcEnlzzuja4n73ptx9denaeSBez5TVayfVq8BuAa1bTUvVxij8c6pvlxx7StPGyg8Cqj7Djfaiw7rUQv2m1s5uIlyMKzK8MoMA7hXU7pgULPT8TEK0H21Tbby8KQ3xiSvdwaMgu9TMBaZwcHL8dWRHgB47MnZwbnusSLLQmO4gqqLWcAnDjJAzxJ9FsZbkwfnU0kyM7yMjZxwx5aHlawtxDO/x6JgT/mGYHUW8/VfChpdAkHmXpPpwlRPYNUYf9nhZaL4VW1V2F+DdmDZEdZPkjMMmDLKsXLgdEdpDJCzvFx0bcI5cLIiuI+vJBhfkMwFGWbp5E878EaWo5TMW9bHg3B1Xnd1a5YLOsWnpi7jo90yyywDxvc9/kChfikweklufQ6h8U/1FI85y1WUAaLzuLxL/OUqGSQc7Vg21Xl8OjqUFS9ckgqQFy6ddBcn2TuXz+BklqIEKNDpyWAAAAAElFTkSuQmCC
// @resource     paper ./wallpaper.jpeg

// ==/UserScript==

(function () {
  "use strict";

  //百度首页
  if (window.location.host == "www.baidu.com") {
    console.log("百度油猴...");

    document.onkeydown = function (event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      console.log("keyCode: " + e.keyCode);
      if (e && e.keyCode == 91) {
        showNavPanel();
      }
    };

    // $("body").append('<div class="xldiv"><img src="' + GM_getResourceURL("Icon") +'"></div>');
    $("body").append('<div class="xl_ts_container" ></div>');
    // $(".xl_ts_container").css({
    //   height: "20px",
    //   width: "20px",
    //   position: "absolute",
    //   right: "20px",
    //   bottom: "20px",
    //   borderRadius: "10px",
    //   boxShadow: "0px 0px 30px #888888",
    //   padding: 5,
    // });

    GM_addStyle(`
      .xl_ts_container {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgb(0, 0, 0, 0.8);
        z-index: 10000;
      }

    `);
  }
})();
