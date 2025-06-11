
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useSoundFeedback } from '@/hooks/useSoundFeedback';
import { useSettings } from '@/contexts/SettingsContext';
import ConfettiAnimation from './animations/ConfettiAnimation';
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
  const { buttonSize, bilingualMode, soundEnabled, volume } = useSettings();
  const { playClickSound } = useSoundFeedback({ soundEnabled, volume });
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWave, setShowWave] = useState(false);
  
  const sizeClass = `soundboard-button-${buttonSize}`;
  const displayLabel = bilingualMode && labelFilipino ? labelFilipino : label;

  const handleClick = () => {
    playClickSound();
    
    // Trigger specific animations based on button ID
    if (id === 'graduation') {
      setShowConfetti(true);
    } else if (id === 'beach') {
      setShowWave(true);
    }
    
    onClick();
  };

  return (
    <>
      <Card 
        className={`soundboard-button ${sizeClass} cursor-pointer flex flex-col items-center justify-center text-center group touch-manipulation select-none`}
        onClick={handleClick}
      >
        {icon && (
          <div className="text-3xl sm:text-4xl mb-2 group-hover:scale-110 group-active:scale-95 transition-transform duration-200">
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

      <ConfettiAnimation 
        isActive={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      <WaveAnimation 
        isActive={showWave} 
        onComplete={() => setShowWave(false)} 
      />
    </>
  );
};

export default SoundboardButton;
