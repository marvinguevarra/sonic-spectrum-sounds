
import React from 'react';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import AppHeader from '@/components/AppHeader';
import { MainSoundboard } from '@/components/MainSoundboard';
import { MessageWindow } from '@/components/MessageWindow';
import { QuickAccessBar } from '@/components/QuickAccessBar';
import { HighContrastToggle } from '@/components/HighContrastToggle';

const Index = () => {
  return (
    <SettingsProvider>
      <AccessibilityProvider>
        <div className="min-h-screen bg-background transition-colors">
          {/* High Contrast Toggle - Top Right */}
          <div className="fixed top-4 right-4 z-50">
            <HighContrastToggle />
          </div>
          
          <AppHeader />
          <div className="container mx-auto px-4 py-6 space-y-6">
            <MessageWindow />
            <QuickAccessBar />
            <MainSoundboard />
          </div>
        </div>
      </AccessibilityProvider>
    </SettingsProvider>
  );
};

export default Index;
