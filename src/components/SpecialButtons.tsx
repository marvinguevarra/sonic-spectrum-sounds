
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSoundButton } from './AnimatedSoundButton';

export function SpecialButtons() {
  const specialButtons = [
    {
      id: 'graduation',
      label: 'Happy Graduation Angelo',
      labelFilipino: 'Maligayang Pagtatapos Angelo',
      icon: '🎓',
      soundFile: 'graduation'
    },
    {
      id: 'beach',
      label: 'I want to go to the beach',
      labelFilipino: 'Gusto kong pumunta sa dalampasigan',
      icon: '🏖️',
      soundFile: 'beach'
    }
  ];

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Special Messages</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {specialButtons.map(button => (
            <AnimatedSoundButton key={button.id} {...button} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
