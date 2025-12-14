# Cloudflare Zero Trust 快速配置指南（10分钟）

为 AutoSaver 管理后台启用安全登录的最快方式。

---

## 🚀 快速步骤

### 1️⃣ 启用 Zero Trust (2分钟)

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 点击左侧 **"Zero Trust"**
3. 创建团队名称（例如：`autosaver`）
4. 选择 **Free Plan**

### 2️⃣ 添加应用 (3分钟)

1. 进入 **"Access" > "Applications"**
2. 点击 **"Add an application"** > **"Self-hosted"**
3. 填写：
   - **Name**: `AutoSaver Admin`
   - **Domain**: `your-project.pages.dev`
   - **Path**: `/admin/*`
4. 点击 **Next**

### 3️⃣ 配置访问规则 (2分钟)

1. 在 **"Add a policy"** 部分：
   - **Policy name**: `Admin Only`
   - **Action**: `Allow`
   - **Rule type**: `Emails`
   - **Value**: `your-email@example.com` (输入您的邮箱)
2. 点击 **Next** 然后 **Save application**

### 4️⃣ 测试 (3分钟)

1. 打开无痕浏览器窗口
2. 访问 `https://your-project.pages.dev/admin`
3. 输入您的邮箱
4. 检查邮箱，输入 6 位验证码
5. ✅ 成功登录后台！

---

## 📋 配置清单

- [x] Cloudflare 账户已创建
- [x] Zero Trust 团队已设置
- [x] 应用已添加（路径：`/admin/*`）
- [x] 访问策略已配置（包含管理员邮箱）
- [x] 登录测试成功

---

## 🔧 添加更多管理员

1. 进入 **"Access" > "Applications"**
2. 编辑 `AutoSaver Admin` 应用
3. 在策略中添加更多邮箱：
   ```
   admin1@example.com
   admin2@example.com
   manager@example.com
   ```
4. 保存

---

## 🎯 推荐升级（可选）

### 使用 Google 登录（更好的体验）

1. 进入 **"Settings" > "Authentication"**
2. 点击 **"Add new"** > 选择 **"Google"**
3. 在 [Google Cloud Console](https://console.cloud.google.com/) 创建 OAuth 应用：
   - 授权重定向 URI: `https://autosaver.cloudflareaccess.com/cdn-cgi/access/callback`
4. 复制 Client ID 和 Secret 到 Cloudflare
5. 现在用户可以 "Sign in with Google" 登录！

---

## ⚠️ 常见问题

### Q: 登录后立即跳转回登录页？
**A**: 清除浏览器 Cookie，或检查应用域名配置是否正确。

### Q: 收不到验证码邮件？
**A**: 检查垃圾邮件文件夹，或使用 Google/GitHub OAuth 代替。

### Q: 公共页面也需要登录？
**A**: 检查 Path 设置是否为 `/admin/*` 而不是 `/*`。

---

## 📚 完整文档

查看 [`CLOUDFLARE_ZERO_TRUST_SETUP.md`](./CLOUDFLARE_ZERO_TRUST_SETUP.md) 获取：
- 详细配置步骤
- 多种身份验证方法
- 高级安全设置
- 故障排除指南

---

## ✅ 完成！

您的管理后台现在受到 Cloudflare Zero Trust 保护。只有授权用户才能访问 `/admin` 路径！

**下一步**:
1. 添加团队成员邮箱到访问策略
2. 启用 Google OAuth 提升用户体验
3. 定期查看访问日志

---

**需要帮助？** 查看完整文档或访问 [Cloudflare 社区](https://community.cloudflare.com/)
