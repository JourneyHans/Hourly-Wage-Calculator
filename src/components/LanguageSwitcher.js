import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  // 使用 useCallback 优化性能
  const changeLanguage = useCallback((lng) => {
    i18n.changeLanguage(lng);
  }, [i18n]);

  // 语言配置
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  return (
    <div className="language-switcher" role="group" aria-label="语言选择">
      {languages.map(({ code, name, flag }) => (
        <button
          key={code}
          className={`btn ${i18n.language === code ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => changeLanguage(code)}
          aria-pressed={i18n.language === code}
          title={`切换到${name}`}
        >
          <span className="flag" role="img" aria-label={name}>
            {flag}
          </span>
          <span className="language-name">{name}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
