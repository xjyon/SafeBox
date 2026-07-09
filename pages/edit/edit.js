// pages/edit/edit.js
const app = getApp();
const util = require('../../utils/util');

Page({
  data: {
    id: '',
    showPassword: false,
    passwordForm: {
      name: '',
      category: '',
      username: '',
      password: '',
      website: '',
      remark: ''
    },
    passwordStrength: {
      score: 0,
      level: ''
    }
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
      this.setData({ passwordForm: { ...passwordData } });
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
   * 密码表单输入
   */
  onPasswordInput(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;
    const passwordForm = this.data.passwordForm;
    passwordForm[field] = value;
    
    this.setData({ passwordForm });

    // 计算密码强度
    if (field === 'password') {
      const strength = util.checkPasswordStrength(value);
      this.setData({ passwordStrength: strength });
    }
  },

  /**
   * 选择分类
   */
  selectCategory() {
    wx.showActionSheet({
      itemList: ['工作', '社交', '购物', '金融', '其他'],
      success: (res) => {
        const categories = ['work', 'social', 'shopping', 'finance', 'other'];
        const passwordForm = this.data.passwordForm;
        passwordForm.category = categories[res.tapIndex];
        this.setData({ passwordForm });
      }
    });
  },

  /**
   * 保存修改
   */
  savePassword() {
    const { name, category, username, password } = this.data.passwordForm;

    // 验证必填字段
    if (!name) {
      util.showToast('请输入密码名称');
      return;
    }
    if (!category) {
      util.showToast('请选择分类');
      return;
    }
    if (!username) {
      util.showToast('请输入账号');
      return;
    }
    if (!password) {
      util.showToast('请输入密码');
      return;
    }

    // 更新数据
    const updatedForm = {
      ...this.data.passwordForm,
      updateTime: new Date().toISOString()
    };
    
    app.updatePassword(this.data.id, updatedForm);
    util.showToast('密码已更新', 'success');

    // 延迟返回上一页
    setTimeout(() => {
      wx.navigateBack();
    }, 1000);
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack();
  },

  /**
   * 获取分类名称
   */
  getCategoryName(category) {
    return util.getCategoryName(category);
  }
});
