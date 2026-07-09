// app.js
App({
  onLaunch() {
    // 初始化应用
    this.initData();
  },

  /**
   * 初始化数据
   */
  initData() {
    // 从本地存储加载密码数据
    if (!wx.getStorageSync('passwordList')) {
      wx.setStorageSync('passwordList', []);
    }
  },

  /**
   * 获取密码列表
   */
  getPasswordList() {
    return wx.getStorageSync('passwordList') || [];
  },

  /**
   * 保存密码列表
   */
  savePasswordList(list) {
    wx.setStorageSync('passwordList', list);
  },

  /**
   * 新增密码
   */
  addPassword(passwordData) {
    const list = this.getPasswordList();
    const newPassword = {
      id: this.generateId(),
      ...passwordData,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
      images: passwordData.images || []
    };
    list.push(newPassword);
    this.savePasswordList(list);
    return newPassword;
  },

  /**
   * 获取密码详情
   */
  getPasswordById(id) {
    const list = this.getPasswordList();
    return list.find(item => item.id === id);
  },

  /**
   * 更新密码
   */
  updatePassword(id, passwordData) {
    const list = this.getPasswordList();
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
      list[index] = {
        ...list[index],
        ...passwordData,
        updateTime: new Date().toISOString()
      };
      this.savePasswordList(list);
      return list[index];
    }
    return null;
  },

  /**
   * 删除密码
   */
  deletePassword(id) {
    let list = this.getPasswordList();
    list = list.filter(item => item.id !== id);
    this.savePasswordList(list);
  },

  /**
   * 搜索密码
   */
  searchPassword(keyword) {
    const list = this.getPasswordList();
    return list.filter(item =>
      item.name.includes(keyword) ||
      item.username.includes(keyword) ||
      item.website.includes(keyword) ||
      item.remark.includes(keyword)
    );
  },

  /**
   * 获取最近访问列表
   */
  getRecentViewList(limit = 5) {
    const list = this.getPasswordList();
    // 按最后访问时间排序
    const sorted = list.sort((a, b) => {
      const timeA = a.lastViewTime ? new Date(a.lastViewTime).getTime() : 0;
      const timeB = b.lastViewTime ? new Date(b.lastViewTime).getTime() : 0;
      return timeB - timeA;
    });
    return sorted.filter(item => item.lastViewTime).slice(0, limit);
  },

  /**
   * 更新最后访问时间
   */
  updateLastViewTime(id) {
    const list = this.getPasswordList();
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
      list[index].lastViewTime = new Date().toISOString();
      this.savePasswordList(list);
    }
  },

  /**
   * 清空所有数据
   */
  clearAllData() {
    wx.setStorageSync('passwordList', []);
  },

  /**
   * 生成唯一ID
   */
  generateId() {
    return 'pwd_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  globalData: {
    userInfo: null
  }
});
