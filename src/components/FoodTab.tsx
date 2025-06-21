
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { EnhancedSoundButton } from './EnhancedSoundButton';
import { ModeToggle } from './ModeToggle';
import { CategorySentenceBuilder } from './CategorySentenceBuilder';
import { useIsMobile } from '@/hooks/use-mobile';
import { COMMON_FOODS } from '@/data/phrases';
import { Phrase } from '@/types/phrase';

interface FoodTabProps {
  mode: 'phrases' | 'freestyle';
  onModeChange: (mode: 'phrases' | 'freestyle') => void;
  respectMode: boolean;
}

const FOOD_NAV_PHRASES: Phrase[] = [
  { id: 'food-nav-1', filipino: 'Gusto ko pa', english: 'I want more/seconds', category: 'food', respectful: 'Gusto ko pa po', emoji: '➕' },
  { id: 'food-nav-2', filipino: 'Ayaw ko na', english: 'No more/I\'ve had enough', category: 'food', respectful: 'Ayaw ko na po', emoji: '✋' },
  { id: 'food-nav-3', filipino: 'Busog na ako', english: 'I am full', category: 'food', respectful: 'Busog na po ako', emoji: '😋' },
  { id: 'food-nav-4', filipino: 'Sarap', english: 'Delicious', category: 'food', respectful: 'Masarap po', emoji: '😋' },
];

export function FoodTab({ mode, onModeChange, respectMode }: FoodTabProps) {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <ModeToggle mode={mode} onModeChange={onModeChange} />
      {mode === 'freestyle' ? (
        <CategorySentenceBuilder category="food" />
      ) : (
        <>
          {/* Food Navigation Bar */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Quick Actions</h3>
              <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
                {FOOD_NAV_PHRASES.map(phrase => (
                  <EnhancedSoundButton key={phrase.id} phrase={phrase} respectMode={respectMode} size="small" />
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Food Items */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Mga Pagkain at Inumin (Foods & Drinks)</h3>
              <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
                {COMMON_FOODS.map(phrase => (
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
        </>
      )}
    </div>
  );
}
