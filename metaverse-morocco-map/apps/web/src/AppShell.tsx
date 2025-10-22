import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';

const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language.startsWith('ar');

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full">
      <LanguageSwitcher current={i18n.language} onChange={(lng) => i18n.changeLanguage(lng)} />
      {children}
    </div>
  );
};

export default AppShell;
