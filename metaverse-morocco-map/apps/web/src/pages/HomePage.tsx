import React from 'react';
import { NeonCard, Button } from '@mmm/shared/ui';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <section className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold">
          <span className="text-mmm-gold">Metaverse</span> Morocco Map
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto">
          بوابة غامرة تجمع التجارة، السياحة والبيئة بروح مغربية وأثر ميتافيرسي.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button className="shadow-neon" onClick={() => navigate('/map')}>استكشف الخريطة</Button>
          <Button variant="secondary" onClick={() => navigate('/tourism')}>المعالم السياحية</Button>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NeonCard>
          <h3 className="font-semibold mb-1">متاجر محلية</h3>
          <p className="text-sm text-white/80">منتجات أصيلة من مدن المغرب.</p>
          <Button className="mt-3" onClick={() => navigate('/stores')}>تسوّق الآن</Button>
        </NeonCard>
        <NeonCard>
          <h3 className="font-semibold mb-1">سياحة</h3>
          <p className="text-sm text-white/80">اكتشف شفشاون، الصويرة والصحراء.</p>
          <Button className="mt-3" onClick={() => navigate('/tourism')}>ابدأ الاستكشاف</Button>
        </NeonCard>
        <NeonCard>
          <h3 className="font-semibold mb-1">البيئة</h3>
          <p className="text-sm text-white/80">مشاريع الطاقة النظيفة والمبادرات البيئية.</p>
          <Button className="mt-3" onClick={() => navigate('/eco')}>اعرف المزيد</Button>
        </NeonCard>
      </section>
    </div>
  );
};

export default HomePage;
