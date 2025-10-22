import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: { translation: { title: 'Metaverse Morocco Map', city_not_found: 'City not found.' } },
  fr: { translation: { title: 'Carte du Métaverse Maroc', city_not_found: 'Ville introuvable.' } },
  ar: { translation: { title: 'خريطة الميتافيرس المغرب', city_not_found: 'المدينة غير موجودة.' } },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
