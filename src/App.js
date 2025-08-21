import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './i18n';
import LanguageSwitcher from './components/LanguageSwitcher';
import WageCalculator from './components/WageCalculator';
import './App.css';

// 错误边界组件
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // 在生产环境中，这里可以发送错误到日志服务
    // 暂时注释掉 console.error
    // console.error('应用错误:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h1>应用出现错误</h1>
          <p>请刷新页面重试</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary"
          >
            刷新页面
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 添加 PropTypes 验证
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

// 加载组件
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">加载中...</span>
    </div>
  </div>
);

function App() {
  const { t } = useTranslation();

  return (
    <ErrorBoundary>
      <div className="App">
        <header className="app-header" role="banner">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="app-title">{t('app.title')}</h1>
              <LanguageSwitcher />
            </div>
          </div>
        </header>
        
        <main className="app-main" role="main">
          <div className="container">
            <Suspense fallback={<LoadingSpinner />}>
              <WageCalculator />
            </Suspense>
          </div>
        </main>
        
        <footer className="app-footer" role="contentinfo">
          <div className="container">
            <div className="text-center">
              <p className="mb-2">{t('footer.description')}</p>
              <p className="text-muted small">{t('footer.disclaimer')}</p>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
