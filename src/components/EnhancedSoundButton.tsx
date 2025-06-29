
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

  // More aggressive height increases for better text accommodation
  const getResponsiveHeight = () => {
    const baseSizes = {
      small: { 
        mobile: 'min-h-[110px]', // Increased significantly
        tablet: 'min-h-[100px]', 
        desktop: 'min-h-[104px]' 
      },
      medium: { 
        mobile: 'min-h-[120px]', // Increased significantly
        tablet: 'min-h-[115px]', 
        desktop: 'min-h-[120px]' 
      },
      large: { 
        mobile: 'min-h-[130px]', // Increased significantly
        tablet: 'min-h-[125px]', 
        desktop: 'min-h-[144px]' 
      }
    };
    return getButtonSize(baseSizes[size]);
  };

  // More conservative text sizing to prevent overflow
  const primaryTextSize = getTextSize({
    mobile: size === 'small' ? 'text-[10px]' : size === 'medium' ? 'text-[11px]' : 'text-xs',
    tablet: size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : 'text-base',
    desktop: size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg'
  });

  const secondaryTextSize = getTextSize({
    mobile: 'text-[9px]', // Smaller to prevent overflow
    tablet: 'text-[10px]',
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
    mobile: 'p-1.5', // Reduced padding on mobile to give more text space
    tablet: 'p-3',
    desktop: 'p-4'
  });

  const gapSize = getTextSize({
    mobile: 'gap-1',
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

      {/* Enhanced Text Content with aggressive wrapping and overflow prevention */}
      <div className="flex flex-col items-center justify-center min-h-0 flex-1 w-full px-1 overflow-hidden">
        <span className={`font-bold text-center leading-tight text-gray-800 ${primaryTextSize} break-words hyphens-auto overflow-wrap-anywhere line-clamp-3 max-w-full`}
              style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
          {respectMode && phrase.respectful ? phrase.respectful : phrase.filipino}
        </span>
        <span className={`text-center leading-tight text-gray-600 ${secondaryTextSize} break-words overflow-wrap-anywhere line-clamp-2 max-w-full mt-0.5`}
              style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
          {phrase.english}
        </span>
      </div>
    </Button>
  );
}
