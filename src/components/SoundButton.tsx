
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phrase } from '@/types/phrase';
import { useAudioControls } from '@/hooks/useAudioControls';
import { Clock } from 'lucide-react';

interface SoundButtonProps {
  phrase: Phrase;
  respectMode: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export function SoundButton({ phrase, respectMode, size = 'medium', onClick }: SoundButtonProps) {
  const text = respectMode && phrase.respectful ? phrase.respectful : phrase.filipino;
  
  const {
    playAudio,
    isButtonDisabled,
    isCurrentlyPlaying,
    isInQueue,
    timeUntilNextPlay
  } = useAudioControls({
    phraseId: phrase.id,
    onPlayStart: () => console.log('Playing:', text),
    onPlayEnd: () => onClick?.(),
    onRateLimited: () => console.log('Rate limited:', text)
  });

  const handleClick = () => {
    playAudio(text);
  };

  const sizeClasses = {
    small: 'h-16 text-sm',
    medium: 'h-20 text-base',
    large: 'h-24 text-lg'
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isButtonDisabled}
      className={`${sizeClasses[size]} w-full flex flex-col items-center justify-center gap-1 p-2 hover:scale-105 transition-all duration-200 relative ${
        isCurrentlyPlaying ? 'ring-2 ring-primary' : ''
      } ${isInQueue ? 'bg-accent/50' : ''}`}
      variant="outline"
    >
      {isButtonDisabled && timeUntilNextPlay > 0 && (
        <div className="absolute top-1 right-1">
          <Clock className="h-3 w-3 text-muted-foreground" />
        </div>
      )}
      {phrase.emoji && <span className="text-2xl">{phrase.emoji}</span>}
      <span className="font-semibold">{text}</span>
      <span className="text-xs text-muted-foreground">{phrase.english}</span>
      {isInQueue && (
        <div className="absolute bottom-1 left-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
      )}
    </Button>
  );
}
