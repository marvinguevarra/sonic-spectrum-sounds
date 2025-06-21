
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { EnhancedSoundButton } from './EnhancedSoundButton';
import { ModeToggle } from './ModeToggle';
import { CategorySentenceBuilder } from './CategorySentenceBuilder';
import { useIsMobile } from '@/hooks/use-mobile';
import { FAMILY_TERMS } from '@/data/phrases';

interface FamilyTabProps {
  mode: 'phrases' | 'freestyle';
  onModeChange: (mode: 'phrases' | 'freestyle') => void;
  respectMode: boolean;
}

export function FamilyTab({ mode, onModeChange, respectMode }: FamilyTabProps) {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <ModeToggle mode={mode} onModeChange={onModeChange} />
      {mode === 'freestyle' ? (
        <CategorySentenceBuilder category="family" />
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'}`}>
              {FAMILY_TERMS.map(phrase => (
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
