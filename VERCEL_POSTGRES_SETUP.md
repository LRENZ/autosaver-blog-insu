# 🔧 Vercel Postgres 数据库设置指南

本项目已配置为使用 Vercel Postgres 数据库，以支持在 Vercel 部署时的数据持久化。

## 📋 快速设置步骤

### 1. 在 Vercel Dashboard 创建 Postgres 数据库

1. **登录 Vercel Dashboard**
   - 访问: https://vercel.com/dashboard
   - 选择您的项目: `autosaver-blog-insu`

2. **创建数据库**
   - 进入项目设置
   - 点击 "Storage" 标签
   - 点击 "Create Database"
   - 选择 "Postgres"
   - 数据库名称: `autosaver-db`
   - 区域: 选择离您最近的区域
   - 点击 "Create"

3. **连接数据库到项目**
   - 数据库创建后，Vercel 会自动添加环境变量
   - 自动添加的变量:
     - `POSTGRES_URL`
     - `POSTGRES_PRISMA_URL`
     - `POSTGRES_URL_NON_POOLING`
     - `POSTGRES_USER`
     - `POSTGRES_HOST`
     - `POSTGRES_PASSWORD`
     - `POSTGRES_DATABASE`

### 2. 本地开发环境配置

创建 `.env.local` 文件（已在 .gitignore 中）:

```bash
# 从 Vercel Dashboard → Storage → Your Database → .env.local 标签复制
POSTGRES_URL="postgres://default:xxxxx@xxx.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_PRISMA_URL="postgres://default:xxxxx@xxx.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://default:xxxxx@xxx.neon.tech:5432/verceldb?sslmode=require"
POSTGRES_USER="default"
POSTGRES_HOST="xxx.neon.tech"
POSTGRES_PASSWORD="xxxxx"
POSTGRES_DATABASE="verceldb"
```

### 3. 运行数据库迁移

```bash
cd /home/user/webapp

# 安装依赖
npm install

# 运行迁移脚本（自动创建表和插入数据）
npm run db:setup
```

## 🔑 后台管理员认证

- **用户名**: `admin`
- **密码**: `creatorshouse1!`

访问: `https://your-site.vercel.app/admin`

## 📊 数据库结构

项目包含以下表:
- `posts` - 博客文章
- `locations` - 地区信息
- `location_blogs` - 地区特定博客
- `popups` - 弹窗配置

## 🚀 部署流程

1. 推送代码到 GitHub
2. Vercel 自动部署
3. 数据库连接自动配置（使用环境变量）
4. 访问后台创建和管理内容

## ⚠️ 重要提示

- 生产环境数据库凭证已自动注入
- 本地开发需要手动配置 `.env.local`
- 不要将 `.env.local` 提交到 Git
