# 🔄 Popup Display Frequency 数据库迁移

## 📋 变更概述

为 `popups` 表添加 `display_frequency` 字段，支持控制 Popup 显示频率。

### 新增字段

| 字段名 | 类型 | 说明 | 可空 | 默认值 |
|--------|------|------|------|--------|
| `display_frequency` | TEXT | 显示频率控制 | YES | 'once-per-session' |

### 支持的值

| 值 | 说明 | 存储方式 | 用途 |
|----|------|----------|------|
| `once-per-session` | 每个会话一次 | sessionStorage | 默认值，用户关闭浏览器前只显示一次 |
| `every-page` | 每次页面加载 | 不存储 | 每次页面加载都显示（根据触发规则） |
| `once-per-day` | 每天一次 | localStorage (24h) | 24小时内只显示一次 |
| `always` | 总是显示 | 不存储 | 测试用，每次触发都显示 |

---

## 🚀 执行迁移

### SQL 迁移脚本

```sql
-- ============================================
-- Popup Display Frequency Migration
-- 执行时间: 2024-12-14
-- 影响: 添加显示频率控制功能
-- ============================================

-- 1. 添加 display_frequency 字段
ALTER TABLE popups 
ADD COLUMN IF NOT EXISTS display_frequency TEXT DEFAULT 'once-per-session';

-- 2. 添加字段注释
COMMENT ON COLUMN popups.display_frequency IS '显示频率: once-per-session (会话一次), every-page (每次加载), once-per-day (每天一次), always (总是显示)';

-- 3. 添加检查约束（可选，确保数据有效性）
ALTER TABLE popups 
ADD CONSTRAINT check_display_frequency 
CHECK (display_frequency IN ('once-per-session', 'every-page', 'once-per-day', 'always'));

-- 4. 更新现有记录为默认值（如果需要）
UPDATE popups 
SET display_frequency = 'once-per-session' 
WHERE display_frequency IS NULL;

-- 5. 验证迁移
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'popups' 
    AND column_name = 'display_frequency';

-- 6. 查看约束
SELECT 
    conname AS constraint_name,
    contype AS constraint_type,
    pg_get_constraintdef(oid) AS definition
FROM pg_constraint
WHERE conname = 'check_display_frequency';

-- 7. 查看现有数据
SELECT 
    id,
    name,
    display_frequency,
    status
FROM popups;
```

---

## 📖 执行步骤

### 方法 1: Supabase Dashboard（推荐）

1. **登录 Supabase**
   ```
   https://supabase.com/dashboard
   ```

2. **进入 SQL Editor**
   - 选择项目
   - 左侧菜单 → SQL Editor
   - 点击 "New query"

3. **复制并执行 SQL**
   - 复制上面的完整 SQL 脚本
   - 粘贴到编辑器
   - 点击 "Run"

4. **验证结果**
   ```
   应该看到:
   column_name       | data_type | is_nullable | column_default
   ------------------+-----------+-------------+-------------------------
   display_frequency | text      | YES         | 'once-per-session'
   ```

---

### 方法 2: 分步执行（推荐新手）

如果担心一次执行太多，可以分步执行：

#### 步骤 1: 添加字段
```sql
ALTER TABLE popups 
ADD COLUMN IF NOT EXISTS display_frequency TEXT DEFAULT 'once-per-session';
```

#### 步骤 2: 验证字段已添加
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'popups' 
    AND column_name = 'display_frequency';
```

#### 步骤 3: 添加注释
```sql
COMMENT ON COLUMN popups.display_frequency IS '显示频率: once-per-session, every-page, once-per-day, always';
```

#### 步骤 4: 添加约束（可选）
```sql
ALTER TABLE popups 
ADD CONSTRAINT check_display_frequency 
CHECK (display_frequency IN ('once-per-session', 'every-page', 'once-per-day', 'always'));
```

#### 步骤 5: 更新现有数据
```sql
UPDATE popups 
SET display_frequency = 'once-per-session' 
WHERE display_frequency IS NULL;
```

---

## 🔍 验证迁移

### 1. 检查字段存在

```sql
SELECT * FROM information_schema.columns 
WHERE table_name = 'popups' 
    AND column_name = 'display_frequency';
```

**预期结果**: 返回一行记录

---

### 2. 检查约束

```sql
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conname = 'check_display_frequency';
```

**预期结果**: 显示约束定义

---

### 3. 测试插入数据

```sql
-- 测试有效值
INSERT INTO popups (
    id, name, title, content, 
    cta_text, cta_url, 
    trigger_type, trigger_value,
    display_pages, display_frequency,
    status
) VALUES (
    'popup_test_freq',
    'Test Popup',
    'Test Title',
    'Test content',
    'Click Me',
    'https://example.com',
    'time',
    5,
    'all',
    'every-page',  -- 测试新字段
    'active'
);

-- 验证插入
SELECT * FROM popups WHERE id = 'popup_test_freq';

-- 清理测试数据
DELETE FROM popups WHERE id = 'popup_test_freq';
```

---

### 4. 测试无效值（应该失败）

```sql
-- 这应该失败（如果添加了约束）
INSERT INTO popups (
    id, name, title, content, 
    cta_text, cta_url, 
    trigger_type, display_pages,
    display_frequency,  -- 无效值
    status
) VALUES (
    'popup_test_invalid',
    'Test', 'Test', 'Test',
    'Click', 'https://example.com',
    'time', 'all',
    'invalid-frequency',  -- ❌ 应该失败
    'active'
);

-- 预期: ERROR: new row violates check constraint
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
    display_pages TEXT NOT NULL,
    include_pages TEXT,
    exclude_pages TEXT,
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
    display_pages TEXT NOT NULL,
    include_pages TEXT,
    exclude_pages TEXT,
    display_frequency TEXT DEFAULT 'once-per-session',  -- ✅ 新增
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT check_display_frequency CHECK (
        display_frequency IN ('once-per-session', 'every-page', 'once-per-day', 'always')
    )
);
```

---

## 💡 功能说明

### Once Per Session（默认）

**行为**: 用户在一个浏览器会话中只看到一次

**实现**:
```javascript
// 检查
const shown = sessionStorage.getItem(`popup_${id}_shown`)
if (shown) return; // 不显示

// 标记
sessionStorage.setItem(`popup_${id}_shown`, 'true')
```

**清除**: 关闭所有浏览器标签页

**适用场景**:
- 欢迎消息
- 首次访问提示
- 优惠券弹窗

---

### Every Page Load

**行为**: 每次页面加载都显示（根据触发规则）

**实现**:
```javascript
// 不检查存储，直接显示
// 不存储任何标记
```

**清除**: 无需清除

**适用场景**:
- 重要公告
- 紧急通知
- Cookie 同意

---

### Once Per Day

**行为**: 24小时内只显示一次

**实现**:
```javascript
// 检查
const lastShown = localStorage.getItem(`popup_${id}_last_shown`)
const now = Date.now()
const oneDayMs = 24 * 60 * 60 * 1000
if (now - lastShown < oneDayMs) return; // 不显示

// 标记
localStorage.setItem(`popup_${id}_last_shown`, Date.now().toString())
```

**清除**: 24小时后自动过期，或手动清除 localStorage

**适用场景**:
- 每日提醒
- 定期促销
- 签到提示

---

### Always（测试用）

**行为**: 每次触发都显示

**实现**:
```javascript
// 不检查存储，直接显示
// 不存储任何标记
```

**清除**: 无需清除

**适用场景**:
- 开发测试
- 调试 Popup
- 临时展示

---

## 🎯 使用示例

### 示例 1: 欢迎新用户（默认）

```javascript
Display Frequency: once-per-session
Trigger Type: onload
Trigger Value: 0

效果: 用户首次访问时立即显示，会话期间不再显示
```

---

### 示例 2: 页面导航提示

```javascript
Display Frequency: every-page
Trigger Type: time
Trigger Value: 2

效果: 每次访问新页面，2秒后显示
```

---

### 示例 3: 每日签到提醒

```javascript
Display Frequency: once-per-day
Trigger Type: onload
Trigger Value: 1

效果: 每天访问时显示一次，24小时内不重复
```

---

### 示例 4: 测试 Popup

```javascript
Display Frequency: always
Trigger Type: time
Trigger Value: 3

效果: 每次访问都在3秒后显示，方便测试
```

---

## 🐛 常见问题

### Q1: 迁移后现有 Popup 会怎样？

**答案**: 自动使用默认值 `once-per-session`

- ✅ 现有 Popup 继续工作
- ✅ 行为与之前一致
- ✅ 不需要手动更新

---

### Q2: 如何更改现有 Popup 的频率？

**方法 1**: 管理后台
1. 登录 `/admin/login`
2. 进入 `/admin/popups`
3. 编辑 Popup
4. 选择 Display Frequency
5. 保存

**方法 2**: SQL 更新
```sql
UPDATE popups 
SET display_frequency = 'every-page'
WHERE id = 'popup_default_urgency';
```

---

### Q3: Once Per Day 如何重置？

**方法 1**: 浏览器控制台
```javascript
// 查看当前时间戳
localStorage.getItem('popup_YOUR_ID_last_shown')

// 删除记录
localStorage.removeItem('popup_YOUR_ID_last_shown')

// 或清除所有
localStorage.clear()
```

**方法 2**: 等待24小时自动过期

---

### Q4: 约束添加失败？

**错误**: `constraint already exists`

**原因**: 约束已经存在

**解决**: 
```sql
-- 先删除旧约束
ALTER TABLE popups DROP CONSTRAINT IF EXISTS check_display_frequency;

-- 重新添加
ALTER TABLE popups 
ADD CONSTRAINT check_display_frequency 
CHECK (display_frequency IN ('once-per-session', 'every-page', 'once-per-day', 'always'));
```

---

## 🔄 回滚迁移

如果需要回滚：

```sql
-- ⚠️ 警告: 这会删除字段和所有相关数据

-- 1. 删除约束
ALTER TABLE popups DROP CONSTRAINT IF EXISTS check_display_frequency;

-- 2. 删除字段
ALTER TABLE popups DROP COLUMN IF EXISTS display_frequency;

-- 3. 验证
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'popups' AND column_name = 'display_frequency';
-- 应该返回空结果
```

---

## ✅ 迁移检查清单

完成迁移后，请确认：

- [ ] SQL 脚本执行成功
- [ ] `display_frequency` 字段存在
- [ ] 默认值为 `'once-per-session'`
- [ ] 约束添加成功（可选）
- [ ] 现有 Popup 数据完整
- [ ] 测试插入新 Popup
- [ ] 测试编辑现有 Popup
- [ ] 前端显示正常

---

## 📚 相关文档

- **功能使用指南**: 见代码注释和管理界面
- **Popup 组件**: `components/Popup.tsx`
- **表单组件**: `components/admin/PopupForm.tsx`
- **数据操作**: `lib/popup-actions.ts`

---

**迁移创建时间**: 2024-12-14  
**迁移状态**: ⏳ 待执行  
**向后兼容**: ✅ 是  
**数据丢失风险**: ❌ 无  
**默认值**: `'once-per-session'`
