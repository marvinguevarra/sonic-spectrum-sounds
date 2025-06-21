
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, X } from 'lucide-react';

export function SentenceBuilder() {
  const [sentence, setSentence] = useState<string[]>([]);

  const addWord = (word: string) => {
    setSentence([...sentence, word]);
  };

  const speakSentence = () => {
    const fullSentence = sentence.join(' ');
    const utterance = new SpeechSynthesisUtterance(fullSentence);
    utterance.lang = 'fil-PH';
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  const clearSentence = () => {
    setSentence([]);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        <div className="min-h-[60px] p-3 bg-muted rounded-lg flex items-center justify-center">
          <span className="text-lg text-center">
            {sentence.length > 0 ? sentence.join(' ') : 'Pindutin ang mga salita para makagawa ng pangungusap...'}
          </span>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={speakSentence} 
            disabled={sentence.length === 0}
            className="flex-1"
          >
            <Volume2 className="mr-2 h-4 w-4" />
            Magsalita
          </Button>
          <Button 
            onClick={clearSentence} 
            variant="outline"
            disabled={sentence.length === 0}
          >
            <X className="mr-2 h-4 w-4" />
            Burahin
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
