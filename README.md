# SafeBox - 个人密码管理微信小程序

## 📱 项目简介

SafeBox 是一个安全、简洁的个人密码管理微信小程序。它帮助用户安全地存储和管理账户密码，提供密码强度检测、安全评分、重复密码检测等功能。所有数据都存储在用户的本地设备上，不涉及服务器传输，确保用户隐私和数据安全。

### ✨ 主要特性

- 🔐 **安全存储** - 所有数据仅存储在本地设备，不上传到任何服务器
- 🛡️ **安全检测** - 实时检测弱密码、重复密码等安全隐患
- 💪 **密码强度评分** - 即时反馈密码强度等级
- 📋 **分类管理** - 支持工作、社交、购物、金融等多个分类
- 🎲 **随机生成** - 一键生成安全的随机密码
- 🔄 **数据导出/导入** - 支持数据备份和恢复
- 🖼️ **图片附件** - 支持添加图片作为密码备注
- 📊 **数据统计** - 显示密码总数和安全评分

## 🏗️ 项目结构

```
SafeBox/
├── pages/                          # 页面文件夹
│   ├── index/                      # 首页
│   │   ├── index.wxml             # 模板
│   │   ├── index.wxss             # 样式
│   │   └── index.js               # 逻辑
│   ├── manage/                     # 密码管理页面
│   │   ├── manage.wxml
│   │   ├── manage.wxss
│   │   └── manage.js
│   ├── add/                        # 新增页面
│   │   ├── add.wxml
│   │   ├── add.wxss
│   │   └── add.js
│   ├── detail/                     # 详情页面
│   │   ├── detail.wxml
│   │   ├── detail.wxss
│   │   └── detail.js
│   ├── edit/                       # 编辑页面
│   │   ├── edit.wxml
│   │   ├── edit.wxss
│   │   └── edit.js
│   ├── security/                   # 安全检测页面
│   │   ├── security.wxml
│   │   ├── security.wxss
│   │   └── security.js
│   └── mine/                       # 我的页面
│       ├── mine.wxml
│       ├── mine.wxss
│       └── mine.js
├── utils/                          # 工具函数
│   └── util.js                    # 通用工具函数
├── images/                         # 图片资源
│   └── icon/                      # 图标
├── app.js                          # 应用逻辑
├── app.json                        # 应用配置
├── app.wxss                        # 全局样式
└── README.md                       # 项目文档
```

## 📖 功能说明

### 1. 首页 (Index)
- 显示最近访问的密码
- 数据统计（密码总数、安全评分、需注意密码数）
- 快速入口（安全检测、管理、生成密码、设置）
- 安全提示

### 2. 密码管理 (Manage)
- 列表展示所有保存的密码
- 按分类筛选
- 搜索功能
- 快速操作（复制、删除）

### 3. 新增密码 (Add)
- 支持新增密码或图片
- 密码强度实时反馈
- 分类选择
- 自动保存到本地

### 4. 密码详情 (Detail)
- 查看密码详细信息
- 一键复制账号和密码
- 查看密码强度
- 图片预览
- 编辑或删除操作

### 5. 编辑密码 (Edit)
- 修改已保存的密码信息
- 实时密码强度检测
- 保存修改

### 6. 安全检测 (Security)
- 弱密码检测
- 重复密码检测
- 超过90天未更新密码检测
- 综合安全评分
- 安全建议

### 7. 我的设置 (Mine)
- 数据统计
- 数据导出/导入
- 清空所有数据
- 关于应用
- 隐私声明

## 🔧 技术栈

- **框架**: 微信小程序原生框架
- **语言**: WXML + WXSS + JavaScript
- **存储**: 微信小程序本地存储 API (wx.setStorageSync/wx.getStorageSync)
- **数据格式**: JSON

## 📋 API 说明

### App 全局方法

```javascript
// 获取密码列表
app.getPasswordList() -> Array

// 保存密码列表
app.savePasswordList(list) -> void

// 新增密码
app.addPassword(passwordData) -> Object

// 获取密码详情
app.getPasswordById(id) -> Object

// 更新密码
app.updatePassword(id, passwordData) -> Object

// 删除密码
app.deletePassword(id) -> void

// 搜索密码
app.searchPassword(keyword) -> Array

// 获取最近访问列表
app.getRecentViewList(limit) -> Array

// 更新最后访问时间
app.updateLastViewTime(id) -> void

// 清空所有数据
app.clearAllData() -> void
```

### 工具函数 (utils/util.js)

```javascript
// 格式化日期
formatDate(date, format) -> String

// 检查密码强度
checkPasswordStrength(password) -> Object

// 判断是否为弱密码
isWeakPassword(password) -> Boolean

// 获取分类名称
getCategoryName(category) -> String

// 获取分类颜色
getCategoryColor(category) -> String

// 复制到剪贴板
copyToClipboard(text) -> void

// 显示提示
showToast(title, icon, duration) -> void

// 显示确认对话框
showConfirm(title, content) -> Promise<Boolean>

// 生成随机字符串
generatRandomString(length) -> String

// 验证邮箱
validateEmail(email) -> Boolean

// 验证URL
validateUrl(url) -> Boolean
```

## 💾 数据结构

### 密码对象

```javascript
{
  id: "pwd_1234567890_abc123def",      // 唯一ID
  name: "GitHub",                       // 密码名称
  category: "work",                    // 分类 (work/social/shopping/finance/other)
  username: "example@email.com",       // 账号
  password: "SecurePass123!@#",        // 密码
  website: "https://github.com",       // 网址（可选）
  remark: "个人开发账户",              // 备注（可选）
  images: ["path/to/image1.jpg"],      // 图片列表（可选）
  createTime: "2026-07-09T08:00:00Z",  // 创建时间
  updateTime: "2026-07-09T09:00:00Z",  // 更新时间
  lastViewTime: "2026-07-09T10:00:00Z" // 最后访问时间
}
```

## 🔐 安全性说明

### 数据存储
- ✅ 所有密码数据存储在微信小程序的本地存储中
- ✅ 不涉及任何服务器传输或云端存储
- ✅ 数据仅可通过该小程序访问

### 隐私保护
- ✅ 不收集用户个人信息
- ✅ 不上传任何敏感数据
- ✅ 用户拥有对所有数据的完全控制权

### 建议
- 定期检查密码安全性
- 避免在公共设备上使用
- 定期更新密码（建议3个月更新一次）
- 为不同服务使用不同的密码

## 🚀 使用指南

### 安装

1. 在微信开发者工具中打开本项目
2. 配置小程序 AppID
3. 点击编译预览或真机预览

### 快速开始

1. **首次使用**：打开小程序，点击"快速添加"创建第一个密码
2. **添加密码**：填写账号、密码等信息，选择分类
3. **管理密码**：在"管理"页面查看、编辑、删除密码
4. **检查安全**：在"安全"页面查看安全评分和问题建议
5. **导出备份**：在"我的"页面导出数据进行备份

## 📊 密码强度标准

| 分数 | 等级 | 要求 |
|------|------|------|
| >= 80 | 强 | 长度12+，包含大小写字母、数字、特殊字符 |
| 60-79 | 中 | 长度8+，包含多种字符类型 |
| < 60 | 弱 | 长度过短或字符类型单一 |

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进项目！

## 📄 许可证

MIT License

## 👨‍💻 作者

**xjyon** - 2026年7月

---

## 📞 支持

如有问题或建议，欢迎通过以下方式联系：
- GitHub Issues
- 邮件反馈

## 🔄 更新日志

### v1.0.0 (2026-07-09)
- ✨ 首次发布
- 🎉 完整的密码管理功能
- 🛡️ 安全检测功能
- 📊 数据统计和分析
- 💾 数据导出/导入功能
