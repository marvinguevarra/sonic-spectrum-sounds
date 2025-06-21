
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

  // Dynamic sizing based on device type and button size prop
  const getResponsiveHeight = () => {
    const baseSizes = {
      small: { mobile: 'h-16 min-h-[64px]', tablet: 'h-20 min-h-[80px]', desktop: 'h-24 min-h-[96px]' },
      medium: { mobile: 'h-20 min-h-[80px]', tablet: 'h-24 min-h-[96px]', desktop: 'h-28 min-h-[112px]' },
      large: { mobile: 'h-24 min-h-[96px]', tablet: 'h-28 min-h-[112px]', desktop: 'h-32 min-h-[128px]' }
    };
    return getButtonSize(baseSizes[size]);
  };

  const primaryTextSize = getTextSize({
    mobile: size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : 'text-base',
    tablet: size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg',
    desktop: size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg'
  });

  const secondaryTextSize = getTextSize({
    mobile: 'text-[10px]',
    tablet: 'text-xs',
    desktop: 'text-xs'
  });

  const emojiSize = getTextSize({
    mobile: size === 'small' ? 'text-lg' : size === 'medium' ? 'text-xl' : 'text-2xl',
    tablet: size === 'small' ? 'text-xl' : size === 'medium' ? 'text-2xl' : 'text-3xl',
    desktop: size === 'small' ? 'text-2xl' : size === 'medium' ? 'text-3xl' : 'text-4xl'
  });

  const imageSize = getTextSize({
    mobile: size === 'small' ? 'w-8 h-8' : size === 'medium' ? 'w-10 h-10' : 'w-12 h-12',
    tablet: size === 'small' ? 'w-10 h-10' : size === 'medium' ? 'w-12 h-12' : 'w-16 h-16',
    desktop: size === 'small' ? 'w-12 h-12' : size === 'medium' ? 'w-16 h-16' : 'w-20 h-20'
  });

  const padding = getTextSize({
    mobile: 'p-1.5',
    tablet: 'p-2',
    desktop: 'p-3'
  });

  return (
    <Button
      onClick={speakPhrase}
      className={`${getResponsiveHeight()} w-full flex flex-col items-center justify-center gap-1 ${padding} hover:scale-105 active:scale-95 transition-all duration-200 bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 shadow-md hover:shadow-lg touch-manipulation`}
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

      {/* Text Content */}
      <div className="flex flex-col items-center gap-0.5 min-h-0 flex-1 justify-center">
        <span className={`font-bold text-center leading-tight text-gray-800 ${primaryTextSize}`}>
          {respectMode && phrase.respectful ? phrase.respectful : phrase.filipino}
        </span>
        <span className={`text-center leading-tight text-gray-600 ${secondaryTextSize}`}>
          {phrase.english}
        </span>
      </div>
    </Button>
  );
}
