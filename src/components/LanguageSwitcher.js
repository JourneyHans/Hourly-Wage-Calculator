import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button
        className={`btn ${i18n.language === 'en' ? 'btn-primary' : 'btn-outline'}`}
        onClick={() => changeLanguage('en')}
      >
        English
      </button>
      <button
        className={`btn ${i18n.language === 'zh' ? 'btn-primary' : 'btn-outline'}`}
        onClick={() => changeLanguage('zh')}
      >
        中文
      </button>
    </div>
  );
};

export default LanguageSwitcher;
