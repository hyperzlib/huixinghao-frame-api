import EventEmitter from "eventemitter3";

export interface HxhApiMessage {
    category: string;
    type: string;
    args: any[];
}

export interface HxhPlugMessage {
    fun: string
    args: any[]
}

export interface HxhPlatformUserInfoItem {
    name: string;
    room_id: number;
}

export type HxhPlatformUserInfo = {
    bili: HxhPlatformUserInfoItem,
    dou_yin: HxhPlatformUserInfoItem,
    dou_yu: HxhPlatformUserInfoItem,
    hu_ya: HxhPlatformUserInfoItem,
    hua_jiao: HxhPlatformUserInfoItem,
    kuai_shou: HxhPlatformUserInfoItem,
    red_note: HxhPlatformUserInfoItem,
    shi_pin_hao: HxhPlatformUserInfoItem,
    wx: HxhPlatformUserInfoItem
} & Record<string, any>;

export interface PlatformUserInfo {
    /** 用户UID（已废弃，固定为0） */
    uid: number;
    /** 用户昵称 */
    uname: string;
    /** 用户头像 */
    face: string;
}

export interface PlatformUserDetailInfo {
    /** 粉丝牌等级 */
    fansMedalLevel: number;
    /** 粉丝牌名 */
    fansMedalName: string;
    /** 该房间粉丝勋章佩戴情况 */
    fansMedalWearingStatus: boolean;
    /** 荣耀等级 */
    gloryLevel?: number;
    /** 大航海等级 */
    guardLevel: number;
    /** 是否是主播 */
    isAnchor: boolean;
    /** 是否是房管 */
    isModerator: boolean;
}

export type PlatformDanmakuEvent = PlatformUserInfo & PlatformUserDetailInfo & {
    /** 平台标识 */
    platform: string;
    /** 弹幕唯一id */
    id: string;
    /** 弹幕类型 */
    type: "message";
    /** 弹幕发送时间秒级时间戳 */
    timestamp: number;
    /** 回复的用户ID */
    replyOpenId: string;
    /** 回复的用户名 */
    replyUname: string;
    /** 弹幕类型 0：普通弹幕 1：表情包弹幕 */
    dmType: number;
    /** 表情包图片地址 */
    emojiImgUrl: string;
    /** 弹幕内容 */
    message: string;
}

export interface PlatformGiftComboInfo {
    /** 每次连击赠送的道具数量 */
    combo_base_num: number;
    /** 连击次数 */
    combo_count: number;
    /** 连击id */
    combo_id: string;
    /** 连击有效期秒 */
    combo_timeout: number;
}

export interface PlatformGiftBlindGift {
    /** 盲盒id */
    blind_gift_id: number;
    /** 是否是盲盒 */
    status: boolean;
}

export type PlatformSendGiftEvent = PlatformUserInfo & PlatformUserDetailInfo & {
    /** 平台标识 */
    platform: string;
    /** 消息唯一id */
    id: string;
    /** 消息类型 */
    type: "gift";
    /** 道具id（盲盒:爆出道具id） */
    giftId: number;
    /** 道具名（盲盒:爆出道具名） */
    giftName: string;
    /** 赠送道具数量 */
    giftNum: number;
    /** 礼物爆出单价（1000 = 1元 = 10电池），盲盒:爆出道具的价值 */
    price: number;
    /** 是否是付费道具 */
    paid: boolean;
    timestamp: number;
    /** 道具icon */
    giftIcon: string;
    /** 是否是combo道具 */
    comboGift: boolean;
    /** 连击信息 */
    comboInfo: PlatformGiftComboInfo;
    /** 盲盒信息 */
    blindGift: PlatformGiftBlindGift;
}

export type PlatformSuperChatEvent = PlatformUserInfo & PlatformUserDetailInfo & {
    /** 平台标识 */
    platform: string;
    /** 消息唯一id */
    id: string;
    /** 消息类型 */
    type: "superChat";
    /** 留言内容 */
    message: string;
    /** 支付金额（元） */
    rmb: number;
    /** 赠送时间秒级 */
    timestamp: number;
    /** 生效开始时间 */
    startTime: number;
    /** 生效结束时间 */
    endTime: number;
}

export type PlatformSuperChatDelEvent = {
    /** 留言id */
    messageIds: number[];
    /** 消息唯一id */
    id: string;
};

export type PlatformGuardEvent = PlatformUserInfo & PlatformUserDetailInfo & {
    /** 平台标识 */
    platform: string;
    /** 消息唯一id */
    id: string;
    /** 消息类型 */
    type: "guard";
    /** 大航海等级 */
    guardLevel: number;
    /** 大航海数量 */
    guardNum: number;
    /** 大航海单位（正常单位为“月”，如为其他内容，无视guard_num以本字段内容为准，例如*3天） */
    guardUnit: string;
    /** 大航海金瓜子 */
    price: number;
    /** 上舰时间秒级时间戳 */
    timestamp: number;
};

export type PlatformLikeEvent = PlatformUserInfo & PlatformUserDetailInfo & {
    /** 平台标识 */
    platform: string;
    /** 时间秒级时间戳 */
    timestamp: number;
    /** 点赞文案（例如“xxx点赞了”） */
    likeText: string;
    /** 对单个用户最近2秒的点赞次数聚合 */
    likeCount: number;
};

export type PlatformLiveRoomEnterEvent = PlatformUserInfo & {
    /** 平台标识 */
    platform: string;
    /** 进入时间秒级时间戳 */
    timestamp: number;
};

export type PlatformLiveStartEndEvent = {
    /** 发生的直播间 */
    roomId: number;
    /** 用户唯一标识 */
    uid: string;
    /** 发生的时间戳 */
    timestamp: number;
    /** 开播二级分区名称 */
    areaName: string;
    /** 开播时刻，直播间的标题 */
    title: string;
};

export type HxhExternalPluginInfo = {
    key: string,
    md5: string,
    name: string,
    port: number,
    version: string
}

export type HxhWidgetConfig = {
    /** 组件字体（彗星号样式中提供的字体名） */
    fontStyle?: string;
    /** native插件信息 */
    nativePluginInfo?: HxhExternalPluginInfo;
    /** 自定义配置项 */
    customConfig?: Record<string, any>;
} & Record<string, any>;

export type HxhApiEvents = {
    /** 更新事件 */
    "update": (type: string, data: any) => void;
    /** 用户信息更新 */
    "update.user": (data: [HxhPlatformUserInfo]) => void;
    /** 插件配置更新 */
    "update.option": (data: [HxhWidgetConfig]) => void;
    /** 直播间事件 */
    "event": (type: string, data: any) => void;
    /** 弹幕事件 */
    "event.LIVE_OPEN_PLATFORM_DM": (data: [PlatformDanmakuEvent]) => void;
    /** 礼物事件 */
    "event.LIVE_OPEN_PLATFORM_SEND_GIFT": (data: [PlatformSendGiftEvent]) => void;
    /** 大航海事件 */
    "event.LIVE_OPEN_PLATFORM_GUARD": (data: [PlatformGuardEvent]) => void;
    /** SC事件 */
    "event.LIVE_OPEN_PLATFORM_SUPER_CHAT": (data: [PlatformSuperChatEvent]) => void;
    /** SC撤回事件 */
    "event.LIVE_OPEN_PLATFORM_SUPER_CHAT_DEL": (data: [PlatformSuperChatDelEvent]) => void;
    /** 点赞事件 */
    "event.LIVE_OPEN_PLATFORM_LIKE": (data: [PlatformLikeEvent]) => void;
    /** 进入直播间事件 */
    "event.LIVE_OPEN_PLATFORM_LIVE_ROOM_ENTER": (data: [PlatformLiveRoomEnterEvent]) => void;
    /** 直播开始事件 */
    "event.LIVE_OPEN_PLATFORM_LIVE_START": (data: [PlatformLiveStartEndEvent]) => void;
    /** 直播结束事件 */
    "event.LIVE_OPEN_PLATFORM_LIVE_END": (data: [PlatformLiveStartEndEvent]) => void;
};

export class HxhFrameApi {
    private messageTarget?: Window;
    private eventEmitter = new EventEmitter<HxhApiEvents>();

    public currentUserInfo?: HxhPlatformUserInfo;
    public currentUserInfoLoaded: boolean = false;

    public widgetConfig: HxhWidgetConfig = {};
    public widgetConfigLoaded: boolean = false;

    constructor(currentWindow: Window = window) {
        this.messageTarget = currentWindow?.parent;

        this.init();
    }

    init() {
        window.addEventListener('message', this._onWindowMessage.bind(this));
    }

    destroy() {
        window.removeEventListener('message', this._onWindowMessage.bind(this));
        this.eventEmitter.removeAllListeners();
    }

    private _onWindowMessage(event: MessageEvent) {
        if (event.source !== this.messageTarget) {
            return;
        }

        let message: HxhApiMessage = event.data;
        if (!message || !message.category || !message.type) {
            return;
        }

        // 提前处理部分消息，确保在调用事件时数据已经更新
        if (message.category === 'update' && message.type === 'user') {
            if (Array.isArray(message.args) && message.args.length > 0) {
                this.currentUserInfo = message.args[0];
            } else {
                this.currentUserInfo = undefined;
            }
        } else if (message.category === 'update' && message.type === 'option') {
            message = {...message};
            let config = message.args[0] || {};
            if (config._) {
                config.customConfig = config._;
                delete config._;
            }
            if (config.externalPlugin) {
                config.nativePluginInfo = config.externalPlugin;
                delete config.externalPlugin;
            }
            message.args[0] = config;
            this.widgetConfig = config;
        }

        this.eventEmitter.emit(message.category as unknown as keyof HxhApiEvents, message.type, message.args);
        this.eventEmitter.emit(`${message.category}.${message.type}` as unknown as keyof HxhApiEvents, message.args as unknown as [any]);
    }

    setWidgetPosition(x: number, y: number, width: number, height: number) {
        this.messageTarget?.postMessage({
            fun: 'attr',
            args: {
                x,
                y,
                w: width,
                h: height
            }
        }, '*');
    }

    setWidgetConfig(config: any) {
        this.messageTarget?.postMessage({
            fun: 'option',
            args: config
        }, '*');
    }

    subscribeEvent(...eventNames: string[]) {
        this.messageTarget?.postMessage({
            fun: 'subscribe',
            args: eventNames
        }, '*');
    }

    on<T extends EventEmitter.EventNames<HxhApiEvents>>(
        event: T,
        fn: EventEmitter.EventListener<HxhApiEvents, T>,
        context?: any
    ): this {
        let parts = event.split('.');
        if (parts.length >= 2) {
            if (parts[0] === 'event') {
                // 订阅事件
                this.subscribeEvent(parts[1]);
            }
        }

        this.eventEmitter.on(event, fn, context);
        return this;
    }

    off<T extends EventEmitter.EventNames<HxhApiEvents>>(
        event: T,
        fn?: EventEmitter.EventListener<HxhApiEvents, T>,
        context?: any,
        once?: boolean
    ): this {
        let parts = event.split('.');
        if (parts.length >= 2) {
            if (parts[0] === 'event') {
                if (this.eventEmitter.listeners(event).length == 0) {
                    // TODO: 取消订阅事件
                }
            }
        }

        this.eventEmitter.off(event, fn, context, once);
        return this;
    }
}