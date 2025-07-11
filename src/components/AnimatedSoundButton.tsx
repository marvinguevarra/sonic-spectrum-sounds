import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAudioControls } from '@/hooks/useAudioControls';
import { useSoundFeedback } from '@/hooks/useSoundFeedback';
import { useSettings } from '@/contexts/SettingsContext';
import GraduationAnimation from './animations/GraduationAnimation';
import WaveAnimation from './animations/WaveAnimation';
import ConfettiAnimation from './animations/ConfettiAnimation';
import { BeachImageModal } from './BeachImageModal';
import { Clock } from 'lucide-react';

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
  const textToSpeak = bilingualMode && labelFilipino ? labelFilipino : label;
  
  const [showGraduation, setShowGraduation] = useState(false);
  const [showWave, setShowWave] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBeachModal, setShowBeachModal] = useState(false);

  const {
    playAudio,
    isButtonDisabled,
    isCurrentlyPlaying,
    isInQueue,
    timeUntilNextPlay
  } = useAudioControls({
    phraseId: id,
    onPlayStart: () => console.log('AnimatedSoundButton playing:', textToSpeak),
    onRateLimited: () => console.log('AnimatedSoundButton rate limited:', textToSpeak)
  });

  const handleClick = async () => {
    // Play sound effects based on button type
    if (id === 'graduation') {
      playCelebrationSound();
      setShowGraduation(true);
    } else if (id === 'beach') {
      playClickSound();
      setShowWave(true);
      setShowBeachModal(true);
    } else if (id === 'celebrate' || id === 'proud') {
      playCelebrationSound();
      setShowConfetti(true);
    } else {
      playClickSound();
    }
    
    await playAudio(textToSpeak);
  };

  const displayLabel = bilingualMode && labelFilipino ? labelFilipino : label;

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={isButtonDisabled}
        className={`h-20 w-full flex flex-col items-center justify-center gap-1 p-2 hover:scale-105 transition-all duration-200 bg-card hover:bg-primary/10 border border-primary/20 hover:border-primary/30 relative ${
          isCurrentlyPlaying ? 'ring-2 ring-primary' : ''
        } ${isInQueue ? 'bg-accent/50' : ''}`}
        variant="outline"
      >
        {isButtonDisabled && timeUntilNextPlay > 0 && (
          <div className="absolute top-1 right-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
          </div>
        )}
        {icon && (
          <span className={`text-2xl mb-1 ${id === 'graduation' ? 'animate-pulse' : ''}`}>
            {icon}
          </span>
        )}
        <span className="font-semibold text-sm leading-tight text-center text-card-foreground">
          {displayLabel}
        </span>
        {isInQueue && (
          <div className="absolute bottom-1 left-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
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