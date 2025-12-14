# 📚 Supabase 数据库设置说明

## 🚀 快速设置（5分钟）

### 第1步：打开 Supabase SQL Editor

1. 访问：https://supabase.com/dashboard/project/vufravtnkmhpwriskiev/editor
2. 点击左侧 "SQL Editor"
3. 点击 "New query"

### 第2步：创建数据库表

复制 `supabase-schema.sql` 的全部内容，粘贴到 SQL Editor 中，点击 "Run"。

**或者直接复制下面的 SQL：**

```sql
-- 创建 posts 表
CREATE TABLE IF NOT EXISTS posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  cover_image TEXT,
  excerpt TEXT,
  body TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建 locations 表
CREATE TABLE IF NOT EXISTS locations (
  id BIGSERIAL PRIMARY KEY,
  state TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  average_rate DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建 location_blogs 表
CREATE TABLE IF NOT EXISTS location_blogs (
  id BIGSERIAL PRIMARY KEY,
  location_id BIGINT REFERENCES locations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  hero_image TEXT,
  body TEXT,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建 popups 表
CREATE TABLE IF NOT EXISTS popups (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  cta_text TEXT,
  cta_url TEXT,
  trigger_type TEXT DEFAULT 'onload',
  trigger_value INTEGER,
  display_pages TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 第3步：插入测试数据

在 SQL Editor 创建新查询，复制 `supabase-seed.sql` 的内容，点击 "Run"。

**或者直接运行本地脚本（在第2步完成后）：**

```bash
npm run db:seed
```

### 第4步：配置 RLS（Row Level Security）

为了让应用能够读写数据，需要配置 RLS 策略：

```sql
-- 启用 RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE popups ENABLE ROW LEVEL SECURITY;

-- 允许匿名用户读取已发布内容
CREATE POLICY "Public can read published posts" ON posts
  FOR SELECT USING (status = 'published' OR TRUE);

CREATE POLICY "Public can read locations" ON locations
  FOR SELECT USING (TRUE);

CREATE POLICY "Public can read published location blogs" ON location_blogs
  FOR SELECT USING (status = 'published' OR TRUE);

CREATE POLICY "Public can read active popups" ON popups
  FOR SELECT USING (status = 'active' OR TRUE);

-- 允许匿名用户写入（简化开发，生产环境应使用认证）
CREATE POLICY "Allow all on posts" ON posts
  FOR ALL USING (TRUE);

CREATE POLICY "Allow all on location_blogs" ON location_blogs
  FOR ALL USING (TRUE);

CREATE POLICY "Allow all on popups" ON popups
  FOR ALL USING (TRUE);
```

## ✅ 验证设置

运行以下命令检查是否成功：

```bash
npm run db:seed
```

应该看到：
- ✅ Locations inserted
- ✅ Posts inserted  
- ✅ Popup inserted

## 🔧 故障排除

### 问题：找不到表

**解决**：确保第2步的 CREATE TABLE 语句已成功运行。

### 问题：权限被拒绝

**解决**：运行第4步的 RLS 策略配置。

### 问题：无法插入数据

**解决**：检查 `.env.local` 文件中的 Supabase 凭证是否正确。

## 📊 数据库结构

- **posts**: 12 columns, ~3 articles
- **locations**: 6 columns, 6 US states
- **location_blogs**: 10 columns, ~3 state-specific articles  
- **popups**: 12 columns, 1 default popup

## 🎉 完成！

设置完成后，您可以：
- 访问后台创建和管理内容
- 查看博客文章和地区页面
- 测试弹窗功能
