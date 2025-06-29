
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phrase } from '@/types/phrase';
import { elevenLabsService } from '@/services/elevenLabsService';
import { useSettings } from '@/contexts/SettingsContext';
import { useResponsive } from '@/hooks/use-responsive';

interface EnhancedSoundButtonProps {
  phrase: Phrase;
  respectMode: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export function EnhancedSoundButton({ phrase, respectMode, size = 'medium', onClick }: EnhancedSoundButtonProps) {
  const { volume, voiceType } = useSettings();
  const { deviceType, getTextSize, getButtonSize } = useResponsive();

  const speakPhrase = async () => {
    const text = respectMode && phrase.respectful ? phrase.respectful : phrase.filipino;
    
    console.log('EnhancedSoundButton speaking phrase:', {
      phraseId: phrase.id,
      text: text,
      respectMode,
      respectful: phrase.respectful,
      filipino: phrase.filipino
    }); // Debug log
    
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

  // Enhanced dynamic sizing with better mobile support
  const getResponsiveHeight = () => {
    const baseSizes = {
      small: { 
        mobile: 'min-h-[88px]', // Increased for better text wrapping
        tablet: 'min-h-[96px]', 
        desktop: 'min-h-[104px]' 
      },
      medium: { 
        mobile: 'min-h-[100px]', // Increased for longer phrases
        tablet: 'min-h-[112px]', 
        desktop: 'min-h-[120px]' 
      },
      large: { 
        mobile: 'min-h-[112px]', 
        tablet: 'min-h-[128px]', 
        desktop: 'min-h-[144px]' 
      }
    };
    return getButtonSize(baseSizes[size]);
  };

  // Enhanced text sizing with better readability
  const primaryTextSize = getTextSize({
    mobile: size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : 'text-base',
    tablet: size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg',
    desktop: size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg'
  });

  const secondaryTextSize = getTextSize({
    mobile: 'text-[11px]', // Slightly larger for better readability
    tablet: 'text-xs',
    desktop: 'text-xs'
  });

  const emojiSize = getTextSize({
    mobile: size === 'small' ? 'text-xl' : size === 'medium' ? 'text-2xl' : 'text-3xl',
    tablet: size === 'small' ? 'text-2xl' : size === 'medium' ? 'text-3xl' : 'text-4xl',
    desktop: size === 'small' ? 'text-2xl' : size === 'medium' ? 'text-3xl' : 'text-4xl'
  });

  const imageSize = getTextSize({
    mobile: size === 'small' ? 'w-10 h-10' : size === 'medium' ? 'w-12 h-12' : 'w-14 h-14',
    tablet: size === 'small' ? 'w-12 h-12' : size === 'medium' ? 'w-16 h-16' : 'w-20 h-20',
    desktop: size === 'small' ? 'w-12 h-12' : size === 'medium' ? 'w-16 h-16' : 'w-20 h-20'
  });

  const padding = getTextSize({
    mobile: 'p-2', // Increased padding for better touch targets
    tablet: 'p-3',
    desktop: 'p-4'
  });

  // Enhanced gap spacing for mobile
  const gapSize = getTextSize({
    mobile: 'gap-1.5',
    tablet: 'gap-2',
    desktop: 'gap-2'
  });

  return (
    <Button
      onClick={speakPhrase}
      className={`${getResponsiveHeight()} w-full flex flex-col items-center justify-center ${gapSize} ${padding} hover:scale-105 active:scale-95 transition-all duration-200 bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 shadow-md hover:shadow-lg touch-manipulation`}
      variant="outline"
    >
      {/* Image or Emoji Display */}
      <div className="flex-shrink-0 flex items-center justify-center">
        {phrase.image ? (
          <img 
            src={phrase.image} 
            alt={phrase.english}
            className={`${imageSize} object-cover rounded-lg border border-gray-200`}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        {phrase.emoji && (
          <span 
            className={`${phrase.image ? 'hidden' : ''} ${emojiSize}`}
          >
            {phrase.emoji}
          </span>
        )}
      </div>

      {/* Enhanced Text Content with better wrapping */}
      <div className="flex flex-col items-center justify-center min-h-0 flex-1 w-full px-1">
        <span className={`font-bold text-center leading-tight text-gray-800 ${primaryTextSize} break-words hyphens-auto max-w-full`}>
          {respectMode && phrase.respectful ? phrase.respectful : phrase.filipino}
        </span>
        <span className={`text-center leading-tight text-gray-600 ${secondaryTextSize} break-words max-w-full mt-0.5`}>
          {phrase.english}
        </span>
      </div>
    </Button>
  );
}
