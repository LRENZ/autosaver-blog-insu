# 🔄 Supabase 数据库迁移指南

## 📋 变更概述

### 新增字段

为 `popups` 表添加两个新字段以支持更灵活的页面显示规则：

| 字段名 | 类型 | 说明 | 可空 | 默认值 |
|--------|------|------|------|--------|
| `include_pages` | TEXT | 包含的页面路径（逗号分隔） | YES | NULL |
| `exclude_pages` | TEXT | 排除的页面路径（逗号分隔） | YES | NULL |

### 向后兼容

- ✅ 保留原有的 `display_pages` 字段（向后兼容）
- ✅ 新字段为可空字段，不影响现有数据
- ✅ 代码支持自动回退到 `display_pages` 逻辑

---

## 🚀 执行迁移

### 方法 1: Supabase Dashboard（推荐）

#### 步骤 1: 登录 Supabase

```
https://supabase.com/dashboard
```

#### 步骤 2: 进入 SQL Editor

1. 选择项目: `autosaver-blog-insu`
2. 点击左侧菜单 **SQL Editor**
3. 点击 **New query**

#### 步骤 3: 执行迁移 SQL

复制并执行以下 SQL：

```sql
-- 迁移: 添加 include_pages 和 exclude_pages 字段到 popups 表
-- 执行时间: 2024-12-14
-- 影响: 支持更精细的页面显示控制

-- 1. 添加 include_pages 字段
ALTER TABLE popups 
ADD COLUMN IF NOT EXISTS include_pages TEXT;

-- 2. 添加 exclude_pages 字段
ALTER TABLE popups 
ADD COLUMN IF NOT EXISTS exclude_pages TEXT;

-- 3. 添加注释
COMMENT ON COLUMN popups.include_pages IS '包含的页面路径，逗号分隔。支持通配符 /* 。例如: /, /blog/*, /location/california';
COMMENT ON COLUMN popups.exclude_pages IS '排除的页面路径，逗号分隔。支持通配符 /* 。优先级高于 include_pages。例如: /admin/*, /checkout';

-- 4. 验证迁移
SELECT 
    column_name, 
    data_type, 
    is_nullable 
FROM information_schema.columns 
WHERE table_name = 'popups' 
    AND column_name IN ('include_pages', 'exclude_pages');
```

#### 步骤 4: 验证结果

执行后应该看到：

```
column_name      | data_type | is_nullable
-----------------+-----------+-------------
include_pages    | text      | YES
exclude_pages    | text      | YES
```

✅ 如果看到这两行，迁移成功！

---

### 方法 2: 使用 Supabase CLI

如果你安装了 Supabase CLI：

```bash
# 1. 登录 Supabase
npx supabase login

# 2. 链接项目
npx supabase link --project-ref your-project-ref

# 3. 创建迁移文件
npx supabase migration new add_popup_include_exclude_pages

# 4. 编辑迁移文件 (supabase/migrations/xxxxx_add_popup_include_exclude_pages.sql)
# 粘贴上面的 SQL

# 5. 推送到 Supabase
npx supabase db push
```

---

## 📊 数据库 Schema 对比

### 迁移前

```sql
CREATE TABLE popups (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    image_url TEXT,
    cta_text TEXT NOT NULL,
    cta_url TEXT NOT NULL,
    trigger_type TEXT NOT NULL,
    trigger_value INTEGER,
    display_pages TEXT NOT NULL,  -- 旧字段
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 迁移后 ✅

```sql
CREATE TABLE popups (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    image_url TEXT,
    cta_text TEXT NOT NULL,
    cta_url TEXT NOT NULL,
    trigger_type TEXT NOT NULL,
    trigger_value INTEGER,
    display_pages TEXT NOT NULL,     -- 保留（向后兼容）
    include_pages TEXT,               -- 新增 ✅
    exclude_pages TEXT,               -- 新增 ✅
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎯 使用示例

### 示例 1: 只在首页显示

**配置**:
```
include_pages: /
exclude_pages: (空)
```

**效果**: Popup 只在首页 (`/`) 显示

---

### 示例 2: 所有博客文章显示

**配置**:
```
include_pages: /blog/*
exclude_pages: (空)
```

**效果**: Popup 在所有 `/blog/...` 路径显示

---

### 示例 3: 全站显示，但排除管理页面

**配置**:
```
include_pages: *
exclude_pages: /admin/*, /login
```

**效果**: 
- ✅ 在所有页面显示
- ❌ 不在 `/admin/...` 路径显示
- ❌ 不在 `/login` 页面显示

---

### 示例 4: 特定页面显示

**配置**:
```
include_pages: /, /blog/special-offer, /location/california
exclude_pages: (空)
```

**效果**: 只在这三个页面显示

---

### 示例 5: 向后兼容（使用旧字段）

**配置**:
```
display_pages: all
include_pages: (空)
exclude_pages: (空)
```

**效果**: 使用旧的 `display_pages` 逻辑，在所有页面显示

---

## 🔍 验证迁移

### 1. 检查字段是否存在

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'popups';
```

### 2. 查看现有 Popup 数据

```sql
SELECT 
    id,
    name,
    display_pages,
    include_pages,
    exclude_pages,
    status
FROM popups;
```

### 3. 测试插入新数据

```sql
INSERT INTO popups (
    id, name, title, content, 
    cta_text, cta_url, 
    trigger_type, trigger_value,
    display_pages, include_pages, exclude_pages,
    status
) VALUES (
    'popup_test_include_exclude',
    'Test Popup',
    'Test Title',
    'Test content',
    'Click Me',
    'https://example.com',
    'time',
    5,
    'all',
    '/blog/*',
    '/admin/*',
    'active'
);

-- 验证插入
SELECT * FROM popups WHERE id = 'popup_test_include_exclude';

-- 清理测试数据
DELETE FROM popups WHERE id = 'popup_test_include_exclude';
```

---

## 🐛 常见问题

### Q1: 迁移失败，提示字段已存在

**错误信息**:
```
ERROR: column "include_pages" of relation "popups" already exists
```

**解决方案**:
这说明字段已经存在，迁移已经执行过了。可以跳过此步骤。

**验证**:
```sql
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'popups' AND column_name IN ('include_pages', 'exclude_pages');
```

---

### Q2: 现有 Popup 会受影响吗？

**答案**: ❌ 不会！

- 新字段为 NULL，代码会自动使用 `display_pages` 逻辑
- 完全向后兼容
- 不需要修改现有数据

---

### Q3: 如何更新现有 Popup 使用新字段？

**方法**: 在管理后台编辑 Popup

1. 登录: `/admin/login`
2. 进入: `/admin/popups`
3. 编辑现有 Popup
4. 填写 "Include Pages" 和 "Exclude Pages"
5. 保存

**或直接在 Supabase 更新**:
```sql
UPDATE popups 
SET 
    include_pages = '/blog/*',
    exclude_pages = '/admin/*'
WHERE id = 'popup_default_urgency';
```

---

### Q4: 如果不执行迁移会怎样？

**影响**:
- ❌ 创建/编辑 Popup 时会报错（字段不存在）
- ❌ 无法使用新的 include/exclude 功能
- ✅ 现有功能继续工作（如果不编辑 Popup）

**建议**: 尽快执行迁移以避免错误

---

## 📝 回滚迁移（如果需要）

如果需要回滚迁移：

```sql
-- 警告: 这会删除新字段和所有相关数据
-- 仅在确定需要回滚时执行

ALTER TABLE popups DROP COLUMN IF EXISTS include_pages;
ALTER TABLE popups DROP COLUMN IF EXISTS exclude_pages;
```

---

## ✅ 迁移检查清单

完成迁移后，请确认：

- [ ] 在 Supabase Dashboard 执行了 SQL
- [ ] 验证查询返回两个新字段
- [ ] 测试在管理后台创建新 Popup
- [ ] 测试编辑现有 Popup
- [ ] 验证前端 Popup 显示正常
- [ ] 检查控制台无错误

---

## 🔗 相关文档

- **Supabase SQL Editor**: https://supabase.com/dashboard/project/_/sql
- **Popup 功能说明**: 见 `POPUP_INCLUDE_EXCLUDE_GUIDE.md`
- **代码实现**: 
  - `lib/types.ts` - 类型定义
  - `components/Popup.tsx` - 显示逻辑
  - `components/admin/PopupForm.tsx` - 表单界面

---

**迁移创建时间**: 2024-12-14  
**迁移状态**: ⏳ 待执行  
**向后兼容**: ✅ 是  
**数据丢失风险**: ❌ 无
