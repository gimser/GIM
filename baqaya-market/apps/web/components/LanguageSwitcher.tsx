"use client";
import { useState, useEffect } from 'react';

export default function LanguageSwitcher() {
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
  const [lang, setLang] = useState<'fr' | 'ar'>('fr');

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [dir, lang]);

  return (
    <div className="flex gap-2 items-center">
      <button className="underline" onClick={() => { setLang('fr'); setDir('ltr'); }}>FR</button>
      <span>/</span>
      <button className="underline" onClick={() => { setLang('ar'); setDir('rtl'); }}>العربية</button>
    </div>
  );
}
