
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { EnhancedSoundButton } from './EnhancedSoundButton';
import { useResponsive } from '@/hooks/use-responsive';
import { Phrase } from '@/types/phrase';

interface FeelingsTabProps {
  respectMode: boolean;
}

const FEELINGS_PHRASES: Phrase[] = [
  { id: 'feeling-1', filipino: 'Masaya ako', english: 'I am happy', category: 'feelings', respectful: 'Masaya po ako', emoji: '😊' },
  { id: 'feeling-2', filipino: 'Malungkot ako', english: 'I am sad', category: 'feelings', respectful: 'Malungkot po ako', emoji: '😢' },
  { id: 'feeling-3', filipino: 'Galit ako', english: 'I am angry', category: 'feelings', respectful: 'Galit po ako', emoji: '😠' },
  { id: 'feeling-4', filipino: 'Takot ako', english: 'I am scared', category: 'feelings', respectful: 'Takot po ako', emoji: '😨' },
  { id: 'feeling-5', filipino: 'Excited ako', english: 'I am excited', category: 'feelings', respectful: 'Excited po ako', emoji: '🤗' },
  { id: 'feeling-6', filipino: 'Proud ako', english: 'I am proud', category: 'feelings', respectful: 'Proud po ako', emoji: '😌' },
];

export function FeelingsTab({ respectMode }: FeelingsTabProps) {
  const { getGridCols, deviceType } = useResponsive();

  const gridCols = getGridCols({
    mobile: 'grid-cols-2',
    tablet: 'grid-cols-3',
    desktop: 'grid-cols-4' // Reduced from 6 to 4 for better text accommodation
  });

  const buttonSize = deviceType === 'mobile' ? 'small' : 'medium';

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className={`grid gap-4 ${gridCols}`}>
            {FEELINGS_PHRASES.map(phrase => (
              <EnhancedSoundButton 
                key={phrase.id} 
                phrase={phrase} 
                respectMode={respectMode}
                size={buttonSize}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
