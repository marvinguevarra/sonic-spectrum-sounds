
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, X } from 'lucide-react';

type Aspect = 'completed' | 'ongoing' | 'contemplated';

export function SentenceBuilder() {
  const [sentence, setSentence] = useState<string[]>([]);
  const [currentAspect, setCurrentAspect] = useState<Aspect>('ongoing');

  const addWord = (word: string) => {
    setSentence([...sentence, word]);
  };

  const speakSentence = () => {
    const fullSentence = sentence.join(' ');
    if (fullSentence.trim()) {
      const utterance = new SpeechSynthesisUtterance(fullSentence);
      utterance.lang = 'fil-PH';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const clearSentence = () => {
    setSentence([]);
  };

  // Common verb conjugations based on aspect
  const getVerbConjugation = (root: string, aspect: Aspect) => {
    const conjugations: { [key: string]: { [key in Aspect]: string } } = {
      'kain': {
        completed: 'Kumain ako',
        ongoing: 'Kumakain ako', 
        contemplated: 'Kakain ako'
      },
      'inom': {
        completed: 'Uminom ako',
        ongoing: 'Umiinom ako',
        contemplated: 'Iinom ako'
      },
      'tulog': {
        completed: 'Natulog ako',
        ongoing: 'Natutulog ako',
        contemplated: 'Matutulog ako'
      },
      'takbo': {
        completed: 'Tumakbo ako',
        ongoing: 'Tumatakbo ako',
        contemplated: 'Tatakbo ako'
      },
      'laro': {
        completed: 'Naglaro ako',
        ongoing: 'Naglalaro ako',
        contemplated: 'Maglalaro ako'
      }
    };
    
    return conjugations[root]?.[aspect] || root;
  };

  const aspectButtons = [
    { aspect: 'completed' as Aspect, label: 'Tapos na', color: 'bg-green-600 hover:bg-green-700', emoji: '✓' },
    { aspect: 'ongoing' as Aspect, label: 'Ginagawa', color: 'bg-yellow-600 hover:bg-yellow-700', emoji: '↻' },
    { aspect: 'contemplated' as Aspect, label: 'Gagawin', color: 'bg-blue-600 hover:bg-blue-700', emoji: '→' }
  ];

  const commonVerbs = ['kain', 'inom', 'tulog', 'takbo', 'laro'];

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        {/* Aspect Selector */}
        <div className="flex gap-2 p-3 bg-muted rounded-lg">
          {aspectButtons.map((button) => (
            <Button
              key={button.aspect}
              variant={currentAspect === button.aspect ? 'default' : 'outline'}
              onClick={() => setCurrentAspect(button.aspect)}
              className={`flex-1 ${currentAspect === button.aspect ? button.color : ''}`}
            >
              <span className="mr-2">{button.emoji}</span>
              {button.label}
            </Button>
          ))}
        </div>

        {/* Quick Verb Buttons */}
        <div className="grid grid-cols-5 gap-2">
          {commonVerbs.map((verb) => (
            <Button
              key={verb}
              variant="outline"
              size="sm"
              onClick={() => addWord(getVerbConjugation(verb, currentAspect))}
              className="text-xs"
            >
              {getVerbConjugation(verb, currentAspect).split(' ')[0]}
            </Button>
          ))}
        </div>
        
        {/* Sentence Display */}
        <div className="min-h-[60px] p-3 bg-muted rounded-lg flex items-center justify-center">
          <span className="text-lg text-center">
            {sentence.length > 0 ? sentence.join(' ') : 'Pindutin ang mga salita para makagawa ng pangungusap...'}
          </span>
        </div>
        
        {/* Control Buttons */}
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
