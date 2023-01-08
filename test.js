
function randomDate() {
  // 随机生成0-11的数字
  const randomMonthNum = Math.floor(Math.random() * 11) + 1;
  // 随机生成1-30数字
  const randomDateNum = Math.ceil(Math.random() * 30);
  // 随机生成1-24 数字
  const randomHourNum = Math.ceil(Math.random() * 23);
  // 随机生成1-60 数字
  const randomMinuteNum = Math.ceil(Math.random() * 59);
  const randomSecondNum = Math.ceil(Math.random() * 50);

  var timeDate = `${2022}-${randomMonthNum}-${randomDateNum} ${randomHourNum}:${randomMinuteNum}:${randomSecondNum}`;
  // console.log("timeDate: " + timeDate);
  var Time = new Date(timeDate);
  var timestemp = Time.getTime();
  // console.log(timestemp);
  return timestemp;
}

function fakeData() {
  let bugId = 0;
  while (true) {
    bugId = Math.floor(Math.random() * 100000000);
    if (bugId > 10000000) {
      break
    }
  }
  let addTime = randomDate();
  let obj = {};
  obj.bugId = bugId;
  obj.addTime = addTime;
  obj.butTitle = "【TV-993】【多媒体】A2或者B屏幕上滑动选择FM台时，每次手放掉会先显示上个电台再回到选中电台【董晨晨】";
  obj.resolver = "谢小龙";
  obj.reopen = Math.floor(Math.random() * 1000) % 2 == 0;
  obj.relReopen = Math.floor(Math.random() * 1000) % 2 == 0;
  obj.flowed = Math.floor(Math.random() * 1000) % 2 == 0;
  // console.log("obj: " + JSON.stringify(obj));
  return obj;
}

fakeData();

// const fs = require('fs')
// console.log(fs);
// let array = [];
// for (let i = 0; i < 300; i++) {
//   let obj = fakeData();
//   array.push(obj);
// }
// // console.log(JSON.stringify(array));
// fs.writeFile('D:\MonkeyScript\localBugList.json', JSON.stringify(array), err => {
//   if (err) {
//     console.error(err)
//     return
//   } else {
//     console.log("写入成功");
//   }
//   //文件写入成功。
// })

