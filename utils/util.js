/**
 * 工具函数模块
 */

/**
 * 格式化日期
 * @param {string|Date} date - 日期
 * @param {string} format - 格式化格式，默认 'YYYY-MM-DD HH:mm'
 */
function formatDate(date, format = 'YYYY-MM-DD HH:mm') {
  if (!date) return '';
  
  if (typeof date === 'string') {
    date = new Date(date);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 计算距离现在的时间差
 * @param {string|Date} date - 日期
 */
function getTimeDistance(date) {
  if (!date) return '';

  if (typeof date === 'string') {
    date = new Date(date);
  }

  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return '刚刚';
  } else if (diffMinutes < 60) {
    return `${diffMinutes}分钟前`;
  } else if (diffHours < 24) {
    return `${diffHours}小时前`;
  } else if (diffDays < 7) {
    return `${diffDays}天前`;
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)}周前`;
  } else {
    return formatDate(date, 'YYYY-MM-DD');
  }
}

/**
 * 复制到剪贴板
 * @param {string} text - 要复制的文本
 */
function copyToClipboard(text) {
  return new Promise((resolve, reject) => {
    wx.setClipboardData({
      data: text,
      success() {
        wx.showToast({
          title: '已复制',
          icon: 'success',
          duration: 1500
        });
        resolve();
      },
      fail() {
        wx.showToast({
          title: '复制失败',
          icon: 'none',
          duration: 1500
        });
        reject();
      }
    });
  });
}

/**
 * 显示确认对话框
 * @param {string} title - 标题
 * @param {string} content - 内容
 */
function showConfirm(title, content) {
  return new Promise((resolve) => {
    wx.showModal({
      title: title,
      content: content,
      success(res) {
        resolve(res.confirm);
      }
    });
  });
}

/**
 * 显示加载提示
 * @param {string} title - 提示文本
 */
function showLoading(title = '加载中...') {
  wx.showLoading({
    title: title,
    mask: true
  });
}

/**
 * 隐藏加载提示
 */
function hideLoading() {
  wx.hideLoading();
}

/**
 * 显示提示
 * @param {string} title - 提示文本
 * @param {string} icon - 图标类型: success, error, loading, none
 */
function showToast(title, icon = 'none') {
  wx.showToast({
    title: title,
    icon: icon,
    duration: 1500
  });
}

/**
 * 检测密码强度
 * @param {string} password - 密码
 */
function checkPasswordStrength(password) {
  if (!password) {
    return { score: 0, level: '无', message: '密码为空' };
  }

  let score = 0;
  const length = password.length;

  // 长度检测
  if (length >= 8) score += 20;
  if (length >= 12) score += 20;
  if (length >= 16) score += 10;

  // 字符多样性
  if (/[a-z]/.test(password)) score += 15;
  if (/[A-Z]/.test(password)) score += 15;
  if (/[0-9]/.test(password)) score += 15;
  if (/[^a-zA-Z0-9]/.test(password)) score += 15;

  let level = '弱';
  let message = '密码过于简单';

  if (score >= 80) {
    level = '强';
    message = '密码强度强';
  } else if (score >= 60) {
    level = '中';
    message = '密码强度中等';
  } else if (score >= 40) {
    level = '较弱';
    message = '建议增加密码复杂度';
  }

  return { score, level, message };
}

/**
 * 检测是否为弱密码
 * @param {string} password - 密码
 */
function isWeakPassword(password) {
  if (!password) return true;
  
  // 密码长度小于8位
  if (password.length < 8) return true;

  // 简单数字密码
  if (/^\d+$/.test(password)) return true;

  // 简单字母密码
  if (/^[a-zA-Z]+$/.test(password)) return true;

  // 连续数字或字母
  const seq = '0123456789abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < seq.length - 2; i++) {
    if (password.includes(seq.substr(i, 3))) return true;
  }

  return false;
}

/**
 * 计算两个日期相差的天数
 * @param {Date|string} date - 日期
 */
function getDaysDiff(date) {
  if (!date) return 0;

  if (typeof date === 'string') {
    date = new Date(date);
  }

  const now = new Date();
  const diffMs = now - date;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * 获取分类显示名称
 * @param {string} category - 分类
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
 * @param {string} category - 分类
 */
function getCategoryColor(category) {
  const colorMap = {
    'work': '#3498db',
    'social': '#e74c3c',
    'shopping': '#f39c12',
    'finance': '#27AE60',
    'other': '#95a5a6'
  };
  return colorMap[category] || '#95a5a6';
}

module.exports = {
  formatDate,
  getTimeDistance,
  copyToClipboard,
  showConfirm,
  showLoading,
  hideLoading,
  showToast,
  checkPasswordStrength,
  isWeakPassword,
  getDaysDiff,
  getCategoryName,
  getCategoryColor
};
