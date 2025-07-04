
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { EnhancedSoundButton } from './EnhancedSoundButton';
import { SentenceBuilder } from './SentenceBuilder';
import { useResponsive } from '@/hooks/use-responsive';
import { Phrase } from '@/types/phrase';

interface ActionsTabProps {
  respectMode: boolean;
}

const ACTIVITIES_PHRASES: Phrase[] = [
  { id: 'activity-1', filipino: 'Maglaro', english: 'Play', category: 'activities', emoji: '🎮' },
  { id: 'activity-2', filipino: 'Magbasa', english: 'Read', category: 'activities', emoji: '📚' },
  { id: 'activity-3', filipino: 'Makinig ng musika', english: 'Listen to music', category: 'activities', emoji: '🎵' },
  { id: 'activity-4', filipino: 'Lumabas', english: 'Go outside', category: 'activities', emoji: '🌳' },
  { id: 'activity-5', filipino: 'Manood ng TV', english: 'Watch TV', category: 'activities', emoji: '📺' },
  { id: 'activity-6', filipino: 'Matulog', english: 'Sleep', category: 'activities', emoji: '🛏️' },
  { id: 'activity-7', filipino: 'Lumalangoy', english: 'Swimming', category: 'activities', emoji: '🏊' },
  { id: 'activity-8', filipino: 'Sayaw', english: 'Dancing', category: 'activities', emoji: '💃' },
  { id: 'activity-9', filipino: 'Kumanta', english: 'Singing', category: 'activities', emoji: '🎤' },
  { id: 'activity-10', filipino: 'Magkulay', english: 'Drawing', category: 'activities', emoji: '🎨' },
];

export function ActionsTab({ respectMode }: ActionsTabProps) {
  const { getGridCols, deviceType } = useResponsive();

  const gridCols = getGridCols({
    mobile: 'grid-cols-2',
    tablet: 'grid-cols-3',
    desktop: 'grid-cols-5'
  });

  const buttonSize = deviceType === 'mobile' ? 'small' : 'medium';

  return (
    <div className="space-y-4">
      <SentenceBuilder />
      
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Mga Gawain (Activities)</h3>
          <div className={`grid gap-4 ${gridCols}`}>
            {ACTIVITIES_PHRASES.map(phrase => (
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
