// pages/index/index.js
const app = getApp();
const util = require('../../utils/util');

Page({
  data: {
    recentList: [],
    passwordCount: 0,
    securityScore: 100,
    unsafeCount: 0
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    this.loadData();
    wx.stopPullDownRefresh();
  },

  /**
   * 加载数据
   */
  loadData() {
    const passwordList = app.getPasswordList();
    const recentList = app.getRecentViewList(5);

    // 计算安全评分
    let securityScore = 100;
    let unsafeCount = 0;

    passwordList.forEach(item => {
      if (util.isWeakPassword(item.password)) {
        securityScore -= 10;
        unsafeCount++;
      }
    });

    securityScore = Math.max(0, Math.min(100, securityScore));

    this.setData({
      recentList,
      passwordCount: passwordList.length,
      securityScore,
      unsafeCount
    });
  },

  /**
   * 格式化时间
   */
  formatTime(time) {
    if (!time) return '';
    const date = new Date(time);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) {
      return '刚刚';
    } else if (minutes < 60) {
      return `${minutes}分钟前`;
    } else if (hours < 24) {
      return `${hours}小时前`;
    } else if (days < 7) {
      return `${days}天前`;
    } else {
      return util.formatDate(time, 'MM-DD');
    }
  },

  /**
   * 前往添加页面
   */
  goToAdd() {
    wx.navigateTo({
      url: '/pages/add/add'
    });
  },

  /**
   * 前往管理页面
   */
  goToManage() {
    wx.switchTab({
      url: '/pages/manage/manage'
    });
  },

  /**
   * 前往详情页面
   */
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    app.updateLastViewTime(id);
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  },

  /**
   * 前往安全检测页面
   */
  goToSecurity() {
    wx.switchTab({
      url: '/pages/security/security'
    });
  },

  /**
   * 前往我的页面
   */
  goToMine() {
    wx.switchTab({
      url: '/pages/mine/mine'
    });
  },

  /**
   * 生成密码
   */
  generatePassword() {
    const password = util.generateRandomString(16);
    wx.setClipboardData({
      data: password,
      success() {
        util.showToast(`已复制密码: ${password.substring(0, 10)}...`, 'success');
      }
    });
  },

  /**
   * 获取分类颜色
   */
  getCategoryColor(category) {
    return util.getCategoryColor(category);
  },

  /**
   * 获取分类名称
   */
  getCategoryName(category) {
    return util.getCategoryName(category);
  }
});
