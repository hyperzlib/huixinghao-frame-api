# 自定义作品配置

如果作品有额外配置参数需求，可以通过指定的json格式，在画布右侧配置栏创建额外的选项

## 基本格式

| 字段名 | 类型                                 | 必须 | 描述                     |
| ------ | ------------------------------------ | ---- | ------------------------ |
| key    | string                               | 是   | ID (不能重复)            |
| name   | string                               | 是   | 标题                     |
| type   | string                               | 是   | 类型 (输入框、下拉框...) |
| value  | string \| number \| boolean \| array | 是   | 默认值                   |

```json
{
  "settings": [
    {
      "key": "foo",
      "name": "自定义颜色",
      "type": "color",
      "value": "#ffffff"
    }
  ]
}
```

## CSS中使用

变量格式：`--worshop-<ID>`

```css
.foo{
    color: var(--workshop-color)
}
```

## 模板中使用

```javascript
const handlers = {
    update: {
        option(newValue) {
            //控制台输出自定义配置color的值
            console.log(newValue._.color)
        },
    }
}
//监听事件
window.addEventListener('message', e => {
    const { category, type, args } = e.data
    handlers[category]?.[type]?.apply(e, args)
})
// 订阅事件
parent.postMessage({
    fun: 'subscribe',
    args: Object.keys(handlers.event)
}, '*')
```

## 组件库

* 输入框(text, textarea)

| 字段        | 类型   | 必须 | 描述                 |
| ----------- | ------ | ---- | -------------------- |
| placeholder | string | 否   | 无内容时的提示       |
| prefix      | string | 否   | 前缀文本             |
| suffix      | string | 否   | 后缀文本             |
| maxlength   | number | 否   | 限制内容最大字符长度 |
| rows        | number | 否   | 输入框展示行数       |

```json
{
    "settings": [
        {
            "key": "text",
            "name": "输入框",
            "type": "text",
            "value": "默认内容",
            "prefix": "前缀内容",
            "suffix": "后缀内容"
        },
        {
            "key": "textarea",
            "name": "多行输入框",
            "type": "textarea",
            "value": "默认内容",
            "placeholder": "请输入xxx",
            "maxlength": 30,
            "rows": 5
        }
    ]
}
```

* 数字输入框(decimal)

| 字段 | 类型   | 必须 | 描述         |
| ---- | ------ | ---- | ------------ |
| step | number | 否   | 每次加减的值 |
| min  | number | 否   | 最小值       |
| max  | number | 否   | 最大值       |

```json
{
    "settings": [
        {
            "key": "interger",
            "name": "整数输入框",
            "type": "decimal",
            "value": 0
        },
        {
            "key": "decimal",
            "name": "小数输入框",
            "type": "decimal",
            "value": 0,
            "placeholder": "请输入xxx",
            "prefix": "前缀内容",
            "suffix": "后缀内容",
            "precision": 2,
            "step": 0.01,
            "min": -999.99,
            "max": 999.99
        }
    ]
}
```

* 滑动选择(slider)

| 字段        | 类型   | 必须 | 描述           |
| ----------- | ------ | ---- | -------------- |
| placeholder | string | 否   | 无内容时的提示 |
| prefix      | string | 否   | 前缀文本       |
| suffix      | string | 否   | 后缀文本       |
| precision   | number | 否   | 小数位数       |
| step        | number | 否   | 每次加减的值   |
| min         | number | 否   | 最小值         |
| max         | number | 否   | 最大值         |

```json
{
    "settings": [
        {
            "key": "interger",
            "name": "整数滑块",
            "type": "slider",
            "value": 0
        },
        {
            "key": "decimal",
            "name": "小数滑块",
            "type": "slider",
            "value": 0,
            "step": 0.01,
            "min": -1,
            "max": 1
        }
    ]
}
```

* 复选框(checkbox)

| 字段 | 类型 | 必须 | 描述 |
| ---- | ---- | ---- | ---- |
|      |      |      |      |

```json
{
    "settings": [
        {
            "key": "checkbox",
            "name": "复选框",
            "type": "checkbox",
            "value": true
        }
    ]
}
```

* 开关(switch)

| 字段 | 类型 | 必须 | 描述 |
| ---- | ---- | ---- | ---- |
|      |      |      |      |

```json
{
    "settings": [
        {
            "key": "switch",
            "name": "开关",
            "type": "switch",
            "value": true
        }
    ]
}
```

* 选择器(select)

| 字段     | 类型                             | 必须 | 描述       |
| -------- | -------------------------------- | ---- | ---------- |
| options  | {label: string, value: string}[] | 是   | 选项组     |
| multiple | boolean                          | 否   | 是否可多选 |

```json
{
  "settings": [
    {
      "key": "select",
      "name": "选择器",
      "type": "select",
      "options": [
        {
          "label": "我选A",
          "value": "A"
        },
        {
          "label": "我选B",
          "value": "B"
        }
      ],
      "value": "B"
    },
    {
      "key": "multipleSelect",
      "name": "多项选择器",
      "type": "select",
      "multiple": true,
      "options": [
        {
          "label": "我选A",
          "value": "A"
        },
        {
          "label": "我选B",
          "value": "B"
        }
      ],
      "value": [
        "A",
        "B"
      ]
    }
  ]
}
```

* 颜色选择器(color)

| 字段 | 类型 | 必须 | 描述 |
| ---- | ---- | ---- | ---- |
|      |      |      |      |

```json
{
    "settings": [
        {
            "key": "color",
            "name": "颜色选择",
            "type": "color",
            "value": "#ffffffff"
        }
    ]
}
```

* 图片上传(image)

| 字段 | 类型 | 必须 | 描述 |
| ---- | ---- | ---- | ---- |
|      |      |      |      |

```json
{
    "settings": [
        {
            "key": "background",
            "name": "背景图片",
            "type": "image",
            "value": ""
        }
    ]
}
```