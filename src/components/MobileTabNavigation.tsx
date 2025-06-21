
import React from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

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

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
      <div className="grid grid-cols-6 h-16">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            className={`flex flex-col items-center justify-center h-full p-1 rounded-none ${
              activeTab === tab.id 
                ? 'bg-blue-100 text-blue-600 border-t-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="text-lg mb-1">{tab.icon}</span>
            <span className="text-xs font-medium leading-tight">
              {tab.shortLabel || tab.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
