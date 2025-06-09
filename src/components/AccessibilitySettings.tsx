
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface AccessibilitySettingsProps {
  theme: string;
  onThemeChange: (theme: string) => void;
  buttonSize: string;
  onButtonSizeChange: (size: string) => void;
  gridSize: string;
  onGridSizeChange: (size: string) => void;
  soundEnabled: boolean;
  onSoundToggle: (enabled: boolean) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  textSize: string;
  onTextSizeChange: (size: string) => void;
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
}: AccessibilitySettingsProps) => {
  const themes = [
    { value: 'autism', label: 'Autism-Friendly (Calm Colors)' },
    { value: 'high-vis', label: 'High Visibility (High Contrast)' },
    { value: 'low-vis', label: 'Low Visibility (Muted Colors)' },
    { value: 'colorblind', label: 'Color-Blind Friendly' },
  ];

  const sizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  const textSizes = [
    { value: 'small', label: 'Small Text' },
    { value: 'medium', label: 'Medium Text' },
    { value: 'large', label: 'Large Text' },
    { value: 'xl', label: 'Extra Large Text' },
  ];

  return (
    <Card className="p-6 space-y-6">
      <h3 className="text-xl font-semibold text-foreground mb-4">Accessibility Settings</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="theme-select" className="text-sm font-medium text-foreground mb-2 block">
            Visual Theme
          </Label>
          <Select value={theme} onValueChange={onThemeChange}>
            <SelectTrigger id="theme-select">
              <SelectValue placeholder="Select theme" />
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
          <Label htmlFor="button-size" className="text-sm font-medium text-foreground mb-2 block">
            Button Size
          </Label>
          <Select value={buttonSize} onValueChange={onButtonSizeChange}>
            <SelectTrigger id="button-size">
              <SelectValue placeholder="Select button size" />
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
            Grid Density
          </Label>
          <Select value={gridSize} onValueChange={onGridSizeChange}>
            <SelectTrigger id="grid-size">
              <SelectValue placeholder="Select grid size" />
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
            Text Size
          </Label>
          <Select value={textSize} onValueChange={onTextSizeChange}>
            <SelectTrigger id="text-size">
              <SelectValue placeholder="Select text size" />
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
            Sound Feedback
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
              Volume: {volume}%
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
