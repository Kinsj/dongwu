//  var sId = "dae21e619b67f958c716d3c779c941d2";
//  show = document.createElement("script");
//  show.src = "//analysis.51job.com/show.js?" + sId;
//  var headElement = document.getElementsByTagName("head")[0];
//  headElement.appendChild(show);

function getShareLink() {
  return window.location.href.split("#")[0];
}

function getBasePath() {
  var shareLink = getShareLink().split("?")[0];
  return shareLink.substring(0, shareLink.lastIndexOf("/") + 1);
}

if (
  typeof WechatShare === "function" &&
  typeof window !== "undefined" &&
  window.location.protocol !== "file:"
) {
  new WechatShare({
    link: getShareLink(), // 微信分享链接
    imgUrl: getBasePath() + "images/share.jpg", // 微信分享图
    title: "东吴证券2026春季校园招聘", // 微信分享标题
    desc: "共享共赢，敢创未来", // 微信分享描述
  });
}

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
