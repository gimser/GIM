import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
import BottomNav from './components/BottomNav';

const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language.startsWith('ar');

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="h-full pb-12 md:pb-0">
      <LanguageSwitcher current={i18n.language} onChange={(lng) => i18n.changeLanguage(lng)} />
      {children}
      <BottomNav />
    </div>
  );
};

export default AppShell;
