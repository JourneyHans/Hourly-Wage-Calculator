# 开发文档

## 项目架构

### 目录结构
```
src/
├── components/          # React 组件
│   ├── WageCalculator.js    # 工资计算器主组件
│   └── LanguageSwitcher.js  # 语言切换器组件
├── hooks/              # 自定义 React Hooks
│   └── useWageCalculation.js # 工资计算相关逻辑
├── utils/              # 工具函数
│   └── validation.js   # 输入验证工具
├── i18n/               # 国际化配置
│   ├── index.js        # i18n 初始化
│   └── locales/        # 语言包文件
├── App.js              # 应用主组件
└── index.js            # 应用入口
```

### 核心概念

#### 1. 组件设计原则
- **单一职责**: 每个组件只负责一个特定功能
- **可复用性**: 组件设计为可复用的，支持不同场景
- **可测试性**: 组件逻辑清晰，易于单元测试

#### 2. 状态管理
- 使用 React Hooks 管理本地状态
- 避免过度使用全局状态
- 状态提升到合适的层级

#### 3. 性能优化
- 使用 `useCallback` 优化函数引用
- 使用 `useMemo` 缓存计算结果
- 避免不必要的重新渲染

## 开发规范

### 代码风格
- 使用 ESLint + Prettier 确保代码质量
- 遵循 Airbnb JavaScript Style Guide
- 使用语义化的变量和函数命名

### 国际化规范 ⭐ **重要**
- **禁止硬编码文本**: 所有用户可见的文本都必须通过国际化函数调用
- **使用 t() 函数**: 所有文本都应该使用 `t('key')` 的形式
- **文本键命名**: 使用点分隔的命名方式，如 `app.title`、`input.monthlySalary`
- **语言包管理**: 在 `src/i18n/locales/` 目录下维护各语言版本

#### 硬编码文本检测规则
ESLint 配置了自动检测规则，会检查以下情况：
- 中文字符：`[\u4e00-\u9fa5]`
- 英文单词：超过3个字符的英文单词

#### 正确的文本使用方式
```javascript
// ✅ 正确 - 使用国际化函数
<h1>{t('app.title')}</h1>
<p>{t('app.subtitle')}</p>
<label>{t('input.monthlySalary')}</label>

// ❌ 错误 - 硬编码文本
<h1>工资计算器</h1>
<p>计算不同工作制度下的真实时薪</p>
<label>月薪</label>
```

#### 语言包文件结构
```json
// src/i18n/locales/zh.json
{
  "app": {
    "title": "工资计算器",
    "subtitle": "计算不同工作制度下的真实时薪"
  },
  "input": {
    "monthlySalary": "月薪",
    "workDaysPerWeek": "每周工作天数",
    "hoursPerDay": "每天工作小时数"
  }
}
```

### 组件规范
```javascript
// 组件结构示例
const ComponentName = () => {
  // 1. Hooks 声明
  const [state, setState] = useState(initialValue);
  
  // 2. 计算值
  const computedValue = useMemo(() => {
    // 计算逻辑
  }, [dependencies]);
  
  // 3. 事件处理函数
  const handleEvent = useCallback(() => {
    // 处理逻辑
  }, [dependencies]);
  
  // 4. 渲染
  return (
    <div>
      {/* JSX 内容 */}
    </div>
  );
};
```

### 文件命名
- 组件文件使用 PascalCase: `WageCalculator.js`
- 工具文件使用 camelCase: `validation.js`
- Hook 文件使用 camelCase: `useWageCalculation.js`

## 开发流程

### 1. 代码质量检查
```bash
# 运行 ESLint 检查（包含硬编码文本检测）
npm run lint

# 自动修复 ESLint 问题
npm run lint:fix

# 检查代码格式
npm run format:check

# 自动格式化代码
npm run format

# 完整代码质量检查
npm run code-quality
```

### 2. 开发环境
```bash
# 启动开发服务器
npm start

# 构建生产版本
npm run build

# 运行测试
npm test
```

## 最佳实践

### 1. 错误处理
- 使用 Error Boundary 捕获组件错误
- 提供用户友好的错误信息
- 记录错误日志用于调试

### 2. 可访问性
- 使用语义化的 HTML 标签
- 添加适当的 ARIA 属性
- 支持键盘导航

### 3. 国际化
- **所有用户可见文本使用 i18n**
- 支持动态语言切换
- 考虑不同语言的文本长度
- **定期检查是否有遗漏的硬编码文本**

### 4. 性能监控
- 使用 React DevTools 分析组件性能
- 监控关键性能指标
- 优化大型列表渲染

## 测试策略

### 单元测试
- 测试工具函数和自定义 Hooks
- 测试组件渲染逻辑
- 测试用户交互行为

### 集成测试
- 测试组件间协作
- 测试数据流
- 测试用户工作流

## 部署

### 构建优化
- 代码分割和懒加载
- 资源压缩和优化
- CDN 部署

### 环境配置
- 开发、测试、生产环境配置
- 环境变量管理
- 构建脚本自动化

## 维护

### 依赖管理
- 定期更新依赖版本
- 监控安全漏洞
- 保持依赖版本兼容性

### 代码审查
- 强制代码审查流程
- 自动化代码质量检查
- 持续改进代码标准

### 国际化维护
- 定期检查硬编码文本
- 更新语言包内容
- 确保多语言一致性
