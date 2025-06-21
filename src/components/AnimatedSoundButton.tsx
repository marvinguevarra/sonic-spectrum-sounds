
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/contexts/SettingsContext';
import { useSoundFeedback } from '@/hooks/useSoundFeedback';
import GraduationAnimation from './animations/GraduationAnimation';
import WaveAnimation from './animations/WaveAnimation';
import ConfettiAnimation from './animations/ConfettiAnimation';

interface AnimatedSoundButtonProps {
  id: string;
  label: string;
  labelFilipino?: string;
  icon?: string;
  soundFile?: string;
}

export function AnimatedSoundButton({ 
  id, 
  label, 
  labelFilipino, 
  icon, 
  soundFile 
}: AnimatedSoundButtonProps) {
  const { bilingualMode, soundEnabled, volume } = useSettings();
  const { playClickSound, playCelebrationSound } = useSoundFeedback({ soundEnabled, volume });
  
  const [showGraduation, setShowGraduation] = useState(false);
  const [showWave, setShowWave] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const displayLabel = bilingualMode && labelFilipino ? labelFilipino : label;
  const secondaryLabel = bilingualMode && labelFilipino ? label : labelFilipino;

  const speakPhrase = () => {
    const text = bilingualMode && labelFilipino ? labelFilipino : label;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = bilingualMode ? 'fil-PH' : 'en-US';
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  const handleClick = () => {
    // Play different sounds and animations based on button type
    if (id === 'graduation') {
      playCelebrationSound();
      setShowGraduation(true);
    } else if (id === 'beach') {
      playClickSound();
      setShowWave(true);
    } else if (id === 'celebrate' || id === 'proud') {
      playCelebrationSound();
      setShowConfetti(true);
    } else {
      playClickSound();
    }
    
    speakPhrase();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className={`h-20 w-full flex flex-col items-center justify-center gap-1 p-2 hover:scale-105 transition-all duration-200 ${
          id === 'graduation' ? 'hover:bg-yellow-50 hover:border-yellow-300 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200' : ''
        } ${
          id === 'celebrate' || id === 'proud' ? 'hover:bg-purple-50 hover:border-purple-300 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200' : ''
        }`}
        variant="outline"
      >
        {icon && (
          <span className={`text-2xl mb-1 ${id === 'graduation' ? 'animate-pulse' : ''}`}>
            {icon}
          </span>
        )}
        <span className="font-semibold text-sm leading-tight text-center">
          {displayLabel}
        </span>
        {secondaryLabel && (
          <span className="text-xs text-muted-foreground text-center">
            {secondaryLabel}
          </span>
        )}
      </Button>

      <GraduationAnimation 
        isActive={showGraduation} 
        onComplete={() => setShowGraduation(false)} 
      />
      <WaveAnimation 
        isActive={showWave} 
        onComplete={() => setShowWave(false)} 
      />
      <ConfettiAnimation 
        isActive={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
    </>
  );
}
