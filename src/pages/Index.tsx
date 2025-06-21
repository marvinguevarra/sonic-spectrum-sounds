
import React from 'react';
import { SettingsProvider } from '@/contexts/SettingsContext';
import AppHeader from '@/components/AppHeader';
import { MainSoundboard } from '@/components/MainSoundboard';

const Index = () => {
  return (
    <SettingsProvider>
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="container mx-auto px-4 py-6">
          <MainSoundboard />
        </div>
      </div>
    </SettingsProvider>
  );
};

export default Index;
