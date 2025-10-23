import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function HomePage() {
  const center = useMemo(() => ({ lat: 33.5731, lng: -7.5898 }), []); // Casablanca
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Offres proches — العروض القريبة</h1>
      <p className="text-sm text-slate-600">Carte centrée sur Casablanca (OpenStreetMap)</p>
      <Map center={center} />
    </div>
  );
}
