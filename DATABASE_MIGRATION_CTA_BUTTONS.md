# 🔗 CTA Buttons URL Configuration - Database Migration

## 📋 变更概述

为了支持全站 CTA 按钮的 URL 配置管理，我们创建一个新的 `site_settings` 表来存储可配置的 URL。

### 新建表：`site_settings`

| 字段名 | 类型 | 说明 | 可空 | 默认值 |
|--------|------|------|------|--------|
| `id` | TEXT | 主键 | NO | - |
| `key` | TEXT | 配置键名（唯一） | NO | - |
| `value` | TEXT | 配置值 | NO | - |
| `description` | TEXT | 配置描述 | YES | NULL |
| `category` | TEXT | 配置分类 | NO | 'general' |
| `created_at` | TIMESTAMP | 创建时间 | NO | CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | 更新时间 | NO | CURRENT_TIMESTAMP |

### CTA 按钮配置项

| Key | Value (默认值) | Description | 使用位置 |
|-----|---------------|-------------|---------|
| `cta_get_quote_url` | `#quote` | Get Quote 按钮 URL | Header |
| `cta_get_my_free_quote_url` | `#quote` | Get My Free Quote 按钮 URL | Homepage Hero |
| `cta_get_your_free_quote_url` | `#quote` | Get Your Free Quote Now 按钮 URL | Homepage Final CTA, Location Page |
| `cta_compare_rates_url` | `#quote` | Compare Rates Now 按钮 URL | Location Page Form |
| `cta_learn_more_url` | `/` | Learn More 按钮 URL | Location & Blog Pages |

---

## 🚀 执行迁移

### SQL 迁移脚本

在 **Supabase SQL Editor** 中执行以下脚本：

```sql
-- ============================================
-- Site Settings Table Creation
-- Date: 2024-12-25
-- Purpose: Store configurable CTA button URLs
-- ============================================

-- 1. Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL DEFAULT 'general',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Add comment to table
COMMENT ON TABLE site_settings IS 'Store site-wide configuration settings';

-- 3. Add comments to columns
COMMENT ON COLUMN site_settings.key IS 'Unique configuration key';
COMMENT ON COLUMN site_settings.value IS 'Configuration value';
COMMENT ON COLUMN site_settings.description IS 'Human-readable description';
COMMENT ON COLUMN site_settings.category IS 'Setting category (e.g., cta_buttons, general, seo)';

-- 4. Create index on key for faster lookups
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);
CREATE INDEX IF NOT EXISTS idx_site_settings_category ON site_settings(category);

-- 5. Insert default CTA button URLs
INSERT INTO site_settings (key, value, description, category) VALUES
    ('cta_get_quote_url', '#quote', 'Header "Get Quote" button URL', 'cta_buttons'),
    ('cta_get_my_free_quote_url', '#quote', 'Homepage Hero "Get My Free Quote" button URL', 'cta_buttons'),
    ('cta_get_your_free_quote_url', '#quote', 'Homepage & Location "Get Your Free Quote Now" button URL', 'cta_buttons'),
    ('cta_compare_rates_url', '#quote', 'Location page "Compare Rates Now" button URL', 'cta_buttons'),
    ('cta_learn_more_url', '/', 'Blog & Location "Learn More" button URL', 'cta_buttons')
ON CONFLICT (key) DO NOTHING;

-- 6. Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_site_settings_updated_at 
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 7. Verification queries
SELECT 
    key,
    value,
    description,
    category,
    created_at
FROM site_settings
WHERE category = 'cta_buttons'
ORDER BY key;

-- 8. Count total settings
SELECT 
    category,
    COUNT(*) as setting_count
FROM site_settings
GROUP BY category;
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
   - 查看输出，应该显示 5 条 CTA 按钮配置
   - 确认每条记录都有正确的 key, value, description

---

## ✅ 验证迁移

### 1. 检查表结构

```sql
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'site_settings'
ORDER BY ordinal_position;
```

### 2. 查看所有 CTA 配置

```sql
SELECT * FROM site_settings 
WHERE category = 'cta_buttons'
ORDER BY key;
```

预期输出：
```
key                              | value    | description
---------------------------------|----------|---------------------------
cta_compare_rates_url            | #quote   | Location page "Compare..."
cta_get_my_free_quote_url        | #quote   | Homepage Hero "Get My..."
cta_get_quote_url                | #quote   | Header "Get Quote"...
cta_get_your_free_quote_url      | #quote   | Homepage & Location...
cta_learn_more_url               | /        | Blog & Location "Learn..."
```

### 3. 测试更新功能

```sql
-- 测试更新
UPDATE site_settings 
SET value = 'https://example.com/quote'
WHERE key = 'cta_get_quote_url';

-- 验证 updated_at 自动更新
SELECT key, value, updated_at 
FROM site_settings 
WHERE key = 'cta_get_quote_url';
```

---

## 🔄 回滚脚本（如果需要）

```sql
-- 删除触发器
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;

-- 删除函数
DROP FUNCTION IF EXISTS update_updated_at_column();

-- 删除表
DROP TABLE IF EXISTS site_settings;
```

---

## 📊 使用示例

### 在代码中获取配置

```typescript
// lib/settings.ts
export async function getCtaUrl(key: string): Promise<string> {
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .single();
  
  return data?.value || '#quote';
}

// Usage
const getQuoteUrl = await getCtaUrl('cta_get_quote_url');
```

### 在管理后台更新

```typescript
// Admin settings page
await supabase
  .from('site_settings')
  .update({ value: newUrl })
  .eq('key', 'cta_get_quote_url');
```

---

## 🎯 后续步骤

1. ✅ 执行数据库迁移
2. ⏳ 创建 `lib/settings.ts` 服务文件
3. ⏳ 创建管理后台配置页面
4. ⏳ 更新前端组件使用动态 URL
5. ⏳ 测试所有 CTA 按钮
6. ⏳ 部署到 Vercel

---

## ⚠️ 重要提示

1. **先执行迁移**：必须先在 Supabase 中创建表和数据
2. **备份数据**：虽然是新表，但建议养成备份习惯
3. **测试验证**：迁移后立即验证数据正确性
4. **默认值**：所有 CTA 都默认指向 `#quote`（页面内锚点）

---

**迁移版本**: v1.0  
**创建日期**: 2024-12-25  
**作者**: Claude  
**项目**: AutoSaver Blog & Insurance
