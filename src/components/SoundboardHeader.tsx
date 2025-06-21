
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useResponsive } from '@/hooks/use-responsive';

interface SoundboardHeaderProps {
  respectMode: boolean;
  onRespectModeChange: (checked: boolean) => void;
}

export function SoundboardHeader({ respectMode, onRespectModeChange }: SoundboardHeaderProps) {
  const { getTextSize, isMobile, isTablet } = useResponsive();

  const titleSize = getTextSize({
    mobile: 'text-lg',
    tablet: 'text-xl',
    desktop: 'text-2xl'
  });

  const switchLabelSize = getTextSize({
    mobile: 'text-xs',
    tablet: 'text-sm',
    desktop: 'text-sm'
  });

  return (
    <Card>
      <CardHeader className={isMobile ? 'p-3' : isTablet ? 'p-4' : 'p-6'}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className={`font-bold text-primary ${titleSize}`}>
            🇵🇭 AAC Soundboard - Filipino
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Switch
              id="respect-mode"
              checked={respectMode}
              onCheckedChange={onRespectModeChange}
            />
            <Label htmlFor="respect-mode" className={`font-medium ${switchLabelSize}`}>
              Po/Opo Mode
            </Label>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
