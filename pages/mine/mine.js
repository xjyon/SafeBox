// pages/mine/mine.js
const app = getApp();
const util = require('../../utils/util');

Page({
  data: {
    totalPasswords: 0,
    totalImages: 0,
    lastBackupDays: '-'
  },

  onShow() {
    this.loadStatistics();
  },

  /**
   * 加载统计信息
   */
  loadStatistics() {
    const passwordList = app.getPasswordList();
    const imageList = wx.getStorageSync('imageList') || [];
    const lastBackup = wx.getStorageSync('lastBackupTime');

    let lastBackupDays = '-';
    if (lastBackup) {
      const backup = new Date(lastBackup);
      const now = new Date();
      const days = Math.floor((now - backup) / (1000 * 60 * 60 * 24));
      if (days === 0) {
        lastBackupDays = '今天';
      } else if (days === 1) {
        lastBackupDays = '昨天';
      } else {
        lastBackupDays = `${days}天前`;
      }
    }

    this.setData({
      totalPasswords: passwordList.length,
      totalImages: imageList.length,
      lastBackupDays: lastBackupDays
    });
  },

  /**
   * 进入安全检测
   */
  goToSecurity() {
    wx.switchTab({
      url: '/pages/security/security'
    });
  },

  /**
   * 导出数据
   */
  exportData() {
    const passwordList = app.getPasswordList();
    const imageList = wx.getStorageSync('imageList') || [];
    
    const exportData = {
      exportTime: new Date().toISOString(),
      version: '1.0.0',
      passwords: passwordList,
      images: imageList.map(img => ({
        name: img.name,
        remark: img.remark,
        createTime: img.createTime,
        // 图片路径不导出，用户需要手动处理
      }))
    };

    const jsonStr = JSON.stringify(exportData, null, 2);
    
    // 将数据保存到剪贴板
    wx.setClipboardData({
      data: jsonStr,
      success() {
        util.showToast('数据已复制到剪贴板', 'success');
      },
      fail() {
        util.showToast('复制失败', 'error');
      }
    });
  },

  /**
   * 导入数据
   */
  importData() {
    wx.showModal({
      title: '导入数据',
      content: '请将导出的JSON数据粘贴到下方输入框',
      editable: true,
      placeholderText: '粘贴JSON数据',
      success: (res) => {
        if (res.confirm && res.content) {
          try {
            const importData = JSON.parse(res.content);
            if (importData.passwords && Array.isArray(importData.passwords)) {
              let currentList = app.getPasswordList();
              currentList = currentList.concat(importData.passwords);
              app.savePasswordList(currentList);
              
              wx.setStorageSync('lastBackupTime', new Date().toISOString());
              util.showToast('导入成功', 'success');
              this.loadStatistics();
            } else {
              util.showToast('数据格式错误', 'error');
            }
          } catch (e) {
            util.showToast('JSON格式错误', 'error');
          }
        }
      }
    });
  },

  /**
   * 显示关于
   */
  showAbout() {
    wx.showModal({
      title: '关于 SafeBox',
      content: 'SafeBox v1.0.0\n\n一个个人使用的密码管理微信小程序，用于安全存储账号密码和私人信息。\n\n作者：xjyon\n时间：2026',
      showCancel: false
    });
  },

  /**
   * 显示隐私声明
   */
  showPrivacy() {
    wx.showModal({
      title: '隐私声明',
      content: 'SafeBox 只在本地存储您的数据，不会上传到任何服务器。所有数据都通过微信小程序的本地存储 API 存储在您的设备上。\n\n我们承诺保护您的隐私和数据安全。',
      showCancel: false
    });
  },

  /**
   * 清空所有数据
   */
  clearAllData() {
    util.showConfirm('确认清空', '您确定要清空所有数据吗？此操作不可恢复！').then(confirm => {
      if (confirm) {
        app.clearAllData();
        wx.setStorageSync('imageList', []);
        wx.setStorageSync('lastBackupTime', '');
        util.showToast('数据已清空', 'success');
        this.loadStatistics();
      }
    });
  }
});
