import '../globals.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Baqaya Market',
  description: 'Rescue surplus food in Morocco'
};

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: 'fr' | 'ar' };
}) {
  const { locale } = params;
  let messages;
  try {
    messages = require(`../messages/${locale}.json`);
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
