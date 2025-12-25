# 🎯 Exit Intent 触发逻辑 & Google Tag Manager 集成指南

## 📋 目录
1. [Exit Intent 触发逻辑](#exit-intent-触发逻辑)
2. [Google Tag Manager 集成](#google-tag-manager-集成)
3. [测试指南](#测试指南)

---

## 🚪 Exit Intent 触发逻辑

### 什么是 Exit Intent?

Exit Intent（退出意图）是一种检测用户即将离开网站的技术，在用户准备关闭标签页或离开页面时触发弹窗。

### 🔍 触发条件

```typescript
case 'exit':
  // 1. 鼠标移出文档
  document.addEventListener('mouseleave', (e: MouseEvent) => {
    
    // 2. 检测鼠标是否移动到浏览器顶部（Y坐标 <= 0）
    const isTopEdge = e.clientY <= 0;
    
    // 3. 确认是从页面内容移出（不是悬停在内部元素）
    const isFromPage = e.relatedTarget === null;
    
    // 4. 同时满足两个条件才触发
    if (isTopEdge && isFromPage) {
      // 显示弹窗
      setIsOpen(true);
    }
  });
```

### 📊 触发时机详解

| 用户行为 | 鼠标位置 | 触发条件 | 是否弹出 |
|---------|---------|---------|---------|
| **准备关闭标签页** | 移向 ❌ 关闭按钮 | `clientY <= 0` + 离开文档 | ✅ 是 |
| **输入新网址** | 移向地址栏 | `clientY <= 0` + 离开文档 | ✅ 是 |
| **切换标签** | 移向浏览器标签栏 | `clientY <= 0` + 离开文档 | ✅ 是 |
| **页面内滚动** | 在页面内移动 | 鼠标未离开文档 | ❌ 否 |
| **悬停在按钮上** | 悬停在页面元素 | `relatedTarget !== null` | ❌ 否 |
| **向下滚动到底部** | 移向页面底部 | `clientY > 0` | ❌ 否 |

### 🛡️ 防止误触发机制

```typescript
// 1. 防止重复触发
let exitIntentTriggered = false;
if (exitIntentTriggered) return;

// 2. 页面加载后延迟 1 秒再启用
const timeoutId = setTimeout(() => {
  document.addEventListener('mouseleave', handleExit);
}, 1000);

// 3. 触发后立即移除监听器
exitIntentTriggered = true;
document.removeEventListener('mouseleave', handleExit);
```

### 🎨 典型使用场景

#### 1. **最后一次挽留优惠**
```typescript
{
  name: "Last Chance Discount",
  triggerType: "exit",
  displayFrequency: "once-per-session",
  includePages: "/checkout, /pricing",
  content: "Wait! Get 20% off before you go!"
}
```

#### 2. **邮件订阅提示**
```typescript
{
  name: "Newsletter Signup",
  triggerType: "exit",
  displayFrequency: "once-per-day",
  excludePages: "/admin/*, /thank-you",
  content: "Don't miss out! Subscribe to our newsletter"
}
```

#### 3. **调查问卷**
```typescript
{
  name: "Feedback Survey",
  triggerType: "exit",
  displayFrequency: "every-page",
  includePages: "/blog/*",
  content: "Quick question: Why are you leaving?"
}
```

### ⚙️ 与 Display Frequency 的组合

| Display Frequency | Exit Intent 行为 | 推荐场景 |
|------------------|-----------------|---------|
| **once-per-session** | 整个会话只触发一次退出弹窗 | 促销活动、优惠券 |
| **every-page** | 每个页面都可能触发（如果用户尝试离开） | A/B 测试、重要通知 |
| **once-per-day** | 24小时内只触发一次 | 每日优惠、邮件订阅 |
| **always** | 每次退出意图都触发 | 调试、测试环境 |

---

## 🏷️ Google Tag Manager 集成

### 已集成的 GTM 代码

#### 位置：`app/layout.tsx`

```typescript
<html lang="en">
  <head>
    {/* Google Tag Manager */}
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KX9XC2KJ');`,
      }}
    />
  </head>
  <body>
    {/* Google Tag Manager (noscript) */}
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-KX9XC2KJ"
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
    
    {/* Your app content */}
  </body>
</html>
```

### 📌 GTM 容器 ID

```
GTM-KX9XC2KJ
```

### ✅ 集成完成的功能

1. ✅ **全站追踪** - GTM 在所有页面加载
2. ✅ **Head 注入** - JavaScript 脚本在 `<head>` 中加载
3. ✅ **Noscript 后备** - 禁用 JS 时的后备方案
4. ✅ **Next.js 兼容** - 使用 `dangerouslySetInnerHTML` 正确注入
5. ✅ **服务端渲染** - 在 RootLayout 中集成

---

## 🧪 测试指南

### Exit Intent 测试步骤

#### 1. **创建测试 Popup**

访问：`https://autosaver-blog-insu.vercel.app/admin/popups/create`

配置：
```
Name: Exit Intent Test
Title: Don't Leave Yet!
Content: We noticed you're about to leave...
Trigger Type: exit
Display Frequency: every-page
Include Pages: *
Status: Active
```

#### 2. **测试触发**

1. 打开网站首页
2. 等待 1 秒（防止误触发）
3. 快速将鼠标移向浏览器顶部（关闭按钮/标签栏）
4. ✅ 弹窗应该出现

#### 3. **测试不触发的情况**

| 操作 | 预期结果 |
|------|---------|
| 页面内滚动 | ❌ 不触发 |
| 悬停在链接上 | ❌ 不触发 |
| 页面加载后立即移动鼠标 | ❌ 不触发（1秒延迟） |
| 向右/向左移出窗口 | ❌ 不触发（只有顶部） |

#### 4. **浏览器控制台调试**

打开 DevTools Console，查看日志：

```javascript
[Popup] Initializing popup: { triggerType: 'exit' }
[Popup] Exit intent trigger
[Popup] Exit intent detected! Opening popup: popup_exit_test
```

### GTM 测试步骤

#### 1. **验证 GTM 加载**

打开浏览器 DevTools → Network 标签：

```
✅ 查找请求: www.googletagmanager.com/gtm.js?id=GTM-KX9XC2KJ
✅ 状态码: 200
✅ 加载时机: 页面加载时
```

#### 2. **使用 Google Tag Assistant**

1. 安装 Chrome 插件：[Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. 访问网站
3. 点击插件图标
4. ✅ 应该显示：**GTM-KX9XC2KJ** (Working)

#### 3. **GTM Preview Mode**

1. 访问 [Google Tag Manager](https://tagmanager.google.com)
2. 打开容器 `GTM-KX9XC2KJ`
3. 点击右上角 **Preview**
4. 输入网站 URL：`https://autosaver-blog-insu.vercel.app`
5. ✅ 查看触发的标签和事件

#### 4. **验证 dataLayer**

打开浏览器控制台，运行：

```javascript
console.log(window.dataLayer);
```

✅ 应该输出数组，包含 `gtm.start` 事件：

```javascript
[
  {
    "gtm.start": 1703001234567,
    "event": "gtm.js"
  }
]
```

### 🎯 建议的 GTM 事件追踪

在 GTM 中配置以下自定义事件追踪：

#### 1. **Popup 显示事件**

在 `Popup.tsx` 中添加：

```typescript
const handleOpen = () => {
  setIsOpen(true);
  
  // 推送到 GTM dataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'popup_shown',
      popup_id: id,
      popup_name: title,
      trigger_type: triggerType,
      display_frequency: displayFrequency,
      page_path: window.location.pathname
    });
  }
}
```

#### 2. **Popup CTA 点击事件**

```typescript
const handleCTA = () => {
  // 推送到 GTM dataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'popup_cta_clicked',
      popup_id: id,
      popup_name: title,
      cta_url: ctaUrl,
      page_path: window.location.pathname
    });
  }
  
  markAsShown();
  setIsOpen(false);
  window.location.href = ctaUrl;
}
```

#### 3. **Popup 关闭事件**

```typescript
const handleClose = () => {
  // 推送到 GTM dataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'popup_closed',
      popup_id: id,
      popup_name: title,
      page_path: window.location.pathname
    });
  }
  
  markAsShown();
  setIsOpen(false);
}
```

---

## 📊 GTM 配置建议

### 1. **创建自定义事件触发器**

在 GTM 中创建触发器：

| 触发器名称 | 类型 | 条件 |
|-----------|------|------|
| Popup Shown | 自定义事件 | event = popup_shown |
| Popup CTA Clicked | 自定义事件 | event = popup_cta_clicked |
| Popup Closed | 自定义事件 | event = popup_closed |
| Exit Intent Popup | 自定义事件 | event = popup_shown AND trigger_type = exit |

### 2. **配置 Google Analytics 4 事件**

| 事件名称 | 参数 |
|---------|------|
| **view_promotion** | popup_id, popup_name, trigger_type |
| **select_promotion** | popup_id, popup_name, cta_url |
| **exit_intent_trigger** | page_path, popup_id |

### 3. **创建转化追踪**

追踪 Exit Intent Popup 的转化效果：

```
Exit Intent CTA 点击率 = popup_cta_clicked (exit) / popup_shown (exit)
会话挽留率 = sessions_with_exit_popup_interaction / total_sessions
```

---

## 🚀 部署清单

- [x] Exit Intent 逻辑优化完成
- [x] GTM 代码集成到 RootLayout
- [x] 防止误触发机制（1秒延迟）
- [x] 详细日志记录
- [ ] 执行 Supabase 数据库迁移（display_frequency 字段）
- [ ] 部署到 Vercel
- [ ] 测试 Exit Intent 触发
- [ ] 验证 GTM 加载
- [ ] 配置 GTM 自定义事件（可选）

---

## 📞 故障排查

### Exit Intent 不触发？

1. **检查浏览器控制台日志**
   ```javascript
   [Popup] Exit intent trigger
   [Popup] Exit intent detected!
   ```

2. **确认触发条件**
   - 等待页面加载 1 秒后
   - 鼠标移动到浏览器顶部（Y <= 0）
   - 不是页面内部元素悬停

3. **检查 Display Frequency**
   - 如果是 `once-per-session`，清除 sessionStorage
   - 如果是 `once-per-day`，清除 localStorage

### GTM 不加载？

1. **检查 Network 请求**
   ```
   Status: 200
   URL: www.googletagmanager.com/gtm.js?id=GTM-KX9XC2KJ
   ```

2. **验证容器 ID**
   ```typescript
   GTM-KX9XC2KJ ✅
   ```

3. **检查 CSP（内容安全策略）**
   确保没有阻止 GTM 域名

---

## 📚 相关文档

- [DATABASE_MIGRATION_DISPLAY_FREQUENCY.md](./DATABASE_MIGRATION_DISPLAY_FREQUENCY.md)
- [POPUP_INCLUDE_EXCLUDE_GUIDE.md](./POPUP_INCLUDE_EXCLUDE_GUIDE.md)
- [GTM 官方文档](https://developers.google.com/tag-manager)
- [Exit Intent 最佳实践](https://www.optimizely.com/optimization-glossary/exit-intent-popup/)

---

**最后更新**: 2024-12-25
**作者**: Claude
**项目**: AutoSaver Blog & Insurance
