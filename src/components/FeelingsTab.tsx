
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { EnhancedSoundButton } from './EnhancedSoundButton';
import { ModeToggle } from './ModeToggle';
import { CategorySentenceBuilder } from './CategorySentenceBuilder';
import { useIsMobile } from '@/hooks/use-mobile';
import { Phrase } from '@/types/phrase';

interface FeelingsTabProps {
  mode: 'phrases' | 'freestyle';
  onModeChange: (mode: 'phrases' | 'freestyle') => void;
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

export function FeelingsTab({ mode, onModeChange, respectMode }: FeelingsTabProps) {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <ModeToggle mode={mode} onModeChange={onModeChange} />
      {mode === 'freestyle' ? (
        <CategorySentenceBuilder category="feelings" />
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'}`}>
              {FEELINGS_PHRASES.map(phrase => (
                <EnhancedSoundButton 
                  key={phrase.id} 
                  phrase={phrase} 
                  respectMode={respectMode}
                  size={isMobile ? 'small' : 'medium'}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
