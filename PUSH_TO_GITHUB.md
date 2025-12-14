# 🔐 推送代码到 GitHub 指南

您的远程仓库已配置：`https://github.com/LRENZ/autosaver-blog.git`

---

## ⚠️ 当前状态

- ✅ Git 仓库已初始化
- ✅ 远程仓库已添加 (origin)
- ✅ 所有代码已提交 (20 commits)
- ⚠️ 需要身份验证才能推送

---

## 🚀 推送方法（选择其一）

### 方法 1: 使用 Personal Access Token (推荐)

这是最安全和推荐的方法。

#### 步骤 1: 创建 Personal Access Token

1. **登录 GitHub**
   - 访问 https://github.com/settings/tokens

2. **生成新 Token**
   - 点击 "Generate new token" → "Generate new token (classic)"
   - **Note**: `AutoSaver Blog Deployment`
   - **Expiration**: 90 days 或更长
   - **Scopes**: 勾选 `repo` (完整仓库访问权限)
   - 点击 "Generate token"

3. **复制 Token**
   - ⚠️ **立即复制并保存** (只显示一次)
   - 格式类似: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

#### 步骤 2: 在 Sandbox 中推送

```bash
cd /home/user/webapp

# 使用 token 推送
git push https://YOUR_TOKEN@github.com/LRENZ/autosaver-blog.git main
```

替换 `YOUR_TOKEN` 为您的 Personal Access Token。

**或者配置为默认凭证**:
```bash
cd /home/user/webapp

# 更新远程 URL 包含 token
git remote set-url origin https://YOUR_TOKEN@github.com/LRENZ/autosaver-blog.git

# 推送
git push -u origin main
```

---

### 方法 2: 使用 SSH Key (更安全)

#### 步骤 1: 生成 SSH Key

```bash
# 生成新的 SSH key
ssh-keygen -t ed25519 -C "developer@genspark.ai" -f ~/.ssh/github_key -N ""

# 查看公钥
cat ~/.ssh/github_key.pub
```

#### 步骤 2: 添加到 GitHub

1. 复制上面命令显示的公钥内容
2. 访问 https://github.com/settings/keys
3. 点击 "New SSH key"
4. **Title**: `Sandbox Deployment Key`
5. **Key**: 粘贴公钥内容
6. 点击 "Add SSH key"

#### 步骤 3: 配置并推送

```bash
cd /home/user/webapp

# 配置 SSH
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/github_key

# 更改远程 URL 为 SSH
git remote set-url origin git@github.com:LRENZ/autosaver-blog.git

# 测试连接
ssh -T git@github.com

# 推送
git push -u origin main
```

---

### 方法 3: 本地计算机推送

如果您有本地 Git 客户端和 GitHub 已配置好的环境:

1. **克隆空仓库**
```bash
git clone https://github.com/LRENZ/autosaver-blog.git
cd autosaver-blog
```

2. **下载并解压项目代码**
   - 从 Sandbox 下载项目 tar.gz 备份
   - 或使用 ProjectBackup 工具创建备份

3. **复制文件并推送**
```bash
# 复制所有文件到克隆的目录
cp -r /path/to/webapp/* .

# 提交并推送
git add -A
git commit -m "Initial commit: AutoSaver blog system"
git push origin main
```

---

## 📦 方法 4: 使用 GitHub CLI (如果可用)

```bash
# 登录 GitHub CLI
gh auth login

# 推送代码
cd /home/user/webapp
git push -u origin main
```

---

## 🔍 验证推送成功

推送完成后:

1. **访问 GitHub 仓库**
   ```
   https://github.com/LRENZ/autosaver-blog
   ```

2. **检查文件**
   - 应该看到所有项目文件
   - 包括 `app/`, `components/`, `lib/`, `data/` 等

3. **检查提交历史**
   - 应该有 20 个提交记录
   - 最新提交: "Complete Vercel/Netlify deployment preparation"

4. **检查分支**
   - 默认分支: `main`

---

## 🎯 推送后下一步：部署到 Vercel

### 自动部署 (推荐)

1. **访问 Vercel**
   - https://vercel.com
   - 使用 GitHub 账号登录

2. **导入项目**
   - 点击 "Add New Project"
   - 选择 `LRENZ/autosaver-blog`
   - 点击 "Import"

3. **配置项目**
   - Framework: Next.js (自动检测)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **部署**
   - 点击 "Deploy"
   - 等待 2-5 分钟
   - 🎉 获得生产 URL: `https://autosaver-blog.vercel.app`

### 每次推送自动部署

设置完成后，每次 `git push` 到 `main` 分支，Vercel 会自动：
- 检测代码变更
- 自动构建
- 自动部署
- 提供新的 URL

---

## 📊 当前项目状态

```
📦 项目名称: AutoSaver Blog
🔗 GitHub 仓库: https://github.com/LRENZ/autosaver-blog.git
🌿 分支: main
📝 提交数: 20
📄 代码行数: 3,710 行
📚 文档数量: 13 个
💾 数据库: SQLite (12 篇文章)
```

### 项目内容

```
autosaver-blog/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 主页
│   ├── blog/              # 博客页面
│   ├── location/          # 地区页面
│   └── admin/             # 管理后台
├── components/            # React 组件
│   ├── MarkdownEditor.tsx
│   ├── MarkdownRenderer.tsx
│   ├── Popup.tsx
│   └── ...
├── lib/                   # 工具函数
│   ├── db-adapter.ts      # 数据库适配器
│   ├── actions.ts         # Server Actions
│   └── popup-actions.ts
├── data/                  # 数据库
│   └── production.db      # SQLite (4KB, 12篇文章)
├── migrations/            # 数据库迁移
│   ├── 0001_initial_schema.sql
│   ├── 0002_location_blogs.sql
│   ├── 0003_popups.sql
│   ├── 0004_default_popup.sql
│   └── 0005_additional_content.sql
├── public/                # 静态资源
├── vercel.json            # Vercel 配置
├── .vercelignore          # Vercel 忽略文件
├── package.json           # 依赖配置
├── tsconfig.json          # TypeScript 配置
├── next.config.ts         # Next.js 配置
└── [13 个 Markdown 文档]  # 完整文档
```

---

## 🔧 故障排除

### 问题 1: Permission Denied

```
remote: Permission to LRENZ/autosaver-blog.git denied
```

**解决**: 确保您的 GitHub 账号有仓库的写入权限。

### 问题 2: Token 已过期

```
remote: Invalid username or password
```

**解决**: 重新生成 Personal Access Token。

### 问题 3: 仓库已存在内容

```
! [rejected]        main -> main (fetch first)
```

**解决**: 先拉取再推送
```bash
git pull origin main --rebase
git push origin main
```

或强制推送（⚠️ 会覆盖远程内容）:
```bash
git push -f origin main
```

---

## ✅ 推送成功检查清单

推送后验证：

- [ ] GitHub 仓库显示所有文件
- [ ] 能看到 20 个提交记录
- [ ] `data/production.db` 文件存在
- [ ] README.md 正常显示
- [ ] 可以在 Vercel 中找到仓库

---

## 📞 需要帮助？

如果在推送过程中遇到问题：

1. **检查 GitHub 仓库权限**
   - 确保您是仓库的 owner 或有 push 权限

2. **验证 Token**
   - Token 必须有 `repo` scope
   - Token 未过期

3. **检查网络连接**
   ```bash
   ping github.com
   ```

4. **查看详细错误**
   ```bash
   GIT_CURL_VERBOSE=1 git push origin main
   ```

---

## 🎉 完成！

推送成功后，您就可以：
- ✅ 在 GitHub 上查看代码
- ✅ 使用 Vercel 自动部署
- ✅ 与团队协作
- ✅ 启用 CI/CD

**下一步**: 参考 `VERCEL_NETLIFY_DEPLOYMENT.md` 完成部署！
