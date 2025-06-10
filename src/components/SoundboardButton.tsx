
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SoundboardButtonProps {
  label: string;
  labelFilipino?: string;
  icon?: string;
  category: string;
  soundFile?: string;
  size?: 'small' | 'medium' | 'large';
  bilingualMode?: boolean;
  onClick: () => void;
}

const SoundboardButton = ({ 
  label, 
  labelFilipino,
  icon, 
  category, 
  soundFile, 
  size = 'medium',
  bilingualMode = false,
  onClick 
}: SoundboardButtonProps) => {
  const sizeClass = `soundboard-button-${size}`;
  const displayLabel = bilingualMode && labelFilipino ? labelFilipino : label;

  const playSound = () => {
    if (soundFile) {
      const audio = new Audio(soundFile);
      audio.play().catch(e => console.log('Sound play failed:', e));
    }
    onClick();
  };

  return (
    <Card 
      className={`soundboard-button ${sizeClass} cursor-pointer flex flex-col items-center justify-center text-center group`}
      onClick={playSound}
    >
      {icon && (
        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
      )}
      <div className="font-semibold text-lg leading-tight text-foreground">
        {displayLabel}
      </div>
      {bilingualMode && labelFilipino && (
        <div className="text-sm text-muted-foreground mt-1 opacity-80">
          {label}
        </div>
      )}
      <div className="text-xs text-muted-foreground mt-1 opacity-70">
        {category}
      </div>
    </Card>
  );
};

export default SoundboardButton;
