import React from 'react';
import { Button } from '@/components/ui/button';
import { Phrase } from '@/types/phrase';
import { useAudioControls } from '@/hooks/useAudioControls';
import { useResponsive } from '@/hooks/use-responsive';
import { Clock } from 'lucide-react';

interface EnhancedSoundButtonProps {
  phrase: Phrase;
  respectMode: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export function EnhancedSoundButton({ phrase, respectMode, size = 'medium', onClick }: EnhancedSoundButtonProps) {
  const { isMobile, isTablet } = useResponsive();
  const text = respectMode && phrase.respectful ? phrase.respectful : phrase.filipino;
  
  const {
    playAudio,
    isButtonDisabled,
    isCurrentlyPlaying,
    isInQueue,
    timeUntilNextPlay
  } = useAudioControls({
    phraseId: phrase.id,
    onPlayStart: () => console.log('EnhancedSoundButton playing:', text),
    onPlayEnd: () => onClick?.(),
    onRateLimited: () => console.log('EnhancedSoundButton rate limited:', text)
  });

  const handleClick = () => {
    playAudio(text);
  };

  // Enhanced button heights with special desktop optimization
  const getResponsiveHeight = () => {
    if (isMobile) {
      return size === 'small' ? 'min-h-[140px]' : size === 'medium' ? 'min-h-[160px]' : 'min-h-[180px]';
    } else if (isTablet) {
      return size === 'small' ? 'min-h-[120px]' : size === 'medium' ? 'min-h-[140px]' : 'min-h-[160px]';
    } else {
      return size === 'small' ? 'min-h-[140px]' : size === 'medium' ? 'min-h-[160px]' : 'min-h-[180px]';
    }
  };

  // Enhanced text sizes with better desktop optimization
  const getPrimaryTextSize = () => {
    if (isMobile) {
      return size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg';
    } else if (isTablet) {
      return size === 'small' ? 'text-base' : size === 'medium' ? 'text-lg' : 'text-xl';
    } else {
      return size === 'small' ? 'text-xl' : size === 'medium' ? 'text-2xl' : 'text-3xl';
    }
  };

  const getSecondaryTextSize = () => {
    if (isMobile) return 'text-sm';
    if (isTablet) return 'text-base';
    return 'text-xl';
  };

  const getEmojiSize = () => {
    if (isMobile) {
      return size === 'small' ? 'text-2xl' : size === 'medium' ? 'text-3xl' : 'text-4xl';
    } else if (isTablet) {
      return size === 'small' ? 'text-3xl' : size === 'medium' ? 'text-4xl' : 'text-5xl';
    } else {
      return size === 'small' ? 'text-5xl' : size === 'medium' ? 'text-6xl' : 'text-7xl';
    }
  };

  const getImageSize = () => {
    if (isMobile) {
      return size === 'small' ? 'w-10 h-10' : size === 'medium' ? 'w-12 h-12' : 'w-16 h-16';
    } else if (isTablet) {
      return size === 'small' ? 'w-12 h-12' : size === 'medium' ? 'w-16 h-16' : 'w-20 h-20';
    } else {
      return size === 'small' ? 'w-20 h-20' : size === 'medium' ? 'w-24 h-24' : 'w-28 h-28';
    }
  };

  const getPadding = () => {
    if (isMobile) return 'p-3';
    if (isTablet) return 'p-4';
    return 'p-6';
  };

  const getGapSize = () => {
    if (isMobile) return 'gap-2';
    if (isTablet) return 'gap-3';
    return 'gap-4';
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isButtonDisabled}
      className={`${getResponsiveHeight()} w-full flex flex-col items-center justify-center ${getGapSize()} ${getPadding()} hover:scale-105 active:scale-95 transition-all duration-200 bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 shadow-md hover:shadow-lg touch-manipulation relative ${
        isCurrentlyPlaying ? 'ring-2 ring-primary' : ''
      } ${isInQueue ? 'bg-accent/50' : ''}`}
      variant="outline"
    >
      {isButtonDisabled && timeUntilNextPlay > 0 && (
        <div className="absolute top-1 right-1">
          <Clock className="h-3 w-3 text-muted-foreground" />
        </div>
      )}
      
      {/* Image or Emoji Display */}
      <div className="flex-shrink-0 flex items-center justify-center">
        {phrase.image ? (
          <img 
            src={phrase.image} 
            alt={phrase.english}
            className={`${getImageSize()} object-cover rounded-lg border border-gray-200`}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        {phrase.emoji && (
          <span 
            className={`${phrase.image ? 'hidden' : ''} ${getEmojiSize()}`}
          >
            {phrase.emoji}
          </span>
        )}
      </div>

      {/* Enhanced Text Content with better desktop spacing */}
      <div className="flex flex-col items-center justify-center min-h-0 flex-1 w-full px-2 overflow-hidden">
        <span className={`font-bold text-center leading-tight text-gray-900 ${getPrimaryTextSize()} break-words hyphens-auto overflow-wrap-anywhere max-w-full`}
              style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
          {text}
        </span>
        <span className={`text-center leading-tight text-gray-700 ${getSecondaryTextSize()} break-words overflow-wrap-anywhere max-w-full mt-2`}
              style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
          {phrase.english}
        </span>
      </div>
      
      {isInQueue && (
        <div className="absolute bottom-1 left-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
      )}
    </Button>
  );
}