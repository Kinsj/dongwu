(function (global) {
  "strict mode";
  const BASEURL =
    "https://cmsapi.51job.com/cms/sysApi/weChat/getWeChatParamByUrl";
  function WechatShare(config) {
    this.shareConfig = config;
    this.setupConfig = {};
    this.init();
  }

  WechatShare.prototype.init = function () {
    this.request({
      params: {
        url: this.shareConfig.link,
      },
      success: (response) => {
        if (response.resultCode === "000000") {
          this.setupConfig = response.data;
          this.setup();
        } else {
          console.log("response", response);
        }
      },
      error(error) {
        console.log("error", error);
      },
    });
  };
  WechatShare.prototype.request = function (requestConfig) {
    const xhr = new XMLHttpRequest();
    xhr.open(requestConfig.method || "post", requestConfig.url || BASEURL);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function (event) {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const response = JSON.parse(event.target.response);
        requestConfig.success && requestConfig.success(response);
      }
    };
    xhr.onerror = function (event) {
      requestConfig.error && requestConfig.error(event.target);
    };
    xhr.send(JSON.stringify(requestConfig.params && requestConfig.params));
  };
  WechatShare.prototype.setup = function () {
    const config = this.setupConfig;
    const wxShare = this.shareConfig;
    wx.config({
      debug: wxShare.debug || false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: config.appId, // 必填，公众号的唯一标识
      timestamp: config.timestamp, // 必填，生成签名的时间戳
      nonceStr: config.nonceStr, // 必填，生成签名的随机串
      signature: config.signature, // 必填，签名
      jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline"], // 必填，需要使用的JS接口列表
    });

    // 设置微信分享
    wx.ready(() => {
      //分享到朋友
      wx.onMenuShareAppMessage({
        title: wxShare.title, // 分享标题
        desc: wxShare.desc, // 分享描述
        link: wxShare.link, // 分享链接
        imgUrl: wxShare.imgUrl, // 分享图标
        type: "link", // 分享类型,music、video或link，不填默认为link
        success: function () {
          // 分享成功
        },
        cancel: function () {
          // 分享取消
        },
        fail: function () {
          // 分享失败
        },
      });

      wx.onMenuShareTimeline({
        title: wxShare.title, // 分享标题
        desc: wxShare.desc, // 分享描述
        link: wxShare.link, // 分享链接
        imgUrl: wxShare.imgUrl, // 分享图标
        success: function () {
          // 分享成功
        },
        cancel: function () {
          // 分享取消
        },
        fail: function () {
          // 分享失败
        },
      });
    });
  };

  global.WechatShare = WechatShare;
})(this);
