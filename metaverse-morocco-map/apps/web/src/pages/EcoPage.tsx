import React from 'react';
import { NeonCard } from '@mmm/shared/ui';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';

const data = [
  { name: '2019', solar: 20, wind: 10 },
  { name: '2020', solar: 28, wind: 14 },
  { name: '2021', solar: 35, wind: 18 },
  { name: '2022', solar: 45, wind: 22 },
  { name: '2023', solar: 57, wind: 27 },
];

const EcoPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <NeonCard>
        <h3 className="font-semibold mb-2">تأثير الطاقة النظيفة</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <Tooltip />
              <Area type="monotone" dataKey="solar" stroke="#F5C451" fill="#F5C45133" />
              <Area type="monotone" dataKey="wind" stroke="#00E5FF" fill="#00E5FF33" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </NeonCard>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NeonCard>
          <h4 className="font-semibold">مشاريع شمسية</h4>
          <ul className="list-disc pl-6 text-sm text-white/80">
            <li>نور ورزازات — توسعات جديدة</li>
            <li>أسطح شمسية في أغادير</li>
          </ul>
        </NeonCard>
        <NeonCard>
          <h4 className="font-semibold">شركاء بيئيون</h4>
          <ul className="list-disc pl-6 text-sm text-white/80">
            <li>MASEN</li>
            <li>جمعيات تدوير محلية</li>
          </ul>
        </NeonCard>
      </div>
    </div>
  );
};

export default EcoPage;
