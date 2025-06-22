
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedSoundButton } from './EnhancedSoundButton';
import { CustomPhraseInput } from './CustomPhraseInput';
import { useSettings } from '@/contexts/SettingsContext';
import { Phrase } from '@/types/phrase';

const PERSONAL_PHRASES: Phrase[] = [
  { id: 'personal-1', filipino: 'Ako si', english: 'My name is', category: 'personal', emoji: '👋' },
  { id: 'personal-2', filipino: 'Taga dito ako', english: 'I am from here', category: 'personal', emoji: '🏠' },
  { id: 'personal-3', filipino: 'Gusto ko', english: 'I like', category: 'personal', emoji: '❤️' },
  { id: 'personal-4', filipino: 'Ayaw ko', english: 'I don\'t like', category: 'personal', emoji: '❌' },
  { id: 'personal-5', filipino: 'Kailangan ko ng tulong', english: 'I need help', category: 'personal', emoji: '🆘' },
  { id: 'personal-6', filipino: 'Salamat sa tulong', english: 'Thank you for helping', category: 'personal', emoji: '🙏' },
  { id: 'personal-7', filipino: 'Pwede ba', english: 'Can I', category: 'personal', emoji: '🤔' },
  { id: 'personal-8', filipino: 'Hindi ko alam', english: 'I don\'t know', category: 'personal', emoji: '🤷' },
  { id: 'personal-9', filipino: 'Naiintindihan ko', english: 'I understand', category: 'personal', emoji: '✅' },
  { id: 'personal-10', filipino: 'Hindi ko naiintindihan', english: 'I don\'t understand', category: 'personal', emoji: '❓' },
];

export function PersonalPhrasesInput() {
  const { bilingualMode } = useSettings();

  return (
    <div className="space-y-6">
      {/* Custom Phrase Input */}
      <CustomPhraseInput />
      
      {/* Pre-defined Personal Phrases */}
      <Card>
        <CardHeader>
          <CardTitle>
            ⭐ {bilingualMode ? 'Mga Personal na Salita' : 'Personal Phrases'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {PERSONAL_PHRASES.map((phrase) => (
              <EnhancedSoundButton
                key={phrase.id}
                phrase={phrase}
                respectMode={false}
                size="medium"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
