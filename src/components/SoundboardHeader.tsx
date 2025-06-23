
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
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

  const switchLabelSize = getTextSize({
    mobile: 'text-sm',
    tablet: 'text-base',
    desktop: 'text-base'
  });

  return (
    <Card>
      <CardHeader className={isMobile ? 'p-3' : isTablet ? 'p-4' : 'p-6'}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className={`font-bold text-primary ${titleSize}`}>
            {bilingualMode ? '🇵🇭 AAC Soundboard - Filipino' : '🇺🇸 AAC Soundboard - English'}
          </CardTitle>
          <div className="flex items-center space-x-3">
            <Switch
              id="respect-mode"
              checked={respectMode}
              onCheckedChange={onRespectModeChange}
              aria-describedby="respect-mode-desc"
              className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
            <div className="flex flex-col">
              <Label 
                htmlFor="respect-mode" 
                className={`font-medium cursor-pointer ${switchLabelSize}`}
              >
                {bilingualMode ? 'Po/Opo Mode' : 'Polite Mode'}
              </Label>
              <span 
                id="respect-mode-desc" 
                className="text-xs text-muted-foreground"
              >
                {bilingualMode ? 'Magalang na pagkakasabi' : 'Respectful speech'}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
