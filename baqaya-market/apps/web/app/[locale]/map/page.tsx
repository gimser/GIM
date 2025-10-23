"use client";
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const LeafletMap = dynamic(() => import('../../../components/LeafletMap'), {
  ssr: false
});

export default function MapPage() {
  const casablanca = useMemo(() => ({ lat: 33.5731, lng: -7.5898 }), []);
  return (
    <main className="h-[calc(100vh-2rem)] p-2">
      <LeafletMap center={casablanca} zoom={12} />
    </main>
  );
}
