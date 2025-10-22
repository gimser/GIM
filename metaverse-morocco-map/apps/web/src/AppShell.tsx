import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
import { ThemeProvider, ThemeContext } from '@mmm/shared/ui';
import { Link, useLocation } from 'react-router-dom';
import { BackgroundFX } from '@mmm/shared/ui';
import { Button } from '@mmm/shared/ui';

const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language.startsWith('ar');

  return (
    <ThemeProvider dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="relative min-h-full">
        <BackgroundFX />
        <header className="sticky top-0 z-20 backdrop-blur-md bg-black/30 border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="font-bold text-lg text-mmm-gold">Metaverse Morocco</Link>
            <nav className="flex items-center gap-3 text-sm">
              <NavLink to="/map" label="Map" />
              <NavLink to="/stores" label="Stores" />
              <NavLink to="/tourism" label="Tourism" />
              <NavLink to="/eco" label="Eco" />
              <NavLink to="/profile" label="Profile" />
              <div className="mx-2 h-5 w-px bg-white/20" />
              <LanguageSwitcher current={i18n.language} onChange={(lng) => i18n.changeLanguage(lng)} />
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main className="relative z-10 max-w-6xl mx-auto px-4 py-6">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

const NavLink: React.FC<{ to: string; label: string }> = ({ to, label }) => {
  const location = useLocation();
  const active = location.pathname.startsWith(to);
  return (
    <Link
      to={to}
      className={`px-3 py-1 rounded-md hover:bg-white/10 transition-colors ${active ? 'text-mmm-neon-cyan' : 'text-white'}`}
    >
      {label}
    </Link>
  );
};

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <Button variant="secondary" className="ml-2" onClick={toggleTheme}>
      {theme === 'dark' ? 'Light' : 'Dark'}
    </Button>
  );
};

export default AppShell;
