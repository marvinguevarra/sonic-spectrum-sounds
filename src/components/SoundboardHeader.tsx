
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { UniversalToggle } from '@/components/ui/universal-toggle';
import { useResponsive } from '@/hooks/use-responsive';
import { useSettings } from '@/contexts/SettingsContext';

interface SoundboardHeaderProps {
  respectMode: boolean;
  onRespectModeChange: (checked: boolean) => void;
}

export function SoundboardHeader({ respectMode, onRespectModeChange }: SoundboardHeaderProps) {
  const { getTextSize, isMobile, isTablet } = useResponsive();
  const { bilingualMode, setBilingualMode } = useSettings();

  const titleSize = getTextSize({
    mobile: 'text-lg',
    tablet: 'text-xl',
    desktop: 'text-2xl'
  });

  const handleLanguageSelect = (language: 'filipino' | 'english') => {
    setBilingualMode(language === 'filipino');
  };

  return (
    <Card>
      <CardHeader className={isMobile ? 'p-3' : isTablet ? 'p-4' : 'p-6'}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            {/* Language Selection Accordion */}
            <Accordion type="single" collapsible className="w-[280px]">
              <AccordionItem value="language-select" className="border-none">
                <AccordionTrigger className={`hover:no-underline ${titleSize} font-bold text-primary`}>
                  {bilingualMode ? '🇵🇭 AAC Soundboard - Filipino' : '🇺🇸 AAC Soundboard - English'}
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  <div className="space-y-2">
                    <button
                      onClick={() => handleLanguageSelect('filipino')}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        bilingualMode 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      🇵🇭 AAC Soundboard - Filipino
                    </button>
                    <button
                      onClick={() => handleLanguageSelect('english')}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        !bilingualMode 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      🇺🇸 AAC Soundboard - English
                    </button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          {/* Po/Opo Mode Toggle */}
          <div className="flex items-center">
            <UniversalToggle
              id="respect-mode"
              checked={respectMode}
              onCheckedChange={onRespectModeChange}
              label={bilingualMode ? 'Po/Opo Mode' : 'Polite Mode'}
              description={bilingualMode ? 'Magalang na pagkakasabi' : 'Respectful speech'}
              size="large"
              variant="cultural"
            />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
