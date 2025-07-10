import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, AlertTriangle, Volume2 } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { AccessibleSoundButton } from '@/components/AccessibleSoundButton';
import { cn } from '@/lib/utils';

const emergencyPhrases = [
  {
    id: 'help',
    filipino: 'Tulong',
    respectful: 'Tulong po',
    english: 'Help',
    emoji: '🆘',
    category: 'emergency'
  },
  {
    id: 'stop',
    filipino: 'Tigil',
    respectful: 'Tigil po',
    english: 'Stop',
    emoji: '✋',
    category: 'emergency'
  },
  {
    id: 'hurt',
    filipino: 'Masakit',
    respectful: 'Masakit po',
    english: 'It hurts',
    emoji: '🤕',
    category: 'emergency'
  },
  {
    id: 'bathroom',
    filipino: 'CR',
    respectful: 'CR po',
    english: 'Bathroom',
    emoji: '🚻',
    category: 'emergency'
  }
];

const yesNoOptions = [
  {
    id: 'yes',
    filipino: 'Oo',
    respectful: 'Opo',
    english: 'Yes',
    emoji: '✅',
    category: 'response'
  },
  {
    id: 'no',
    filipino: 'Hindi',
    respectful: 'Hindi po',
    english: 'No',
    emoji: '❌',
    category: 'response'
  },
  {
    id: 'maybe',
    filipino: 'Siguro',
    respectful: 'Siguro po',
    english: 'Maybe',
    emoji: '🤷',
    category: 'response'
  },
  {
    id: 'dont-know',
    filipino: 'Hindi ko alam',
    respectful: 'Hindi ko po alam',
    english: "I don't know",
    emoji: '❓',
    category: 'response'
  }
];

export function QuickAccessBar() {
  const { settings, speakMessage, messageQueue } = useAccessibility();
  const [mode, setMode] = useState<'emergency' | 'yes-no' | 'normal'>('normal');

  const currentPhrases = mode === 'emergency' ? emergencyPhrases : 
                        mode === 'yes-no' ? yesNoOptions : 
                        [];

  return (
    <div className="bg-muted/20 border rounded-lg p-3 space-y-3">
      {/* Mode Toggle Buttons */}
      <div className="flex gap-2 justify-center">
        <Button
          onClick={() => setMode(mode === 'emergency' ? 'normal' : 'emergency')}
          variant={mode === 'emergency' ? 'default' : 'outline'}
          size="sm"
          className={cn(
            "flex items-center gap-2",
            mode === 'emergency' && "bg-destructive text-destructive-foreground hover:bg-destructive/90"
          )}
          aria-label={settings.bilingualMode ? "Emergency phrases • Mga pang-emergency" : "Emergency phrases"}
        >
          <AlertTriangle className="h-4 w-4" />
          {settings.bilingualMode ? 'Emergency • Pang-Emergency' : 'Emergency'}
        </Button>

        <Button
          onClick={() => setMode(mode === 'yes-no' ? 'normal' : 'yes-no')}
          variant={mode === 'yes-no' ? 'default' : 'outline'}
          size="sm"
          className="flex items-center gap-2"
          aria-label={settings.bilingualMode ? "Yes/No responses • Oo/Hindi" : "Yes/No responses"}
        >
          <Check className="h-4 w-4" />
          {settings.bilingualMode ? 'Yes/No • Oo/Hindi' : 'Yes/No'}
        </Button>

        {/* Speak Message Button */}
        {messageQueue.length > 0 && (
          <Button
            onClick={speakMessage}
            variant="secondary"
            size="sm"
            className="flex items-center gap-2 ml-auto"
            aria-label={settings.bilingualMode ? "Speak message • Sabihin ang mensahe" : "Speak message"}
          >
            <Volume2 className="h-4 w-4" />
            {settings.bilingualMode ? 'Speak • Sabihin' : 'Speak'}
          </Button>
        )}
      </div>

      {/* Quick Access Phrases */}
      {currentPhrases.length > 0 && (
        <div className={cn(
          "grid gap-2",
          settings.buttonSize === 'small' && "grid-cols-6",
          settings.buttonSize === 'medium' && "grid-cols-4", 
          settings.buttonSize === 'large' && "grid-cols-3",
          settings.buttonSize === 'extra-large' && "grid-cols-2"
        )}>
          {currentPhrases.map((phrase, index) => (
            <AccessibleSoundButton
              key={phrase.id}
              phrase={phrase}
              index={index + 1000} // Offset to avoid conflicts with main buttons
              variant="message"
              className={cn(
                mode === 'emergency' && "border-destructive/50 hover:border-destructive",
                "min-h-[3rem]" // Smaller than main buttons
              )}
            />
          ))}
        </div>
      )}

      {/* Instructions */}
      {mode === 'normal' && (
        <p className="text-xs text-muted-foreground text-center">
          {settings.bilingualMode 
            ? 'Tap Emergency for quick help, Yes/No for simple responses • I-tap ang Emergency para sa tulong, Yes/No para sa sagot'
            : 'Tap Emergency for quick help phrases, or Yes/No for simple responses'
          }
        </p>
      )}
    </div>
  );
}