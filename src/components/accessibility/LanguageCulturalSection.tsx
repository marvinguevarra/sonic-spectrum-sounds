
import React from 'react';
import { Card } from '@/components/ui/card';
import { useSettings } from '@/contexts/SettingsContext';

export function LanguageCulturalSection() {
  const { bilingualMode } = useSettings();

  return (
    <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
      <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">
        {bilingualMode ? '🇵🇭 Wika at Kultura' : '🇺🇸 Language & Culture'}
      </h3>
      <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
        {bilingualMode 
          ? 'Ang app ay naka-set sa Filipino-first para sa mga batang Pilipino na may autism.'
          : 'App is set to Filipino-first for Filipino children with autism.'
        }
      </p>
      <div className="text-xs text-blue-600 dark:text-blue-400">
        {bilingualMode ? 'Bilingual Mode: Naka-ON' : 'Bilingual Mode: ON'}
      </div>
    </Card>
  );
}
