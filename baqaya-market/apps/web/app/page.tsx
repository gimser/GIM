import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function HomePage() {
  return (
    <main className="p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Baqaya Market</h1>
        <nav className="space-x-3">
          <Link href="/vendor/dashboard" className="underline">Vendor</Link>
          <Link href="/profile" className="underline">Profile</Link>
          <Link href="/admin" className="underline">Admin</Link>
        </nav>
      </header>

      <Suspense fallback={<div>Loading map…</div>}>
        <Map />
      </Suspense>
    </main>
  );
}
