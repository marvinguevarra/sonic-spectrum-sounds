
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { SettingsProvider, useSettings } from '@/contexts/SettingsContext';
import { speechService } from '@/services/speechService';
import { categories } from '@/data/categories';
import AppHeader from '@/components/AppHeader';
import CategorySection from '@/components/CategorySection';
import SpeechOutput from '@/components/SpeechOutput';

const IndexContent = () => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const { bilingualMode } = useSettings();
  const { toast } = useToast();

  // Initialize speech service
  useEffect(() => {
    speechService.loadVoices();
  }, []);

  const handleItemClick = (item: { id: string; label: string; labelFilipino?: string; icon: string }) => {
    const wordToAdd = bilingualMode && item.labelFilipino ? item.labelFilipino : item.label;
    setSelectedWords(prev => [...prev, wordToAdd]);

    toast({
      title: bilingualMode ? "Salitang Naidagdag" : "Word Added",
      description: bilingualMode 
        ? `"${wordToAdd}" naidagdag sa pangungusap`
        : `"${wordToAdd}" added to sentence`,
      duration: 1000,
    });
  };

  const handleClear = () => {
    setSelectedWords([]);
    toast({
      title: bilingualMode ? "Nabura" : "Cleared",
      description: bilingualMode ? "Nabura ang pangungusap" : "Sentence cleared",
      duration: 1000,
    });
  };

  return (
    <div className="min-h-screen bg-background transition-all duration-300">
      <AppHeader />

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-7xl">
        {/* Speech Output */}
        <SpeechOutput 
          selectedWords={selectedWords}
          onClear={handleClear}
        />

        {/* Categories */}
        <div className="space-y-6 sm:space-y-8">
          {categories.map((category) => (
            <CategorySection
              key={category.title}
              title={category.title}
              items={category.items}
              onItemClick={handleItemClick}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 sm:mt-12 border-t border-border bg-card/30 py-4 sm:py-6">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <p className="text-sm sm:text-base text-muted-foreground">
            {bilingualMode 
              ? 'AAC Soundboard - Dinisenyo para sa accessibility at madaling gamitin'
              : 'AAC Soundboard - Designed for accessibility and ease of use'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <SettingsProvider>
      <IndexContent />
    </SettingsProvider>
  );
};

export default Index;
