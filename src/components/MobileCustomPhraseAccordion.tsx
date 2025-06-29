
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CustomPhraseInput } from './CustomPhraseInput';
import { useSettings } from '@/contexts/SettingsContext';

export function MobileCustomPhraseAccordion() {
  const { bilingualMode } = useSettings();

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="custom-phrases" className="border-2 border-indigo-200 rounded-lg">
        <AccordionTrigger className="text-lg font-semibold px-4 hover:bg-indigo-50">
          ✏️ {bilingualMode ? 'Sariling Mga Salita' : 'Custom Phrases'}
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <CustomPhraseInput />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
