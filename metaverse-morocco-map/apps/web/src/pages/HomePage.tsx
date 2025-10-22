import React from 'react';
import { NeonCard, Button } from '@mmm/shared/ui';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
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
          <Button as-child className="shadow-neon">
            <Link to="/map">استكشف الخريطة</Link>
          </Button>
          <Button variant="secondary" as-child>
            <Link to="/tourism">المعالم السياحية</Link>
          </Button>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NeonCard>
          <h3 className="font-semibold mb-1">متاجر محلية</h3>
          <p className="text-sm text-white/80">منتجات أصيلة من مدن المغرب.</p>
          <Button className="mt-3" as-child><Link to="/stores">تسوّق الآن</Link></Button>
        </NeonCard>
        <NeonCard>
          <h3 className="font-semibold mb-1">سياحة</h3>
          <p className="text-sm text-white/80">اكتشف شفشاون، الصويرة والصحراء.</p>
          <Button className="mt-3" as-child><Link to="/tourism">ابدأ الاستكشاف</Link></Button>
        </NeonCard>
        <NeonCard>
          <h3 className="font-semibold mb-1">البيئة</h3>
          <p className="text-sm text-white/80">مشاريع الطاقة النظيفة والمبادرات البيئية.</p>
          <Button className="mt-3" as-child><Link to="/eco">اعرف المزيد</Link></Button>
        </NeonCard>
      </section>
    </div>
  );
};

export default HomePage;
