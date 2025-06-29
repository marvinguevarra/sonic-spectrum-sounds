
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/contexts/SettingsContext';
import { useSoundFeedback } from '@/hooks/useSoundFeedback';
import { elevenLabsService } from '@/services/elevenLabsService';
import GraduationAnimation from './animations/GraduationAnimation';
import WaveAnimation from './animations/WaveAnimation';
import ConfettiAnimation from './animations/ConfettiAnimation';
import { BeachImageModal } from './BeachImageModal';

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
  const { bilingualMode, soundEnabled, volume, voiceType } = useSettings();
  const { playClickSound, playCelebrationSound } = useSoundFeedback({ soundEnabled, volume });
  
  const [showGraduation, setShowGraduation] = useState(false);
  const [showWave, setShowWave] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBeachModal, setShowBeachModal] = useState(false);

  const displayLabel = bilingualMode && labelFilipino ? labelFilipino : label;
  const secondaryLabel = bilingualMode && labelFilipino ? label : labelFilipino;

  const speakPhrase = async () => {
    const text = bilingualMode && labelFilipino ? labelFilipino : label;
    
    try {
      await elevenLabsService.speak(text, {
        volume,
        voiceType,
        bilingualMode,
      });
    } catch (error) {
      console.error('Speech failed:', error);
    }
  };

  const handleClick = async () => {
    // Play different sounds and animations based on button type
    if (id === 'graduation') {
      playCelebrationSound();
      setShowGraduation(true);
    } else if (id === 'beach') {
      playClickSound();
      setShowWave(true);
      setShowBeachModal(true); // Show beach image modal
    } else if (id === 'celebrate' || id === 'proud') {
      playCelebrationSound();
      setShowConfetti(true);
    } else {
      playClickSound();
    }
    
    await speakPhrase();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className="h-20 w-full flex flex-col items-center justify-center gap-1 p-2 hover:scale-105 transition-all duration-200 bg-card hover:bg-primary/10 border border-primary/20 hover:border-primary/30"
        variant="outline"
      >
        {icon && (
          <span className={`text-2xl mb-1 ${id === 'graduation' ? 'animate-pulse' : ''}`}>
            {icon}
          </span>
        )}
        <span className="font-semibold text-sm leading-tight text-center text-card-foreground">
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
      <BeachImageModal 
        isOpen={showBeachModal} 
        onClose={() => setShowBeachModal(false)} 
      />
    </>
  );
}
