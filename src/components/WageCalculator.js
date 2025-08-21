import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  useWageCalculation, 
  useValueDifference, 
  useFormValidation,
  WORK_CONSTANTS,
} from '../hooks/useWageCalculation';
import { 
  validateMonthlySalary, 
  validateWorkDaysPerWeek, 
  validateHoursPerDay,
  formatCurrency,
} from '../utils/validation';

const WageCalculator = () => {
  const { t } = useTranslation();
  
  // 表单状态
  const [formData, setFormData] = useState({
    monthlySalary: 10000,
    workDaysPerWeek: 5,
    hoursPerDay: 8,
  });
  
  // 错误状态
  const [errors, setErrors] = useState({});
  
  // 使用自定义Hook
  const results = useWageCalculation(formData);
  const valueDifference = useValueDifference(results);
  const isFormValid = useFormValidation(formData, errors);

  // 使用 useCallback 优化性能
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    
    // 清除该字段的错误
    setErrors(prev => ({
      ...prev,
      [name]: null,
    }));
    
    // 验证输入值
    let error = null;
    switch (name) {
    case 'monthlySalary':
      if (!validateMonthlySalary(value)) {
        error = t('validation.salaryRequired');
      }
      break;
    case 'workDaysPerWeek':
      if (!validateWorkDaysPerWeek(value)) {
        error = t('validation.daysRequired');
      }
      break;
    case 'hoursPerDay':
      if (!validateHoursPerDay(value)) {
        error = t('validation.hoursRequired');
      }
      break;
    default:
      break;
    }
    
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  }, [t]);

  return (
    <div className="wage-calculator">
      {/* 输入表单 */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">{t('app.title')}</h2>
          <p className="text-muted">{t('app.subtitle')}</p>
        </div>
        
        <div className="input-group">
          <label htmlFor="monthlySalary">{t('input.monthlySalary')}</label>
          <input
            type="number"
            id="monthlySalary"
            name="monthlySalary"
            value={formData.monthlySalary}
            onChange={handleInputChange}
            min="0"
            step="100"
            className={errors.monthlySalary ? 'error' : ''}
          />
          {errors.monthlySalary && (
            <span className="error-message">{errors.monthlySalary}</span>
          )}
        </div>
        
        <div className="d-flex gap-3">
          <div className="input-group flex-1">
            <label htmlFor="workDaysPerWeek">{t('input.workDaysPerWeek')}</label>
            <input
              type="number"
              id="workDaysPerWeek"
              name="workDaysPerWeek"
              value={formData.workDaysPerWeek}
              onChange={handleInputChange}
              min={WORK_CONSTANTS.MIN_WORK_DAYS_PER_WEEK}
              max={WORK_CONSTANTS.MAX_WORK_DAYS_PER_WEEK}
              className={errors.workDaysPerWeek ? 'error' : ''}
            />
            {errors.workDaysPerWeek && (
              <span className="error-message">{errors.workDaysPerWeek}</span>
            )}
          </div>
          
          <div className="input-group flex-1">
            <label htmlFor="hoursPerDay">{t('input.hoursPerDay')}</label>
            <input
              type="number"
              id="hoursPerDay"
              name="hoursPerDay"
              value={formData.hoursPerDay}
              onChange={handleInputChange}
              min={WORK_CONSTANTS.MIN_HOURS_PER_DAY}
              max={WORK_CONSTANTS.MAX_HOURS_PER_DAY}
              className={errors.hoursPerDay ? 'error' : ''}
            />
            {errors.hoursPerDay && (
              <span className="error-message">{errors.hoursPerDay}</span>
            )}
          </div>
        </div>
      </div>

      {/* 计算结果 */}
      {isFormValid && results && (
        <>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">{t('results.title')}</h3>
            </div>
            
            <div className="d-flex gap-3">
              {/* 标准工作制 */}
              <div className="flex-1">
                <h4 className="text-success mb-3">{t('workSchedules.standard')}</h4>
                <div className="result-item">
                  <span className="text-muted">{t('results.hourlyWage')}:</span>
                  <span className="text-success fw-bold">{formatCurrency(results.standard.hourly)}</span>
                </div>
                <div className="result-item">
                  <span className="text-muted">{t('results.dailyWage')}:</span>
                  <span className="text-success">{formatCurrency(results.standard.daily)}</span>
                </div>
                <div className="result-item">
                  <span className="text-muted">{t('results.weeklyWage')}:</span>
                  <span className="text-success">{formatCurrency(results.standard.weekly)}</span>
                </div>
              </div>
              
              {/* 996工作制 */}
              <div className="flex-1">
                <h4 className="text-danger mb-3">{t('workSchedules.nineNineSix')}</h4>
                <div className="result-item">
                  <span className="text-muted">{t('results.hourlyWage')}:</span>
                  <span className="text-danger fw-bold">{formatCurrency(results.nineNineSix.hourly)}</span>
                </div>
                <div className="result-item">
                  <span className="text-muted">{t('results.dailyWage')}:</span>
                  <span className="text-danger">{formatCurrency(results.nineNineSix.daily)}</span>
                </div>
                <div className="result-item">
                  <span className="text-muted">{t('results.weeklyWage')}:</span>
                  <span className="text-danger">{formatCurrency(results.nineNineSix.weekly)}</span>
                </div>
              </div>
              
              {/* 自定义工作制 */}
              <div className="flex-1">
                <h4 className="text-primary mb-3">{t('workSchedules.custom')}</h4>
                <div className="result-item">
                  <span className="text-muted">{t('results.hourlyWage')}:</span>
                  <span className="text-primary fw-bold">{formatCurrency(results.custom.hourly)}</span>
                </div>
                <div className="result-item">
                  <span className="text-muted">{t('results.dailyWage')}:</span>
                  <span className="text-primary">{formatCurrency(results.custom.daily)}</span>
                </div>
                <div className="result-item">
                  <span className="text-muted">{t('results.weeklyWage')}:</span>
                  <span className="text-primary">{formatCurrency(results.custom.weekly)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 价值对比 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">{t('comparison.title')}</h3>
            </div>
            
            <div className="comparison-results">
              <div className="comparison-item d-flex justify-content-between align-items-center mb-3">
                <span>{t('comparison.standard')}:</span>
                <span className="text-success fw-bold">{formatCurrency(results.standard.hourly)}</span>
              </div>
              
              <div className="comparison-item d-flex justify-content-between align-items-center mb-3">
                <span>{t('comparison.nineNineSix')}:</span>
                <span className="text-danger fw-bold">{formatCurrency(results.nineNineSix.hourly)}</span>
              </div>
              
              <div className="comparison-item d-flex justify-content-between align-items-center mb-3">
                <span>{t('comparison.difference')}:</span>
                <span className="text-danger fw-bold">-{valueDifference}%</span>
              </div>
            </div>
            
            <div className="alert alert-danger mt-4">
              <strong>{t('comparison.warning')}</strong>
              <p className="mb-0 mt-2">{t('comparison.recommendation')}</p>
            </div>
          </div>
        </>
      )}

      {/* 表单验证提示 */}
      {!isFormValid && (
        <div className="card">
          <div className="alert alert-info">
            <strong>{t('validation.pleaseComplete')}</strong>
            <p className="mb-0 mt-2">{t('validation.enterValidValues')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WageCalculator;
