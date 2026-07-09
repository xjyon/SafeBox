// app.js
App({
  onLaunch() {
    // 初始化本地存储数据
    this.initStorage();
  },

  /**
   * 初始化本地存储
   */
  initStorage() {
    // 初始化密码列表
    if (!wx.getStorageSync('passwordList')) {
      wx.setStorageSync('passwordList', []);
    }
  },

  /**
   * 获取所有密码数据
   */
  getPasswordList() {
    return wx.getStorageSync('passwordList') || [];
  },

  /**
   * 保存密码数据
   */
  savePasswordList(list) {
    wx.setStorageSync('passwordList', list);
  },

  /**
   * 添加新密码
   */
  addPassword(passwordData) {
    const list = this.getPasswordList();
    const newItem = {
      id: this.generateId(),
      name: passwordData.name,
      category: passwordData.category,
      username: passwordData.username,
      password: passwordData.password,
      website: passwordData.website || '',
      remark: passwordData.remark || '',
      images: passwordData.images || [],
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
      lastViewTime: null
    };
    list.push(newItem);
    this.savePasswordList(list);
    return newItem;
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
   * 获取单个密码详情
   */
  getPasswordById(id) {
    const list = this.getPasswordList();
    return list.find(item => item.id === id) || null;
  },

  /**
   * 更新最近访问时间
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
   * 生成唯一ID
   */
  generateId() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * 搜索密码
   */
  searchPassword(keyword) {
    const list = this.getPasswordList();
    if (!keyword) return list;

    const lowerKeyword = keyword.toLowerCase();
    return list.filter(item => 
      item.name.toLowerCase().includes(lowerKeyword) ||
      item.username.toLowerCase().includes(lowerKeyword) ||
      item.website.toLowerCase().includes(lowerKeyword) ||
      item.remark.toLowerCase().includes(lowerKeyword)
    );
  },

  /**
   * 按分类筛选
   */
  filterByCategory(category) {
    const list = this.getPasswordList();
    if (!category) return list;
    return list.filter(item => item.category === category);
  },

  /**
   * 获取最近访问记录
   */
  getRecentViewList(limit = 5) {
    const list = this.getPasswordList();
    return list
      .filter(item => item.lastViewTime)
      .sort((a, b) => new Date(b.lastViewTime) - new Date(a.lastViewTime))
      .slice(0, limit);
  },

  /**
   * 清空所有数据
   */
  clearAllData() {
    wx.setStorageSync('passwordList', []);
  }
});
