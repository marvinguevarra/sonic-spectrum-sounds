
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, X } from 'lucide-react';
import { elevenLabsService } from '@/services/elevenLabsService';
import { useSettings } from '@/contexts/SettingsContext';
import { AspectSelector } from './AspectSelector';

type Aspect = 'completed' | 'ongoing' | 'contemplated';

interface CategorySentenceBuilderProps {
  category: string;
}

export function CategorySentenceBuilder({ category }: CategorySentenceBuilderProps) {
  const { volume, voiceType } = useSettings();
  const [sentence, setSentence] = useState<string[]>([]);
  const [currentAspect, setCurrentAspect] = useState<Aspect>('ongoing');

  const addWord = (word: string) => {
    setSentence([...sentence, word]);
  };

  const speakSentence = async () => {
    const fullSentence = sentence.join(' ');
    if (fullSentence.trim()) {
      try {
        await elevenLabsService.speak(fullSentence, {
          volume,
          voiceType,
          bilingualMode: true,
        });
      } catch (error) {
        console.error('Speech failed:', error);
      }
    }
  };

  const clearSentence = () => {
    setSentence([]);
  };

  // Category-specific verb conjugations
  const getCategoryVerbs = () => {
    const verbsByCategory: { [key: string]: { [key: string]: { [key in Aspect]: string } } } = {
      needs: {
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
        }
      },
      family: {
        'visit': {
          completed: 'Bumisita ako',
          ongoing: 'Bumibisita ako',
          contemplated: 'Bibisita ako'
        },
        'call': {
          completed: 'Tumawag ako',
          ongoing: 'Tumatawag ako',
          contemplated: 'Tatawag ako'
        },
        'love': {
          completed: 'Minahal ko',
          ongoing: 'Minamahal ko',
          contemplated: 'Mamahalin ko'
        }
      },
      food: {
        'cook': {
          completed: 'Nagluto ako',
          ongoing: 'Nagluluto ako',
          contemplated: 'Magluluto ako'
        },
        'order': {
          completed: 'Umorder ako',
          ongoing: 'Umo-order ako',
          contemplated: 'Mag-oorder ako'
        },
        'share': {
          completed: 'Nagshare ako',
          ongoing: 'Nagshashare ako',
          contemplated: 'Magshashare ako'
        }
      },
      feelings: {
        'feel': {
          completed: 'Naramdaman ko',
          ongoing: 'Nararamdaman ko',
          contemplated: 'Mararamdaman ko'
        },
        'express': {
          completed: 'Nagsabi ako',
          ongoing: 'Nagsasabi ako',
          contemplated: 'Magsasabi ako'
        },
        'think': {
          completed: 'Naisip ko',
          ongoing: 'Naiisip ko',
          contemplated: 'Maiisip ko'
        }
      }
    };

    return verbsByCategory[category] || verbsByCategory.needs;
  };

  const getCategoryWords = () => {
    const wordsByCategory: { [key: string]: string[] } = {
      needs: ['ng', 'sa', 'kanin', 'tubig', 'pagkain', 'kama', 'banyo'],
      family: ['kay', 'sa', 'Nanay', 'Tatay', 'Tita', 'Tito', 'Lola', 'Lolo'],
      food: ['ng', 'sa', 'adobo', 'sinigang', 'kanin', 'ulam', 'dessert'],
      feelings: ['ng', 'dahil', 'masaya', 'malungkot', 'excited', 'proud']
    };

    return wordsByCategory[category] || wordsByCategory.needs;
  };

  const verbs = getCategoryVerbs();
  const commonWords = getCategoryWords();

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        {/* Aspect Selector */}
        <AspectSelector 
          currentAspect={currentAspect} 
          onAspectChange={setCurrentAspect}
        />

        {/* Verb Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(verbs).map(([verb, conjugations]) => (
            <Button
              key={verb}
              variant="outline"
              size="sm"
              onClick={() => addWord(conjugations[currentAspect])}
              className="text-xs"
            >
              {conjugations[currentAspect].split(' ')[0]}
            </Button>
          ))}
        </div>

        {/* Common Words */}
        <div className="grid grid-cols-4 gap-2">
          {commonWords.map((word) => (
            <Button
              key={word}
              variant="secondary"
              size="sm"
              onClick={() => addWord(word)}
              className="text-xs"
            >
              {word}
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
