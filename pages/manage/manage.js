// pages/manage/manage.js
const app = getApp();
const util = require('../../utils/util');

Page({
  data: {
    searchValue: '',
    filterCategory: 'all',
    displayList: [],
    categoryTabs: [
      { id: 'all', name: '全部' },
      { id: 'work', name: '工作' },
      { id: 'social', name: '社交' },
      { id: 'shopping', name: '购物' },
      { id: 'finance', name: '金融' },
      { id: 'other', name: '其他' }
    ]
  },

  onLoad(options) {
    // 如果从首页传入分类，则自动筛选
    if (options.category) {
      this.setData({ filterCategory: options.category });
    }
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  /**
   * 加载数据
   */
  loadData() {
    let list = app.getPasswordList();
    const { searchValue, filterCategory } = this.data;

    // 搜索过滤
    if (searchValue) {
      list = list.filter(item =>
        item.name.includes(searchValue) ||
        item.username.includes(searchValue) ||
        item.website.includes(searchValue) ||
        item.remark.includes(searchValue)
      );
    }

    // 分类过滤
    if (filterCategory !== 'all') {
      list = list.filter(item => item.category === filterCategory);
    }

    // 按更新时间倒序排列
    list.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime));

    this.setData({ displayList: list });
  },

  /**
   * 搜索输入
   */
  onSearchInput(e) {
    this.setData({ searchValue: e.detail.value });
    this.loadData();
  },

  /**
   * 选择分类
   */
  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ filterCategory: category, searchValue: '' });
    this.loadData();
  },

  /**
   * 显示分类筛选
   */
  showCategoryFilter() {
    wx.showActionSheet({
      itemList: ['全部', '工作', '社交', '购物', '金融', '其他'],
      success: (res) => {
        const categories = ['all', 'work', 'social', 'shopping', 'finance', 'other'];
        this.setData({ filterCategory: categories[res.tapIndex] });
        this.loadData();
      }
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
   * 进入新增页
   */
  goToAdd() {
    wx.navigateTo({
      url: '/pages/add/add'
    });
  },

  /**
   * 格式化时间
   */
  formatTime(time) {
    return util.formatDate(time, 'MM-DD');
  },

  /**
   * 获取分类名称
   */
  getCategoryName(category) {
    return util.getCategoryName(category);
  }
});
