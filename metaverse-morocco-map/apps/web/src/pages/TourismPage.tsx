import React from 'react';
import { NeonCard, Button } from '@mmm/shared/ui';

const places = [
  { id: 'chaouen', title: 'شفشاون', desc: 'المدينة الزرقاء بسحر فاسي.', image: '' },
  { id: 'essaouira', title: 'الصويرة', desc: 'رياح وموسيقى وأمواج.', image: '' },
  { id: 'sahara', title: 'الصحراء', desc: 'كثبان ذهبية وسماء صافية.', image: '' },
];

const TourismPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((p) => (
          <NeonCard key={p.id} className="group overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-mmm-fes-blue/40 to-mmm-neon-violet/30 rounded-lg mb-3" />
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-white/70">{p.desc}</div>
              </div>
              <Button className="mt-1">استكشف</Button>
            </div>
          </NeonCard>
        ))}
      </div>
    </div>
  );
};

export default TourismPage;
