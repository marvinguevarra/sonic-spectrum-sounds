
import React from 'react';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import AppHeader from '@/components/AppHeader';
import { MainSoundboard } from '@/components/MainSoundboard';
import { MessageWindow } from '@/components/MessageWindow';
import { QuickAccessBar } from '@/components/QuickAccessBar';

const Index = () => {
  return (
    <SettingsProvider>
      <AccessibilityProvider>
        <div className="min-h-screen bg-background">
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
