
import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { useResponsive } from '@/hooks/use-responsive';
import { useSettings } from '@/contexts/SettingsContext';

export function SoundboardHeader() {
  const { getTextSize, isMobile, isTablet } = useResponsive();
  const { bilingualMode } = useSettings();

  const titleSize = getTextSize({
    mobile: 'text-lg',
    tablet: 'text-xl',
    desktop: 'text-2xl'
  });

  return (
    <Card>
      <CardHeader className={isMobile ? 'p-3' : isTablet ? 'p-4' : 'p-6'}>
        <div className="flex justify-center items-center">
          <h1 className={`${titleSize} font-bold text-primary text-center`}>
            {bilingualMode ? '🇵🇭 AAC Soundboard - Filipino' : '🇺🇸 AAC Soundboard - English'}
          </h1>
        </div>
      </CardHeader>
    </Card>
  );
}
