
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Volume2, Moon } from 'lucide-react';
import { elevenLabsService } from '@/services/elevenLabsService';
import { useSettings } from '@/contexts/SettingsContext';

interface GoodNightVariation {
  id: string;
  filipino: string;
  english: string;
  description: string;
  context: string;
}

const GOOD_NIGHT_VARIATIONS: GoodNightVariation[] = [
  {
    id: 'gn-1',
    filipino: 'Magandang gabi',
    english: 'Good evening/Good night',
    description: 'Most common way to say both good evening as a greeting and good night as a farewell',
    context: 'General use'
  },
  {
    id: 'gn-2',
    filipino: 'Magandang gabi po',
    english: 'Good evening/Good night (polite)',
    description: 'Polite form used when speaking to elders or showing respect',
    context: 'Respectful/Formal'
  },
  {
    id: 'gn-3',
    filipino: 'Magandang gabi, matulog ka na',
    english: 'Good night, go to sleep now',
    description: 'More explicit way to say good night as a farewell',
    context: 'Informal/Family'
  },
  {
    id: 'gn-4',
    filipino: 'Magandang gabi, matulog na po kayo',
    english: 'Good night, please go to sleep',
    description: 'Polite form of saying good night as a farewell to elders',
    context: 'Respectful/Formal'
  },
  {
    id: 'gn-5',
    filipino: 'Matutulog na ako po',
    english: "I'm going to sleep",
    description: 'Another way to say good night when you are the one going to sleep',
    context: 'Personal announcement'
  }
];

export function GoodNightVariations() {
  const { volume, voiceType, bilingualMode } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  const speakPhrase = async (phrase: string) => {
    try {
      await elevenLabsService.speak(phrase, {
        volume,
        voiceType,
        bilingualMode: true,
      });
    } catch (error) {
      console.error('Speech failed:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-20 min-h-[80px] sm:h-24 sm:min-h-[96px] w-full flex flex-col items-center justify-center gap-1 p-3 hover:scale-105 active:scale-95 transition-all duration-200 bg-white hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 shadow-md hover:shadow-lg touch-manipulation"
          variant="outline"
        >
          <span className="text-xl sm:text-2xl">🌙</span>
          <span className="font-bold text-center leading-tight text-gray-800 text-sm sm:text-base">
            Magandang gabi po
          </span>
          <span className="text-center leading-tight text-gray-600 text-xs">
            Good night
          </span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5" />
            {bilingualMode ? 'Mga Paraan ng Pagbati sa Gabi' : 'Good Night Variations'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {GOOD_NIGHT_VARIATIONS.map((variation) => (
            <Card key={variation.id} className="border border-border/50">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        {variation.filipino}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {variation.english}
                      </p>
                    </div>
                    <Button
                      onClick={() => speakPhrase(variation.filipino)}
                      variant="ghost"
                      size="sm"
                      className="flex-shrink-0"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p><strong>{bilingualMode ? 'Kahulugan:' : 'Description:'}</strong> {variation.description}</p>
                    <p><strong>{bilingualMode ? 'Ginagamit sa:' : 'Context:'}</strong> {variation.context}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
            <p className="font-medium mb-1">
              💡 {bilingualMode ? 'Tip:' : 'Tip:'}
            </p>
            <p>
              {bilingualMode 
                ? 'Pindutin ang speaker icon sa tabi ng bawat phrase para marinig ang tamang pagbigkas.'
                : 'Tap the speaker icon next to each phrase to hear the correct pronunciation.'
              }
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
