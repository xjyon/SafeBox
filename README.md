# SafeBox - 个人密码管理微信小程序

## 项目简介

SafeBox 是一个个人使用的微信小程序，用于管理自己的账号密码、重要图片和私人信息。类似密码管理器 + 微信收藏 + 私人资料保险箱。

## 功能特性

### 核心功能
- 📝 **密码管理** - 安全存储账号密码，支持搜索和分类
- 🖼️ **图片保存** - 保存重要的私密图片和资料
- 🔍 **搜索功能** - 快速查找密码记录
- 🏷️ **分类管理** - 按工作、社交、购物、金融、其他分类
- 📊 **安全检测** - 检测弱密码、重复密码、长期未修改
- 💾 **数据备份** - 导出和导入数据

### 安全特性
- 🔐 密码默认隐藏
- ✅ 查看密码需要主动点击
- 📋 复制密码后提示确认
- 🚫 页面不直接显示明文密码

## 项目结构

```
SafeBox/
├── pages/                      # 页面目录
│   ├── index/                  # 首页
│   │   ├── index.wxml
│   │   ├── index.wxss
│   │   ├── index.js
│   │   └── index.json
│   ├── manage/                 # 管理页面
│   ├── add/                    # 新增页面
│   ├── detail/                 # 详情页面
│   ├── security/               # 安全检测页面
│   └── mine/                   # 我的页面
├── components/                 # 组件目录
├── utils/                      # 工具函数
├── images/                     # 图片资源
├── app.js                      # 应用主程序
├── app.json                    # 应用配置
├── app.wxss                    # 全局样式
├── project.config.json         # 项目配置
├── sitemap.json               # 爬虫配置
└── README.md                  # 项目文档
```

## 技术栈

- **WXML** - 模板语言
- **WXSS** - 样式语言
- **JavaScript** - 逻辑编程
- **WeChat Mini Program** - 微信小程序平台

## 数据结构

### 密码数据
```javascript
{
  id: "string",              // 唯一ID
  name: "string",            // 密码名称
  category: "string",        // 分类 (work/social/shopping/finance/other)
  username: "string",        // 账号
  password: "string",        // 密码
  website: "string",         // 网址
  remark: "string",          // 备注
  images: [],                // 图片列表
  createTime: "ISO8601",     // 创建时间
  updateTime: "ISO8601",     // 更新时间
  lastViewTime: "ISO8601"    // 最后访问时间
}
```

## 开发阶段

- [x] 第一步：创建项目目录结构
- [ ] 第二步：完成所有页面 UI
- [ ] 第三步：实现页面跳转
- [ ] 第四步：实现本地数据存储
- [ ] 第五步：实现新增、编辑、删除、搜索功能
- [ ] 第六步：实现安全检测
- [ ] 第七步：优化交互体验

## 安装和运行

1. 克隆项目
```bash
git clone https://github.com/xjyon/SafeBox.git
```

2. 在微信开发者工具中打开项目目录

3. 点击编译预览

## 许可证

MIT

## 作者

xjyon

---

**开发日期：** 2026-07-09

**最后更新：** 2026-07-09
