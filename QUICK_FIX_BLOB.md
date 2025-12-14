# 🚀 快速修复 Vercel Blob 错误

## ❌ 错误信息
```
Vercel Blob: No token found. Either configure the `BLOB_READ_WRITE_TOKEN` 
environment variable, or pass a `token` option to your calls.
```

## ⚡ 快速解决（5 分钟）

### 步骤 1：登录 Vercel Dashboard
```
https://vercel.com/dashboard
```

### 步骤 2：进入项目
找到项目：`autosaver-blog-insu`

### 步骤 3：创建 Blob 存储
1. 点击 **Storage** 标签
2. 点击 **Create Database** 
3. 选择 **Blob**
4. 命名：`autosaver-uploads`
5. 点击 **Create**

### 步骤 4：连接到项目
1. 点击 **Connect to Project**
2. 选择 `autosaver-blog-insu`
3. 勾选所有环境（Production / Preview / Development）
4. 点击 **Connect**

### 步骤 5：完成 ✅
- ✅ 环境变量自动配置
- ✅ Vercel 自动重新部署
- ✅ 等待 2-3 分钟部署完成

## 🎯 验证成功

部署完成后：
1. 访问 `/admin/posts/create`
2. 尝试上传图片
3. 应该显示上传进度和预览

## 💡 临时替代方案

**在 Blob 配置完成前，可以使用外部图片 URL：**

1. 在图片上传区域下方，有 **"Or enter image URL manually"** 输入框
2. 粘贴外部图片链接，例如：
   - Unsplash: `https://images.unsplash.com/photo-xxxxx`
   - Imgur: `https://i.imgur.com/xxxxx.jpg`
   - 任何公开的图片 URL

## 📚 详细文档

完整配置指南请查看：
```
/VERCEL_BLOB_SETUP.md
```

## 🔗 相关链接

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Blob 文档**: https://vercel.com/docs/storage/vercel-blob
- **项目 GitHub**: https://github.com/LRENZ/autosaver-blog-insu

---

**配置完成后即可享受：**
- 📸 快速图片上传
- 🌍 全球 CDN 加速
- 🔒 自动 HTTPS
- 💾 1GB 免费存储
