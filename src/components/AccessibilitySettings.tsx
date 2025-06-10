
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface AccessibilitySettingsProps {
  theme: string;
  onThemeChange: (theme: string) => void;
  buttonSize: 'small' | 'medium' | 'large';
  onButtonSizeChange: (size: 'small' | 'medium' | 'large') => void;
  gridSize: 'small' | 'medium' | 'large';
  onGridSizeChange: (size: 'small' | 'medium' | 'large') => void;
  soundEnabled: boolean;
  onSoundToggle: (enabled: boolean) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  textSize: string;
  onTextSizeChange: (size: string) => void;
  voiceType: 'male' | 'female';
  onVoiceTypeChange: (type: 'male' | 'female') => void;
  darkMode: boolean;
  onDarkModeToggle: (enabled: boolean) => void;
  bilingualMode: boolean;
}

const AccessibilitySettings = ({
  theme,
  onThemeChange,
  buttonSize,
  onButtonSizeChange,
  gridSize,
  onGridSizeChange,
  soundEnabled,
  onSoundToggle,
  volume,
  onVolumeChange,
  textSize,
  onTextSizeChange,
  voiceType,
  onVoiceTypeChange,
  darkMode,
  onDarkModeToggle,
  bilingualMode,
}: AccessibilitySettingsProps) => {
  const themes = [
    { value: 'autism', label: bilingualMode ? 'Autism-Friendly (Mapayapang Kulay)' : 'Autism-Friendly (Calm Colors)' },
    { value: 'high-vis', label: bilingualMode ? 'High Visibility (Mataas na Contrast)' : 'High Visibility (High Contrast)' },
    { value: 'low-vis', label: bilingualMode ? 'Low Visibility (Malambot na Kulay)' : 'Low Visibility (Muted Colors)' },
    { value: 'colorblind', label: bilingualMode ? 'Color-Blind Friendly' : 'Color-Blind Friendly' },
  ];

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
    <Card className="p-6 space-y-6">
      <h3 className="text-xl font-semibold text-foreground mb-4">
        {bilingualMode ? 'Mga Setting ng Accessibility' : 'Accessibility Settings'}
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode-toggle" className="text-sm font-medium text-foreground">
            {bilingualMode ? 'Dark Mode' : 'Dark Mode'}
          </Label>
          <Switch
            id="dark-mode-toggle"
            checked={darkMode}
            onCheckedChange={onDarkModeToggle}
          />
        </div>

        <div>
          <Label htmlFor="theme-select" className="text-sm font-medium text-foreground mb-2 block">
            {bilingualMode ? 'Visual Theme' : 'Visual Theme'}
          </Label>
          <Select value={theme} onValueChange={onThemeChange}>
            <SelectTrigger id="theme-select">
              <SelectValue placeholder={bilingualMode ? 'Pumili ng theme' : 'Select theme'} />
            </SelectTrigger>
            <SelectContent>
              {themes.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground mb-3 block">
            {bilingualMode ? 'Uri ng Boses' : 'Voice Type'}
          </Label>
          <ToggleGroup 
            type="single" 
            value={voiceType} 
            onValueChange={(value) => value && onVoiceTypeChange(value as 'male' | 'female')}
            className="justify-start"
          >
            <ToggleGroupItem value="female" aria-label={bilingualMode ? 'Babaeng Boses' : 'Female Voice'}>
              👩 {bilingualMode ? 'Babae' : 'Female'}
            </ToggleGroupItem>
            <ToggleGroupItem value="male" aria-label={bilingualMode ? 'Lalaking Boses' : 'Male Voice'}>
              👨 {bilingualMode ? 'Lalaki' : 'Male'}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div>
          <Label htmlFor="button-size" className="text-sm font-medium text-foreground mb-2 block">
            {bilingualMode ? 'Laki ng Button' : 'Button Size'}
          </Label>
          <Select value={buttonSize} onValueChange={onButtonSizeChange}>
            <SelectTrigger id="button-size">
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
        </div>

        <div>
          <Label htmlFor="grid-size" className="text-sm font-medium text-foreground mb-2 block">
            {bilingualMode ? 'Density ng Grid' : 'Grid Density'}
          </Label>
          <Select value={gridSize} onValueChange={onGridSizeChange}>
            <SelectTrigger id="grid-size">
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
        </div>

        <div>
          <Label htmlFor="text-size" className="text-sm font-medium text-foreground mb-2 block">
            {bilingualMode ? 'Laki ng Teksto' : 'Text Size'}
          </Label>
          <Select value={textSize} onValueChange={onTextSizeChange}>
            <SelectTrigger id="text-size">
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
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="sound-toggle" className="text-sm font-medium text-foreground">
            {bilingualMode ? 'Sound Feedback' : 'Sound Feedback'}
          </Label>
          <Switch
            id="sound-toggle"
            checked={soundEnabled}
            onCheckedChange={onSoundToggle}
          />
        </div>

        {soundEnabled && (
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">
              {bilingualMode ? `Lakas ng Tunog: ${volume}%` : `Volume: ${volume}%`}
            </Label>
            <Slider
              value={[volume]}
              onValueChange={(value) => onVolumeChange(value[0])}
              max={100}
              min={0}
              step={10}
              className="w-full"
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default AccessibilitySettings;
