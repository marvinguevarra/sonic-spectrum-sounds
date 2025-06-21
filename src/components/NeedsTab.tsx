
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { EnhancedSoundButton } from './EnhancedSoundButton';
import { ModeToggle } from './ModeToggle';
import { CategorySentenceBuilder } from './CategorySentenceBuilder';
import { useIsMobile } from '@/hooks/use-mobile';
import { BASIC_NEEDS, POLITE_PHRASES } from '@/data/phrases';

interface NeedsTabProps {
  mode: 'phrases' | 'freestyle';
  onModeChange: (mode: 'phrases' | 'freestyle') => void;
  respectMode: boolean;
}

export function NeedsTab({ mode, onModeChange, respectMode }: NeedsTabProps) {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <ModeToggle mode={mode} onModeChange={onModeChange} />
      {mode === 'freestyle' ? (
        <CategorySentenceBuilder category="needs" />
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
              {BASIC_NEEDS.map(phrase => (
                <EnhancedSoundButton 
                  key={phrase.id} 
                  phrase={phrase} 
                  respectMode={respectMode}
                  size={isMobile ? 'small' : 'medium'}
                />
              ))}
              {POLITE_PHRASES.map(phrase => (
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
