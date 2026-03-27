# 51job 校园招聘静态页面模板

## 目录结构

```
public_template/
├── README.md
├── components/           # HTML 组件（可被 include/insert 的部分）
│   ├── head.html        # 公共 <head> 标签
│   ├── header.html      # 公共头部导航
│   └── footer.html      # 公共尾部版权
├── css/
│   ├── reset.min.css    # CSS 重置样式
│   └── style.css        # 公共样式（Header/Footer/Copyright）
├── js/
│   ├── adapter.min.js   # 适配器
│   └── init.js          # 初始化脚本 + 微信分享配置
└── wechat/
    ├── jweixin-1.0.0.js # 微信 JSSDK 低版本
    └── share.js          # 微信分享封装
```

## 使用方式

### 1. 新建页面模板

```html
<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <!-- 引入公共 head -->
    <!--#include virtual="./public_template/components/head.html" -->
</head>
<style>
</style>

<body ondragstart='return false'>
    <!-- 引入公共 header -->
    <!--#include virtual="./public_template/components/header.html" -->

    <section class="body">
        <!-- 页面内容 -->

        <!-- 引入公共 footer -->
        <!--#include virtual="./public_template/components/footer.html" -->
    </section>

    <!-- 页面级 JS -->
</body>

</html>
```

### 2. 公共样式说明

| 类名 | 说明 |
|------|------|
| `.header` | 顶部导航栏，高度 80px |
| `.h-box` | 导航容器，最大宽度 1440px |
| `.menu` | 导航菜单 |
| `.footer-left` / `.footer-right` | 装饰图片 |
| `.copyright` | 版权信息 |
| `.banner` | 横幅图片 |

### 3. 页面 Active 状态

在 `header.html` 对应菜单项添加 `class="active"`：

```html
<li class="active">
    <a href="about.html">公司介绍</a>
</li>
```

### 4. 微信分享配置

在 `js/init.js` 中修改：

```javascript
var shareLink = window.location.href.split('#')[0];
var shareImage = shareLink.substring(0, shareLink.lastIndexOf('/') + 1) + 'images/logo.png';

new WechatShare({
  link: shareLink,                               // 分享链接
  imgUrl: shareImage,                            // 分享图标
  title: document.title || '东吴证券2026校园招聘', // 分享标题
  desc: '东吴证券2026校园招聘，欢迎关注招聘公告、岗位信息与申请安排。', // 分享描述
});
```

### 5. 页面级额外资源引入

在 `</body>` 前添加：

```html
<!-- 51job 统计 -->
<script>
function accessStatistics(){
  const xhr = new XMLHttpRequest();
  const url = 'https://cmssys.51job.com/cms/pv/visit'
  xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      const data=JSON.parse(xhr.responseText)
    if (data.resultCode === "000000") {
     console.log(data.data);
    }else{
     console.log(data.errorMessage);
    }
    }
  }
  xhr.open('POST',url)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({"uuid": "f8f589ada2c74bc8a7cbd20154f82740"}));
}
accessStatistics();
</script>

<!-- 微信 JSSDK 高版本 + 适配器 -->
<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<script src="js/adapter.min.js"></script>
```

## 注意事项

1. ** SSI (Server Side Include)**: 使用 `<!--#include virtual="..." -->` 方式引入组件需服务器支持（如 Apache / Nginx ssi）
2. **亦可手动复制**: 将 `components/` 下的 HTML 片段手动粘贴到新页面中
3. **图片资源**: 需确保 `images/` 目录下有 `logo.png`、`banner.jpg`、`footer-left.png`、`footer-right.png` 等
4. **viewport**: 默认 `width=1440`，如需适配其他分辨率请修改 `head.html` 中的 viewport
