
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SpeechOutputProps {
  selectedWords: string[];
  onClear: () => void;
  onSpeak: () => void;
}

const SpeechOutput = ({ selectedWords, onClear, onSpeak }: SpeechOutputProps) => {
  const sentence = selectedWords.join(' ');

  return (
    <Card className="p-4 mb-6 bg-primary/5 border-2 border-primary/20">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-h-[50px] p-3 bg-background rounded-lg border flex items-center">
          <p className="text-lg font-medium text-foreground">
            {sentence || 'Tap buttons to build a sentence...'}
          </p>
        </div>
        <div className="flex gap-2 ml-4">
          <Button 
            variant="outline" 
            onClick={onClear}
            disabled={selectedWords.length === 0}
          >
            Clear
          </Button>
          <Button 
            onClick={onSpeak}
            disabled={selectedWords.length === 0}
            className="bg-primary hover:bg-primary/90"
          >
            🔊 Speak
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SpeechOutput;
