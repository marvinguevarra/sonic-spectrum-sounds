
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SoundboardHeader } from './SoundboardHeader';
import { PersonalPhrasesInput } from './PersonalPhrasesInput';
import { SpecialButtons } from './SpecialButtons';
import { NeedsTab } from './NeedsTab';
import { FamilyTab } from './FamilyTab';
import { FoodTab } from './FoodTab';
import { FeelingsTab } from './FeelingsTab';
import { ActionsTab } from './ActionsTab';
import { MobileTabNavigation } from './MobileTabNavigation';
import { TabletTabNavigation } from './TabletTabNavigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { useResponsive } from '@/hooks/use-responsive';
import { useSettings } from '@/contexts/SettingsContext';

export function MainSoundboard() {
  const [respectMode, setRespectMode] = useState(true); // Default to true for Filipino language
  const [activeTab, setActiveTab] = useState('personal');
  const isMobile = useIsMobile();
  const { isTablet } = useResponsive();
  const { theme, darkMode } = useSettings();

  // Use seamless background for autism dark mode - no gaps
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

      {/* Special Buttons - Moved to top, above all navigation */}
      <SpecialButtons />

      {/* Mobile Accordion Navigation */}
      <MobileTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tablet Horizontal Scroll Navigation */}
      <TabletTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Categories */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Desktop Tab List - Hidden on Mobile and Tablet */}
        {!isMobile && !isTablet && (
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
          <NeedsTab respectMode={respectMode} />
        </TabsContent>

        <TabsContent value="family" className="mt-4">
          <FamilyTab respectMode={respectMode} />
        </TabsContent>

        <TabsContent value="food" className="mt-4">
          <FoodTab respectMode={respectMode} />
        </TabsContent>

        <TabsContent value="feelings" className="mt-4">
          <FeelingsTab respectMode={respectMode} />
        </TabsContent>

        <TabsContent value="actions" className="mt-4">
          <ActionsTab respectMode={respectMode} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
