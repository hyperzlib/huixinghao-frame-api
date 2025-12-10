# 彗星号创意工坊 Frame API

用于彗星号创意工坊插件开发的 Frame API。

## 开始

### 通过包管理器安装

使用 npm, yarn 或 pnpm 安装：

```bash
npm install @hyperzlib/huixinghao-frame-api --save
yarn add @hyperzlib/huixinghao-frame-api
pnpm add @hyperzlib/huixinghao-frame-api
```

在项目中引入：

```typescript
import { HxhFrameAPI } from '@hyperzlib/huixinghao-frame-api';

const api = new HxhFrameAPI();
```

### 通过 CDN 引入

在 HTML 文件中通过 `<script>` 标签引入：

```html
<script src="https://cdn.jsdelivr.net/npm/@hyperzlib/huixinghao-frame-api/dist/huixinghao-frame-api.umd.min.js"></script>
```

然后可以通过全局变量 `HxhFrameApi.HxhFrameApi` 访问 API：

```javascript
const api = new HxhFrameApi.HxhFrameApi();
```

## 基础用法

### 获取插件配置和彗星号用户信息

```typescript
import { HxhFrameAPI } from '@hyperzlib/huixinghao-frame-api'
const api = new HxhFrameAPI()

api.on('update.option', () => {
    console.log('插件配置已更新:', api.widgetConfig);
})

api.on('update.user', () => {
    console.log('当前用户信息已更新:', api.currentUserInfo);
})
```

### 监听弹幕

```typescript
import { HxhFrameAPI } from '@hyperzlib/huixinghao-frame-api'
const api = new HxhFrameAPI()

api.on('event.LIVE_OPEN_PLATFORM_DM', (data) => {
    let danmakuData = data[0]
    console.log('收到弹幕:', danmakuData);
})

api.on('event.LIVE_OPEN_PLATFORM_SEND_GIFT', (data) => {
    let giftData = data[0]
    console.log('收到礼物:', giftData);
})

api.on('event.LIVE_OPEN_PLATFORM_GUARD', (data) => {
    let userData = data[0]
    console.log('收到舰长:', userData);
})

api.on('event.LIVE_OPEN_PLATFORM_SUPER_CHAT', (data) => {
    let followData = data[0]
    console.log('收到SC:', followData);
})
```


## 常见问题

### Q: 如何使用彗星号创意工坊的字体配置？

A: 可以通过以下方法使用字体配置：

先在 HTML 中引入字体样式：

```html
<link href="https://static.huixinghao.cn/stylesheets/fonts.css" rel="stylesheet"/>
```

监听配置更新事件，获取字体样式：

```typescript
api.on('update.option', () => {
    const fontFamily = api.widgetConfig.fontFamily;
    // 应用字体样式，你可以将其设置到你的组件或页面中，例如：
    document.body.style.fontFamily = fontFamily;
    // 或使用 CSS 变量
    document.documentElement.style.setProperty('--hxh-font-family', fontFamily);
});
```

### Q: 时间戳的格式是什么？

A: 所有时间戳都是秒级 Unix 时间戳。可以通过 `new Date(timestamp * 1000)` 转换为 JavaScript Date 对象。

### Q: 如何在生产环境中卸载组件？

A: 一定要调用 `api.destroy()` 来移除事件监听器，防止内存泄漏。

### Q: 如何处理来自不同平台的数据？

A: 每个事件都包含 `platform` 字段，可以用来区分不同直播平台（如 bili、dou_yin 等）。

## 插件配置定义

详见 [插件配置定义](./docs/options-def.md)

## API 文档

详见 [API 文档](./docs/API.md)
