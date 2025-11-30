# Supeco DLC Manager — Ultra Pro Edition

نظام إدارة المخزون المتقدم - تطبيق ويب يعمل بدون إنترنت (PWA)

## المميزات

- ✅ 100% تطبيق ويب غير متصل
- ✅ لا يحتاج أي إطارات عمل (Vanilla JS)
- ✅ دعم 10,000+ منتج
- ✅ واجهة عربية RTL احترافية
- ✅ متجاوب مع الجوال
- ✅ ماسح باركود مدمج
- ✅ لوحة تحكم مع رسوم بيانية
- ✅ تصدير/استيراد قاعدة البيانات

## البنية

```
/
├── index.html          # صفحة المنتجات الرئيسية
├── dashboard.html      # لوحة التحكم
├── settings.html       # الإعدادات
├── scan.html          # الماسح الضوئي
├── manifest.json      # ملف PWA
├── sw.js             # Service Worker
├── styles/
│   ├── global.css
│   ├── dashboard.css
│   ├── forms.css
│   ├── sidebar.css
│   ├── charts.css
│   └── products.css
├── js/
│   ├── app.js
│   ├── database.js
│   ├── storage.js
│   ├── ui.js
│   ├── modals.js
│   ├── alerts.js
│   ├── router.js
│   ├── dashboard.js
│   └── scanner.js
└── assets/
    └── icons/        # أيقونات PWA
```

## التثبيت

### 1. إنشاء أيقونات PWA

تحتاج إلى إنشاء أيقونات PNG بالحجم التالي:
- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

يمكنك استخدام:
- [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- أي محرر صور

ضع الأيقونات في `/assets/icons/` مع الأسماء:
- icon-72.png
- icon-96.png
- icon-128.png
- icon-144.png
- icon-152.png
- icon-192.png
- icon-384.png
- icon-512.png

### 2. النشر على Cloudflare Pages

1. ارفع الملفات إلى مستودع Git
2. في Cloudflare Pages:
   - اربط المستودع
   - Build command: اتركه فارغاً
   - Build output: `/`
   - Publish

## الاستخدام

1. افتح `index.html` في المتصفح
2. سيتم تحميل 10 منتجات تجريبية تلقائياً
3. أضف/عدل/احذف المنتجات
4. استخدم الماسح الضوئي لمسح الباركود
5. راقب الإحصائيات في لوحة التحكم

## الميزات المتقدمة

### نظام التنبيهات
- فحص تلقائي كل 30 ثانية للمنتجات منتهية الصلاحية
- إشعارات فورية

### تحسين التخزين
- تنظيف تلقائي
- إزالة التكرارات
- ضغط البيانات

### PWA
- يعمل بدون إنترنت
- قابل للتثبيت
- تحديث تلقائي

## الملاحظات

- جميع البيانات محفوظة في LocalStorage
- الحد الأقصى للتخزين: ~5-10 MB
- يدعم جميع المتصفحات الحديثة
- يتطلب HTTPS للنشر (Cloudflare Pages يدعمه تلقائياً)

## الدعم

نظام كامل يعمل بدون إنترنت وبدون أي إضافات خارجية.

