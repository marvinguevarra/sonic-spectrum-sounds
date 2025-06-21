
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useIsMobile } from '@/hooks/use-mobile';

interface SoundboardHeaderProps {
  respectMode: boolean;
  onRespectModeChange: (checked: boolean) => void;
}

export function SoundboardHeader({ respectMode, onRespectModeChange }: SoundboardHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className={`font-bold text-primary ${isMobile ? 'text-xl' : 'text-2xl'}`}>
            🇵🇭 AAC Soundboard - Filipino
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Switch
              id="respect-mode"
              checked={respectMode}
              onCheckedChange={onRespectModeChange}
            />
            <Label htmlFor="respect-mode" className="text-sm font-medium">
              Po/Opo Mode
            </Label>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
