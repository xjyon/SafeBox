// pages/index/index.js
const app = getApp();
const util = require('../../utils/util');

Page({
  data: {
    searchValue: '',
    searchResults: [],
    passwordCount: 0,
    securityScore: 100,
    weakPasswordCount: 0,
    duplicatePasswordCount: 0,
    categories: [
      { id: 'work', name: '工作', icon: '💼', color: '#3498db', count: 0 },
      { id: 'social', name: '社交', icon: '👥', color: '#e74c3c', count: 0 },
      { id: 'shopping', name: '购物', icon: '🛒', color: '#f39c12', count: 0 },
      { id: 'finance', name: '金融', icon: '💰', color: '#27AE60', count: 0 },
      { id: 'other', name: '其他', icon: '📦', color: '#95a5a6', count: 0 }
    ],
    recentList: []
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  /**
   * 加载数据
   */
  loadData() {
    const passwordList = app.getPasswordList();
    
    // 计算密码总数
    this.setData({
      passwordCount: passwordList.length
    });

    // 更新分类计数
    this.updateCategoryCounts(passwordList);

    // 计算安全指标
    this.calculateSecurityMetrics(passwordList);

    // 获取最近访问记录
    const recentList = app.getRecentViewList(5);
    this.setData({
      recentList: recentList
    });
  },

  /**
   * 更新分类计数
   */
  updateCategoryCounts(passwordList) {
    const categories = this.data.categories.map(cat => {
      const count = passwordList.filter(item => item.category === cat.id).length;
      return {
        ...cat,
        count: count
      };
    });
    this.setData({ categories });
  },

  /**
   * 计算安全指标
   */
  calculateSecurityMetrics(passwordList) {
    if (passwordList.length === 0) {
      this.setData({
        securityScore: 100,
        weakPasswordCount: 0,
        duplicatePasswordCount: 0
      });
      return;
    }

    // 检测弱密码
    let weakCount = 0;
    const passwordMap = {};

    passwordList.forEach(item => {
      // 检测弱密码
      if (util.isWeakPassword(item.password)) {
        weakCount++;
      }

      // 检测重复密码
      if (passwordMap[item.password]) {
        passwordMap[item.password]++;
      } else {
        passwordMap[item.password] = 1;
      }
    });

    // 计算重复密码数量
    let duplicateCount = 0;
    Object.values(passwordMap).forEach(count => {
      if (count > 1) {
        duplicateCount++;
      }
    });

    // 计算安全评分
    let score = 100;
    score -= weakCount * 10;
    score -= duplicateCount * 15;
    score = Math.max(0, Math.min(100, score));

    this.setData({
      securityScore: score,
      weakPasswordCount: weakCount,
      duplicatePasswordCount: duplicateCount
    });
  },

  /**
   * 搜索输入
   */
  onSearchInput(e) {
    const keyword = e.detail.value;
    this.setData({ searchValue: keyword });

    if (keyword) {
      const results = app.searchPassword(keyword);
      this.setData({ searchResults: results });
    } else {
      this.setData({ searchResults: [] });
    }
  },

  /**
   * 清空搜索
   */
  onClearSearch() {
    this.setData({
      searchValue: '',
      searchResults: []
    });
  },

  /**
   * 按分类筛选
   */
  filterByCategory(e) {
    const category = e.currentTarget.dataset.category;
    wx.navigateTo({
      url: `/pages/manage/manage?category=${category}`
    });
  },

  /**
   * 进入详情页
   */
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    app.updateLastViewTime(id);
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  },

  /**
   * 进入安全检测页
   */
  goToSecurity() {
    wx.switchTab({
      url: '/pages/security/security'
    });
  },

  /**
   * 格式化时间
   */
  formatTime(time) {
    return util.getTimeDistance(time);
  }
});
