import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans, Noto_Naskh_Arabic } from 'next/font/google';
import clsx from 'clsx';

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' });
const notoArabic = Noto_Naskh_Arabic({ subsets: ['arabic'], variable: '--font-ar' });

export const metadata: Metadata = {
  title: 'Baqaya Market',
  description: 'Rescue food near you in Morocco',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" dir="ltr" className={clsx(notoSans.variable, notoArabic.variable)}>
      <body className="min-h-screen bg-white text-gray-900">{children}</body>
    </html>
  );
}
