import React from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import LanguageSwitcher from './components/LanguageSwitcher';
import WageCalculator from './components/WageCalculator';
import './App.css';

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="app-title">{t('app.title')}</h1>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      
      <main className="app-main">
        <div className="container">
          <WageCalculator />
        </div>
      </main>
      
      <footer className="app-footer">
        <div className="container">
          <div className="text-center">
            <p className="mb-2">{t('footer.description')}</p>
            <p className="text-muted small">{t('footer.disclaimer')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
