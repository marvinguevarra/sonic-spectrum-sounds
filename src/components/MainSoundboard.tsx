
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SoundboardHeader } from './SoundboardHeader';
import { PersonalPhrasesInput } from './PersonalPhrasesInput';
import { NeedsTab } from './NeedsTab';
import { FamilyTab } from './FamilyTab';
import { FoodTab } from './FoodTab';
import { FeelingsTab } from './FeelingsTab';
import { ActionsTab } from './ActionsTab';
import { MobileTabNavigation } from './MobileTabNavigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSettings } from '@/contexts/SettingsContext';

export function MainSoundboard() {
  const [respectMode, setRespectMode] = useState(true); // Default to true for Filipino language
  const [mode, setMode] = useState<'phrases' | 'freestyle'>('phrases');
  const [activeTab, setActiveTab] = useState('personal');
  const isMobile = useIsMobile();
  const { theme, darkMode } = useSettings();

  // Use seamless background for autism dark mode
  const backgroundClass = theme === 'autism' && darkMode 
    ? 'min-h-screen bg-background' 
    : 'min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50';

  return (
    <div className={`${backgroundClass} safe-area-padding`}>
      {/* Header */}
      <SoundboardHeader 
        respectMode={respectMode} 
        onRespectModeChange={setRespectMode} 
      />

      {/* Mobile Accordion Navigation */}
      <MobileTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Categories */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Desktop Tab List - Hidden on Mobile */}
        {!isMobile && (
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
        )}

        <TabsContent value="personal" className="mt-4">
          <PersonalPhrasesInput />
        </TabsContent>

        <TabsContent value="needs" className="mt-4">
          <NeedsTab 
            mode={mode} 
            onModeChange={setMode} 
            respectMode={respectMode} 
          />
        </TabsContent>

        <TabsContent value="family" className="mt-4">
          <FamilyTab 
            mode={mode} 
            onModeChange={setMode} 
            respectMode={respectMode} 
          />
        </TabsContent>

        <TabsContent value="food" className="mt-4">
          <FoodTab 
            mode={mode} 
            onModeChange={setMode} 
            respectMode={respectMode} 
          />
        </TabsContent>

        <TabsContent value="feelings" className="mt-4">
          <FeelingsTab 
            mode={mode} 
            onModeChange={setMode} 
            respectMode={respectMode} 
          />
        </TabsContent>

        <TabsContent value="actions" className="mt-4">
          <ActionsTab respectMode={respectMode} />
        </TabsContent>
      </Tabs>

      <style>{`
        .safe-area-padding {
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
        }
      `}</style>
    </div>
  );
}
