
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SoundButton } from './SoundButton';
import { SentenceBuilder } from './SentenceBuilder';
import { CategorySentenceBuilder } from './CategorySentenceBuilder';
import { ModeToggle } from './ModeToggle';
import { PersonalPhrasesTab } from './PersonalPhrasesTab';
import { 
  BASIC_NEEDS, 
  FAMILY_TERMS, 
  COMMON_FOODS, 
  POLITE_PHRASES 
} from '@/data/phrases';

export function MainSoundboard() {
  const [respectMode, setRespectMode] = useState(false);
  const [mode, setMode] = useState<'phrases' | 'freestyle'>('phrases');

  // Reorganized phrases for better categorization
  const FEELINGS_PHRASES = [
    { id: 'feeling-1', filipino: 'Masaya ako', english: 'I am happy', category: 'feelings', respectful: 'Masaya po ako', emoji: '😊' },
    { id: 'feeling-2', filipino: 'Malungkot ako', english: 'I am sad', category: 'feelings', respectful: 'Malungkot po ako', emoji: '😢' },
    { id: 'feeling-3', filipino: 'Galit ako', english: 'I am angry', category: 'feelings', respectful: 'Galit po ako', emoji: '😠' },
    { id: 'feeling-4', filipino: 'Takot ako', english: 'I am scared', category: 'feelings', respectful: 'Takot po ako', emoji: '😨' },
    { id: 'feeling-5', filipino: 'Excited ako', english: 'I am excited', category: 'feelings', respectful: 'Excited po ako', emoji: '🤗' },
    { id: 'feeling-6', filipino: 'Proud ako', english: 'I am proud', category: 'feelings', respectful: 'Proud po ako', emoji: '😌' },
  ];

  const ACTIVITIES_PHRASES = [
    { id: 'activity-1', filipino: 'Maglaro', english: 'Play', category: 'activities', emoji: '🎮' },
    { id: 'activity-2', filipino: 'Magbasa', english: 'Read', category: 'activities', emoji: '📚' },
    { id: 'activity-3', filipino: 'Makinig ng musika', english: 'Listen to music', category: 'activities', emoji: '🎵' },
    { id: 'activity-4', filipino: 'Lumabas', english: 'Go outside', category: 'activities', emoji: '🌳' },
    { id: 'activity-5', filipino: 'Manood ng TV', english: 'Watch TV', category: 'activities', emoji: '📺' },
    { id: 'activity-6', filipino: 'Matulog', english: 'Sleep', category: 'activities', emoji: '🛏️' },
    { id: 'activity-7', filipino: 'Lumalangoy', english: 'Swimming', category: 'activities', emoji: '🏊' },
    { id: 'activity-8', filipino: 'Sayaw', english: 'Dancing', category: 'activities', emoji: '💃' },
    { id: 'activity-9', filipino: 'Kumanta', english: 'Singing', category: 'activities', emoji: '🎤' },
    { id: 'activity-10', filipino: 'Magkulay', english: 'Drawing', category: 'activities', emoji: '🎨' },
  ];

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
          <TabsTrigger value="feelings" className="text-xs sm:text-sm">
            😊 Damdamin
          </TabsTrigger>
          <TabsTrigger value="actions" className="text-xs sm:text-sm">
            ⚡ Aksyon
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-4">
          <PersonalPhrasesTab />
        </TabsContent>

        <TabsContent value="needs" className="mt-4 space-y-4">
          <ModeToggle mode={mode} onModeChange={setMode} />
          {mode === 'freestyle' ? (
            <CategorySentenceBuilder category="needs" />
          ) : (
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {BASIC_NEEDS.map(phrase => (
                    <SoundButton key={phrase.id} phrase={phrase} respectMode={respectMode} />
                  ))}
                  {POLITE_PHRASES.map(phrase => (
                    <SoundButton key={phrase.id} phrase={phrase} respectMode={respectMode} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="family" className="mt-4 space-y-4">
          <ModeToggle mode={mode} onModeChange={setMode} />
          {mode === 'freestyle' ? (
            <CategorySentenceBuilder category="family" />
          ) : (
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {FAMILY_TERMS.map(phrase => (
                    <SoundButton key={phrase.id} phrase={phrase} respectMode={respectMode} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="food" className="mt-4 space-y-4">
          <ModeToggle mode={mode} onModeChange={setMode} />
          {mode === 'freestyle' ? (
            <CategorySentenceBuilder category="food" />
          ) : (
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {COMMON_FOODS.map(phrase => (
                    <SoundButton key={phrase.id} phrase={phrase} respectMode={respectMode} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="feelings" className="mt-4 space-y-4">
          <ModeToggle mode={mode} onModeChange={setMode} />
          {mode === 'freestyle' ? (
            <CategorySentenceBuilder category="feelings" />
          ) : (
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {FEELINGS_PHRASES.map(phrase => (
                    <SoundButton key={phrase.id} phrase={phrase} respectMode={respectMode} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="actions" className="mt-4 space-y-4">
          <SentenceBuilder />
          
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Mga Gawain (Activities)</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {ACTIVITIES_PHRASES.map(phrase => (
                  <SoundButton key={phrase.id} phrase={phrase} respectMode={respectMode} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
