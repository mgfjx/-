function myFunction(url) {
  // let url = window.location.href;
  let reg = new RegExp("https://aone.alibaba-inc.com/project/\\d+/issue\\?");
  if (url.match(reg)) {
    console.log("matched");
  } else {
    console.log("not matched");
  }
}
let url = "https://aone.alibaba-inc.com/project/1150276/issue?spm=a2o8d.corp_prod_issue_list.0.0.531c1298zTkdsX#filter/pageSize=60&__versionId=2025162&assignedToId=49839476&toPage=1";
myFunction(url);
