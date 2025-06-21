
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SoundButton } from './SoundButton';
import { AspectSelector } from './AspectSelector';
import { SentenceBuilder } from './SentenceBuilder';
import { PersonalPhrasesTab } from './PersonalPhrasesTab';
import { 
  BASIC_NEEDS, 
  FAMILY_TERMS, 
  COMMON_FOODS, 
  POLITE_PHRASES,
  COMMON_VERBS 
} from '@/data/phrases';

export function MainSoundboard() {
  const [respectMode, setRespectMode] = useState(false);
  const [currentAspect, setCurrentAspect] = useState<'completed' | 'ongoing' | 'contemplated'>('ongoing');

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-2xl font-bold text-primary">
              🇵🇭 AAC Soundboard - Filipino
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Switch
                id="respect-mode"
                checked={respectMode}
                onCheckedChange={setRespectMode}
              />
              <Label htmlFor="respect-mode" className="text-sm font-medium">
                Po/Opo Mode
              </Label>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Sentence Builder */}
      <SentenceBuilder />

      {/* Categories */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-6 w-full h-auto p-1">
          <TabsTrigger value="personal" className="text-xs sm:text-sm">
            ⭐ Personal
          </TabsTrigger>
          <TabsTrigger value="needs" className="text-xs sm:text-sm">
            🍽️ Pangangailangan
          </TabsTrigger>
          <TabsTrigger value="family" className="text-xs sm:text-sm">
            👨‍👩‍👧‍👦 Pamilya
          </TabsTrigger>
          <TabsTrigger value="food" className="text-xs sm:text-sm">
            🍚 Pagkain
          </TabsTrigger>
          <TabsTrigger value="polite" className="text-xs sm:text-sm">
            🙏 Magalang
          </TabsTrigger>
          <TabsTrigger value="verbs" className="text-xs sm:text-sm">
            ⚡ Aksyon
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-4">
          <PersonalPhrasesTab />
        </TabsContent>

        <TabsContent value="needs" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {BASIC_NEEDS.map(phrase => (
                  <SoundButton key={phrase.id} phrase={phrase} respectMode={respectMode} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="family" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {FAMILY_TERMS.map(phrase => (
                  <SoundButton key={phrase.id} phrase={phrase} respectMode={respectMode} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="food" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {COMMON_FOODS.map(phrase => (
                  <SoundButton key={phrase.id} phrase={phrase} respectMode={respectMode} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="polite" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {POLITE_PHRASES.map(phrase => (
                  <SoundButton key={phrase.id} phrase={phrase} respectMode={respectMode} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verbs" className="mt-4 space-y-4">
          <Card>
            <CardContent className="p-4">
              <AspectSelector 
                currentAspect={currentAspect} 
                onAspectChange={setCurrentAspect} 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {COMMON_VERBS.map((verb, index) => {
                  const phrase = {
                    id: `verb-${index}`,
                    filipino: verb.aspects[currentAspect].filipino,
                    english: verb.aspects[currentAspect].english,
                    category: 'verbs',
                    emoji: verb.root === 'kain' ? '🍽️' : verb.root === 'inom' ? '💧' : '😴'
                  };
                  return (
                    <SoundButton key={phrase.id} phrase={phrase} respectMode={false} />
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
