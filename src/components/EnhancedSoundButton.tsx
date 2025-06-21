
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phrase } from '@/types/phrase';
import { elevenLabsService } from '@/services/elevenLabsService';
import { useSettings } from '@/contexts/SettingsContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface EnhancedSoundButtonProps {
  phrase: Phrase;
  respectMode: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export function EnhancedSoundButton({ phrase, respectMode, size = 'medium', onClick }: EnhancedSoundButtonProps) {
  const { volume, voiceType } = useSettings();
  const isMobile = useIsMobile();

  const speakPhrase = async () => {
    const text = respectMode && phrase.respectful ? phrase.respectful : phrase.filipino;
    
    try {
      await elevenLabsService.speak(text, {
        volume,
        voiceType,
        bilingualMode: true,
      });
    } catch (error) {
      console.error('Speech failed:', error);
    }
    
    if (onClick) onClick();
  };

  // Mobile-optimized sizes
  const sizeClasses = {
    small: isMobile ? 'h-20 min-h-[80px]' : 'h-24 min-h-[96px]',
    medium: isMobile ? 'h-24 min-h-[96px]' : 'h-28 min-h-[112px]',
    large: isMobile ? 'h-28 min-h-[112px]' : 'h-32 min-h-[128px]'
  };

  const textSizes = {
    small: isMobile ? 'text-xs' : 'text-xs',
    medium: isMobile ? 'text-sm' : 'text-sm',
    large: isMobile ? 'text-base' : 'text-base'
  };

  const imageSizes = {
    small: isMobile ? 'w-10 h-10' : 'w-12 h-12',
    medium: isMobile ? 'w-12 h-12' : 'w-16 h-16',
    large: isMobile ? 'w-16 h-16' : 'w-20 h-20'
  };

  const emojiSizes = {
    small: isMobile ? 'text-xl' : 'text-2xl',
    medium: isMobile ? 'text-2xl' : 'text-3xl',
    large: isMobile ? 'text-3xl' : 'text-4xl'
  };

  return (
    <Button
      onClick={speakPhrase}
      className={`${sizeClasses[size]} w-full flex flex-col items-center justify-center gap-1 p-2 hover:scale-105 active:scale-95 transition-all duration-200 bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 shadow-md hover:shadow-lg touch-manipulation`}
      variant="outline"
    >
      {/* Image or Emoji Display */}
      <div className="flex-shrink-0 flex items-center justify-center">
        {phrase.image ? (
          <img 
            src={phrase.image} 
            alt={phrase.english}
            className={`${imageSizes[size]} object-cover rounded-lg border border-gray-200`}
            onError={(e) => {
              // Fallback to emoji if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        {phrase.emoji && (
          <span 
            className={`${phrase.image ? 'hidden' : ''} ${emojiSizes[size]}`}
          >
            {phrase.emoji}
          </span>
        )}
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center gap-0.5 min-h-0 flex-1 justify-center">
        <span className={`font-bold text-center leading-tight text-gray-800 ${textSizes[size]}`}>
          {respectMode && phrase.respectful ? phrase.respectful : phrase.filipino}
        </span>
        <span className={`text-center leading-tight text-gray-600 ${size === 'small' && isMobile ? 'text-[10px]' : 'text-xs'}`}>
          {phrase.english}
        </span>
      </div>
    </Button>
  );
}
