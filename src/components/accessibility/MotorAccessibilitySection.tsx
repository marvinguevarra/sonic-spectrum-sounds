
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSettings } from '@/contexts/SettingsContext';

export function MotorAccessibilitySection() {
  const { 
    bilingualMode, 
    buttonSize, 
    setButtonSize, 
    gridSize, 
    setGridSize, 
    textSize, 
    setTextSize 
  } = useSettings();

  const sizes = [
    { value: 'small', label: bilingualMode ? 'Maliit' : 'Small' },
    { value: 'medium', label: bilingualMode ? 'Katamtaman' : 'Medium' },
    { value: 'large', label: bilingualMode ? 'Malaki' : 'Large' },
  ];

  const textSizes = [
    { value: 'small', label: bilingualMode ? 'Maliit na Teksto' : 'Small Text' },
    { value: 'medium', label: bilingualMode ? 'Katamtamang Teksto' : 'Medium Text' },
    { value: 'large', label: bilingualMode ? 'Malaking Teksto' : 'Large Text' },
    { value: 'xl', label: bilingualMode ? 'Sobrang Laking Teksto' : 'Extra Large Text' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">
        {bilingualMode ? '✋ Motor na Accessibility' : '✋ Motor Accessibility'}
      </h3>
      
      <div>
        <Label htmlFor="button-size" className="text-base font-medium text-foreground mb-3 block">
          {bilingualMode ? 'Laki ng Button' : 'Button Size'}
        </Label>
        <Select value={buttonSize} onValueChange={setButtonSize}>
          <SelectTrigger 
            id="button-size"
            className="focus:ring-2 focus:ring-primary"
            aria-describedby="button-size-desc"
          >
            <SelectValue placeholder={bilingualMode ? 'Pumili ng laki ng button' : 'Select button size'} />
          </SelectTrigger>
          <SelectContent>
            {sizes.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span id="button-size-desc" className="text-xs text-muted-foreground mt-1 block">
          {bilingualMode ? 'Mas malaki para sa mga may motor difficulty' : 'Larger for motor difficulties'}
        </span>
      </div>

      <div>
        <Label htmlFor="grid-size" className="text-base font-medium text-foreground mb-3 block">
          {bilingualMode ? 'Density ng Grid' : 'Grid Density'}
        </Label>
        <Select value={gridSize} onValueChange={setGridSize}>
          <SelectTrigger 
            id="grid-size"
            className="focus:ring-2 focus:ring-primary"
            aria-describedby="grid-size-desc"
          >
            <SelectValue placeholder={bilingualMode ? 'Pumili ng grid size' : 'Select grid size'} />
          </SelectTrigger>
          <SelectContent>
            {sizes.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span id="grid-size-desc" className="text-xs text-muted-foreground mt-1 block">
          {bilingualMode ? 'Mas maluwag para sa mas madaling pagpili' : 'More spacing for easier selection'}
        </span>
      </div>

      <div>
        <Label htmlFor="text-size" className="text-base font-medium text-foreground mb-3 block">
          {bilingualMode ? 'Laki ng Teksto' : 'Text Size'}
        </Label>
        <Select value={textSize} onValueChange={setTextSize}>
          <SelectTrigger 
            id="text-size"
            className="focus:ring-2 focus:ring-primary"
            aria-describedby="text-size-desc"
          >
            <SelectValue placeholder={bilingualMode ? 'Pumili ng laki ng teksto' : 'Select text size'} />
          </SelectTrigger>
          <SelectContent>
            {textSizes.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span id="text-size-desc" className="text-xs text-muted-foreground mt-1 block">
          {bilingualMode ? 'Para sa mga may visual impairment' : 'For visual impairments'}
        </span>
      </div>
    </div>
  );
}
