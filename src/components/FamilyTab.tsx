
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { EnhancedSoundButton } from './EnhancedSoundButton';
import { ModeToggle } from './ModeToggle';
import { CategorySentenceBuilder } from './CategorySentenceBuilder';
import { useResponsive } from '@/hooks/use-responsive';
import { FAMILY_TERMS } from '@/data/phrases';

interface FamilyTabProps {
  mode: 'phrases' | 'freestyle';
  onModeChange: (mode: 'phrases' | 'freestyle') => void;
  respectMode: boolean;
}

export function FamilyTab({ mode, onModeChange, respectMode }: FamilyTabProps) {
  const { getGridCols, deviceType } = useResponsive();

  const gridCols = getGridCols({
    mobile: 'grid-cols-2',
    tablet: 'grid-cols-3',
    desktop: 'grid-cols-5'
  });

  const buttonSize = deviceType === 'mobile' ? 'small' : 'medium';

  return (
    <div className="space-y-4">
      <ModeToggle mode={mode} onModeChange={onModeChange} />
      {mode === 'freestyle' ? (
        <CategorySentenceBuilder category="family" />
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className={`grid gap-4 ${gridCols}`}>
              {FAMILY_TERMS.map(phrase => (
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
      )}
    </div>
  );
}
