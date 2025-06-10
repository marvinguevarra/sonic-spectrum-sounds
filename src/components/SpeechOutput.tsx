
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, X } from 'lucide-react';
import { speechService } from '@/services/speechService';
import { useSettings } from '@/contexts/SettingsContext';

interface SpeechOutputProps {
  selectedWords: string[];
  onClear: () => void;
}

const SpeechOutput = ({ selectedWords, onClear }: SpeechOutputProps) => {
  const { bilingualMode, volume, voiceType } = useSettings();
  const sentence = selectedWords.join(' ');

  const handleSpeak = async () => {
    if (sentence.trim()) {
      try {
        await speechService.speak(sentence, {
          volume,
          voiceType,
          bilingualMode,
        });
      } catch (error) {
        console.error('Speech failed:', error);
      }
    }
  };

  return (
    <Card className="p-3 sm:p-4 mb-4 sm:mb-6 bg-primary/5 border-2 border-primary/20">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 min-h-[60px] sm:min-h-[50px] p-3 bg-background rounded-lg border flex items-center">
          <p className="text-base sm:text-lg font-medium text-foreground break-words">
            {sentence || (bilingualMode 
              ? 'Pindutin ang mga button para makagawa ng pangungusap...' 
              : 'Tap buttons to build a sentence...'
            )}
          </p>
        </div>
        <div className="flex gap-2 justify-end sm:justify-start">
          <Button 
            variant="outline" 
            onClick={onClear}
            disabled={selectedWords.length === 0}
            size="sm"
            className="flex-1 sm:flex-none"
          >
            <X className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">
              {bilingualMode ? 'Burahin' : 'Clear'}
            </span>
          </Button>
          <Button 
            onClick={handleSpeak}
            disabled={selectedWords.length === 0}
            className="bg-primary hover:bg-primary/90 flex-1 sm:flex-none"
            size="sm"
          >
            <Volume2 className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">
              {bilingualMode ? 'Magsalita' : 'Speak'}
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SpeechOutput;
