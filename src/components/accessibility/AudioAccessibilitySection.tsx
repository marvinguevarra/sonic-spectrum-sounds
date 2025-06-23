
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { UniversalToggle } from '@/components/ui/universal-toggle';
import { useSettings } from '@/contexts/SettingsContext';

export function AudioAccessibilitySection() {
  const { 
    bilingualMode, 
    voiceType, 
    setVoiceType, 
    soundEnabled, 
    setSoundEnabled, 
    volume, 
    setVolume 
  } = useSettings();

  return (
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
  );
}
