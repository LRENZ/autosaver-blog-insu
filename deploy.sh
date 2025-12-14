#!/bin/bash

# AutoSaver Blog - 快速部署脚本
# 支持 Vercel 和 Netlify 部署

set -e

echo "🚀 AutoSaver Blog 部署脚本"
echo "================================"
echo ""

# 检查当前目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 显示菜单
echo "请选择部署平台:"
echo "1) Vercel (推荐)"
echo "2) Netlify"
echo "3) 取消"
echo ""
read -p "请输入选项 (1-3): " choice

case $choice in
    1)
        echo ""
        echo "📦 准备 Vercel 部署..."
        echo ""
        
        # 检查 Vercel CLI
        if ! command -v vercel &> /dev/null; then
            echo "📥 安装 Vercel CLI..."
            npm install -g vercel
        fi
        
        echo "✅ Vercel CLI 已就绪"
        echo ""
        echo "🔐 请在浏览器中完成身份验证..."
        echo ""
        
        # 登录 Vercel
        npx vercel login
        
        echo ""
        read -p "是否部署到生产环境? (y/N): " prod
        
        if [ "$prod" = "y" ] || [ "$prod" = "Y" ]; then
            echo ""
            echo "🚀 部署到 Vercel 生产环境..."
            npx vercel --prod
        else
            echo ""
            echo "🚀 部署到 Vercel 预览环境..."
            npx vercel
        fi
        
        echo ""
        echo "✅ Vercel 部署完成!"
        ;;
        
    2)
        echo ""
        echo "📦 准备 Netlify 部署..."
        echo ""
        
        # 检查 Netlify CLI
        if ! command -v netlify &> /dev/null; then
            echo "📥 安装 Netlify CLI..."
            npm install -g netlify-cli
        fi
        
        echo "✅ Netlify CLI 已就绪"
        echo ""
        echo "🔐 请在浏览器中完成身份验证..."
        echo ""
        
        # 登录 Netlify
        netlify login
        
        echo ""
        echo "🚀 构建项目..."
        npm run build
        
        echo ""
        read -p "是否部署到生产环境? (y/N): " prod
        
        if [ "$prod" = "y" ] || [ "$prod" = "Y" ]; then
            echo ""
            echo "🚀 部署到 Netlify 生产环境..."
            netlify deploy --prod
        else
            echo ""
            echo "🚀 部署到 Netlify 预览环境..."
            netlify deploy
        fi
        
        echo ""
        echo "✅ Netlify 部署完成!"
        ;;
        
    3)
        echo "❌ 取消部署"
        exit 0
        ;;
        
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac

echo ""
echo "================================"
echo "📊 部署后检查清单:"
echo "  - [ ] 访问主页"
echo "  - [ ] 测试博客文章"
echo "  - [ ] 检查管理后台"
echo "  - [ ] 验证地区页面"
echo "  - [ ] 测试 Markdown 渲染"
echo ""
echo "📚 详细文档: ./VERCEL_NETLIFY_DEPLOYMENT.md"
echo "================================"
