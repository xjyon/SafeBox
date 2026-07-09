// pages/security/security.js
const app = getApp();
const util = require('../../utils/util');

Page({
  data: {
    securityScore: 100,
    passwordCount: 0,
    weakPasswordCount: 0,
    duplicatePasswordCount: 0,
    needUpdateCount: 0,
    showDetailList: []
  },

  onShow() {
    this.runSecurityCheck();
  },

  /**
   * 执行安全检测
   */
  runSecurityCheck() {
    const passwordList = app.getPasswordList();
    
    // 计算密码总数
    this.setData({ passwordCount: passwordList.length });

    if (passwordList.length === 0) {
      this.setData({
        securityScore: 100,
        weakPasswordCount: 0,
        duplicatePasswordCount: 0,
        needUpdateCount: 0,
        showDetailList: []
      });
      return;
    }

    // 检测弱密码
    const weakPasswords = [];
    const passwordMap = {};
    const allDetails = [];

    passwordList.forEach(item => {
      // 检测弱密码
      if (util.isWeakPassword(item.password)) {
        weakPasswords.push(item);
        allDetails.push({
          id: item.id,
          name: item.name,
          type: 'weak',
          typeName: '弱密码'
        });
      }

      // 检测重复密码
      if (passwordMap[item.password]) {
        passwordMap[item.password].push(item);
      } else {
        passwordMap[item.password] = [item];
      }
    });

    // 计算重复密码
    let duplicatePasswords = [];
    Object.values(passwordMap).forEach(items => {
      if (items.length > 1) {
        items.forEach(item => {
          duplicatePasswords.push(item);
          // 仅添加第一个重复记录到详情中
          if (allDetails.every(d => d.id !== item.id)) {
            allDetails.push({
              id: item.id,
              name: item.name,
              type: 'duplicate',
              typeName: '重复密码'
            });
          }
        });
      }
    });

    // 检测需要更新的密码 (超过90天未更新)
    const needUpdatePasswords = [];
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    passwordList.forEach(item => {
      const updateTime = new Date(item.updateTime);
      if (updateTime < ninetyDaysAgo) {
        needUpdatePasswords.push(item);
        if (!allDetails.some(d => d.id === item.id)) {
          allDetails.push({
            id: item.id,
            name: item.name,
            type: 'update',
            typeName: '需要更新'
          });
        }
      }
    });

    // 计算安全评分
    let score = 100;
    score -= weakPasswords.length * 10;
    score -= (duplicatePasswords.length / 2) * 15;
    score -= needUpdatePasswords.length * 5;
    score = Math.max(0, Math.min(100, score));

    // 去除重复的详情记录
    const uniqueDetails = [];
    const seenIds = new Set();
    allDetails.forEach(item => {
      if (!seenIds.has(item.id)) {
        uniqueDetails.push(item);
        seenIds.add(item.id);
      }
    });

    this.setData({
      securityScore: Math.round(score),
      weakPasswordCount: weakPasswords.length,
      duplicatePasswordCount: Math.floor(duplicatePasswords.length / 2),
      needUpdateCount: needUpdatePasswords.length,
      showDetailList: uniqueDetails.slice(0, 20) // 仅显示前20条
    });
  },

  /**
   * 获取安全等级
   */
  getSecurityLevel(score) {
    if (score >= 80) {
      return '安全！您的密码管理不错。'';
    } else if (score >= 60) {
      return '一般！建议处理一些弱密码。';
    } else if (score >= 40) {
      return '较弱！存在稍许安全鄚險。';
    } else {
      return '危险！缧急接受建议。';
    }
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
  }
});
