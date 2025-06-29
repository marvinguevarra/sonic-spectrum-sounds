
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

  // Increased button heights significantly for better text accommodation
  const getResponsiveHeight = () => {
    const baseSizes = {
      small: { 
        mobile: 'min-h-[140px]', // Increased significantly
        tablet: 'min-h-[120px]', 
        desktop: 'min-h-[120px]' 
      },
      medium: { 
        mobile: 'min-h-[160px]', // Increased significantly
        tablet: 'min-h-[140px]', 
        desktop: 'min-h-[140px]' 
      },
      large: { 
        mobile: 'min-h-[180px]', // Increased significantly
        tablet: 'min-h-[160px]', 
        desktop: 'min-h-[160px]' 
      }
    };
    return getButtonSize(baseSizes[size]);
  };

  // Increased text sizes for better visibility
  const primaryTextSize = getTextSize({
    mobile: size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg',
    tablet: size === 'small' ? 'text-base' : size === 'medium' ? 'text-lg' : 'text-xl',
    desktop: size === 'small' ? 'text-lg' : size === 'medium' ? 'text-xl' : 'text-2xl'
  });

  const secondaryTextSize = getTextSize({
    mobile: 'text-sm', // Increased from text-[9px]
    tablet: 'text-base', // Increased from text-[10px]
    desktop: 'text-lg' // Increased from text-xs
  });

  const emojiSize = getTextSize({
    mobile: size === 'small' ? 'text-2xl' : size === 'medium' ? 'text-3xl' : 'text-4xl',
    tablet: size === 'small' ? 'text-3xl' : size === 'medium' ? 'text-4xl' : 'text-5xl',
    desktop: size === 'small' ? 'text-4xl' : size === 'medium' ? 'text-5xl' : 'text-6xl'
  });

  const imageSize = getTextSize({
    mobile: size === 'small' ? 'w-10 h-10' : size === 'medium' ? 'w-12 h-12' : 'w-16 h-16',
    tablet: size === 'small' ? 'w-12 h-12' : size === 'medium' ? 'w-16 h-16' : 'w-20 h-20',
    desktop: size === 'small' ? 'w-16 h-16' : size === 'medium' ? 'w-20 h-20' : 'w-24 h-24'
  });

  const padding = getTextSize({
    mobile: 'p-3', // Increased padding
    tablet: 'p-4',
    desktop: 'p-5'
  });

  const gapSize = getTextSize({
    mobile: 'gap-2', // Increased gap
    tablet: 'gap-3',
    desktop: 'gap-3'
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

      {/* Enhanced Text Content with improved visibility and no aggressive line clamping */}
      <div className="flex flex-col items-center justify-center min-h-0 flex-1 w-full px-2 overflow-hidden">
        <span className={`font-bold text-center leading-tight text-gray-900 ${primaryTextSize} break-words hyphens-auto overflow-wrap-anywhere max-w-full`}
              style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
          {respectMode && phrase.respectful ? phrase.respectful : phrase.filipino}
        </span>
        <span className={`text-center leading-tight text-gray-700 ${secondaryTextSize} break-words overflow-wrap-anywhere max-w-full mt-1`}
              style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
          {phrase.english}
        </span>
      </div>
    </Button>
  );
}
