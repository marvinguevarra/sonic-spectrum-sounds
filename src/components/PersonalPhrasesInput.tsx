
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedSoundButton } from './EnhancedSoundButton';
import { useSettings } from '@/contexts/SettingsContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useResponsive } from '@/hooks/use-responsive';
import { Phrase } from '@/types/phrase';

const PERSONAL_PHRASES: Phrase[] = [
  { id: 'personal-1', filipino: 'Ako Po Si Angelo', english: 'My name is Angelo', category: 'personal', respectful: 'Ako Po Si Angelo', emoji: '👋' },
  { id: 'personal-2', filipino: 'Taga US po Ako', english: 'I am from US', category: 'personal', respectful: 'Taga US po Ako', emoji: '🇺🇸' },
  { id: 'personal-3', filipino: 'Gusto ko', english: 'I like', category: 'personal', respectful: 'Gusto ko po', emoji: '❤️' },
  { id: 'personal-4', filipino: 'Ayaw ko', english: 'I don\'t like', category: 'personal', respectful: 'Ayaw ko po', emoji: '❌' },
  { id: 'personal-5', filipino: 'Kailangan ko ng tulong', english: 'I need help', category: 'personal', respectful: 'Kailangan ko po ng tulong', emoji: '🆘' },
  { id: 'personal-6', filipino: 'Salamat sa tulong', english: 'Thank you for helping', category: 'personal', respectful: 'Salamat po sa tulong', emoji: '🙏' },
  { id: 'personal-7', filipino: 'Pwede ba', english: 'Can I', category: 'personal', respectful: 'Pwede po ba', emoji: '🤔' },
  { id: 'personal-8', filipino: 'Hindi ko alam', english: 'I don\'t know', category: 'personal', respectful: 'Hindi ko po alam', emoji: '🤷' },
  { id: 'personal-9', filipino: 'Naiintindihan ko', english: 'I understand', category: 'personal', respectful: 'Naiintindihan ko po', emoji: '✅' },
  { id: 'personal-10', filipino: 'Hindi ko naiintindihan', english: 'I don\'t understand', category: 'personal', respectful: 'Hindi ko po naiintindihan', emoji: '❓' },
  { id: 'personal-11', filipino: 'Magandang umaga', english: 'Good morning', category: 'personal', respectful: 'Magandang umaga po', emoji: '🌅' },
  { id: 'personal-12', filipino: 'Magandang tanghali', english: 'Good afternoon', category: 'personal', respectful: 'Magandang tanghali po', emoji: '☀️' },
  { id: 'personal-13', filipino: 'Magandang gabi po', english: 'Good evening', category: 'personal', respectful: 'Magandang gabi po', emoji: '🌆' },
];

export function PersonalPhrasesInput() {
  const { bilingualMode } = useSettings();
  const isMobile = useIsMobile();
  const { deviceType, getGridCols } = useResponsive();

  // Enhanced responsive grid with better mobile optimization
  const gridCols = getGridCols({
    mobile: 'grid-cols-2', // 2 columns on mobile for better text wrapping
    tablet: 'grid-cols-3', // 3 columns on tablet
    desktop: 'grid-cols-4' // 4 columns on desktop
  });

  // Dynamic button size based on device
  const buttonSize = deviceType === 'mobile' ? 'medium' : deviceType === 'tablet' ? 'medium' : 'medium';

  // Enhanced gap spacing for different devices
  const gapClass = deviceType === 'mobile' ? 'gap-3' : deviceType === 'tablet' ? 'gap-4' : 'gap-4';

  return (
    <div className="space-y-6">
      {/* Custom Phrase Input - Hidden temporarily until proper guardrails are implemented */}
      {/* 
      {isMobile ? (
        <MobileCustomPhraseAccordion />
      ) : (
        <CustomPhraseInput />
      )}
      */}
      
      {/* Pre-defined Personal Phrases */}
      <Card>
        <CardHeader>
          <CardTitle>
            ⭐ {bilingualMode ? 'Mga Personal na Salita' : 'Personal Phrases'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid ${gridCols} ${gapClass}`}>
            {PERSONAL_PHRASES.map((phrase) => (
              <EnhancedSoundButton
                key={phrase.id}
                phrase={phrase}
                respectMode={true}
                size={buttonSize}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
