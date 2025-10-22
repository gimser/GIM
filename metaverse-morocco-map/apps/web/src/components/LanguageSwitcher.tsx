import React from 'react';

const LanguageSwitcher: React.FC<{ onChange: (lang: string) => void; current: string }> = ({ onChange, current }) => {
  return (
    <div className="fixed top-3 right-3 z-50 bg-white/90 rounded shadow px-2 py-1">
      <select
        aria-label="Language"
        value={current}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none"
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="ar">العربية</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
