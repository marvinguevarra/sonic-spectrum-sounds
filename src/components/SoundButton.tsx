
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

  // Dynamic sizing based on content and device
  const getResponsiveClasses = () => {
    const baseClasses = 'w-full flex flex-col items-center justify-center gap-1 p-3 hover:scale-105 transition-all duration-200 relative';
    
    // Mobile-optimized heights and text sizing
    if (size === 'small') {
      return `${baseClasses} min-h-[100px] sm:min-h-[120px]`;
    } else if (size === 'medium') {
      return `${baseClasses} min-h-[120px] sm:min-h-[140px] md:min-h-[160px]`;
    } else {
      return `${baseClasses} min-h-[140px] sm:min-h-[160px] md:min-h-[180px]`;
    }
  };

  // Dynamic text sizing for better mobile readability
  const getTextClasses = () => {
    if (size === 'small') {
      return 'text-xs sm:text-sm leading-tight';
    } else if (size === 'medium') {
      return 'text-sm sm:text-base leading-tight';
    } else {
      return 'text-base sm:text-lg leading-tight';
    }
  };

  const getSecondaryTextClasses = () => {
    if (size === 'small') {
      return 'text-[10px] sm:text-xs leading-tight';
    } else if (size === 'medium') {
      return 'text-xs sm:text-sm leading-tight';
    } else {
      return 'text-sm sm:text-base leading-tight';
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isButtonDisabled}
      className={`${getResponsiveClasses()} ${
        isCurrentlyPlaying ? 'ring-2 ring-primary' : ''
      } ${isInQueue ? 'bg-accent/50' : ''}`}
      variant="outline"
    >
      {isButtonDisabled && timeUntilNextPlay > 0 && (
        <div className="absolute top-1 right-1">
          <Clock className="h-3 w-3 text-muted-foreground" />
        </div>
      )}
      
      {phrase.emoji && (
        <span className="text-xl sm:text-2xl flex-shrink-0 mb-1">
          {phrase.emoji}
        </span>
      )}
      
      <div className="flex flex-col items-center justify-center flex-1 w-full px-1 sm:px-2 space-y-0.5 sm:space-y-1">
        <span className={`font-semibold text-center break-words max-w-full hyphens-auto ${getTextClasses()}`}
              style={{ 
                wordBreak: 'break-word', 
                overflowWrap: 'anywhere',
                lineHeight: '1.2'
              }}>
          {text}
        </span>
        <span className={`text-muted-foreground text-center break-words max-w-full hyphens-auto ${getSecondaryTextClasses()}`}
              style={{ 
                wordBreak: 'break-word', 
                overflowWrap: 'anywhere',
                lineHeight: '1.1'
              }}>
          {phrase.english}
        </span>
      </div>
      
      {isInQueue && (
        <div className="absolute bottom-1 left-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
      )}
    </Button>
  );
}
