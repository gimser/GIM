import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: { translation: {
    title: 'Metaverse Morocco Map',
    city_not_found: 'City not found.',
    nav: {
      home: 'Home', map: 'Map', stores: 'Stores', tourism: 'Tourism', eco: 'Eco', profile: 'Profile'
    },
    home: {
      hero: { title: 'Metaverse Morocco Map', subtitle: 'An immersive Moroccan gateway blending commerce, tourism, and the environment.' },
      cta_map: 'Explore the map', cta_tourism: 'Tourist attractions',
      cards: {
        stores_title: 'Local Stores', stores_desc: 'Authentic products from Moroccan cities.', stores_cta: 'Shop now',
        tourism_title: 'Tourism', tourism_desc: 'Discover Chefchaouen, Essaouira and the Sahara.', tourism_cta: 'Start exploring',
        eco_title: 'Environment', eco_desc: 'Clean energy projects and initiatives.', eco_cta: 'Learn more'
      }
    },
    stores: { filters: { city: 'All Cities', category: 'All Categories' }, buy: 'Buy now' },
    tourism: { explore: 'Explore' },
    eco: { chart_title: 'Clean energy impact', solar: 'Solar', wind: 'Wind', solar_projects: 'Solar projects', partners: 'Environmental partners' },
    profile: { user: 'User', current_city: 'Current city', actions: { lang: 'Change language', theme: 'Night mode', logout: 'Sign out' } }
  } },
  fr: { translation: {
    title: 'Carte du Métaverse Maroc',
    city_not_found: 'Ville introuvable.',
    nav: {
      home: 'Accueil', map: 'Carte', stores: 'Boutiques', tourism: 'Tourisme', eco: 'Écologie', profile: 'Profil'
    },
    home: {
      hero: { title: 'Carte du Métaverse Maroc', subtitle: 'Une passerelle immersive marocaine alliant commerce, tourisme et environnement.' },
      cta_map: 'Explorer la carte', cta_tourism: 'Sites touristiques',
      cards: {
        stores_title: 'Boutiques locales', stores_desc: 'Produits authentiques des villes marocaines.', stores_cta: 'Acheter maintenant',
        tourism_title: 'Tourisme', tourism_desc: 'Découvrez Chefchaouen, Essaouira et le Sahara.', tourism_cta: 'Commencer',
        eco_title: 'Environnement', eco_desc: 'Projets d’énergie propre et initiatives.', eco_cta: 'En savoir plus'
      }
    },
    stores: { filters: { city: 'Toutes les villes', category: 'Toutes les catégories' }, buy: 'Acheter' },
    tourism: { explore: 'Explorer' },
    eco: { chart_title: 'Impact des énergies propres', solar: 'Solaire', wind: 'Éolien', solar_projects: 'Projets solaires', partners: 'Partenaires environnementaux' },
    profile: { user: 'Utilisateur', current_city: 'Ville actuelle', actions: { lang: 'Changer la langue', theme: 'Mode nuit', logout: 'Se déconnecter' } }
  } },
  ar: { translation: {
    title: 'خريطة الميتافيرس المغرب',
    city_not_found: 'المدينة غير موجودة.',
    nav: {
      home: 'الرئيسية', map: 'الخريطة', stores: 'المتاجر', tourism: 'السياحة', eco: 'البيئة', profile: 'الملف الشخصي'
    },
    home: {
      hero: { title: 'خريطة الميتافيرس المغرب', subtitle: 'بوابة غامرة تجمع التجارة، السياحة والبيئة بروح مغربية.' },
      cta_map: 'استكشف الخريطة', cta_tourism: 'المعالم السياحية',
      cards: {
        stores_title: 'متاجر محلية', stores_desc: 'منتجات أصيلة من مدن المغرب.', stores_cta: 'تسوّق الآن',
        tourism_title: 'السياحة', tourism_desc: 'اكتشف شفشاون، الصويرة والصحراء.', tourism_cta: 'ابدأ الاستكشاف',
        eco_title: 'البيئة', eco_desc: 'مشاريع الطاقة النظيفة والمبادرات.', eco_cta: 'اعرف المزيد'
      }
    },
    stores: { filters: { city: 'كل المدن', category: 'كل التصنيفات' }, buy: 'اشتري الآن' },
    tourism: { explore: 'استكشف' },
    eco: { chart_title: 'تأثير الطاقة النظيفة', solar: 'شمسي', wind: 'رياح', solar_projects: 'مشاريع شمسية', partners: 'شركاء بيئيون' },
    profile: { user: 'المستخدم', current_city: 'المدينة الحالية', actions: { lang: 'تبديل اللغة', theme: 'الوضع الليلي', logout: 'تسجيل الخروج' } }
  } },
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
