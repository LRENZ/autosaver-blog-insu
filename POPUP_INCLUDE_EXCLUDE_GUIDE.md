# 📌 Popup Include/Exclude 页面规则指南

## 🎯 功能概述

新的 Popup 页面显示规则系统支持：
- ✅ **Include Pages**: 精确控制在哪些页面显示
- ❌ **Exclude Pages**: 排除不想显示的页面
- 🌟 **通配符支持**: 使用 `/*` 匹配子路径
- 🔄 **向后兼容**: 保留原有 `display_pages` 功能

---

## 🔧 字段说明

### 1. Display Pages (Legacy) - 旧字段

**保留用途**: 向后兼容

**支持的值**:
- `all` - 所有页面
- `home` - 首页
- `blog` - 所有博客文章
- `location` - 所有地区页面
- 自定义路径（逗号分隔）

**示例**:
```
all
home, blog
/custom-page, /another-page
```

**优先级**: 最低（如果设置了 include_pages，会使用 include_pages）

---

### 2. Include Pages - 包含页面 ✅

**用途**: 精确指定在哪些页面显示 Popup

**格式**: 逗号分隔的路径列表

**支持通配符**:
- `/` - 仅首页
- `/blog/*` - 所有博客文章
- `/location/*` - 所有地区页面
- `*` - 所有页面

**示例**:
```
/
/blog/*
/, /blog/*, /location/california
*
```

**行为**:
- 如果留空 → 使用 legacy `display_pages` 逻辑
- 如果填写 → 只在指定页面显示

**优先级**: 中（高于 display_pages，低于 exclude_pages）

---

### 3. Exclude Pages - 排除页面 ❌

**用途**: 明确排除不想显示 Popup 的页面

**格式**: 逗号分隔的路径列表

**支持通配符**:
- `/admin/*` - 所有管理页面
- `/checkout` - 结账页面
- `*` - 所有页面（等于禁用）

**示例**:
```
/admin/*
/admin/*, /login, /checkout
*
```

**行为**:
- 如果留空 → 不排除任何页面
- 如果填写 → 这些页面永不显示

**优先级**: 最高（优先于所有其他规则）

---

## 🎮 使用场景

### 场景 1: 只在首页显示欢迎 Popup

**配置**:
```
Display Pages: all (或任意)
Include Pages: /
Exclude Pages: (空)
```

**效果**:
- ✅ 在 `/` 显示
- ❌ 在其他所有页面不显示

---

### 场景 2: 博客营销 Popup

**配置**:
```
Display Pages: all (或任意)
Include Pages: /blog/*
Exclude Pages: (空)
```

**效果**:
- ✅ 在所有博客文章显示 (`/blog/...`)
- ❌ 在首页、地区页面不显示

---

### 场景 3: 全站显示，但排除管理区域

**配置**:
```
Display Pages: all (或任意)
Include Pages: *
Exclude Pages: /admin/*, /login
```

**效果**:
- ✅ 在所有公开页面显示
- ❌ 在管理后台不显示 (`/admin/...`)
- ❌ 在登录页不显示 (`/login`)

---

### 场景 4: 特定地区优惠 Popup

**配置**:
```
Display Pages: all (或任意)
Include Pages: /location/california, /location/texas
Exclude Pages: (空)
```

**效果**:
- ✅ 在加州页面显示
- ✅ 在德州页面显示
- ❌ 在其他地区页面不显示

---

### 场景 5: 复杂规则 - 博客但排除特定文章

**配置**:
```
Display Pages: all (或任意)
Include Pages: /blog/*
Exclude Pages: /blog/private-post, /blog/draft-article
```

**效果**:
- ✅ 在大部分博客文章显示
- ❌ 在 `/blog/private-post` 不显示
- ❌ 在 `/blog/draft-article` 不显示

---

### 场景 6: 向后兼容 - 使用旧规则

**配置**:
```
Display Pages: all
Include Pages: (空)
Exclude Pages: (空)
```

**效果**:
- ✅ 使用旧的 `display_pages` 逻辑
- ✅ 在所有页面显示

---

## 🔄 规则优先级

```
1. Exclude Pages (最高优先级)
   ↓ 检查是否在排除列表
   ↓ 如果是 → 不显示 ❌
   ↓ 如果否 → 继续检查

2. Include Pages
   ↓ 如果设置了 include_pages
   ↓ 检查是否在包含列表
   ↓ 如果是 → 显示 ✅
   ↓ 如果否 → 不显示 ❌

3. Display Pages (Legacy)
   ↓ 如果没有设置 include_pages
   ↓ 使用旧逻辑判断
   ↓ 根据规则显示 ✅ 或不显示 ❌
```

---

## 📝 通配符语法

### 精确匹配

```
/
/blog
/location/california
```

**匹配**:
- `/` → ✅ 首页
- `/blog` → ✅ /blog 页面
- `/location/california` → ✅ 加州页面

**不匹配**:
- `/blog/post-1` → ❌
- `/location/california/subpage` → ❌

---

### 前缀匹配（无通配符）

```
/blog
/location
```

**匹配**:
- `/blog` → ✅
- `/blog/post-1` → ✅ (自动匹配子路径)
- `/location/california` → ✅ (自动匹配子路径)

**代码逻辑**: 
```typescript
currentPath === page || currentPath.startsWith(page + '/')
```

---

### 通配符匹配

```
/blog/*
/location/*
/admin/*
*
```

**匹配**:
- `/blog/*` → ✅ 所有 `/blog/...` 路径
- `/location/*` → ✅ 所有 `/location/...` 路径
- `*` → ✅ 所有页面

**不匹配**:
- `/blog/*` + `/` → ❌ (首页不匹配)
- `/blog/*` + `/location/california` → ❌

---

## 🎨 管理界面

### 表单字段

#### Display on Pages (Legacy)
```
输入框: [all, home, blog, location, /custom-path]
提示: Legacy field. Use Include/Exclude Pages below.
```

#### 📌 Include Pages
```
输入框: [/, /blog/*, /location/california]
提示: ✅ Show popup ONLY on these pages. Supports wildcards: /*
示例: / (home only), /blog/* (all blog posts), * (all pages)
```

#### 🚫 Exclude Pages
```
输入框: [/admin/*, /login]
提示: ❌ NEVER show popup on these pages. Takes priority over include rules.
示例: /admin/* (all admin pages), /checkout (checkout page)
```

---

## 💻 代码实现

### 1. 类型定义 (`lib/types.ts`)

```typescript
export interface Popup {
  // ... 其他字段
  displayPages: string;     // Legacy
  includePages?: string;    // 新增
  excludePages?: string;    // 新增
}
```

---

### 2. 显示逻辑 (`components/Popup.tsx`)

```typescript
// 1. 检查 exclude (最高优先级)
if (excludePages) {
  const excludedPaths = excludePages.split(',').map(p => p.trim())
  const isExcluded = excludedPaths.some(page => {
    if (page === '*') return true
    if (page.endsWith('/*')) {
      const prefix = page.slice(0, -2)
      return currentPath.startsWith(prefix)
    }
    return currentPath === page || currentPath.startsWith(page + '/')
  })
  
  if (isExcluded) return // 不显示
}

// 2. 检查 include
if (includePages) {
  const includedPaths = includePages.split(',').map(p => p.trim())
  const isIncluded = includedPaths.some(page => {
    if (page === '*') return true
    if (page === '/') return currentPath === '/'
    if (page.endsWith('/*')) {
      const prefix = page.slice(0, -2)
      return currentPath.startsWith(prefix)
    }
    return currentPath === page || currentPath.startsWith(page + '/')
  })
  
  if (!isIncluded) return // 不显示
} else {
  // 3. 使用 legacy displayPages
  // ... 旧逻辑
}
```

---

### 3. 数据库字段

```sql
-- popups 表
include_pages TEXT,  -- 可空，逗号分隔
exclude_pages TEXT   -- 可空，逗号分隔
```

---

## ✅ 测试清单

### 基础测试

- [ ] 创建新 Popup 并设置 include_pages
- [ ] 验证只在指定页面显示
- [ ] 设置 exclude_pages
- [ ] 验证排除页面不显示
- [ ] 测试通配符 `/*`
- [ ] 测试 `*` (所有页面)

### 边缘情况

- [ ] include 和 exclude 同时设置（exclude 优先）
- [ ] 留空 include/exclude（使用 legacy）
- [ ] 无效路径处理
- [ ] 控制台日志验证

### 浏览器测试

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

---

## 🐛 故障排除

### 问题 1: Popup 不显示

**检查**:
```javascript
// 打开控制台查看日志
[Popup] Current path: /blog/my-post
[Popup] Include pages: ['/blog/*']
[Popup] Page is included
```

**常见原因**:
- include_pages 设置错误
- exclude_pages 排除了当前页面
- sessionStorage 已记录为已显示

**解决**:
```javascript
// 清除 sessionStorage
sessionStorage.clear()
// 刷新页面
location.reload()
```

---

### 问题 2: Exclude 不生效

**检查**:
- 确保 exclude_pages 字段已保存
- 检查路径格式（是否有多余空格）
- 查看控制台日志

---

### 问题 3: 通配符不工作

**常见错误**:
```
/blog*     ❌ 错误（缺少 /）
/blog/*    ✅ 正确
```

---

## 📚 相关文档

- **数据库迁移**: `DATABASE_MIGRATION.md`
- **图片缓存修复**: `IMAGE_CACHE_FIX.md`
- **类型定义**: `lib/types.ts`
- **Popup 组件**: `components/Popup.tsx`
- **表单组件**: `components/admin/PopupForm.tsx`

---

**文档创建时间**: 2024-12-14  
**功能状态**: ✅ 已实现  
**向后兼容**: ✅ 是  
**测试状态**: ⏳ 待测试
