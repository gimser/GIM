import React from 'react';
import { useParams } from 'react-router-dom';
import { MOROCCO_CITIES } from '@mmm/shared';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import ChatBox from '../components/ChatBox';
import AvatarCanvas from '../components/AvatarCanvas';

const CityPage: React.FC = () => {
  const { cityId } = useParams();
  const city = MOROCCO_CITIES.find((c) => c.id === cityId);

  if (!city) return <div className="p-6">City not found.</div>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">{city.nameEn}</h1>
        <AvatarCanvas />
      </div>
      <ProductList cityId={city.id} />
      <ChatBox cityId={city.id} />
      <Cart />
    </div>
  );
};

export default CityPage;
