import React from 'react';
import { NeonCard, Button } from '@mmm/shared/ui';

const sample = [
  { id: '1', name: 'Moroccan Rug', price: 1200, city: 'marrakech', category: 'Crafts' },
  { id: '2', name: 'Argan Oil', price: 25, city: 'agadir', category: 'Beauty' },
  { id: '3', name: 'Blue Pottery', price: 60, city: 'fes', category: 'Crafts' },
];

const StoresPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <select className="bg-white/10 border border-white/20 rounded px-3 py-2">
          <option>All Cities</option>
          <option>Casablanca</option>
          <option>Rabat</option>
          <option>Fes</option>
          <option>Marrakech</option>
          <option>Tangier</option>
          <option>Agadir</option>
        </select>
        <select className="bg-white/10 border border-white/20 rounded px-3 py-2">
          <option>All Categories</option>
          <option>Crafts</option>
          <option>Beauty</option>
          <option>Food</option>
          <option>Tech</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sample.map((p) => (
          <NeonCard key={p.id}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-white/70">{p.city} • {p.category}</div>
              </div>
              <div className="text-mmm-gold font-bold">${p.price}</div>
            </div>
            <Button className="mt-3">اشتري الآن</Button>
          </NeonCard>
        ))}
      </div>
    </div>
  );
};

export default StoresPage;
