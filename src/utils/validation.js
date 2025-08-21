// 输入验证工具函数

/**
 * 验证数值输入
 * @param {string|number} value - 输入值
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {boolean} 是否有效
 */
export const validateInput = (value, min, max) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * 验证月薪输入
 * @param {string|number} value - 月薪值
 * @returns {boolean} 是否有效
 */
export const validateMonthlySalary = (value) => {
  return validateInput(value, 0, 1000000);
};

/**
 * 验证每周工作天数
 * @param {string|number} value - 工作天数
 * @returns {boolean} 是否有效
 */
export const validateWorkDaysPerWeek = (value) => {
  return validateInput(value, 1, 7);
};

/**
 * 验证每天工作小时数
 * @param {string|number} value - 工作小时数
 * @returns {boolean} 是否有效
 */
export const validateHoursPerDay = (value) => {
  return validateInput(value, 1, 24);
};

/**
 * 格式化货币显示
 * @param {number} amount - 金额
 * @returns {string} 格式化后的货币字符串
 */
export const formatCurrency = (amount) => {
  if (isNaN(amount) || !isFinite(amount)) {
    return '¥0.00';
  }
  return `¥${amount.toFixed(2)}`;
};

/**
 * 清理输入值
 * @param {string} value - 输入字符串
 * @returns {number} 清理后的数值
 */
export const sanitizeInput = (value) => {
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
};
