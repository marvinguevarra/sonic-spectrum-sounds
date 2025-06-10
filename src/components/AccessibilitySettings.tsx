
import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useSettings } from '@/contexts/SettingsContext';

const AccessibilitySettings = () => {
  const {
    theme,
    setTheme,
    buttonSize,
    setButtonSize,
    gridSize,
    setGridSize,
    soundEnabled,
    setSoundEnabled,
    volume,
    setVolume,
    textSize,
    setTextSize,
    voiceType,
    setVoiceType,
    darkMode,
    setDarkMode,
    bilingualMode,
  } = useSettings();

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
    <div className="space-y-6 max-h-[70vh] overflow-y-auto">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode-toggle" className="text-sm font-medium text-foreground">
            {bilingualMode ? 'Dark Mode' : 'Dark Mode'}
          </Label>
          <Switch
            id="dark-mode-toggle"
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
        </div>

        <div>
          <Label htmlFor="theme-select" className="text-sm font-medium text-foreground mb-2 block">
            {bilingualMode ? 'Visual Theme' : 'Visual Theme'}
          </Label>
          <Select value={theme} onValueChange={setTheme}>
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
            onValueChange={(value) => value && setVoiceType(value as 'male' | 'female')}
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
          <Select value={buttonSize} onValueChange={setButtonSize}>
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
          <Select value={gridSize} onValueChange={setGridSize}>
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
          <Select value={textSize} onValueChange={setTextSize}>
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
            onCheckedChange={setSoundEnabled}
          />
        </div>

        {soundEnabled && (
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">
              {bilingualMode ? `Lakas ng Tunog: ${volume}%` : `Volume: ${volume}%`}
            </Label>
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              min={0}
              step={10}
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessibilitySettings;
