
import React from 'react';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useSettings } from '@/contexts/SettingsContext';

export function ControlStyleSection() {
  const { bilingualMode, controlStyle, setControlStyle } = useSettings();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">
        {bilingualMode ? '🎛️ Estilo ng Control' : '🎛️ Control Style'}
      </h3>
      
      <div>
        <Label className="text-base font-medium text-foreground mb-3 block">
          {bilingualMode ? 'Uri ng Toggle Control' : 'Toggle Control Type'}
        </Label>
        <ToggleGroup 
          type="single" 
          value={controlStyle} 
          onValueChange={(value) => value && setControlStyle(value as 'switches' | 'buttons')}
          className="justify-start gap-3"
        >
          <ToggleGroupItem 
            value="buttons" 
            aria-label={bilingualMode ? 'Malaking Button' : 'Large Buttons'}
            className="focus:ring-2 focus:ring-primary px-4 py-2"
          >
            🔘 {bilingualMode ? 'Malaking Button' : 'Large Buttons'}
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="switches" 
            aria-label={bilingualMode ? 'Maliliit na Switch' : 'Small Switches'}
            className="focus:ring-2 focus:ring-primary px-4 py-2"
          >
            🎚️ {bilingualMode ? 'Maliliit na Switch' : 'Small Switches'}
          </ToggleGroupItem>
        </ToggleGroup>
        <span className="text-xs text-muted-foreground mt-1 block">
          {bilingualMode ? 'Malaking button ay mas madaling gamitin' : 'Large buttons are easier to use'}
        </span>
      </div>
    </div>
  );
}
