
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UniversalToggle } from '@/components/ui/universal-toggle';
import { useSettings } from '@/contexts/SettingsContext';

export function VisualAccessibilitySection() {
  const { bilingualMode, theme, setTheme, darkMode, setDarkMode } = useSettings();

  const themes = [
    { value: 'autism', label: bilingualMode ? 'Autism-Friendly (Mapayapang Kulay)' : 'Autism-Friendly (Calm Colors)' },
    { value: 'high-vis', label: bilingualMode ? 'High Visibility (Mataas na Contrast)' : 'High Visibility (High Contrast)' },
    { value: 'low-vis', label: bilingualMode ? 'Low Visibility (Malambot na Kulay)' : 'Low Visibility (Muted Colors)' },
    { value: 'colorblind', label: bilingualMode ? 'Color-Blind Friendly (Para sa Kulay-Bulag)' : 'Color-Blind Friendly' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold border-b pb-2">
        {bilingualMode ? '👁️ Visual na Accessibility' : '👁️ Visual Accessibility'}
      </h3>
      
      <UniversalToggle
        id="dark-mode-toggle"
        checked={darkMode}
        onCheckedChange={setDarkMode}
        label={bilingualMode ? 'Dark Mode' : 'Dark Mode'}
        description={bilingualMode ? 'Madilim na tema para sa mata' : 'Easier on the eyes'}
        size="large"
      />

      <div>
        <Label htmlFor="theme-select" className="text-base font-medium text-foreground mb-3 block">
          {bilingualMode ? 'Tema ng Kulay' : 'Color Theme'}
        </Label>
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger 
            id="theme-select" 
            className="focus:ring-2 focus:ring-primary"
            aria-describedby="theme-desc"
          >
            <SelectValue placeholder={bilingualMode ? 'Pumili ng tema' : 'Select theme'} />
          </SelectTrigger>
          <SelectContent>
            {themes.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span id="theme-desc" className="text-xs text-muted-foreground mt-1 block">
          {bilingualMode ? 'Autism-friendly ay inirekomenda' : 'Autism-friendly is recommended'}
        </span>
      </div>
    </div>
  );
}
