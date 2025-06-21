
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useSoundFeedback } from '@/hooks/useSoundFeedback';
import { useSettings } from '@/contexts/SettingsContext';
import { elevenLabsService } from '@/services/elevenLabsService';
import GraduationAnimation from './animations/GraduationAnimation';
import WaveAnimation from './animations/WaveAnimation';

interface SoundboardButtonProps {
  label: string;
  labelFilipino?: string;
  icon?: string;
  category: string;
  soundFile?: string;
  onClick: () => void;
  id: string;
}

const SoundboardButton = ({ 
  label, 
  labelFilipino,
  icon, 
  category, 
  onClick,
  id 
}: SoundboardButtonProps) => {
  const { buttonSize, bilingualMode, soundEnabled, volume, voiceType } = useSettings();
  const { playClickSound, playCelebrationSound } = useSoundFeedback({ soundEnabled, volume });
  const [showGraduation, setShowGraduation] = useState(false);
  const [showWave, setShowWave] = useState(false);
  
  const sizeClass = `soundboard-button-${buttonSize}`;
  const displayLabel = bilingualMode && labelFilipino ? labelFilipino : label;

  const handleClick = async () => {
    // Play different sounds based on button type
    if (id === 'graduation') {
      playCelebrationSound();
      setShowGraduation(true);
    } else if (id === 'beach') {
      playClickSound();
      setShowWave(true);
    } else {
      playClickSound();
    }
    
    // Speak the label using ElevenLabs
    const textToSpeak = bilingualMode && labelFilipino ? labelFilipino : label;
    try {
      await elevenLabsService.speak(textToSpeak, {
        volume,
        voiceType,
        bilingualMode,
      });
    } catch (error) {
      console.error('Speech failed:', error);
    }
    
    onClick();
  };

  return (
    <>
      <Card 
        className={`soundboard-button ${sizeClass} cursor-pointer flex flex-col items-center justify-center text-center group touch-manipulation select-none ${
          id === 'graduation' ? 'hover:bg-yellow-50 hover:border-yellow-300 transition-colors' : ''
        }`}
        onClick={handleClick}
      >
        {icon && (
          <div className={`text-3xl sm:text-4xl mb-2 group-hover:scale-110 group-active:scale-95 transition-transform duration-200 ${
            id === 'graduation' ? 'animate-pulse' : ''
          }`}>
            {icon}
          </div>
        )}
        <div className="font-semibold text-sm sm:text-base lg:text-lg leading-tight text-foreground px-1">
          {displayLabel}
        </div>
        {bilingualMode && labelFilipino && (
          <div className="text-xs sm:text-sm text-muted-foreground mt-1 opacity-80">
            {label}
          </div>
        )}
        <div className="text-xs text-muted-foreground mt-1 opacity-70 hidden sm:block">
          {category}
        </div>
      </Card>

      <GraduationAnimation 
        isActive={showGraduation} 
        onComplete={() => setShowGraduation(false)} 
      />
      <WaveAnimation 
        isActive={showWave} 
        onComplete={() => setShowWave(false)} 
      />
    </>
  );
};

export default SoundboardButton;
