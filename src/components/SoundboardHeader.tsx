
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { UniversalToggle } from '@/components/ui/universal-toggle';
import { useResponsive } from '@/hooks/use-responsive';
import { useSettings } from '@/contexts/SettingsContext';

interface SoundboardHeaderProps {
  respectMode: boolean;
  onRespectModeChange: (checked: boolean) => void;
}

export function SoundboardHeader({ respectMode, onRespectModeChange }: SoundboardHeaderProps) {
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className={`font-bold text-primary ${titleSize}`}>
            {bilingualMode ? '🇵🇭 AAC Soundboard - Filipino' : '🇺🇸 AAC Soundboard - English'}
          </CardTitle>
          <div className="flex items-center">
            <UniversalToggle
              id="respect-mode"
              checked={respectMode}
              onCheckedChange={onRespectModeChange}
              label={bilingualMode ? 'Po/Opo Mode' : 'Polite Mode'}
              description={bilingualMode ? 'Magalang na pagkakasabi' : 'Respectful speech'}
              size="large"
              variant="cultural"
            />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
