# 🔄 完整数据库迁移指南

## 📋 需要执行的迁移

当前项目需要执行 **2 个数据库迁移**：

1. ✅ **Include/Exclude Pages** - 添加页面规则控制
2. ✅ **Display Frequency** - 添加显示频率控制

---

## 🚀 一键执行所有迁移（推荐）

### 完整迁移 SQL 脚本

复制以下完整脚本到 Supabase SQL Editor 执行：

```sql
-- ============================================
-- AutoSaver Blog - Popups 表完整迁移
-- 执行时间: 2024-12-14
-- 包含: Include/Exclude Pages + Display Frequency
-- ============================================

BEGIN;

-- ============================================
-- 第一部分: Include/Exclude Pages
-- ============================================

-- 1.1 添加 include_pages 字段
ALTER TABLE popups 
ADD COLUMN IF NOT EXISTS include_pages TEXT;

-- 1.2 添加 exclude_pages 字段
ALTER TABLE popups 
ADD COLUMN IF NOT EXISTS exclude_pages TEXT;

-- 1.3 添加注释
COMMENT ON COLUMN popups.include_pages IS '包含的页面路径，逗号分隔。支持通配符 /* 。例如: /, /blog/*, /location/california';
COMMENT ON COLUMN popups.exclude_pages IS '排除的页面路径，逗号分隔。支持通配符 /* 。优先级高于 include_pages。例如: /admin/*, /checkout';

-- ============================================
-- 第二部分: Display Frequency
-- ============================================

-- 2.1 添加 display_frequency 字段
ALTER TABLE popups 
ADD COLUMN IF NOT EXISTS display_frequency TEXT DEFAULT 'once-per-session';

-- 2.2 添加注释
COMMENT ON COLUMN popups.display_frequency IS '显示频率: once-per-session (会话一次), every-page (每次加载), once-per-day (每天一次), always (总是显示)';

-- 2.3 添加检查约束
ALTER TABLE popups 
DROP CONSTRAINT IF EXISTS check_display_frequency;

ALTER TABLE popups 
ADD CONSTRAINT check_display_frequency 
CHECK (display_frequency IN ('once-per-session', 'every-page', 'once-per-day', 'always'));

-- 2.4 更新现有记录为默认值
UPDATE popups 
SET display_frequency = 'once-per-session' 
WHERE display_frequency IS NULL;

-- ============================================
-- 验证迁移结果
-- ============================================

-- 3.1 检查所有新字段
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'popups' 
    AND column_name IN ('include_pages', 'exclude_pages', 'display_frequency')
ORDER BY column_name;

-- 3.2 查看约束
SELECT 
    conname AS constraint_name,
    pg_get_constraintdef(oid) AS definition
FROM pg_constraint
WHERE conname = 'check_display_frequency';

-- 3.3 查看现有数据
SELECT 
    id,
    name,
    display_pages,
    include_pages,
    exclude_pages,
    display_frequency,
    status
FROM popups;

COMMIT;

-- ============================================
-- 迁移完成！
-- ============================================
```

---

## 📖 执行步骤

### 步骤 1: 登录 Supabase

```
https://supabase.com/dashboard
```

### 步骤 2: 进入 SQL Editor

1. 选择项目: `autosaver-blog-insu`
2. 左侧菜单 → **SQL Editor**
3. 点击 **New query**

### 步骤 3: 执行迁移

1. **复制** 上面的完整 SQL 脚本
2. **粘贴** 到 SQL Editor
3. 点击 **Run** 或按 `Cmd/Ctrl + Enter`

### 步骤 4: 验证结果

执行后应该看到：

```
column_name       | data_type | is_nullable | column_default
------------------+-----------+-------------+-------------------------
display_frequency | text      | YES         | 'once-per-session'
exclude_pages     | text      | YES         | NULL
include_pages     | text      | YES         | NULL

constraint_name           | definition
--------------------------+--------------------------------------------------
check_display_frequency   | CHECK ((display_frequency = ANY (...)))

(现有 popups 数据...)
```

✅ **如果看到这些结果，迁移成功！**

---

## 🎯 迁移内容详解

### 新增字段总览

| 字段名 | 类型 | 默认值 | 可空 | 说明 |
|--------|------|--------|------|------|
| `include_pages` | TEXT | NULL | YES | 包含的页面路径 |
| `exclude_pages` | TEXT | NULL | YES | 排除的页面路径 |
| `display_frequency` | TEXT | 'once-per-session' | YES | 显示频率 |

---

### Include/Exclude Pages 功能

**用途**: 精确控制 Popup 在哪些页面显示

**支持的语法**:
```
/                    - 仅首页
/blog/*              - 所有博客文章
/location/california - 特定页面
*                    - 所有页面
```

**优先级**: `exclude > include > displayPages`

**示例配置**:
```
Include: /blog/*
Exclude: /blog/private, /admin/*

效果: 所有博客显示，但排除 private 和 admin
```

---

### Display Frequency 功能

**用途**: 控制 Popup 显示频率

**支持的模式**:

| 模式 | 说明 | 存储方式 |
|------|------|----------|
| `once-per-session` | 会话一次 | sessionStorage |
| `every-page` | 每次加载 | 不存储 |
| `once-per-day` | 每天一次 | localStorage (24h) |
| `always` | 总是显示 | 不存储 |

**示例配置**:
```
Frequency: once-per-day
Trigger: onload

效果: 每天用户首次访问时显示
```

---

## ✅ 验证清单

迁移完成后，请确认：

### 数据库验证
- [ ] `include_pages` 字段存在
- [ ] `exclude_pages` 字段存在
- [ ] `display_frequency` 字段存在
- [ ] `display_frequency` 默认值为 `'once-per-session'`
- [ ] 约束 `check_display_frequency` 存在
- [ ] 现有 popup 数据完整

### 功能测试
- [ ] 创建新 Popup（测试所有新字段）
- [ ] 编辑现有 Popup
- [ ] 测试 include/exclude 规则
- [ ] 测试不同显示频率
- [ ] 验证控制台日志

### 前端验证
- [ ] Popup 正常显示
- [ ] Include 规则生效
- [ ] Exclude 规则生效
- [ ] Display frequency 工作正常
- [ ] 无控制台错误

---

## 🧪 测试用例

### 测试 1: Include Pages

**配置**:
```
Include Pages: /blog/*
Exclude Pages: (空)
Display Frequency: always
```

**测试**:
- ✅ 访问 `/blog/any-post` - 应该显示
- ❌ 访问 `/` - 不应该显示

---

### 测试 2: Exclude Pages

**配置**:
```
Include Pages: *
Exclude Pages: /admin/*
Display Frequency: always
```

**测试**:
- ✅ 访问 `/` - 应该显示
- ✅ 访问 `/blog/post` - 应该显示
- ❌ 访问 `/admin/popups` - 不应该显示

---

### 测试 3: Display Frequency - Once Per Session

**配置**:
```
Display Frequency: once-per-session
Trigger Type: onload
```

**测试**:
1. 访问首页 - ✅ 显示
2. 导航到其他页面 - ❌ 不显示
3. 刷新页面 - ❌ 不显示
4. 关闭所有标签页
5. 重新打开 - ✅ 显示

---

### 测试 4: Display Frequency - Every Page

**配置**:
```
Display Frequency: every-page
Trigger Type: time
Trigger Value: 3
```

**测试**:
1. 访问首页 - ✅ 3秒后显示
2. 导航到博客 - ✅ 3秒后显示
3. 返回首页 - ✅ 3秒后显示

---

### 测试 5: Display Frequency - Once Per Day

**配置**:
```
Display Frequency: once-per-day
Trigger Type: onload
```

**测试**:
1. 访问首页 - ✅ 显示
2. 刷新页面 - ❌ 不显示（24小时内）
3. 清除 localStorage
4. 刷新页面 - ✅ 显示

---

## 🐛 故障排查

### 问题 1: 迁移失败 - "column already exists"

**原因**: 字段已经存在

**解决**: 忽略此错误，继续下一步

**验证**:
```sql
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'popups' 
    AND column_name IN ('include_pages', 'exclude_pages', 'display_frequency');
```

---

### 问题 2: 约束添加失败

**错误**: `constraint already exists`

**解决**:
```sql
-- 先删除
ALTER TABLE popups DROP CONSTRAINT IF EXISTS check_display_frequency;

-- 重新添加
ALTER TABLE popups 
ADD CONSTRAINT check_display_frequency 
CHECK (display_frequency IN ('once-per-session', 'every-page', 'once-per-day', 'always'));
```

---

### 问题 3: 创建 Popup 时报错

**错误**: `column "display_frequency" does not exist`

**原因**: 迁移未执行或失败

**解决**: 重新执行迁移 SQL

---

### 问题 4: Include/Exclude 不生效

**检查**:
1. 数据库字段已保存
2. 路径格式正确（无多余空格）
3. 通配符格式: `/blog/*` 不是 `/blog*`
4. 查看浏览器控制台日志

---

## 🔄 回滚迁移

如果需要回滚所有更改：

```sql
-- ⚠️ 警告: 这会删除所有新字段和数据

BEGIN;

-- 删除约束
ALTER TABLE popups DROP CONSTRAINT IF EXISTS check_display_frequency;

-- 删除字段
ALTER TABLE popups DROP COLUMN IF EXISTS include_pages;
ALTER TABLE popups DROP COLUMN IF EXISTS exclude_pages;
ALTER TABLE popups DROP COLUMN IF EXISTS display_frequency;

-- 验证
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'popups';

COMMIT;
```

---

## 📚 相关文档

### 详细文档

| 文档 | 说明 |
|------|------|
| `DATABASE_MIGRATION.md` | Include/Exclude 迁移详解 |
| `DATABASE_MIGRATION_DISPLAY_FREQUENCY.md` | Display Frequency 迁移详解 |
| `POPUP_INCLUDE_EXCLUDE_GUIDE.md` | Include/Exclude 使用指南 |
| `COMPLETE_MIGRATION_GUIDE.md` | 本文档 |

### 代码文件

| 文件 | 说明 |
|------|------|
| `lib/types.ts` | 类型定义 |
| `components/Popup.tsx` | Popup 显示逻辑 |
| `components/admin/PopupForm.tsx` | 管理表单 |
| `lib/popup-actions.ts` | 数据库操作 |

---

## 🎉 迁移后的新功能

### 1. 灵活的页面控制

```
场景: 博客营销活动
配置:
  Include: /blog/*
  Exclude: /blog/private
效果: 除了私密文章，所有博客都显示优惠
```

---

### 2. 智能显示频率

```
场景: 每日签到提醒
配置:
  Frequency: once-per-day
  Trigger: onload
效果: 每天用户首次访问时提醒签到
```

---

### 3. 复杂规则组合

```
场景: 全站促销，排除结账流程
配置:
  Include: *
  Exclude: /checkout/*, /payment/*
  Frequency: once-per-session
效果: 用户会话中看到一次促销，但不影响结账
```

---

## 📞 需要帮助？

### 查看日志

```javascript
// 打开浏览器控制台
// 应该看到详细的 Popup 日志：
[Popup] Initializing popup: { displayFrequency: 'once-per-day', ... }
[Popup] Current path: /blog/my-post
[Popup] Include pages: ['/blog/*']
[Popup] Page is included
[Popup] Display frequency: once-per-day
[Popup] Last shown: 1734123456789
```

---

**迁移准备时间**: 2024-12-14  
**预计执行时间**: 2-5 分钟  
**风险等级**: 低（可安全回滚）  
**向后兼容**: ✅ 完全兼容  
**数据丢失风险**: ❌ 无
