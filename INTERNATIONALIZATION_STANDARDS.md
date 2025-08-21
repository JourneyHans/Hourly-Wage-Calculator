# 国际化规范文档

## 🚫 禁止硬编码文本规则

本项目严格禁止在代码中出现硬编码的中文或英文文本，所有用户可见的文本都必须通过国际化函数调用。

## 📋 检测规则

### ESLint 自动检测
ESLint 配置了自动检测规则，会检查以下情况：

1. **中文字符检测**: `[\u4e00-\u9fa5]`
   - 任何包含中文字符的字符串都会被检测
   - 例如：`"工资计算器"`、`"月薪"` 等

2. **英文单词检测**: `\b[a-zA-Z]{3,}\b`
   - 超过3个字符的英文单词会被检测
   - 例如：`"Calculator"`、`"Monthly"` 等

### 检测范围
- 字符串字面量 (`"text"`)
- JSX 文本内容
- JSX 属性值
- 变量赋值
- 函数参数

## ✅ 正确的文本使用方式

### 1. 使用国际化函数
```javascript
// ✅ 正确
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('app.title')}</h1>
      <p>{t('app.subtitle')}</p>
      <label>{t('input.monthlySalary')}</label>
    </div>
  );
};
```

### 2. 文本键命名规范
使用点分隔的命名方式，按功能模块组织：

```javascript
// 应用级别
t('app.title')           // 应用标题
t('app.subtitle')        // 应用副标题
t('app.description')     // 应用描述

// 输入表单
t('input.monthlySalary')     // 月薪输入
t('input.workDaysPerWeek')   // 每周工作天数
t('input.hoursPerDay')       // 每天工作小时数

// 结果展示
t('results.title')           // 结果标题
t('results.hourlyWage')      // 时薪
t('results.dailyWage')       // 日薪

// 工作制度
t('workSchedules.standard')  // 标准工作制
t('workSchedules.nineNineSix') // 996工作制
t('workSchedules.custom')    // 自定义工作制

// 验证信息
t('validation.salaryRequired')   // 月薪必填
t('validation.daysRequired')     // 工作天数必填
t('validation.hoursRequired')    // 工作小时数必填
```

## ❌ 错误的文本使用方式

### 1. 硬编码中文
```javascript
// ❌ 错误
<h1>工资计算器</h1>
<p>计算不同工作制度下的真实时薪</p>
<label>月薪</label>
```

### 2. 硬编码英文
```javascript
// ❌ 错误
<h1>Wage Calculator</h1>
<p>Calculate real hourly wage under different work schedules</p>
<label>Monthly Salary</label>
```

### 3. 混合使用
```javascript
// ❌ 错误
<h1>{t('app.title')}</h1>
<p>这是硬编码的中文文本</p>
<label>{t('input.monthlySalary')}</label>
```

## 📁 语言包文件结构

### 中文语言包 (`src/i18n/locales/zh.json`)
```json
{
  "app": {
    "title": "工资计算器",
    "subtitle": "计算不同工作制度下的真实时薪",
    "description": "帮助您了解在不同工作制度下的真实时薪水平"
  },
  "input": {
    "monthlySalary": "月薪",
    "workDaysPerWeek": "每周工作天数",
    "hoursPerDay": "每天工作小时数"
  },
  "results": {
    "title": "计算结果",
    "hourlyWage": "时薪",
    "dailyWage": "日薪",
    "weeklyWage": "周薪"
  },
  "workSchedules": {
    "standard": "标准工作制",
    "nineNineSix": "996工作制",
    "custom": "自定义工作制"
  },
  "validation": {
    "salaryRequired": "请输入有效的月薪",
    "daysRequired": "每周工作天数应在1-7天之间",
    "hoursRequired": "每天工作小时数应在1-24小时之间"
  }
}
```

### 英文语言包 (`src/i18n/locales/en.json`)
```json
{
  "app": {
    "title": "Wage Calculator",
    "subtitle": "Calculate real hourly wage under different work schedules",
    "description": "Help you understand real hourly wage levels under different work schedules"
  },
  "input": {
    "monthlySalary": "Monthly Salary",
    "workDaysPerWeek": "Work Days Per Week",
    "hoursPerDay": "Hours Per Day"
  },
  "results": {
    "title": "Calculation Results",
    "hourlyWage": "Hourly Wage",
    "dailyWage": "Daily Wage",
    "weeklyWage": "Weekly Wage"
  },
  "workSchedules": {
    "standard": "Standard Schedule",
    "nineNineSix": "996 Schedule",
    "custom": "Custom Schedule"
  },
  "validation": {
    "salaryRequired": "Please enter a valid monthly salary",
    "daysRequired": "Work days per week should be between 1-7",
    "hoursRequired": "Hours per day should be between 1-24"
  }
}
```

## 🔧 开发工具集成

### 1. ESLint 检查
```bash
# 检查硬编码文本
npm run lint

# 自动修复可修复的问题
npm run lint:fix
```

### 2. 编辑器集成
- VS Code: 安装 ESLint 插件
- WebStorm: 内置 ESLint 支持
- 实时显示硬编码文本错误

### 3. 预提交检查
在 Git 提交前自动运行 ESLint 检查，确保没有硬编码文本。

## 📝 最佳实践

### 1. 开发流程
1. **编写代码时**: 直接使用 `t('key')` 调用
2. **添加新文本时**: 先在语言包中定义键值
3. **代码审查时**: 检查是否有遗漏的硬编码文本
4. **测试时**: 验证多语言切换是否正常

### 2. 文本管理
- 保持语言包文件结构清晰
- 使用有意义的键名
- 定期清理未使用的键
- 确保中英文内容一致

### 3. 常见陷阱
- 避免在注释中使用硬编码文本
- 注意动态生成的文本
- 检查第三方组件的文本
- 验证错误信息的国际化

## 🚨 违规处理

### 1. 开发阶段
- ESLint 会显示错误信息
- 无法通过代码质量检查
- 需要修复后才能提交代码

### 2. 代码审查
- 硬编码文本会被标记为问题
- 需要解释为什么使用硬编码
- 可能需要重构代码

### 3. 持续改进
- 定期检查代码库
- 更新语言包内容
- 培训团队成员

## 📚 相关资源

- [React i18next 官方文档](https://react.i18next.com/)
- [i18next 配置指南](https://www.i18next.com/overview/configuration-options)
- [国际化最佳实践](https://github.com/i18next/i18next/blob/master/README.md)

## 🎯 总结

禁止硬编码文本是确保项目国际化质量的重要规范。通过：

1. **自动化检测**: ESLint 规则自动发现硬编码文本
2. **标准化流程**: 统一的文本键命名和管理方式
3. **持续监控**: 开发、审查、测试各环节的检查
4. **团队协作**: 所有成员都遵循相同的规范

我们可以确保项目的多语言支持质量，为用户提供更好的本地化体验。
