
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phrase } from '@/types/phrase';
import { elevenLabsService } from '@/services/elevenLabsService';
import { useSettings } from '@/contexts/SettingsContext';

interface EnhancedSoundButtonProps {
  phrase: Phrase;
  respectMode: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export function EnhancedSoundButton({ phrase, respectMode, size = 'medium', onClick }: EnhancedSoundButtonProps) {
  const { volume, voiceType } = useSettings();

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

  const sizeClasses = {
    small: 'h-24 min-h-[96px]',
    medium: 'h-28 min-h-[112px]',
    large: 'h-32 min-h-[128px]'
  };

  const textSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  const imageSizes = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-20 h-20'
  };

  return (
    <Button
      onClick={speakPhrase}
      className={`${sizeClasses[size]} w-full flex flex-col items-center justify-center gap-2 p-3 hover:scale-105 transition-all duration-200 bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 shadow-md hover:shadow-lg`}
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
            className={`${phrase.image ? 'hidden' : ''} text-3xl`}
          >
            {phrase.emoji}
          </span>
        )}
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center gap-1 min-h-0 flex-1 justify-center">
        <span className={`font-bold text-center leading-tight text-gray-800 ${textSizes[size]}`}>
          {respectMode && phrase.respectful ? phrase.respectful : phrase.filipino}
        </span>
        <span className={`text-center leading-tight text-gray-600 ${size === 'small' ? 'text-[10px]' : 'text-xs'}`}>
          {phrase.english}
        </span>
      </div>
    </Button>
  );
}
