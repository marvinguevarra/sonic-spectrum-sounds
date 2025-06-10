
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Settings } from 'lucide-react';
import AccessibilitySettings from '@/components/AccessibilitySettings';
import { useSettings } from '@/contexts/SettingsContext';

const AppHeader = () => {
  const { bilingualMode, setBilingualMode } = useSettings();

  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground truncate">
              {bilingualMode ? 'AAC Soundboard' : 'AAC Soundboard'}
            </h1>
            <Button
              variant={bilingualMode ? "default" : "outline"}
              onClick={() => setBilingualMode(!bilingualMode)}
              className="text-sm font-medium whitespace-nowrap"
              size="sm"
            >
              {bilingualMode ? '🇵🇭' : '🇺🇸'}
            </Button>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="font-medium">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">
                  {bilingualMode ? 'Settings' : 'Settings'}
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[90vw] sm:w-[400px] max-w-[540px]">
              <SheetHeader>
                <SheetTitle>
                  {bilingualMode ? 'Mga Setting ng Accessibility' : 'Accessibility Settings'}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <AccessibilitySettings />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
