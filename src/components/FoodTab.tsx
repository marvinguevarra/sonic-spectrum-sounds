
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { EnhancedSoundButton } from './EnhancedSoundButton';
import { ModeToggle } from './ModeToggle';
import { CategorySentenceBuilder } from './CategorySentenceBuilder';
import { useResponsive } from '@/hooks/use-responsive';
import { COMMON_FOODS, FOOD_REQUESTS, FOOD_RESPONSES } from '@/data/phrases';
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
  { id: 'food-nav-5', filipino: 'Pwede pa ba', english: 'Can I have more', category: 'food', respectful: 'Pwede pa po ba', emoji: '🤔' },
  { id: 'food-nav-6', filipino: 'Tamang-tama', english: 'Just right', category: 'food', respectful: 'Tamang-tama po', emoji: '👌' },
];

export function FoodTab({ mode, onModeChange, respectMode }: FoodTabProps) {
  const { getGridCols, deviceType } = useResponsive();

  const quickActionsCols = getGridCols({
    mobile: 'grid-cols-2',
    tablet: 'grid-cols-3',
    desktop: 'grid-cols-4'
  });

  const foodItemsCols = getGridCols({
    mobile: 'grid-cols-2',
    tablet: 'grid-cols-3',
    desktop: 'grid-cols-4'
  });

  const buttonSize = deviceType === 'mobile' ? 'small' : 'medium';

  return (
    <div className="space-y-4">
      <ModeToggle mode={mode} onModeChange={onModeChange} />
      {mode === 'freestyle' ? (
        <CategorySentenceBuilder category="food" />
      ) : (
        <>
          {/* Food Requests - Enhanced with respectful language */}
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground flex items-center gap-2">
                🙏 Mga Kahilingan sa Pagkain (Respectful Food Requests)
              </h3>
              <div className={`grid gap-3 ${quickActionsCols}`}>
                {FOOD_REQUESTS.map(phrase => (
                  <EnhancedSoundButton key={phrase.id} phrase={phrase} respectMode={respectMode} size="small" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Food Navigation Bar - Quick Actions */}
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground flex items-center gap-2">
                ⚡ Mabibilis na Tugon (Quick Responses)
              </h3>
              <div className={`grid gap-3 ${quickActionsCols}`}>
                {FOOD_NAV_PHRASES.map(phrase => (
                  <EnhancedSoundButton key={phrase.id} phrase={phrase} respectMode={respectMode} size="small" />
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Food Items */}
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground flex items-center gap-2">
                🍚 Mga Pagkain at Inumin (Foods & Drinks)
              </h3>
              <div className={`grid gap-4 ${foodItemsCols}`}>
                {COMMON_FOODS.map(phrase => (
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

          {/* Food Responses - Enhanced with cultural context */}
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground flex items-center gap-2">
                💬 Mga Tugon sa Pagkain (Polite Food Responses)
              </h3>
              <div className={`grid gap-3 ${quickActionsCols}`}>
                {FOOD_RESPONSES.map(phrase => (
                  <EnhancedSoundButton key={phrase.id} phrase={phrase} respectMode={respectMode} size="small" />
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
