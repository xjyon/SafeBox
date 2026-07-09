// utils/util.js

/**
 * 格式化日期
 * @param {string|Date} date - 日期
 * @param {string} format - 格式
 * @returns {string} 格式化后的日期
 */
function formatDate(date, format = 'YYYY-MM-DD HH:mm') {
  if (!date) return '';
  
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 检查密码强度
 * @param {string} password - 密码
 * @returns {object} 强度信息
 */
function checkPasswordStrength(password) {
  let score = 0;
  let level = '弱';

  if (!password) {
    return { score: 0, level: '弱' };
  }

  // 长度检查
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 20;

  // 字符类型检查
  if (/[a-z]/.test(password)) score += 15; // 小写字母
  if (/[A-Z]/.test(password)) score += 15; // 大写字母
  if (/[0-9]/.test(password)) score += 15; // 数字
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password)) score += 15; // 特殊字符

  // 确定等级
  if (score >= 80) {
    level = '强';
  } else if (score >= 60) {
    level = '中';
  } else {
    level = '弱';
  }

  return { score: Math.min(score, 100), level };
}

/**
 * 判断是否为弱密码
 * @param {string} password - 密码
 * @returns {boolean}
 */
function isWeakPassword(password) {
  const strength = checkPasswordStrength(password);
  return strength.score < 60;
}

/**
 * 获取分类名称
 * @param {string} category - 分类代码
 * @returns {string} 分类名称
 */
function getCategoryName(category) {
  const categoryMap = {
    'work': '工作',
    'social': '社交',
    'shopping': '购物',
    'finance': '金融',
    'other': '其他'
  };
  return categoryMap[category] || category;
}

/**
 * 获取分类颜色
 * @param {string} category - 分类代码
 * @returns {string} 颜色值
 */
function getCategoryColor(category) {
  const colorMap = {
    'work': '#3498db',
    'social': '#e74c3c',
    'shopping': '#f39c12',
    'finance': '#27AE60',
    'other': '#95a5a6'
  };
  return colorMap[category] || '#999999';
}

/**
 * 复制到剪贴板
 * @param {string} text - 要复制的文本
 */
function copyToClipboard(text) {
  wx.setClipboardData({
    data: text,
    success() {
      showToast('已复制到剪贴板', 'success');
    },
    fail() {
      showToast('复制失败', 'error');
    }
  });
}

/**
 * 显示提示信息
 * @param {string} title - 标题
 * @param {string} icon - 图标类型 (success, error, loading)
 * @param {number} duration - 持续时间
 */
function showToast(title, icon = 'none', duration = 1500) {
  wx.showToast({
    title,
    icon,
    duration
  });
}

/**
 * 显示确认对话框
 * @param {string} title - 标题
 * @param {string} content - 内容
 * @returns {Promise<boolean>}
 */
function showConfirm(title, content) {
  return new Promise((resolve) => {
    wx.showModal({
      title,
      content,
      success(res) {
        resolve(res.confirm);
      },
      fail() {
        resolve(false);
      }
    });
  });
}

/**
 * 检查是否为空
 * @param {*} value - 值
 * @returns {boolean}
 */
function isEmpty(value) {
  return value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0);
}

/**
 * 生成随机字符串
 * @param {number} length - 长度
 * @returns {string}
 */
function generateRandomString(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 验证邮箱
 * @param {string} email - 邮箱
 * @returns {boolean}
 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 验证URL
 * @param {string} url - URL
 * @returns {boolean}
 */
function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  formatDate,
  checkPasswordStrength,
  isWeakPassword,
  getCategoryName,
  getCategoryColor,
  copyToClipboard,
  showToast,
  showConfirm,
  isEmpty,
  generateRandomString,
  validateEmail,
  validateUrl
};
