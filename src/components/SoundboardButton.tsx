
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SoundboardButtonProps {
  label: string;
  icon?: string;
  category: string;
  soundFile?: string;
  size?: 'small' | 'medium' | 'large';
  onClick: () => void;
}

const SoundboardButton = ({ 
  label, 
  icon, 
  category, 
  soundFile, 
  size = 'medium',
  onClick 
}: SoundboardButtonProps) => {
  const sizeClass = `soundboard-button-${size}`;

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
        {label}
      </div>
      <div className="text-xs text-muted-foreground mt-1 opacity-70">
        {category}
      </div>
    </Card>
  );
};

export default SoundboardButton;
