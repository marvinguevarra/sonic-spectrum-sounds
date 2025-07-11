
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/contexts/SettingsContext';

export function LanguageCulturalSection() {
  const { bilingualMode, setBilingualMode } = useSettings();

  const handleLanguageSelect = (language: 'filipino' | 'english') => {
    setBilingualMode(language === 'filipino');
  };

  return (
    <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
      <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">
        {bilingualMode ? '🇵🇭 Wika at Kultura' : '🇺🇸 Language & Culture'}
      </h3>
      <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
        {bilingualMode 
          ? 'Ginawa para sa mga Pilipino, para tulungan ang mga kababayan nating may iba\'t ibang pangangailangan sa komunikasyon'
          : 'Designed Filipino-first to support our kababayan with diverse communication journeys'
        }
      </p>
      
      <div className="space-y-3">
        <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
          {bilingualMode ? 'Pumili ng wika:' : 'Select language:'}
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Button
            variant={bilingualMode ? "default" : "outline"}
            onClick={() => handleLanguageSelect('filipino')}
            className="justify-start text-left h-auto py-3 px-4"
          >
            <div>
              <div className="font-medium">🇵🇭 Filipino</div>
              <div className="text-xs opacity-80">
                {bilingualMode ? 'Magalang na pagkakasabi (Po/Opo mode default)' : 'Respectful speech (Po/Opo mode default)'}
              </div>
            </div>
          </Button>
          <Button
            variant={!bilingualMode ? "default" : "outline"}
            onClick={() => handleLanguageSelect('english')}
            className="justify-start text-left h-auto py-3 px-4"
          >
            <div>
              <div className="font-medium">🇺🇸 English</div>
              <div className="text-xs opacity-80">
                {bilingualMode ? 'Polite mode enabled' : 'Polite mode enabled'}
              </div>
            </div>
          </Button>
        </div>
      </div>
    </Card>
  );
}
