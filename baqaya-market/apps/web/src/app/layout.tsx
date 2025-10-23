import './globals.css';
import type { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Baqaya Market',
  description: 'Sauvez des repas au Maroc | أنقذ الوجبات في المغرب',
  manifest: '/manifest.webmanifest'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" dir="ltr">
      <body className="min-h-screen bg-white text-slate-900">
        <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <a href="/" className="font-semibold text-brand">Baqaya Market</a>
            <nav className="flex items-center gap-4 text-sm">
              <a href="/" className="hover:text-brand">Carte</a>
              <a href="/profile" className="hover:text-brand">Profil</a>
              <a href="/vendor/dashboard" className="hover:text-brand">Vendeur</a>
              <a href="/admin" className="hover:text-brand">Admin</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
