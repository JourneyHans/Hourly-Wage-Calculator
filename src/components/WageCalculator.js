import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const WageCalculator = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    monthlySalary: 10000,
    workDaysPerWeek: 5,
    hoursPerDay: 8
  });
  const [results, setResults] = useState(null);

  const calculateWages = () => {
    const { monthlySalary, workDaysPerWeek, hoursPerDay } = formData;
    
    // 标准工作制 (8小时/天，5天/周)
    const standardWeeklyHours = 8 * 5;
    const standardMonthlyHours = standardWeeklyHours * 4.33; // 平均每月4.33周
    const standardHourlyWage = monthlySalary / standardMonthlyHours;
    
    // 996工作制 (12小时/天，6天/周)
    const nineNineSixWeeklyHours = 12 * 6;
    const nineNineSixMonthlyHours = nineNineSixWeeklyHours * 4.33;
    const nineNineSixHourlyWage = monthlySalary / nineNineSixMonthlyHours;
    
    // 自定义工作制
    const customWeeklyHours = hoursPerDay * workDaysPerWeek;
    const customMonthlyHours = customWeeklyHours * 4.33;
    const customHourlyWage = monthlySalary / customMonthlyHours;
    
    setResults({
      standard: {
        hourly: standardHourlyWage,
        daily: standardHourlyWage * 8,
        weekly: standardHourlyWage * standardWeeklyHours,
        monthly: monthlySalary
      },
      nineNineSix: {
        hourly: nineNineSixHourlyWage,
        daily: nineNineSixHourlyWage * 12,
        weekly: nineNineSixHourlyWage * nineNineSixWeeklyHours,
        monthly: monthlySalary
      },
      custom: {
        hourly: customHourlyWage,
        daily: customHourlyWage * hoursPerDay,
        weekly: customHourlyWage * customWeeklyHours,
        monthly: monthlySalary
      }
    });
  };

  useEffect(() => {
    calculateWages();
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const formatCurrency = (amount) => {
    return `¥${amount.toFixed(2)}`;
  };

  const getValueDifference = () => {
    if (!results) return 0;
    return ((results.standard.hourly - results.nineNineSix.hourly) / results.standard.hourly * 100).toFixed(1);
  };

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
          />
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
              min="1"
              max="7"
            />
          </div>
          
          <div className="input-group flex-1">
            <label htmlFor="hoursPerDay">{t('input.hoursPerDay')}</label>
            <input
              type="number"
              id="hoursPerDay"
              name="hoursPerDay"
              value={formData.hoursPerDay}
              onChange={handleInputChange}
              min="1"
              max="24"
            />
          </div>
        </div>
      </div>

      {/* 计算结果 */}
      {results && (
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
                <h4 className="text-primary mb-3">Custom Schedule</h4>
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
                <span className="text-danger fw-bold">-{getValueDifference()}%</span>
              </div>
            </div>
            
            <div className="alert alert-danger mt-4">
              <strong>{t('comparison.warning')}</strong>
              <p className="mb-0 mt-2">{t('comparison.recommendation')}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WageCalculator;
