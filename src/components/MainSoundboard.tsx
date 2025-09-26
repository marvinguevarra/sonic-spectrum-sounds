import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { KeyboardNavigationGrid } from '@/components/KeyboardNavigationGrid';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { categories } from '@/data/aac-categories';
import { phrases } from '@/data/aac-phrases';
import { cn } from '@/lib/utils';

export function MainSoundboard() {
  const { settings } = useAccessibility();
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id);
  
  return (
    <Card className="p-6">
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        {/* Category Navigation */}
        <nav 
          role="navigation" 
          aria-label={settings.bilingualMode ? "Phrase categories • Mga kategorya ng salita" : "Phrase categories"}
        >
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 h-auto p-2 bg-muted/20">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 h-auto min-h-[64px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
                  settings.highContrast && "focus-visible:ring-yellow-400"
                )}
                aria-label={`${category.name}${settings.bilingualMode && category.nameFilipino ? ` • ${category.nameFilipino}` : ''}`}
              >
                <span className="text-2xl" aria-hidden="true">{category.emoji}</span>
                <div className="text-xs text-center leading-tight">
                  <div>{category.name}</div>
                  {settings.bilingualMode && category.nameFilipino && (
                    <div lang="fil" className="text-muted-foreground">
                      {category.nameFilipino}
                    </div>
                  )}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </nav>

        {/* Phrase Buttons Grid */}
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <KeyboardNavigationGrid
              phrases={phrases.filter(phrase => phrase.category === category.id)}
              aria-label={`${category.name} phrases${settings.bilingualMode && category.nameFilipino ? ` • ${category.nameFilipino}` : ''}`}
            />
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Live Region for Screen Reader Announcements */}
      <div 
        id="aac-live-region"
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      />
    </Card>
  );
}