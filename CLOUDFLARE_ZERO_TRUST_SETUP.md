# Cloudflare Zero Trust 配置指南

本指南将帮助您为 AutoSaver 汽车保险博客的后台管理系统配置 Cloudflare Zero Trust（以前称为 Cloudflare Access），实现安全的身份验证和访问控制。

---

## 目录

1. [什么是 Cloudflare Zero Trust](#什么是-cloudflare-zero-trust)
2. [前置要求](#前置要求)
3. [步骤 1: 设置 Cloudflare Zero Trust 账户](#步骤-1-设置-cloudflare-zero-trust-账户)
4. [步骤 2: 添加应用程序](#步骤-2-添加应用程序)
5. [步骤 3: 配置身份验证提供商](#步骤-3-配置身份验证提供商)
6. [步骤 4: 创建访问策略](#步骤-4-创建访问策略)
7. [步骤 5: 部署到 Cloudflare Pages](#步骤-5-部署到-cloudflare-pages)
8. [步骤 6: 测试访问控制](#步骤-6-测试访问控制)
9. [故障排除](#故障排除)
10. [高级配置](#高级配置)

---

## 什么是 Cloudflare Zero Trust

Cloudflare Zero Trust 是一个全面的安全平台，可以：

- 🔐 **统一身份验证**: 支持 Google、GitHub、Microsoft 等多种登录方式
- 🛡️ **访问控制**: 细粒度控制谁可以访问您的应用
- 📊 **审计日志**: 追踪所有访问和操作
- 🚀 **零配置**: 无需修改应用代码
- 💰 **免费套餐**: 支持最多 50 个用户

---

## 前置要求

在开始之前，请确保您有：

- ✅ Cloudflare 账户（免费）
- ✅ 已部署的 Cloudflare Pages 应用
- ✅ 管理员访问权限
- ✅ 用于身份验证的邮箱或 OAuth 提供商账户

---

## 步骤 1: 设置 Cloudflare Zero Trust 账户

### 1.1 访问 Zero Trust 仪表板

1. 登录您的 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 在左侧菜单中，点击 **"Zero Trust"**
3. 如果是第一次使用，系统会提示您创建一个团队名称（例如：`autosaver-team`）
4. 选择免费套餐（Free Plan）并确认

### 1.2 配置团队域名

- 您的团队域名将是：`https://autosaver-team.cloudflareaccess.com`
- 这将用于所有身份验证请求

---

## 步骤 2: 添加应用程序

### 2.1 创建新的 Access 应用

1. 在 Zero Trust 仪表板中，导航到 **"Access" > "Applications"**
2. 点击 **"Add an application"**
3. 选择 **"Self-hosted"** 应用类型

### 2.2 配置应用详情

填写以下信息：

- **Application name**: `AutoSaver Admin Panel`
- **Session Duration**: `24 hours` （或根据需要调整）
- **Application domain**: 
  - 如果使用 Cloudflare Pages: `your-project.pages.dev`
  - 如果使用自定义域名: `autosaver.com`
- **Path**: `/admin/*` （保护所有 `/admin` 下的路径）

### 2.3 高级设置（可选）

- **Enable automatic cloudflared authentication**: 开启
- **CORS Settings**: 如果需要 API 访问，配置 CORS

---

## 步骤 3: 配置身份验证提供商

Cloudflare Zero Trust 支持多种身份验证方式。以下是最常用的几种：

### 选项 A: 使用一次性 PIN (OTP) - 最简单

1. 在 **"Settings" > "Authentication"** 中
2. 确保 **"One-time PIN"** 已启用
3. 这允许用户通过邮箱接收验证码登录

**优点**:
- 无需额外配置
- 适合小团队
- 立即可用

**缺点**:
- 每次登录都需要输入验证码
- 用户体验略差

### 选项 B: 使用 Google OAuth - 推荐

1. 导航到 **"Settings" > "Authentication"**
2. 点击 **"Add new"** 并选择 **"Google"**
3. 按照提示创建 Google OAuth 应用：

#### 创建 Google OAuth 应用

a. 访问 [Google Cloud Console](https://console.cloud.google.com/)
b. 创建新项目（例如：`AutoSaver Admin`）
c. 启用 Google+ API
d. 创建 OAuth 2.0 凭据：
   - 应用类型: Web 应用
   - 授权重定向 URI: 
     ```
     https://autosaver-team.cloudflareaccess.com/cdn-cgi/access/callback
     ```
e. 复制 **Client ID** 和 **Client Secret**
f. 返回 Cloudflare，填入这些凭据

**优点**:
- 用户体验好（单点登录）
- 支持记住登录状态
- 企业级安全

### 选项 C: 使用 GitHub OAuth - 适合技术团队

1. 导航到 **"Settings" > "Authentication"**
2. 选择 **"GitHub"**
3. 在 GitHub Settings 中创建 OAuth App:
   - Homepage URL: `https://your-project.pages.dev`
   - Authorization callback URL: 
     ```
     https://autosaver-team.cloudflareaccess.com/cdn-cgi/access/callback
     ```
4. 复制 Client ID 和 Secret 到 Cloudflare

---

## 步骤 4: 创建访问策略

访问策略定义了谁可以访问您的应用。

### 4.1 创建管理员策略

1. 在应用配置页面，找到 **"Add a policy"** 部分
2. 填写策略详情：

#### 策略设置

- **Policy name**: `Admin Team Only`
- **Action**: `Allow`
- **Session duration**: `24 hours`

#### 规则配置

选择以下任一规则类型：

**选项 A: 基于邮箱（推荐）**
```
Include:
  - Emails: admin@yourdomain.com, manager@yourdomain.com
```

**选项 B: 基于邮箱域名（适合企业）**
```
Include:
  - Emails ending in: @yourdomain.com
```

**选项 C: 基于 IP 地址（额外安全层）**
```
Include:
  - Emails: admin@yourdomain.com
  - IP ranges: 203.0.113.0/24
```

### 4.2 高级策略示例

#### 多因素认证 (MFA) 要求

```
Include:
  - Emails: admin@yourdomain.com
Require:
  - Authentication method: Google (with MFA)
```

#### 地理位置限制

```
Include:
  - Emails: admin@yourdomain.com
  - Country: United States, Canada
```

---

## 步骤 5: 部署到 Cloudflare Pages

### 5.1 确保应用已部署

```bash
# 构建应用
npm run build

# 部署到 Cloudflare Pages
npx wrangler pages deploy .next --project-name autosaver-blog
```

### 5.2 验证域名配置

1. 在 Cloudflare Pages 仪表板中，确认应用 URL
2. 如果使用自定义域名，确保 DNS 记录已配置

---

## 步骤 6: 测试访问控制

### 6.1 测试受保护路径

1. 打开浏览器（无痕模式）
2. 访问 `https://your-project.pages.dev/admin`
3. 您应该被重定向到 Cloudflare Zero Trust 登录页面

### 6.2 验证登录流程

#### 使用 OTP (一次性 PIN)

1. 输入您的邮箱地址
2. 检查邮箱，输入收到的 6 位验证码
3. 成功登录后，访问后台管理界面

#### 使用 Google OAuth

1. 点击 "Sign in with Google"
2. 选择您的 Google 账户
3. 授权访问
4. 自动重定向到后台管理界面

### 6.3 验证访问控制

- ✅ 尝试使用授权邮箱登录 → 应该成功
- ❌ 尝试使用未授权邮箱登录 → 应该被拒绝
- ✅ 访问公共页面（如首页）→ 不应该需要登录

---

## 故障排除

### 问题 1: 无法访问 Zero Trust 设置

**解决方案**:
1. 确保您是 Cloudflare 账户的管理员
2. 清除浏览器缓存
3. 尝试使用无痕模式

### 问题 2: 登录后立即跳转回登录页

**原因**: 可能是会话 Cookie 问题

**解决方案**:
1. 检查应用域名配置是否正确
2. 确保没有多个 Access 策略冲突
3. 尝试使用不同的浏览器

### 问题 3: OAuth 提供商配置错误

**解决方案**:
1. 验证 Client ID 和 Secret 正确
2. 检查重定向 URI 是否精确匹配
3. 确保 OAuth 应用已发布（不在测试模式）

### 问题 4: 公共页面也需要登录

**原因**: 访问策略配置错误

**解决方案**:
1. 检查 Path 设置是否为 `/admin/*` 而不是 `/*`
2. 如果有多个策略，确保优先级正确
3. 测试时使用无痕模式避免缓存

### 问题 5: 显示 "Access Denied"

**原因**: 用户不在允许列表中

**解决方案**:
1. 检查访问策略中的邮箱列表
2. 确认用户使用正确的邮箱登录
3. 查看 Zero Trust 审计日志了解拒绝原因

---

## 高级配置

### 启用会话管理

在 Application 设置中：

```
Settings > Session Management
- Enable Browser Isolation: 可选，提供额外安全层
- Idle Timeout: 1 hour (用户不活跃时自动登出)
- Force Re-authentication: 启用后强制定期重新登录
```

### 配置审计日志

1. 导航到 **"Logs" > "Access"**
2. 启用日志记录
3. 可选：配置日志导出到外部系统

### 多地区访问控制

如果您的管理员分布在多个地区：

```yaml
Policy: Global Admin Access
Include:
  - Emails: admin@example.com
  - Country: United States, United Kingdom, Canada
Exclude:
  - Country: High-risk countries (optional)
```

### API 访问令牌

如果需要 API 访问（例如 CI/CD）：

1. 导航到 **"Access" > "Service Auth"**
2. 创建 Service Token
3. 使用 Token 在 HTTP 请求头中：
   ```
   CF-Access-Client-Id: <client-id>
   CF-Access-Client-Secret: <client-secret>
   ```

---

## 最佳实践

### 安全建议

1. **最小权限原则**: 只授权必要的人员访问
2. **定期审查**: 每季度检查访问列表，移除离职人员
3. **启用 MFA**: 为敏感操作要求多因素认证
4. **监控日志**: 定期查看访问日志，发现异常活动
5. **使用强密码**: 如果使用密码认证，强制强密码策略

### 用户体验优化

1. **长会话时间**: 对于内部管理员，可以设置 24 小时会话
2. **记住设备**: 启用设备信任，减少重复登录
3. **自定义登录页**: 上传公司 Logo 和品牌元素
4. **清晰的错误消息**: 配置自定义拒绝访问页面

### 成本优化

- 免费套餐支持 50 个用户，对大多数中小型团队足够
- 如果需要更多功能（如设备姿态检查），考虑升级到 Teams Standard

---

## 常见使用场景

### 场景 1: 小团队（1-5 人）

**推荐配置**:
- 使用 Google OAuth 或 GitHub OAuth
- 基于邮箱的简单策略
- 24 小时会话时间

```yaml
Policy:
  Include:
    - Emails: team@company.com
  Session: 24 hours
```

### 场景 2: 中型团队（6-50 人）

**推荐配置**:
- 基于邮箱域名的策略
- 启用审计日志
- 配置多个管理员角色

```yaml
Policy: Admin Access
  Include:
    - Emails ending in: @company.com
  Require:
    - Authentication method: Google (with MFA)
```

### 场景 3: 远程团队

**推荐配置**:
- 多地区访问控制
- 设备信任策略
- 较短的会话时间（2-4 小时）

```yaml
Policy: Remote Admin
  Include:
    - Emails: team-members@company.com
    - Country: Multiple locations
  Require:
    - Device posture: Managed devices only
```

---

## 下一步

完成配置后，您可以：

1. ✅ **测试访问控制**: 确保所有团队成员都能正常登录
2. ✅ **配置备份管理员**: 添加至少 2 个管理员邮箱
3. ✅ **设置告警**: 配置可疑访问的邮件通知
4. ✅ **文档化流程**: 为团队创建内部登录指南
5. ✅ **定期审查**: 每月检查访问日志和策略

---

## 支持资源

- 📚 [Cloudflare Zero Trust 官方文档](https://developers.cloudflare.com/cloudflare-one/)
- 💬 [Cloudflare 社区论坛](https://community.cloudflare.com/)
- 📧 [技术支持](https://support.cloudflare.com/)
- 📺 [视频教程](https://www.youtube.com/cloudflare)

---

## 总结

Cloudflare Zero Trust 为您的 AutoSaver 后台管理系统提供了企业级的身份验证和访问控制，无需修改代码，配置简单，且完全免费（50 用户以内）。

**关键优势**:
- 🔒 增强安全性
- 🚀 快速部署（30 分钟内完成）
- 💰 零成本（免费套餐）
- 🎯 精细控制（邮箱、域名、地理位置等）
- 📊 完整审计日志

现在您可以安心地将应用部署到生产环境，确保只有授权人员才能访问管理后台！

---

**问题？** 如需帮助，请联系 Cloudflare 支持或查阅官方文档。
