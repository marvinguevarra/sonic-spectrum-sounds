
import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { UniversalToggle } from '@/components/ui/universal-toggle';
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
    controlStyle,
    setControlStyle,
  } = useSettings();

  const themes = [
    { value: 'autism', label: bilingualMode ? 'Autism-Friendly (Mapayapang Kulay)' : 'Autism-Friendly (Calm Colors)' },
    { value: 'high-vis', label: bilingualMode ? 'High Visibility (Mataas na Contrast)' : 'High Visibility (High Contrast)' },
    { value: 'low-vis', label: bilingualMode ? 'Low Visibility (Malambot na Kulay)' : 'Low Visibility (Muted Colors)' },
    { value: 'colorblind', label: bilingualMode ? 'Color-Blind Friendly (Para sa Kulay-Bulag)' : 'Color-Blind Friendly' },
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
      <div className="space-y-6">
        {/* Language/Cultural Section */}
        <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">
            {bilingualMode ? '🇵🇭 Wika at Kultura' : '🇺🇸 Language & Culture'}
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
            {bilingualMode 
              ? 'Ang app ay naka-set sa Filipino-first para sa mga batang Pilipino na may autism.'
              : 'App is set to Filipino-first for Filipino children with autism.'
            }
          </p>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            {bilingualMode ? 'Bilingual Mode: Naka-ON' : 'Bilingual Mode: ON'}
          </div>
        </Card>

        {/* Control Style Preference */}
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

        {/* Visual Accessibility */}
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

        {/* Motor Accessibility */}
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

        {/* Audio Accessibility */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">
            {bilingualMode ? '🔊 Audio na Accessibility' : '🔊 Audio Accessibility'}
          </h3>
          
          <div>
            <Label className="text-base font-medium text-foreground mb-3 block">
              {bilingualMode ? 'Uri ng Boses' : 'Voice Type'}
            </Label>
            <ToggleGroup 
              type="single" 
              value={voiceType} 
              onValueChange={(value) => value && setVoiceType(value as 'male' | 'female')}
              className="justify-start gap-3"
            >
              <ToggleGroupItem 
                value="female" 
                aria-label={bilingualMode ? 'Babaeng Boses' : 'Female Voice'}
                className="focus:ring-2 focus:ring-primary px-4 py-2"
              >
                👩 {bilingualMode ? 'Babae' : 'Female'}
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="male" 
                aria-label={bilingualMode ? 'Lalaking Boses' : 'Male Voice'}
                className="focus:ring-2 focus:ring-primary px-4 py-2"
              >
                👨 {bilingualMode ? 'Lalaki' : 'Male'}
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <UniversalToggle
            id="sound-toggle"
            checked={soundEnabled}
            onCheckedChange={setSoundEnabled}
            label={bilingualMode ? 'Sound Feedback' : 'Sound Feedback'}
            description={bilingualMode ? 'Tunog kapag nag-click' : 'Audio cues when tapping'}
            size="large"
          />

          {soundEnabled && (
            <div>
              <Label className="text-base font-medium text-foreground mb-3 block">
                {bilingualMode ? `Lakas ng Tunog: ${volume}%` : `Volume: ${volume}%`}
              </Label>
              <Slider
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                min={0}
                step={10}
                className="w-full focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
                aria-label={bilingualMode ? 'Lakas ng tunog' : 'Volume control'}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{bilingualMode ? 'Tahimik' : 'Quiet'}</span>
                <span>{bilingualMode ? 'Malakas' : 'Loud'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettings;
