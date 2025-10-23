import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <header className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Baqaya Market</h1>
          <nav className="flex gap-3 text-sm">
            <Link href="/fr">FR</Link>
            <Link href="/ar">AR</Link>
          </nav>
        </header>
        <p className="mt-3 text-muted-foreground">{t('subtitle')}</p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link className="rounded-lg border p-4" href="/fr/map">
            {t('openMap')}
          </Link>
          <Link className="rounded-lg border p-4" href="/fr/vendor/dashboard">
            {t('vendorDashboard')}
          </Link>
        </div>
      </section>
    </main>
  );
}
