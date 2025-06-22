
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phrase } from '@/types/phrase';
import { elevenLabsService } from '@/services/elevenLabsService';
import { useSettings } from '@/contexts/SettingsContext';

interface SoundButtonProps {
  phrase: Phrase;
  respectMode: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export function SoundButton({ phrase, respectMode, size = 'medium', onClick }: SoundButtonProps) {
  const { volume, voiceType } = useSettings();

  const speakPhrase = async () => {
    const text = respectMode && phrase.respectful ? phrase.respectful : phrase.filipino;
    
    console.log('SoundButton speaking phrase:', {
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
        bilingualMode: true, // Always true for Filipino phrases
      });
    } catch (error) {
      console.error('Speech failed:', error);
    }
    
    if (onClick) onClick();
  };

  const sizeClasses = {
    small: 'h-16 text-sm',
    medium: 'h-20 text-base',
    large: 'h-24 text-lg'
  };

  return (
    <Button
      onClick={speakPhrase}
      className={`${sizeClasses[size]} w-full flex flex-col items-center justify-center gap-1 p-2 hover:scale-105 transition-all duration-200`}
      variant="outline"
    >
      {phrase.emoji && <span className="text-2xl">{phrase.emoji}</span>}
      <span className="font-semibold">{respectMode && phrase.respectful ? phrase.respectful : phrase.filipino}</span>
      <span className="text-xs text-muted-foreground">{phrase.english}</span>
    </Button>
  );
}
