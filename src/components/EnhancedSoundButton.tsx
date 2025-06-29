
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

  // Enhanced button heights with special desktop optimization
  const getResponsiveHeight = () => {
    const baseSizes = {
      small: { 
        mobile: 'min-h-[140px]',
        tablet: 'min-h-[120px]', 
        desktop: 'min-h-[140px]' // Increased for desktop
      },
      medium: { 
        mobile: 'min-h-[160px]',
        tablet: 'min-h-[140px]', 
        desktop: 'min-h-[160px]' // Increased for desktop
      },
      large: { 
        mobile: 'min-h-[180px]',
        tablet: 'min-h-[160px]', 
        desktop: 'min-h-[180px]' // Increased for desktop
      }
    };
    return getButtonSize(baseSizes[size]);
  };

  // Enhanced text sizes with better desktop optimization
  const primaryTextSize = getTextSize({
    mobile: size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg',
    tablet: size === 'small' ? 'text-base' : size === 'medium' ? 'text-lg' : 'text-xl',
    desktop: size === 'small' ? 'text-xl' : size === 'medium' ? 'text-2xl' : 'text-3xl' // Increased for desktop
  });

  const secondaryTextSize = getTextSize({
    mobile: 'text-sm',
    tablet: 'text-base',
    desktop: 'text-xl' // Significantly increased for desktop
  });

  const emojiSize = getTextSize({
    mobile: size === 'small' ? 'text-2xl' : size === 'medium' ? 'text-3xl' : 'text-4xl',
    tablet: size === 'small' ? 'text-3xl' : size === 'medium' ? 'text-4xl' : 'text-5xl',
    desktop: size === 'small' ? 'text-5xl' : size === 'medium' ? 'text-6xl' : 'text-7xl' // Increased for desktop
  });

  const imageSize = getTextSize({
    mobile: size === 'small' ? 'w-10 h-10' : size === 'medium' ? 'w-12 h-12' : 'w-16 h-16',
    tablet: size === 'small' ? 'w-12 h-12' : size === 'medium' ? 'w-16 h-16' : 'w-20 h-20',
    desktop: size === 'small' ? 'w-20 h-20' : size === 'medium' ? 'w-24 h-24' : 'w-28 h-28' // Increased for desktop
  });

  // Enhanced padding for desktop
  const padding = getTextSize({
    mobile: 'p-3',
    tablet: 'p-4',
    desktop: 'p-6' // Increased padding for desktop
  });

  // Enhanced gap for desktop
  const gapSize = getTextSize({
    mobile: 'gap-2',
    tablet: 'gap-3',
    desktop: 'gap-4' // Increased gap for desktop
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

      {/* Enhanced Text Content with better desktop spacing */}
      <div className="flex flex-col items-center justify-center min-h-0 flex-1 w-full px-2 overflow-hidden">
        <span className={`font-bold text-center leading-tight text-gray-900 ${primaryTextSize} break-words hyphens-auto overflow-wrap-anywhere max-w-full`}
              style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
          {respectMode && phrase.respectful ? phrase.respectful : phrase.filipino}
        </span>
        <span className={`text-center leading-tight text-gray-700 ${secondaryTextSize} break-words overflow-wrap-anywhere max-w-full mt-2`}
              style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
          {phrase.english}
        </span>
      </div>
    </Button>
  );
}
