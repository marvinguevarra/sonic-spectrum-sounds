
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useSettings } from '@/contexts/SettingsContext';

interface CustomPhraseFormProps {
  customText: string;
  onTextChange: (text: string) => void;
}

export function CustomPhraseForm({ customText, onTextChange }: CustomPhraseFormProps) {
  const { bilingualMode } = useSettings();

  return (
    <div className="space-y-2">
      <label htmlFor="custom-phrase" className="text-sm font-medium">
        {bilingualMode ? 'Isulat ang inyong sariling pangungusap:' : 'Type your custom phrase:'}
      </label>
      <Textarea
        id="custom-phrase"
        placeholder={bilingualMode 
          ? 'Halimbawa: Kumusta ka? Kamusta ang inyong araw?'
          : 'Example: How are you? How was your day?'
        }
        value={customText}
        onChange={(e) => onTextChange(e.target.value)}
        className="min-h-[100px] resize-none border-2 border-indigo-200 focus:border-indigo-400"
        maxLength={500}
      />
      <div className="text-xs text-muted-foreground text-right">
        {customText.length}/500 {bilingualMode ? 'mga character' : 'characters'}
      </div>
    </div>
  );
}
