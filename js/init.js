//  var sId = "dae21e619b67f958c716d3c779c941d2";
//  show = document.createElement("script");
//  show.src = "//analysis.51job.com/show.js?" + sId;
//  var headElement = document.getElementsByTagName("head")[0];
//  headElement.appendChild(show);

const url = 'https://xyzp.51job.com/tcrcb2026/';

new WechatShare({
  link: url, //微信分享链接
  imgUrl: url + 'images/share.jpg', //微信分享logo
  title: '太仓农商银行2026校园招聘', //微信分享标题
  desc: '青春百太，逐梦仓穹', //微信分享描述
});

function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod',
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
// if(IsPC() == false) location.href = './mobile/index.html';
