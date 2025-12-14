# 🚀 Vercel & Netlify 部署指南

本指南帮助您将 AutoSaver 博客系统部署到 Vercel 或 Netlify。

---

## ✅ 准备工作（已完成）

- ✅ 项目代码已准备就绪
- ✅ 数据库已配置并包含测试数据（12篇文章）
- ✅ Vercel 配置文件已创建 (`vercel.json`)
- ✅ 数据库适配器已更新，支持多种环境
- ✅ `.gitignore` 已配置
- ✅ 所有依赖已安装

---

## 🎯 方案一：Vercel 部署（推荐 ⭐）

### 为什么选择 Vercel？
- ✅ **零配置**：专为 Next.js 优化
- ✅ **速度快**：全球 CDN，边缘网络
- ✅ **免费额度**：个人项目完全免费
- ✅ **自动 HTTPS**：自动配置 SSL 证书
- ✅ **预览部署**：每次 push 自动创建预览
- ✅ **完美支持 Server Actions**

### 部署步骤

#### 选项 A：通过 GitHub 自动部署（最简单）

1. **将代码推送到 GitHub**
   ```bash
   cd /home/user/webapp
   git remote add origin https://github.com/YOUR_USERNAME/autosaver-blog.git
   git push -u origin main
   ```

2. **登录 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录

3. **导入项目**
   - 点击 "Add New Project"
   - 选择您的 `autosaver-blog` 仓库
   - 点击 "Import"

4. **配置项目**
   - **Framework Preset**: Next.js（自动检测）
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`（默认）
   - **Output Directory**: `.next`（默认）

5. **环境变量（可选）**
   目前项目使用本地 SQLite，无需额外环境变量

6. **部署**
   - 点击 "Deploy"
   - 等待 2-5 分钟
   - 🎉 完成！获得生产 URL

#### 选项 B：通过 CLI 部署

⚠️ **注意**：CLI 部署需要身份验证，请按照提示操作

```bash
cd /home/user/webapp

# 登录 Vercel（会打开浏览器）
npx vercel login

# 部署到预览环境
npx vercel

# 部署到生产环境
npx vercel --prod
```

按照命令行提示操作：
- 选择团队/个人账户
- 确认项目设置
- 等待部署完成

---

## 🌐 方案二：Netlify 部署

### 为什么选择 Netlify？
- ✅ **易用性**：简单直观的界面
- ✅ **表单处理**：内置表单功能
- ✅ **Edge Functions**：支持边缘计算
- ✅ **免费额度**：慷慨的免费计划

### 部署步骤

#### 选项 A：通过 GitHub 自动部署（推荐）

1. **将代码推送到 GitHub**（同上）

2. **登录 Netlify**
   - 访问 [netlify.com](https://www.netlify.com)
   - 使用 GitHub 账号登录

3. **导入项目**
   - 点击 "Add new site" → "Import an existing project"
   - 选择 "GitHub"
   - 授权并选择您的仓库

4. **配置构建设置**
   - **Branch to deploy**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Functions directory**: （留空）

5. **部署**
   - 点击 "Deploy site"
   - 等待构建完成
   - 🎉 获得生产 URL

#### 选项 B：通过 CLI 部署

```bash
cd /home/user/webapp

# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 初始化项目
netlify init

# 部署
netlify deploy --prod
```

---

## 📊 部署后验证

### 1. 检查主页
```bash
curl https://your-site.vercel.app/
# 或
curl https://your-site.netlify.app/
```

### 2. 测试 API 路由
```bash
curl https://your-site.vercel.app/api/test
```

### 3. 访问管理后台
```
https://your-site.vercel.app/admin
```

⚠️ **安全警告**：管理后台目前没有身份验证！请参考 `CLOUDFLARE_ZERO_TRUST_SETUP.md`

---

## 🔧 常见问题

### Q1: 数据库在生产环境如何工作？
**A**: 目前使用本地 SQLite 文件 (`data/production.db`)，已包含在部署中。
- ✅ 适合小型项目和演示
- ⚠️ 数据是只读的（Vercel/Netlify 文件系统是只读的）
- 💡 生产环境建议使用：
  - Supabase（PostgreSQL）
  - PlanetScale（MySQL）
  - MongoDB Atlas
  - Cloudflare D1

### Q2: 如何更新数据库数据？
**A**: 选项：
1. **本地更新后重新部署**
   ```bash
   # 本地修改数据库
   npx wrangler d1 execute webapp-production --local --file=new_data.sql
   
   # 复制到 data 目录
   cp .wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite data/production.db
   
   # 提交并推送
   git add data/production.db
   git commit -m "Update database"
   git push
   ```

2. **迁移到外部数据库服务**（推荐生产使用）

### Q3: 如何设置自定义域名？

**Vercel**:
1. 项目设置 → Domains
2. 添加您的域名
3. 配置 DNS 记录

**Netlify**:
1. Site settings → Domain management
2. Add custom domain
3. 更新 DNS

### Q4: 构建失败怎么办？

**检查构建日志**:
- Vercel: Deployments → 点击失败的部署
- Netlify: Deploys → 点击失败的构建

**常见问题**:
- 依赖安装失败：检查 `package.json`
- TypeScript 错误：运行 `npm run build` 本地测试
- 内存不足：优化依赖或升级计划

---

## 🎯 推荐配置

### Vercel 生产配置
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### 环境变量（未来使用）
```env
# Vercel/Netlify Dashboard → Settings → Environment Variables
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com
DATABASE_URL=your_database_connection_string
```

---

## 📈 性能优化建议

1. **图片优化**：使用 Next.js Image 组件
2. **缓存策略**：配置 CDN 缓存
3. **代码分割**：Next.js 自动处理
4. **压缩**：Vercel/Netlify 自动启用 gzip
5. **监控**：使用 Vercel Analytics 或 Netlify Analytics

---

## 🔐 安全检查清单

- [ ] 管理后台添加身份验证（Cloudflare Zero Trust/NextAuth.js）
- [ ] 配置 CORS 策略
- [ ] 启用 Rate Limiting
- [ ] 添加 CSP 头
- [ ] 定期更新依赖

---

## 📚 相关文档

- [FINAL_DEPLOYMENT.md](./FINAL_DEPLOYMENT.md) - 完整部署总结
- [CLOUDFLARE_ZERO_TRUST_SETUP.md](./CLOUDFLARE_ZERO_TRUST_SETUP.md) - 安全配置
- [README.md](./README.md) - 项目文档

---

## 🆘 获取帮助

### Vercel
- 文档: https://vercel.com/docs
- 社区: https://github.com/vercel/next.js/discussions
- 支持: support@vercel.com

### Netlify
- 文档: https://docs.netlify.com
- 社区: https://answers.netlify.com
- 支持: support@netlify.com

---

## ✅ 部署成功指标

- [ ] 主页正常访问
- [ ] 博客文章列表显示
- [ ] 文章详情页正常
- [ ] 地区页面正常
- [ ] 管理后台可访问
- [ ] 文章 CRUD 操作正常
- [ ] Markdown 渲染正常
- [ ] 响应式设计正常
- [ ] SEO 元数据正确
- [ ] 性能良好（< 3s 加载）

---

**推荐**: 使用 **Vercel + GitHub** 自动部署，最简单快速！🚀
