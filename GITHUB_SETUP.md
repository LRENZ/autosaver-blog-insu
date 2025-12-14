# 🔗 GitHub 设置与推送指南

本文档指导您如何将项目推送到 GitHub，为 Vercel/Netlify 自动部署做准备。

---

## 📋 前提条件

- ✅ GitHub 账号
- ✅ 项目代码已准备就绪
- ✅ Git 已配置

---

## 🚀 快速开始

### 步骤 1: 创建 GitHub 仓库

1. **登录 GitHub**
   - 访问 [github.com](https://github.com)
   - 登录您的账号

2. **创建新仓库**
   - 点击右上角 "+" → "New repository"
   - **Repository name**: `autosaver-blog`（或您喜欢的名称）
   - **Description**: "Car Insurance Niche Blog - Next.js & Cloudflare D1"
   - **Visibility**: Public 或 Private
   - ⚠️ **不要**勾选 "Initialize this repository with a README"
   - 点击 "Create repository"

3. **复制仓库 URL**
   - 复制显示的 URL，例如：
     ```
     https://github.com/YOUR_USERNAME/autosaver-blog.git
     ```

### 步骤 2: 推送代码到 GitHub

在本地项目目录执行以下命令：

```bash
cd /home/user/webapp

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/autosaver-blog.git

# 查看当前分支
git branch

# 推送到 GitHub（首次推送）
git push -u origin main

# 如果分支名是 master，使用：
# git push -u origin master
```

**遇到身份验证问题？**

如果推送时要求输入用户名和密码，您需要使用 **Personal Access Token (PAT)**：

1. **创建 Token**
   - 访问 GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - 点击 "Generate new token" → "Generate new token (classic)"
   - **Note**: "AutoSaver Blog Deployment"
   - **Expiration**: 90 days 或更长
   - **Scopes**: 勾选 `repo`（完整仓库访问）
   - 点击 "Generate token"
   - ⚠️ **立即复制 token**（只显示一次）

2. **使用 Token 推送**
   ```bash
   # 方式 1: 在 URL 中包含 token
   git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/autosaver-blog.git
   git push -u origin main
   
   # 方式 2: 使用 credential helper
   git config --global credential.helper store
   git push -u origin main
   # 然后输入：
   # Username: YOUR_GITHUB_USERNAME
   # Password: YOUR_PERSONAL_ACCESS_TOKEN
   ```

### 步骤 3: 验证推送成功

1. 访问您的 GitHub 仓库页面
2. 确认文件已上传
3. 检查最近的提交记录

---

## 🔄 日常开发工作流

### 提交并推送更改

```bash
cd /home/user/webapp

# 查看更改
git status

# 添加所有更改
git add -A

# 提交更改
git commit -m "描述您的更改"

# 推送到 GitHub
git push origin main
```

### 常用 Git 命令

```bash
# 查看当前状态
git status

# 查看提交历史
git log --oneline -10

# 查看远程仓库
git remote -v

# 拉取最新更改（如果有多人协作）
git pull origin main

# 创建新分支
git checkout -b feature/new-feature

# 切换分支
git checkout main
```

---

## 🎯 为自动部署准备

### Vercel 自动部署设置

1. **登录 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录

2. **授权 Vercel 访问 GitHub**
   - Vercel 会请求访问您的 GitHub 仓库
   - 点击 "Authorize Vercel"

3. **导入项目**
   - 在 Vercel Dashboard 点击 "Add New Project"
   - 选择 `autosaver-blog` 仓库
   - 点击 "Import"

4. **配置项目**
   - Framework Preset: Next.js（自动检测）
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. **部署**
   - 点击 "Deploy"
   - 等待部署完成（2-5分钟）
   - 🎉 获得生产 URL

6. **自动部署**
   - 每次推送到 `main` 分支，Vercel 自动重新部署
   - 其他分支的推送会创建预览部署

### Netlify 自动部署设置

1. **登录 Netlify**
   - 访问 [netlify.com](https://www.netlify.com)
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add new site" → "Import an existing project"
   - 选择 "GitHub"
   - 授权并选择 `autosaver-blog`

3. **配置构建**
   - Branch to deploy: `main`
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **部署**
   - 点击 "Deploy site"
   - 等待构建完成
   - 🎉 获得生产 URL

5. **自动部署**
   - 每次推送到 `main` 分支自动部署

---

## 🔧 故障排除

### 问题 1: Push 被拒绝

```
! [rejected]        main -> main (fetch first)
```

**解决方案**：
```bash
git pull origin main --rebase
git push origin main
```

### 问题 2: 身份验证失败

```
remote: Invalid username or password
```

**解决方案**：使用 Personal Access Token 而不是密码

### 问题 3: 远程仓库已存在

```
fatal: remote origin already exists
```

**解决方案**：
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/autosaver-blog.git
```

### 问题 4: 大文件上传失败

```
remote: error: File XXX is 123.45 MB; this exceeds GitHub's file size limit
```

**解决方案**：
```bash
# 添加到 .gitignore
echo "large-file-or-directory" >> .gitignore

# 从 Git 历史中移除
git rm --cached large-file-or-directory
git commit -m "Remove large files"
```

---

## 📊 仓库结构

推送后，您的 GitHub 仓库应该包含：

```
autosaver-blog/
├── .git/
├── .github/              # GitHub Actions (可选)
├── .next/                # 构建输出（被忽略）
├── app/                  # Next.js App Router
├── components/           # React 组件
├── lib/                  # 工具函数和 Server Actions
├── public/               # 静态资源
├── data/                 # 数据库文件
│   └── production.db     # SQLite 数据库
├── migrations/           # 数据库迁移
├── .gitignore           # Git 忽略规则
├── package.json         # 依赖配置
├── tsconfig.json        # TypeScript 配置
├── next.config.ts       # Next.js 配置
├── vercel.json          # Vercel 配置
└── README.md            # 项目文档
```

---

## 🔐 安全最佳实践

### 1. 保护敏感信息

**绝不要提交**:
- `.env` 文件
- API 密钥
- 密码
- 私钥文件

**正确做法**:
```bash
# 在 .gitignore 中添加
echo ".env*" >> .gitignore
echo "*.key" >> .gitignore
echo "secrets/" >> .gitignore
```

### 2. 使用环境变量

在 Vercel/Netlify Dashboard 中设置：
- `DATABASE_URL`
- `API_KEY`
- `SECRET_TOKEN`

### 3. 定期更新依赖

```bash
npm audit
npm audit fix
npm update
```

---

## 📈 GitHub Actions (可选)

创建 `.github/workflows/ci.yml` 实现自动化测试：

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Test
      run: npm test
```

---

## ✅ 检查清单

推送前确认：

- [ ] 所有敏感信息已从代码中移除
- [ ] `.gitignore` 配置正确
- [ ] 代码可以本地构建成功
- [ ] 提交信息清晰明确
- [ ] 测试通过

推送后确认：

- [ ] GitHub 仓库显示所有文件
- [ ] 最新提交显示正确
- [ ] README 正常显示
- [ ] 可以在 Vercel/Netlify 中找到仓库

---

## 📚 相关资源

- [Git 官方文档](https://git-scm.com/doc)
- [GitHub 文档](https://docs.github.com)
- [Vercel Git 集成](https://vercel.com/docs/git)
- [Netlify Git 集成](https://docs.netlify.com/git/overview/)

---

**下一步**: 推送代码后，参考 [VERCEL_NETLIFY_DEPLOYMENT.md](./VERCEL_NETLIFY_DEPLOYMENT.md) 完成部署。
