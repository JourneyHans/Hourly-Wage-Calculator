import { useMemo } from 'react';

// 工作制度常量
export const WORK_CONSTANTS = {
  STANDARD_WEEKLY_HOURS: 8 * 5,
  AVERAGE_WEEKS_PER_MONTH: 4.33,
  MAX_WORK_DAYS_PER_WEEK: 7,
  MAX_HOURS_PER_DAY: 24,
  MIN_WORK_DAYS_PER_WEEK: 1,
  MIN_HOURS_PER_DAY: 1,
};

// 工资计算工具函数
const calculateWageRates = (monthlySalary, workDaysPerWeek, hoursPerDay) => {
  // 标准工作制 (8小时/天，5天/周)
  const standardWeeklyHours = WORK_CONSTANTS.STANDARD_WEEKLY_HOURS;
  const standardMonthlyHours = standardWeeklyHours * WORK_CONSTANTS.AVERAGE_WEEKS_PER_MONTH;
  const standardHourlyWage = monthlySalary / standardMonthlyHours;
  
  // 996工作制 (12小时/天，6天/周)
  const nineNineSixWeeklyHours = 12 * 6;
  const nineNineSixMonthlyHours = nineNineSixWeeklyHours * WORK_CONSTANTS.AVERAGE_WEEKS_PER_MONTH;
  const nineNineSixHourlyWage = monthlySalary / nineNineSixMonthlyHours;
  
  // 自定义工作制
  const customWeeklyHours = hoursPerDay * workDaysPerWeek;
  const customMonthlyHours = customWeeklyHours * WORK_CONSTANTS.AVERAGE_WEEKS_PER_MONTH;
  const customHourlyWage = monthlySalary / customMonthlyHours;
  
  return {
    standard: {
      hourly: standardHourlyWage,
      daily: standardHourlyWage * 8,
      weekly: standardHourlyWage * standardWeeklyHours,
      monthly: monthlySalary,
    },
    nineNineSix: {
      hourly: nineNineSixHourlyWage,
      daily: nineNineSixHourlyWage * 12,
      weekly: nineNineSixHourlyWage * nineNineSixWeeklyHours,
      monthly: monthlySalary,
    },
    custom: {
      hourly: customHourlyWage,
      daily: customHourlyWage * hoursPerDay,
      weekly: customHourlyWage * customWeeklyHours,
      monthly: monthlySalary,
    },
  };
};

// 自定义Hook：工资计算
export const useWageCalculation = (formData) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => {
    const { monthlySalary, workDaysPerWeek, hoursPerDay } = formData;
    
    // 验证输入数据
    if (!monthlySalary || !workDaysPerWeek || !hoursPerDay) {
      return null;
    }
    
    return calculateWageRates(monthlySalary, workDaysPerWeek, hoursPerDay);
  }, [formData.monthlySalary, formData.workDaysPerWeek, formData.hoursPerDay]);
};

// 自定义Hook：价值差异计算
export const useValueDifference = (results) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => {
    if (!results) return 0;
    const difference = ((results.standard.hourly - results.nineNineSix.hourly) / results.standard.hourly * 100);
    return difference.toFixed(1);
  }, [results]);
};

// 自定义Hook：表单验证
export const useFormValidation = (formData, errors) => {
  const { monthlySalary, workDaysPerWeek, hoursPerDay } = formData;
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => {
    // 检查是否有错误信息
    const hasErrors = Object.values(errors).some(error => error !== null && error !== undefined);
    
    // 检查所有必填字段是否有效
    const hasValidData = monthlySalary > 0 && 
                        workDaysPerWeek >= 1 && workDaysPerWeek <= 7 && 
                        hoursPerDay >= 1 && hoursPerDay <= 24;
    
    return !hasErrors && hasValidData;
  }, [errors, monthlySalary, workDaysPerWeek, hoursPerDay]);
};
