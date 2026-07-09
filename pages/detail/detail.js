// pages/detail/detail.js
const app = getApp();
const util = require('../../utils/util');

Page({
  data: {
    passwordData: null,
    showPassword: false,
    passwordStrength: null,
    id: ''
  },

  onLoad(options) {
    const id = options.id;
    if (id) {
      this.setData({ id });
      this.loadData(id);
    }
  },

  /**
   * 加载数据
   */
  loadData(id) {
    const passwordData = app.getPasswordById(id);
    if (passwordData) {
      this.setData({ passwordData });
      const strength = util.checkPasswordStrength(passwordData.password);
      this.setData({ passwordStrength: strength });
    }
  },

  /**
   * 切换显示密码
   */
  toggleShowPassword() {
    this.setData({ showPassword: !this.data.showPassword });
  },

  /**
   * 复制账号
   */
  copyUsername() {
    util.copyToClipboard(this.data.passwordData.username);
  },

  /**
   * 复制密码
   */
  copyPassword() {
    util.copyToClipboard(this.data.passwordData.password);
  },

  /**
   * 复制网址
   */
  copyWebsite() {
    if (this.data.passwordData.website) {
      util.copyToClipboard(this.data.passwordData.website);
    }
  },

  /**
   * 预览图片
   */
  previewImage(e) {
    const current = e.currentTarget.dataset.current;
    const urls = this.data.passwordData.images;
    wx.previewImage({
      current: urls[current],
      urls: urls
    });
  },

  /**
   * 删除图片
   */
  deleteImage(e) {
    e.stopPropagation();
    const index = e.currentTarget.dataset.index;
    const passwordData = this.data.passwordData;
    
    util.showConfirm('确认删除', '确定要删除这张图片吗？').then(confirm => {
      if (confirm) {
        passwordData.images.splice(index, 1);
        app.updatePassword(this.data.id, passwordData);
        this.loadData(this.data.id);
        util.showToast('图片已删除', 'success');
      }
    });
  },

  /**
   * 编辑密码
   */
  editPassword() {
    wx.navigateTo({
      url: `/pages/edit/edit?id=${this.data.id}`
    });
  },

  /**
   * 删除密码
   */
  deletePassword() {
    util.showConfirm('确认删除', '确定要删除这个密码记录吗？').then(confirm => {
      if (confirm) {
        app.deletePassword(this.data.id);
        util.showToast('密码已删除', 'success');
        
        // 延迟返回上一页
        setTimeout(() => {
          wx.navigateBack();
        }, 1000);
      }
    });
  },

  /**
   * 格式化日期
   */
  formatDate(date) {
    return util.formatDate(date, 'YYYY-MM-DD HH:mm');
  },

  /**
   * 获取分类名称
   */
  getCategoryName(category) {
    return util.getCategoryName(category);
  },

  /**
   * 获取分类颜色
   */
  getCategoryColor(category) {
    return util.getCategoryColor(category);
  }
});
