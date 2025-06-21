
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phrase } from '@/types/phrase';

interface SoundButtonProps {
  phrase: Phrase;
  respectMode: boolean;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export function SoundButton({ phrase, respectMode, size = 'medium', onClick }: SoundButtonProps) {
  const speakPhrase = () => {
    const text = respectMode && phrase.respectful ? phrase.respectful : phrase.filipino;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fil-PH';
    utterance.rate = 0.9; // Slightly slower for clarity
    speechSynthesis.speak(utterance);
    
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
