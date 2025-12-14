# Vercel Blob 存储配置指南

## 🚨 错误信息

```
Vercel Blob: No token found. Either configure the `BLOB_READ_WRITE_TOKEN` 
environment variable, or pass a `token` option to your calls.
```

## 📝 原因

图片上传功能使用了 Vercel Blob 存储，但还没有在 Vercel 项目中创建 Blob 存储实例。

## ✅ 解决步骤

### 方法一：在 Vercel Dashboard 创建（推荐）

#### 1. 登录 Vercel Dashboard
访问：https://vercel.com/dashboard

#### 2. 进入你的项目
找到并点击项目 `autosaver-blog-insu`

#### 3. 进入 Storage 标签
- 点击顶部导航的 **Storage** 标签
- 或访问：`https://vercel.com/[your-username]/autosaver-blog-insu/stores`

#### 4. 创建 Blob 存储
1. 点击 **Create Database** 或 **Create Store**
2. 选择 **Blob** 类型
3. 输入名称：`autosaver-uploads` 或 `webapp-blob`
4. 选择区域（推荐选择离用户最近的）
5. 点击 **Create**

#### 5. 连接到项目
1. 创建后，点击 **Connect to Project**
2. 选择项目：`autosaver-blog-insu`
3. 选择环境：
   - ✅ Production
   - ✅ Preview
   - ✅ Development
4. 点击 **Connect**

#### 6. 自动配置完成 ✅
Vercel 会自动添加环境变量：
```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

#### 7. 重新部署
- 环境变量配置后，Vercel 会自动触发重新部署
- 或手动触发：点击 **Deployments** → 最新部署 → **Redeploy**

### 方法二：使用 Vercel CLI（可选）

如果你安装了 Vercel CLI：

```bash
# 1. 登录 Vercel
vercel login

# 2. 链接项目
cd /home/user/webapp
vercel link

# 3. 创建 Blob 存储（会打开浏览器）
vercel blob create autosaver-uploads

# 4. 连接到项目
# 按照命令行提示操作
```

## 🎯 验证配置

### 1. 检查环境变量

在 Vercel Dashboard：
1. 进入项目 Settings
2. 点击 **Environment Variables**
3. 确认存在：
   ```
   BLOB_READ_WRITE_TOKEN = vercel_blob_rw_xxxxxxxxxxxxx
   ```

### 2. 测试上传功能

部署完成后：
1. 登录管理后台：`/admin/login`
   - 用户名：`admin`
   - 密码：`creatorshouse1!`

2. 创建新文章：`/admin/posts/create`

3. 测试图片上传：
   - 拖放图片到上传区域
   - 或点击选择文件
   - 应该看到上传进度
   - 上传成功后显示预览

4. 检查图片 URL：
   - 格式应该是：`https://xxxxx.public.blob.vercel-storage.com/xxxxx`

## 📊 Blob 存储特性

### 免费额度（Hobby 计划）

- **存储空间**：1 GB
- **带宽**：100 GB/月
- **文件上传大小**：最大 5 MB/文件

### 支持的功能

- ✅ 自动 CDN 分发（全球加速）
- ✅ 公开访问 URL
- ✅ 文件删除
- ✅ 元数据管理
- ✅ HTTPS 加密传输

## 🔍 常见问题

### Q1: 创建 Blob 后还是报错？

**解决方法：**
1. 确认环境变量已正确配置
2. 触发重新部署
3. 清除浏览器缓存
4. 检查是否连接到了正确的项目

### Q2: 本地开发时如何测试？

**方法 1 - 使用 Vercel 环境变量（推荐）：**
```bash
# 拉取环境变量到本地
vercel env pull .env.local
```

**方法 2 - 创建开发环境 token：**
1. 在 Vercel Dashboard 创建 Blob 存储
2. 复制 `BLOB_READ_WRITE_TOKEN`
3. 添加到本地 `.env.local`：
   ```
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
   ```

### Q3: 如何限制上传文件类型和大小？

当前配置（在 `/api/upload/route.ts`）：
```typescript
// 文件类型限制
const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

// 文件大小限制
const maxSize = 5 * 1024 * 1024 // 5MB
```

### Q4: 如何查看已上传的文件？

在 Vercel Dashboard：
1. 进入项目 → **Storage**
2. 点击你的 Blob 存储
3. 可以看到所有上传的文件列表
4. 支持预览、删除等操作

### Q5: 上传失败怎么排查？

检查以下几点：
1. ✅ BLOB_READ_WRITE_TOKEN 是否配置
2. ✅ 文件类型是否支持（JPEG/PNG/GIF/WebP）
3. ✅ 文件大小是否超过 5MB
4. ✅ 网络连接是否正常
5. ✅ 查看浏览器控制台错误信息

## 🎨 使用场景

### 当前集成位置

1. **博客文章封面图**
   - `/admin/posts/create`
   - `/admin/posts/edit/[id]`

2. **Popup 弹窗图片**
   - `/admin/popups/create`
   - `/admin/popups/edit/[id]`

### 图片上传组件

使用 `<ImageUpload>` 组件：
```tsx
<ImageUpload
  label="Cover Image"
  value={formData.coverImage}
  onChange={(url) => setFormData({ ...formData, coverImage: url })}
  required
/>
```

## 🔐 安全性

- ✅ Token 仅在服务器端使用
- ✅ 前端通过 API 路由上传
- ✅ 支持文件类型验证
- ✅ 支持文件大小限制
- ✅ HTTPS 加密传输

## 📚 相关文档

- **Vercel Blob 官方文档**: https://vercel.com/docs/storage/vercel-blob
- **@vercel/blob SDK**: https://www.npmjs.com/package/@vercel/blob
- **项目配置**: `/IMAGE_UPLOAD_GUIDE.md`

## 🎯 总结

### 必须完成的步骤：

1. ✅ 在 Vercel Dashboard 创建 Blob 存储
2. ✅ 连接到项目（自动配置环境变量）
3. ✅ 重新部署项目
4. ✅ 测试图片上传功能

### 完成后即可使用：

- 📸 上传博客文章封面图
- 🎨 上传 Popup 弹窗图片
- 🖼️ 自动 CDN 分发
- 🌍 全球加速访问

---

**重要提示**：不要在代码中硬编码 `BLOB_READ_WRITE_TOKEN`，始终使用环境变量！

**创建时间**：2024-12-14  
**项目**：autosaver-blog-insu  
**GitHub**：https://github.com/LRENZ/autosaver-blog-insu
