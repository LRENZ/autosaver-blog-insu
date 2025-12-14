#!/bin/bash

# AutoSaver Blog - GitHub 推送脚本
# 仓库: https://github.com/LRENZ/autosaver-blog.git

set -e

echo "🚀 AutoSaver Blog - GitHub 推送"
echo "================================"
echo ""
echo "目标仓库: https://github.com/LRENZ/autosaver-blog.git"
echo ""

# 检查当前目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 显示当前状态
echo "📊 当前项目状态:"
echo "  - 提交数: $(git rev-list --count HEAD)"
echo "  - 当前分支: $(git branch --show-current)"
echo "  - 远程仓库: $(git remote get-url origin 2>/dev/null || echo '未配置')"
echo ""

# 检查是否有未提交的更改
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  警告: 发现未提交的更改"
    echo ""
    read -p "是否提交所有更改? (y/N): " commit_changes
    if [ "$commit_changes" = "y" ] || [ "$commit_changes" = "Y" ]; then
        git add -A
        read -p "请输入提交信息: " commit_message
        git commit -m "$commit_message"
        echo "✅ 更改已提交"
    fi
    echo ""
fi

echo "🔐 GitHub 身份验证"
echo "=================="
echo ""
echo "您需要 GitHub Personal Access Token 来推送代码。"
echo ""
echo "如果您还没有 Token，请按照以下步骤创建："
echo "1. 访问: https://github.com/settings/tokens"
echo "2. 点击 'Generate new token' → 'Generate new token (classic)'"
echo "3. 勾选 'repo' scope"
echo "4. 点击 'Generate token'"
echo "5. 复制生成的 token (格式: ghp_xxxxxxxxxxxx)"
echo ""
read -p "请输入您的 GitHub Personal Access Token: " github_token

if [ -z "$github_token" ]; then
    echo "❌ 错误: Token 不能为空"
    exit 1
fi

# 验证 token 格式
if [[ ! $github_token =~ ^(ghp_|github_pat_) ]]; then
    echo "⚠️  警告: Token 格式可能不正确"
    echo "   正确格式应该以 'ghp_' 或 'github_pat_' 开头"
    read -p "是否继续? (y/N): " continue
    if [ "$continue" != "y" ] && [ "$continue" != "Y" ]; then
        exit 1
    fi
fi

echo ""
echo "🔧 配置远程仓库..."

# 更新远程 URL 包含 token
git remote set-url origin https://$github_token@github.com/LRENZ/autosaver-blog.git

echo "✅ 远程仓库已配置"
echo ""

# 询问是否强制推送
echo "推送选项:"
echo "1) 正常推送 (推荐)"
echo "2) 强制推送 (会覆盖远程仓库内容)"
echo ""
read -p "请选择 (1-2, 默认 1): " push_option

case $push_option in
    2)
        echo ""
        echo "⚠️  警告: 强制推送会覆盖远程仓库的所有内容!"
        read -p "确定要继续吗? (yes/N): " confirm
        if [ "$confirm" != "yes" ]; then
            echo "❌ 取消推送"
            exit 0
        fi
        echo ""
        echo "🚀 强制推送到 GitHub..."
        git push -f origin main
        ;;
    *)
        echo ""
        echo "🚀 推送到 GitHub..."
        if git push -u origin main; then
            echo "✅ 推送成功!"
        else
            echo ""
            echo "⚠️  推送失败。可能原因:"
            echo "  1. 远程仓库已有内容，需要先 pull"
            echo "  2. Token 权限不足"
            echo "  3. 网络问题"
            echo ""
            read -p "是否尝试拉取后再推送? (y/N): " try_pull
            if [ "$try_pull" = "y" ] || [ "$try_pull" = "Y" ]; then
                echo "📥 拉取远程更改..."
                git pull origin main --rebase
                echo "🚀 重新推送..."
                git push -u origin main
            else
                exit 1
            fi
        fi
        ;;
esac

echo ""
echo "================================"
echo "✅ GitHub 推送完成!"
echo ""
echo "📊 验证推送:"
echo "  🔗 访问: https://github.com/LRENZ/autosaver-blog"
echo ""
echo "🎯 下一步:"
echo "  1. 在 GitHub 上验证文件已上传"
echo "  2. 部署到 Vercel (见 VERCEL_NETLIFY_DEPLOYMENT.md)"
echo ""
echo "📚 相关文档:"
echo "  - PUSH_TO_GITHUB.md - 详细推送指南"
echo "  - DEPLOYMENT_NEXT_STEPS.md - 部署流程"
echo "  - VERCEL_NETLIFY_DEPLOYMENT.md - Vercel/Netlify 部署"
echo "================================"
