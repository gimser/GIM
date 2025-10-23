import React from 'react';
import { NeonCard, Button } from '@mmm/shared/ui';

const ProfilePage: React.FC = () => {
  return (
    <div className="space-y-4">
      <NeonCard>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-mmm-gold to-mmm-neon-violet" />
          <div>
            <div className="font-semibold">المستخدم</div>
            <div className="text-sm text-white/70">المدينة الحالية: الرباط</div>
          </div>
        </div>
      </NeonCard>
      <NeonCard>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary">تبديل اللغة</Button>
          <Button>الوضع الليلي</Button>
          <Button variant="ghost">تسجيل الخروج</Button>
        </div>
      </NeonCard>
    </div>
  );
};

export default ProfilePage;
