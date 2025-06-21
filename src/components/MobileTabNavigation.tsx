
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MobileTabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface TabConfig {
  id: string;
  label: string;
  icon: string;
  shortLabel?: string;
}

const tabs: TabConfig[] = [
  { id: 'personal', label: 'Personal', icon: '⭐', shortLabel: 'Personal' },
  { id: 'needs', label: 'Needs', icon: '🍽️', shortLabel: 'Needs' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', shortLabel: 'Family' },
  { id: 'food', label: 'Food', icon: '🍚', shortLabel: 'Food' },
  { id: 'feelings', label: 'Feelings', icon: '😊', shortLabel: 'Feel' },
  { id: 'actions', label: 'Actions', icon: '⚡', shortLabel: 'Actions' },
];

export function MobileTabNavigation({ activeTab, onTabChange }: MobileTabNavigationProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null; // Don't show on desktop
  }

  const activeTabConfig = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="mb-4">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="categories" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-3 hover:no-underline bg-blue-50 rounded-t-lg data-[state=open]:rounded-b-none">
            <div className="flex items-center gap-3">
              <span className="text-xl">{activeTabConfig?.icon}</span>
              <span className="font-medium text-lg">
                {activeTabConfig?.label || 'Select Category'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-2">
            <div className="grid grid-cols-2 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                  onClick={() => onTabChange(tab.id)}
                >
                  <span className="text-2xl mb-1">{tab.icon}</span>
                  <span className="text-sm font-medium text-center leading-tight">
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
