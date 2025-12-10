# Huixinghao Frame API 文档

完整的彗星号 Frame API 接口文档。

## 目录

- [核心类](#核心类)
- [事件系统](#事件系统)
- [类型定义](#类型定义)
- [事件数据结构](#事件数据结构)
- [示例](#示例)

## 核心类

### HxhFrameApi

主要 API 类，用于与彗星号 iframe 容器通信。

#### 构造函数

```typescript
constructor(currentWindow: Window = window)
```

**参数：**
- `currentWindow` (可选): 当前窗口对象，默认为 `window`。一般无需传入，除非在插件中嵌套了 iframe，并希望在子 iframe 中使用 API。

**示例：**
```typescript
import { HxhFrameApi } from '@hyperzlib/huixinghao-frame-api';

// 使用默认窗口
const api = new HxhFrameApi();

// 或指定窗口
const api = new HxhFrameApi(window);
```

#### 属性

##### 公开属性

- **`currentUserInfo?: HxhPlatformUserInfo`** - 当前用户信息，从父窗口接收到的平台用户信息集合
- **`currentUserInfoLoaded: boolean`** - 用户信息是否已加载
- **`widgetConfig: HxhWidgetConfig`** - 插件配置对象
- **`widgetConfigLoaded: boolean`** - 插件配置是否已加载

#### 方法

##### `init(): void`

初始化 API，设置消息监听器。在构造函数中自动调用。

```typescript
const api = new HxhFrameApi();
// init() 已在构造函数中调用
```

##### `destroy(): void`

销毁 API 实例，移除所有事件监听器。在卸载组件时调用。

```typescript
const api = new HxhFrameApi();
// ... 使用 api
api.destroy(); // 清理资源
```

##### `on<T extends EventNames>(event: T, fn: EventListener, context?): this`

订阅事件。

**参数：**
- `event` (string): 事件名称
- `fn` (function): 回调函数
- `context` (可选): 回调函数的 this 上下文

**返回值：** `this`，支持链式调用

**示例：**
```typescript
api.on('event.LIVE_OPEN_PLATFORM_DM', ([danmaku]) => {
    console.log('用户:', danmaku.uname);
    console.log('内容:', danmaku.message);
});

// 链式调用
api
    .on('event.LIVE_OPEN_PLATFORM_DM', onDanmaku)
    .on('event.LIVE_OPEN_PLATFORM_SEND_GIFT', onGift)
    .on('event.LIVE_OPEN_PLATFORM_SUPER_CHAT', onSuperChat);
```

##### `off<T extends EventNames>(event: T, fn?: EventListener, context?, once?): this`

取消订阅事件。

**参数：**
- `event` (string): 事件名称
- `fn` (可选): 回调函数，不提供则移除该事件的所有监听
- `context` (可选): 回调函数的 this 上下文
- `once` (可选): 是否仅移除一次性监听

**返回值：** `this`，支持链式调用

**示例：**
```typescript
const handleDanmaku = (data) => console.log(data);

// 添加监听
api.on('event.LIVE_OPEN_PLATFORM_DM', handleDanmaku);

// 移除特定监听
api.off('event.LIVE_OPEN_PLATFORM_DM', handleDanmaku);

// 移除该事件的所有监听
api.off('event.LIVE_OPEN_PLATFORM_DM');
```

##### `setWidgetPosition(x: number, y: number, width: number, height: number): void`

设置组件的位置和大小。

**参数：**
- `x` (number): X 坐标
- `y` (number): Y 坐标
- `width` (number): 宽度
- `height` (number): 高度

**示例：**
```typescript
// 设置组件位置为 (100, 200)，大小为 800x600
api.setWidgetPosition(100, 200, 800, 600);
```

##### `setWidgetConfig(config: any): void`

更新组件配置。

**参数：**
- `config` (object): 配置对象

**示例：**
```typescript
api.setWidgetConfig({
    fontStyle: 'Arial',
    customConfig: {
        fontSize: 14,
        color: '#ffffff'
    }
});
```

##### `subscribeEvent(...eventNames: string[]): void`

订阅特定事件。不建议直接调用，通常通过 `on()` 方法自动订阅。

仅用于从彗星号订阅，确保事件能被正确接收。当使用 `on()` 方法时会自动调用。

**参数：**
- `eventNames` (string[]): 事件名称列表

**示例：**
```typescript
api.subscribeEvent('LIVE_OPEN_PLATFORM_DM', 'LIVE_OPEN_PLATFORM_SEND_GIFT');
```

## 事件系统

### 更新事件

#### `update`

原始更新事件，会在任何更新时触发。

```typescript
api.on('update', (type: string, data: any) => {
    console.log('更新类型:', type);
    console.log('更新数据:', data);
});
```

#### `update.user`

用户信息更新事件。

```typescript
api.on('update.user', (data: [HxhPlatformUserInfo]) => {
    const userInfo = data[0];
    console.log('用户信息已更新:', userInfo);
    // 可访问 api.currentUserInfo
});
```

#### `update.option`

插件配置更新事件。

```typescript
api.on('update.option', (data: [HxhWidgetConfig]) => {
    const config = data[0];
    console.log('配置已更新:', config);
    // 可访问 api.widgetConfig
});
```

### 直播间事件

#### `event`

原始直播间事件，会在任何直播间事件时触发。

```typescript
api.on('event', (type: string, data: any) => {
    console.log('事件类型:', type);
    console.log('事件数据:', data);
});
```

#### `event.LIVE_OPEN_PLATFORM_DM`

弹幕事件。

```typescript
api.on('event.LIVE_OPEN_PLATFORM_DM', (data: [PlatformDanmakuEvent]) => {
    const danmaku = data[0];
    console.log('用户:', danmaku.uname);
    console.log('内容:', danmaku.message);
    console.log('是否房管:', danmaku.isModerator);
    console.log('粉丝牌等级:', danmaku.fansMedalLevel);
});
```

#### `event.LIVE_OPEN_PLATFORM_SEND_GIFT`

礼物事件。

```typescript
api.on('event.LIVE_OPEN_PLATFORM_SEND_GIFT', (data: [PlatformSendGiftEvent]) => {
    const gift = data[0];
    console.log('用户:', gift.uname);
    console.log('礼物:', gift.giftName);
    console.log('数量:', gift.giftNum);
    console.log('价值:', gift.price);
});
```

#### `event.LIVE_OPEN_PLATFORM_GUARD`

大航海事件。

```typescript
api.on('event.LIVE_OPEN_PLATFORM_GUARD', (data: [PlatformGuardEvent]) => {
    const guard = data[0];
    console.log('用户:', guard.uname);
    console.log('大航海等级:', guard.guardLevel);
    console.log('数量:', guard.guardNum);
    console.log('单位:', guard.guardUnit);
});
```

#### `event.LIVE_OPEN_PLATFORM_SUPER_CHAT`

超级留言 (SC) 事件。

```typescript
api.on('event.LIVE_OPEN_PLATFORM_SUPER_CHAT', (data: [PlatformSuperChatEvent]) => {
    const sc = data[0];
    console.log('用户:', sc.uname);
    console.log('内容:', sc.message);
    console.log('金额:', sc.rmb);
    console.log('开始时间:', new Date(sc.startTime * 1000));
    console.log('结束时间:', new Date(sc.endTime * 1000));
});
```

#### `event.LIVE_OPEN_PLATFORM_SUPER_CHAT_DEL`

超级留言撤回事件。

```typescript
api.on('event.LIVE_OPEN_PLATFORM_SUPER_CHAT_DEL', (data: [PlatformSuperChatDelEvent]) => {
    const delEvent = data[0];
    console.log('被撤回的留言 ID 列表:', delEvent.messageIds);
});
```

#### `event.LIVE_OPEN_PLATFORM_LIKE`

点赞事件。

```typescript
api.on('event.LIVE_OPEN_PLATFORM_LIKE', (data: [PlatformLikeEvent]) => {
    const like = data[0];
    console.log('用户:', like.uname);
    console.log('文案:', like.likeText);
    console.log('点赞数:', like.likeCount);
});
```

#### `event.LIVE_OPEN_PLATFORM_LIVE_ROOM_ENTER`

进入直播间事件。

```typescript
api.on('event.LIVE_OPEN_PLATFORM_LIVE_ROOM_ENTER', (data: [PlatformLiveRoomEnterEvent]) => {
    const enter = data[0];
    console.log('用户:', enter.uname);
    console.log('进入时间:', new Date(enter.timestamp * 1000));
});
```

#### `event.LIVE_OPEN_PLATFORM_LIVE_START`

直播开始事件。

```typescript
api.on('event.LIVE_OPEN_PLATFORM_LIVE_START', (data: [PlatformLiveStartEndEvent]) => {
    const start = data[0];
    console.log('直播间 ID:', start.roomId);
    console.log('标题:', start.title);
    console.log('分区:', start.areaName);
    console.log('开始时间:', new Date(start.timestamp * 1000));
});
```

#### `event.LIVE_OPEN_PLATFORM_LIVE_END`

直播结束事件。

```typescript
api.on('event.LIVE_OPEN_PLATFORM_LIVE_END', (data: [PlatformLiveStartEndEvent]) => {
    const end = data[0];
    console.log('直播间 ID:', end.roomId);
    console.log('结束时间:', new Date(end.timestamp * 1000));
});
```

## 类型定义

### 用户信息相关

#### PlatformUserInfo

基础用户信息。

```typescript
interface PlatformUserInfo {
    uid: number;              // 用户 UID（已废弃，固定为 0）
    uname: string;            // 用户昵称
    face: string;             // 用户头像 URL
}
```

#### PlatformUserDetailInfo

用户详细信息。

```typescript
interface PlatformUserDetailInfo {
    fansMedalLevel: number;          // 粉丝牌等级
    fansMedalName: string;           // 粉丝牌名
    fansMedalWearingStatus: boolean; // 粉丝牌佩戴状态
    gloryLevel?: number;             // 荣耀等级
    guardLevel: number;              // 大航海等级
    isAnchor: boolean;               // 是否是主播
    isModerator: boolean;            // 是否是房管
}
```

#### HxhPlatformUserInfo

平台用户信息映射。

```typescript
type HxhPlatformUserInfo = {
    bili: HxhPlatformUserInfoItem;      // B 站用户信息
    dou_yin: HxhPlatformUserInfoItem;   // 抖音用户信息
    dou_yu: HxhPlatformUserInfoItem;    // 抖鱼用户信息
    hu_ya: HxhPlatformUserInfoItem;     // 虎牙用户信息
    hua_jiao: HxhPlatformUserInfoItem;  // 花椒用户信息
    kuai_shou: HxhPlatformUserInfoItem; // 快手用户信息
    red_note: HxhPlatformUserInfoItem;  // 小红书用户信息
    shi_pin_hao: HxhPlatformUserInfoItem; // 视频号用户信息
    wx: HxhPlatformUserInfoItem;        // 微信用户信息
} & Record<string, any>;
```

### 事件数据结构

#### PlatformDanmakuEvent

弹幕事件数据。

```typescript
type PlatformDanmakuEvent = PlatformUserInfo & PlatformUserDetailInfo & {
    platform: string;       // 平台标识
    id: string;            // 弹幕唯一 ID
    type: "message";       // 消息类型
    timestamp: number;     // 发送时间戳（秒）
    replyOpenId: string;   // 回复用户 ID
    replyUname: string;    // 回复用户昵称
    dmType: number;        // 弹幕类型 (0: 普通, 1: 表情包)
    emojiImgUrl: string;   // 表情包 URL
    message: string;       // 弹幕内容
}
```

#### PlatformSendGiftEvent

礼物事件数据。

```typescript
type PlatformSendGiftEvent = PlatformUserInfo & PlatformUserDetailInfo & {
    platform: string;      // 平台标识
    id: string;           // 消息唯一 ID
    type: "gift";         // 消息类型
    giftId: number;       // 道具 ID
    giftName: string;     // 道具名
    giftNum: number;      // 赠送数量
    price: number;        // 单价 (1000 = 1元 = 10电池)
    paid: boolean;        // 是否付费道具
    timestamp: number;    // 赠送时间戳（秒）
    giftIcon: string;     // 道具 icon URL
    comboGift: boolean;   // 是否是 combo 礼物
    comboInfo: {          // 连击信息
        combo_base_num: number;  // 每次连击的数量
        combo_count: number;     // 连击次数
        combo_id: string;        // 连击 ID
        combo_timeout: number;   // 连击超时（秒）
    };
    blindGift: {          // 盲盒信息
        blind_gift_id: number; // 盲盒 ID
        status: boolean;        // 是否是盲盒
    };
}
```

#### PlatformSuperChatEvent

超级留言事件数据。

```typescript
type PlatformSuperChatEvent = PlatformUserInfo & PlatformUserDetailInfo & {
    platform: string;   // 平台标识
    id: string;        // 消息唯一 ID
    type: "superChat"; // 消息类型
    message: string;   // 留言内容
    rmb: number;       // 支付金额（元）
    timestamp: number; // 赠送时间戳（秒）
    startTime: number; // 生效开始时间戳
    endTime: number;   // 生效结束时间戳
}
```

#### PlatformSuperChatDelEvent

超级留言撤回事件数据。

```typescript
type PlatformSuperChatDelEvent = {
    messageIds: number[]; // 被撤回的留言 ID 列表
    id: string;          // 消息唯一 ID
}
```

#### PlatformGuardEvent

大航海事件数据。

```typescript
type PlatformGuardEvent = PlatformUserInfo & PlatformUserDetailInfo & {
    platform: string;    // 平台标识
    id: string;         // 消息唯一 ID
    type: "guard";      // 消息类型
    guardLevel: number; // 大航海等级
    guardNum: number;   // 大航海数量
    guardUnit: string;  // 单位（如"月"）
    price: number;      // 价格（金瓜子）
    timestamp: number;  // 上舰时间戳（秒）
}
```

#### PlatformLikeEvent

点赞事件数据。

```typescript
type PlatformLikeEvent = PlatformUserInfo & PlatformUserDetailInfo & {
    platform: string;  // 平台标识
    timestamp: number; // 时间戳（秒）
    likeText: string;  // 点赞文案（如"xxx点赞了"）
    likeCount: number; // 2 秒内点赞数聚合
}
```

#### PlatformLiveRoomEnterEvent

进入直播间事件数据。

```typescript
type PlatformLiveRoomEnterEvent = PlatformUserInfo & {
    platform: string;  // 平台标识
    timestamp: number; // 进入时间戳（秒）
}
```

#### PlatformLiveStartEndEvent

直播开始/结束事件数据。

```typescript
type PlatformLiveStartEndEvent = {
    roomId: number;    // 直播间 ID
    uid: string;       // 用户唯一标识
    timestamp: number; // 时间戳（秒）
    areaName: string;  // 分区名称
    title: string;     // 直播间标题
}
```

#### HxhWidgetConfig

组件配置对象。

```typescript
type HxhWidgetConfig = {
    fontStyle?: string;              // 字体样式
    nativePluginInfo?: HxhExternalPluginInfo; // Native 插件信息
    customConfig?: Record<string, any>;      // 自定义配置
} & Record<string, any>;
```

## 示例

### 完整的弹幕监听示例

```typescript
import { HxhFrameApi } from '@hyperzlib/huixinghao-frame-api';

class DanmakuListener {
    private api: HxhFrameApi;

    constructor() {
        this.api = new HxhFrameApi(window);
        this.setup();
    }

    private setup() {
        // 监听用户信息更新
        this.api.on('update.user', () => {
            console.log('当前用户信息:', this.api.currentUserInfo);
        });

        // 监听配置更新
        this.api.on('update.option', () => {
            console.log('当前配置:', this.api.widgetConfig);
        });

        // 监听弹幕
        this.api.on('event.LIVE_OPEN_PLATFORM_DM', ([danmaku]) => {
            this.handleDanmaku(danmaku);
        });

        // 监听礼物
        this.api.on('event.LIVE_OPEN_PLATFORM_SEND_GIFT', ([gift]) => {
            this.handleGift(gift);
        });

        // 监听大航海
        this.api.on('event.LIVE_OPEN_PLATFORM_GUARD', ([guard]) => {
            this.handleGuard(guard);
        });

        // 监听 SC
        this.api.on('event.LIVE_OPEN_PLATFORM_SUPER_CHAT', ([sc]) => {
            this.handleSuperChat(sc);
        });
    }

    private handleDanmaku(danmaku: any) {
        const { uname, message, isModerator, isAnchor } = danmaku;
        let prefix = '';
        if (isAnchor) prefix = '[主播] ';
        else if (isModerator) prefix = '[房管] ';
        
        console.log(`${prefix}${uname}: ${message}`);
    }

    private handleGift(gift: any) {
        const { uname, giftName, giftNum, price } = gift;
        console.log(`${uname} 送出 ${giftNum}x ${giftName} (${price})`);
    }

    private handleGuard(guard: any) {
        const { uname, guardLevel, guardNum, guardUnit } = guard;
        const levelName = ['', '上舰', '舰长', '总督'][guardLevel] || '船员';
        console.log(`${uname} 成为 ${levelName} (${guardNum}${guardUnit})`);
    }

    private handleSuperChat(sc: any) {
        const { uname, message, rmb } = sc;
        console.log(`${uname} 的 SC(¥${rmb}): ${message}`);
    }

    destroy() {
        this.api.destroy();
    }
}

// 使用
const listener = new DanmakuListener();
// ... 后续操作
// listener.destroy(); // 卸载时
```

### CDN 使用示例

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Danmaku Widget</title>
    <style>
        #messages {
            max-height: 400px;
            overflow-y: auto;
            border: 1px solid #ccc;
            padding: 10px;
        }
        .message {
            padding: 5px;
            margin: 5px 0;
            background: #f0f0f0;
            border-left: 3px solid #007bff;
        }
    </style>
</head>
<body>
    <div id="messages"></div>

    <!-- 引入依赖 -->
    <script src="https://cdn.jsdelivr.net/npm/eventemitter3@5/dist/eventemitter3.min.js"></script>
    <!-- 引入 API -->
    <script src="https://cdn.jsdelivr.net/npm/@hyperzlib/huixinghao-frame-api@latest/dist/huixinghao-frame-api.iife.min.js"></script>

    <script>
        const api = new HxhFrameApi.HxhFrameApi(window);
        const messagesDiv = document.getElementById('messages');

        function addMessage(text, className = '') {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'message ' + className;
            msgDiv.textContent = text;
            messagesDiv.appendChild(msgDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        // 监听弹幕
        api.on('event.LIVE_OPEN_PLATFORM_DM', (data) => {
            const dm = data[0];
            addMessage(`${dm.uname}: ${dm.message}`);
        });

        // 监听礼物
        api.on('event.LIVE_OPEN_PLATFORM_SEND_GIFT', (data) => {
            const gift = data[0];
            addMessage(
                `${gift.uname} 送出 ${gift.giftNum}x ${gift.giftName}`,
                'gift'
            );
        });

        // 监听 SC
        api.on('event.LIVE_OPEN_PLATFORM_SUPER_CHAT', (data) => {
            const sc = data[0];
            addMessage(
                `${sc.uname} 的 SC: ${sc.message} (¥${sc.rmb})`,
                'sc'
            );
        });
    </script>
</body>
</html>
```

### React 组件示例

```typescript
import React, { useEffect, useRef, useState } from 'react';
import { HxhFrameApi } from '@hyperzlib/huixinghao-frame-api';

interface Message {
    id: string;
    type: 'danmaku' | 'gift' | 'sc' | 'guard';
    text: string;
    timestamp: number;
}

export const DanmakuWidget: React.FC = () => {
    const apiRef = useRef<HxhFrameApi>();
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const api = new HxhFrameApi();
        apiRef.current = api;

        // 监听弹幕
        api.on('event.LIVE_OPEN_PLATFORM_DM', ([danmaku]) => {
            setMessages(prev => [...prev, {
                id: danmaku.id,
                type: 'danmaku',
                text: `${danmaku.uname}: ${danmaku.message}`,
                timestamp: danmaku.timestamp
            }]);
        });

        // 监听礼物
        api.on('event.LIVE_OPEN_PLATFORM_SEND_GIFT', ([gift]) => {
            setMessages(prev => [...prev, {
                id: gift.id,
                type: 'gift',
                text: `${gift.uname} 送出 ${gift.giftNum}x ${gift.giftName}`,
                timestamp: gift.timestamp
            }]);
        });

        // 清理
        return () => {
            api.destroy();
        };
    }, []);

    return (
        <div className="danmaku-widget">
            {messages.map(msg => (
                <div key={msg.id} className={`message ${msg.type}`}>
                    {msg.text}
                </div>
            ))}
        </div>
    );
};
```

### Vue 组件示例

```vue
<template>
  <div class="danmaku-widget">
    <div v-for="msg in messages" :key="msg.id" :class="['message', msg.type]">
      {{ msg.text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { HxhFrameApi } from '@hyperzlib/huixinghao-frame-api';

interface Message {
  id: string;
  type: 'danmaku' | 'gift' | 'sc' | 'guard';
  text: string;
  timestamp: number;
}
const messages = ref<Message[]>([]);

let api: HxhFrameApi = new HxhFrameApi();

onMounted(() => {
  // 监听弹幕
  api.on('event.LIVE_OPEN_PLATFORM_DM', ([danmaku]) => {
    messages.value.push({
      id: danmaku.id,
      type: 'danmaku',
      text: `${danmaku.uname}: ${danmaku.message}`,
      timestamp: danmaku.timestamp
    });
  });

  // 监听礼物
  api.on('event.LIVE_OPEN_PLATFORM_SEND_GIFT', ([gift]) => {
    messages.value.push({
      id: gift.id,
      type: 'gift',
      text: `${gift.uname} 送出 ${gift.giftNum}x ${gift.giftName}`,
      timestamp: gift.timestamp
    });
  });
});

onBeforeUnmount(() => {
  // 在组件卸载时销毁 API 实例
  api.destroy();
});
</script>
```