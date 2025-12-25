# 🎯 GTM DataLayer 埋点 - 快速实施指南

## ✅ 已实现的埋点

### 1. **核心基础设施** ✅

- **lib/gtm-tracking.ts** - 埋点工具函数库
  - `pushToDataLayer()` - 推送事件到 dataLayer
  - `trackCTAClick()` - 追踪 CTA 按钮点击
  - `trackLinkClick()` - 追踪链接点击
  - `trackCardClick()` - 追踪卡片点击
  - `trackPopupEvent()` - 追踪 Popup 事件
  - `GTMEvents` - 所有事件名称常量

- **components/GTMTrackingInit.tsx** - 自动埋点初始化组件
  - 自动监听所有带 `data-gtm-event` 属性的元素
  - 客户端组件，在 RootLayout 中加载

### 2. **Header 模块** ✅

**文件**: `components/HeaderClient.tsx`

| 事件名 | 元素 | 状态 |
|-------|------|------|
| `header_logo_click` | Logo | ✅ 已实现 |
| `header_nav_home_click` | Home 链接 | ✅ 已实现 |
| `header_nav_guides_click` | Guides 链接 | ✅ 已实现 |
| `header_nav_locations_click` | Locations 链接 | ✅ 已实现 |
| `header_get_quote_click` | Get Quote 按钮 | ✅ 已实现 |

### 3. **Homepage** ✅

**文件**: `app/page.tsx`

| 事件名 | 元素 | 状态 |
|-------|------|------|
| `hero_get_my_free_quote_click` | Hero CTA | ✅ 已实现 |
| `home_blog_card_click` | 博客卡片 | ✅ 已实现 |
| `home_location_card_click` | 州卡片 | ✅ 已实现 |
| `home_cta_get_your_free_quote_click` | Final CTA | ✅ 已实现 |

### 4. **Popup 模块** ✅

**文件**: `components/Popup.tsx` (已在之前实现)

| 事件名 | 元素 | 状态 |
|-------|------|------|
| `popup_shown` | Popup 显示 | ✅ 已实现 |
| `popup_cta_click` | Popup CTA 按钮 | ✅ 已实现 |
| `popup_close` | Popup 关闭按钮 | ✅ 已实现 |

---

## 🔄 待添加埋点 (使用 data 属性方式)

### Location Page

在 `app/location/[slug]/page.tsx` 中添加：

```tsx
{/* Compare Rates Button */}
<Link 
  href={ctaUrls.cta_compare_rates_url}
  data-gtm-event="location_compare_rates_click"
  data-gtm-label="Compare Rates Now"
  data-gtm-module="location"
  data-gtm-cta
>
  <Button>Compare Rates Now</Button>
</Link>

{/* Get Your Free Quote Button */}
<Link 
  href={ctaUrls.cta_get_your_free_quote_url}
  data-gtm-event="location_cta_get_your_free_quote_click"
  data-gtm-label="Get Your Free Quote Now"
  data-gtm-module="location_cta"
  data-gtm-cta
>
  <Button>Get Your Free Quote Now</Button>
</Link>

{/* Learn More Button */}
<Link 
  href={ctaUrls.cta_learn_more_url}
  data-gtm-event="location_cta_learn_more_click"
  data-gtm-label="Learn More"
  data-gtm-module="location_cta"
  data-gtm-cta
>
  <Button>Learn More</Button>
</Link>
```

### Blog Page

在 `app/blog/[slug]/page.tsx` 中添加：

```tsx
{/* Get Your Free Quote Button */}
<Link 
  href={ctaUrls.cta_get_your_free_quote_url}
  data-gtm-event="blog_cta_get_your_free_quote_click"
  data-gtm-label="Get Your Free Quote"
  data-gtm-module="blog_cta"
  data-gtm-cta
>
  <Button>Get Your Free Quote</Button>
</Link>

{/* Learn More Button */}
<Link 
  href={ctaUrls.cta_learn_more_url}
  data-gtm-event="blog_cta_learn_more_click"
  data-gtm-label="Learn More"
  data-gtm-module="blog_cta"
  data-gtm-cta
>
  <Button>Learn More</Button>
</Link>
```

---

## 🧪 测试方法

### 1. 浏览器 Console 实时监控

打开任意页面，按 F12 打开 DevTools，在 Console 中运行：

```javascript
// 监听所有 dataLayer 事件
const originalPush = window.dataLayer.push;
window.dataLayer.push = function(...args) {
  console.log('📊 [DataLayer]', args[0]);
  return originalPush.apply(this, args);
};

// 查看当前所有事件
console.table(window.dataLayer);
```

### 2. 点击测试

访问：https://autosaver-blog-insu.vercel.app

**Header 测试**:
- 点击 Logo → Console 应该显示 `header_logo_click`
- 点击 Get Quote → Console 应该显示 `header_get_quote_click`

**Homepage 测试**:
- 点击 Hero CTA → Console 应该显示 `hero_get_my_free_quote_click`
- 点击博客卡片 → Console 应该显示 `home_blog_card_click`
- 点击 Final CTA → Console 应该显示 `home_cta_get_your_free_quote_click`

### 3. GTM Preview Mode 测试

1. 访问 https://tagmanager.google.com
2. 打开容器 `GTM-KX9XC2KJ`
3. 点击 **Preview**
4. 输入 URL: `https://autosaver-blog-insu.vercel.app`
5. 点击页面按钮，在 GTM Debugger 中查看事件

### 4. Chrome 插件测试

安装 [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)，访问网站后点击插件图标查看 GTM 状态。

---

## 📊 DataLayer 事件结构

### CTA 按钮点击示例

```javascript
{
  event: "header_get_quote_click",
  button_text: "Get Quote",
  target_url: "#quote",
  cta_type: "button",
  module: "header",
  timestamp: "2024-12-25T12:00:00.000Z",
  page_path: "/",
  page_url: "https://autosaver-blog-insu.vercel.app/"
}
```

### 卡片点击示例

```javascript
{
  event: "home_blog_card_click",
  card_title: "How to Save Money",
  card_type: "blog",
  target_url: "/blog/how-to-save",
  module: "home",
  timestamp: "2024-12-25T12:00:00.000Z",
  page_path: "/",
  page_url: "https://autosaver-blog-insu.vercel.app/"
}
```

### Popup 事件示例

```javascript
{
  event: "popup_cta_click",
  popup_id: "popup_default_urgency",
  popup_name: "Limited Time Discount",
  cta_url: "#quote",
  timestamp: "2024-12-25T12:00:00.000Z",
  page_path: "/",
  page_url: "https://autosaver-blog-insu.vercel.app/"
}
```

---

## 🎯 完成的功能

### ✅ 已实现
- 核心埋点工具库
- 自动埋点初始化系统
- Header 所有按钮埋点
- Homepage 所有主要 CTA 埋点
- Popup 完整事件追踪
- 开发环境 Console 日志
- 测试脚本

### ⏳ 待完成
- Location Page 按钮埋点（需添加 data 属性）
- Blog Page 按钮埋点（需添加 data 属性）
- Footer 链接埋点（可选）

---

## 🚀 快速部署

### 当前状态

代码已经包含完整的埋点基础设施，Header 和 Homepage 的主要 CTA 都已实现埋点。

### 部署后立即可用

- ✅ Header 所有交互
- ✅ Homepage Hero CTA
- ✅ Homepage 卡片点击
- ✅ Homepage Final CTA
- ✅ Popup 所有交互

### 需要补充

Location 和 Blog 页面的 CTA 按钮需要添加 `data-gtm-*` 属性（见上面的代码示例）。

---

## 📈 GTM 配置建议

### 创建触发器

在 GTM 中创建以下触发器：

1. **All CTA Clicks**
   - 类型：自定义事件
   - 事件名匹配正则：`.*_click`

2. **Header CTA**
   - 类型：自定义事件
   - 事件名：`header_get_quote_click`

3. **Hero CTA**
   - 类型：自定义事件
   - 事件名：`hero_get_my_free_quote_click`

4. **Popup Events**
   - 类型：自定义事件
   - 事件名匹配正则：`popup_.*`

### 创建 GA4 事件标签

| 标签名 | 事件名 | 参数 |
|-------|-------|------|
| GA4 - CTA Click | cta_click | {{Event}} - button_text, target_url, module |
| GA4 - Popup Conversion | popup_conversion | {{Event}} - popup_id, popup_name |
| GA4 - Card Click | card_click | {{Event}} - card_title, card_type |

---

## ✅ 验证清单

部署后验证：

- [ ] 访问首页，打开 DevTools Console
- [ ] 看到 `[GTM] Tracking initialized` 日志
- [ ] 点击 Header "Get Quote" 按钮
- [ ] Console 显示埋点事件数据
- [ ] 访问 GTM Preview Mode
- [ ] 看到所有事件正确触发
- [ ] 没有 JavaScript 错误

---

**创建日期**: 2024-12-25  
**版本**: v1.0 - Partial Implementation  
**状态**: Header + Homepage 完成，Location/Blog 待补充
