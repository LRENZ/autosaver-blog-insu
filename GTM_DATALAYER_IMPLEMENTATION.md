# 🎯 GTM DataLayer 埋点完整实现文档

## 📋 埋点事件命名规范

### 命名格式：`{module}_{action}_click`

示例：
- `header_get_quote_click` - Header 模块的 Get Quote 按钮点击
- `hero_get_my_free_quote_click` - Hero 模块的 Get My Free Quote 按钮点击
- `popup_cta_click` - Popup 的 CTA 按钮点击

---

## 🎨 已实现的埋点事件

### 1. **Header 模块** (components/HeaderClient.tsx)

| 事件名 | 触发元素 | 数据 |
|-------|---------|------|
| `header_logo_click` | AutoSaver Logo | link_text, target_url |
| `header_nav_home_click` | Home 导航链接 | link_text, target_url |
| `header_nav_guides_click` | Guides 导航链接 | link_text, target_url |
| `header_nav_locations_click` | Locations 导航链接 | link_text, target_url |
| `header_get_quote_click` | Get Quote 按钮 | button_text, target_url, module |

### 2. **Homepage Hero 模块** (app/page.tsx)

| 事件名 | 触发元素 | 数据 |
|-------|---------|------|
| `hero_get_my_free_quote_click` | Get My Free Quote 按钮 | button_text, target_url, module |

### 3. **Homepage Blog 模块** (app/page.tsx)

| 事件名 | 触发元素 | 数据 |
|-------|---------|------|
| `home_blog_card_click` | 博客文章卡片 | card_title, card_type, target_url, category |

### 4. **Homepage Location 模块** (待实现)

| 事件名 | 触发元素 | 数据 |
|-------|---------|------|
| `home_location_card_click` | 州页面卡片 | card_title, card_type, target_url, state, average_rate |
| `home_view_all_states_click` | View All States 按钮 | button_text, target_url |

### 5. **Homepage Final CTA 模块** (待实现)

| 事件名 | 触发元素 | 数据 |
|-------|---------|------|
| `home_cta_get_your_free_quote_click` | Get Your Free Quote Now 按钮 | button_text, target_url, module, position |

### 6. **Location Page 模块** (待实现)

| 事件名 | 触发元素 | 数据 |
|-------|---------|------|
| `location_compare_rates_click` | Compare Rates Now 按钮 | button_text, target_url, location_name, state |
| `location_cta_get_your_free_quote_click` | Get Your Free Quote Now 按钮 | button_text, target_url, location_name |
| `location_cta_learn_more_click` | Learn More 按钮 | button_text, target_url, location_name |
| `location_back_home_click` | Back to Home 链接 | link_text, target_url |

### 7. **Blog Page 模块** (待实现)

| 事件名 | 触发元素 | 数据 |
|-------|---------|------|
| `blog_cta_get_your_free_quote_click` | Get Your Free Quote 按钮 | button_text, target_url, post_title, category |
| `blog_cta_learn_more_click` | Learn More 按钮 | button_text, target_url, post_title |
| `blog_back_home_click` | Back to Home 链接 | link_text, target_url |

### 8. **Popup 模块** (components/Popup.tsx - 已实现)

| 事件名 | 触发元素 | 数据 |
|-------|---------|------|
| `popup_shown` | Popup 显示时 | popup_id, popup_name, trigger_type, display_frequency, page_path |
| `popup_cta_click` | Popup CTA 按钮 | popup_id, popup_name, cta_url, page_path |
| `popup_close` | Popup 关闭按钮 | popup_id, popup_name, page_path |

---

## 🛠️ 实现方式

### 方式 1：使用 Data 属性 (推荐)

```tsx
<Link
  href="/some-page"
  data-gtm-event="module_action_click"
  data-gtm-label="Button Text"
  data-gtm-module="module_name"
  data-gtm-cta  // 标记为 CTA 按钮
>
  Button Text
</Link>
```

### 方式 2：使用客户端组件

```tsx
'use client'

import { trackCTAClick, GTMEvents } from '@/lib/gtm-tracking';

<Link
  href="/some-page"
  onClick={() => trackCTAClick(
    GTMEvents.MODULE_ACTION,
    'Button Text',
    '/some-page',
    { module: 'module_name' }
  )}
>
  Button Text
</Link>
```

---

## 📊 DataLayer 数据结构

### CTA 按钮点击事件

```javascript
{
  event: 'module_action_click',
  button_text: 'Get Quote',
  target_url: '/get-quote',
  cta_type: 'button',
  module: 'header',
  timestamp: '2024-12-25T10:30:00.000Z',
  page_path: '/',
  page_url: 'https://autosaver-blog-insu.vercel.app/'
}
```

### Popup 事件

```javascript
{
  event: 'popup_shown',
  popup_id: 'popup_default_urgency',
  popup_name: 'Limited Time Insurance Discount',
  trigger_type: 'time',
  display_frequency: 'once-per-session',
  timestamp: '2024-12-25T10:30:00.000Z',
  page_path: '/',
  page_url: 'https://autosaver-blog-insu.vercel.app/'
}
```

### 卡片点击事件

```javascript
{
  event: 'home_blog_card_click',
  card_title: 'How to Save Money on Car Insurance',
  card_type: 'blog',
  target_url: '/blog/how-to-save',
  category: 'Savings',
  timestamp: '2024-12-25T10:30:00.000Z',
  page_path: '/',
  page_url: 'https://autosaver-blog-insu.vercel.app/'
}
```

---

## 🧪 测试方法

### 1. 浏览器 Console 测试

打开浏览器 DevTools → Console，运行：

```javascript
// 查看所有 dataLayer 事件
console.log(window.dataLayer);

// 监听新事件
const originalPush = window.dataLayer.push;
window.dataLayer.push = function(...args) {
  console.log('[DataLayer Push]', args);
  return originalPush.apply(this, args);
};
```

### 2. GTM Preview Mode 测试

1. 登录 [Google Tag Manager](https://tagmanager.google.com)
2. 打开容器 `GTM-KX9XC2KJ`
3. 点击右上角 **Preview**
4. 输入网站 URL：`https://autosaver-blog-insu.vercel.app`
5. 点击页面上的按钮
6. 在 GTM Preview 中查看事件

### 3. Chrome GTM/GA Debugger 插件

安装插件：
- [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
- [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna)

### 4. 测试清单

#### ✅ Header 测试
- [ ] 点击 Logo → `header_logo_click`
- [ ] 点击 Home 链接 → `header_nav_home_click`
- [ ] 点击 Guides 链接 → `header_nav_guides_click`
- [ ] 点击 Locations 链接 → `header_nav_locations_click`
- [ ] 点击 Get Quote 按钮 → `header_get_quote_click`

#### ✅ Homepage 测试
- [ ] 点击 Hero CTA → `hero_get_my_free_quote_click`
- [ ] 点击博客卡片 → `home_blog_card_click`
- [ ] 点击州页面卡片 → `home_location_card_click`
- [ ] 点击 Final CTA → `home_cta_get_your_free_quote_click`

#### ✅ Location Page 测试
- [ ] 点击 Compare Rates → `location_compare_rates_click`
- [ ] 点击 Get Your Free Quote → `location_cta_get_your_free_quote_click`
- [ ] 点击 Learn More → `location_cta_learn_more_click`

#### ✅ Blog Page 测试
- [ ] 点击 Get Your Free Quote → `blog_cta_get_your_free_quote_click`
- [ ] 点击 Learn More → `blog_cta_learn_more_click`

#### ✅ Popup 测试
- [ ] Popup 显示 → `popup_shown`
- [ ] 点击 Popup CTA → `popup_cta_click`
- [ ] 点击 Popup 关闭 → `popup_close`

---

## 📈 GTM 配置建议

### 1. 创建自定义事件触发器

在 GTM 中创建触发器：

| 触发器名称 | 类型 | 条件 |
|-----------|------|------|
| CTA Clicks | 自定义事件 | event 匹配正则表达式 `.*_click` |
| Header CTA | 自定义事件 | event = `header_get_quote_click` |
| Hero CTA | 自定义事件 | event = `hero_get_my_free_quote_click` |
| Popup Events | 自定义事件 | event 匹配正则表达式 `popup_.*` |

### 2. 创建 GA4 事件标签

| 标签名称 | 事件名称 | 参数 |
|---------|---------|------|
| GA4 - CTA Click | cta_click | button_text, target_url, module |
| GA4 - Popup Shown | popup_impression | popup_id, popup_name, trigger_type |
| GA4 - Popup CTA | popup_conversion | popup_id, popup_name, cta_url |
| GA4 - Card Click | card_click | card_title, card_type, target_url |

### 3. 创建转化目标

- **Primary Conversion**: `hero_get_my_free_quote_click`
- **Secondary Conversion**: `location_compare_rates_click`
- **Popup Conversion**: `popup_cta_click`

---

## 🔍 调试技巧

### 开发环境自动 Console 日志

所有 dataLayer 事件在开发环境会自动输出到 console：

```
[GTM] Event pushed: header_get_quote_click { button_text: 'Get Quote', target_url: '#quote', module: 'header' }
```

### 生产环境禁用日志

生产环境不会输出日志，保持 console 干净。

### 验证事件数据

```javascript
// 获取最后一个事件
const lastEvent = window.dataLayer[window.dataLayer.length - 1];
console.log(lastEvent);
```

---

## 📝 待完成任务

### High Priority

- [ ] 完成 Homepage 所有按钮埋点
  - [ ] Location 卡片
  - [ ] Final CTA
- [ ] 完成 Location Page 所有按钮埋点
- [ ] 完成 Blog Page 所有按钮埋点
- [ ] 测试所有埋点事件

### Medium Priority

- [ ] Footer 链接埋点
- [ ] 表单提交埋点
- [ ] 页面浏览埋点
- [ ] 滚动深度埋点

### Low Priority

- [ ] 视频播放埋点
- [ ] 文件下载埋点
- [ ] 外部链接埋点

---

## 🎉 完成标准

1. ✅ 所有主要 CTA 按钮都有埋点
2. ✅ Popup 交互都有埋点
3. ✅ 事件命名规范一致
4. ✅ DataLayer 数据结构完整
5. ✅ 开发环境可以看到 console 日志
6. ✅ GTM Preview Mode 可以看到所有事件
7. ✅ 没有 JavaScript 错误
8. ✅ 所有事件都能正确触发

---

**创建日期**: 2024-12-25  
**作者**: Claude  
**项目**: AutoSaver Blog & Insurance  
**版本**: v1.0 - GTM DataLayer Implementation
