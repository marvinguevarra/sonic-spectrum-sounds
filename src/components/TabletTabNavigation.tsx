
import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useResponsive } from '@/hooks/use-responsive';

interface TabletTabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface TabConfig {
  id: string;
  label: string;
  icon: string;
}

const tabs: TabConfig[] = [
  { id: 'personal', label: 'Personal', icon: '⭐' },
  { id: 'needs', label: 'Pangangailangan', icon: '🍽️' },
  { id: 'family', label: 'Pamilya', icon: '👨‍👩‍👧‍👦' },
  { id: 'food', label: 'Pagkain', icon: '🍚' },
  { id: 'feelings', label: 'Damdamin', icon: '😊' },
  { id: 'actions', label: 'Aksyon', icon: '⚡' },
];

export function TabletTabNavigation({ activeTab, onTabChange }: TabletTabNavigationProps) {
  const { isTablet, getTextSize } = useResponsive();

  if (!isTablet) {
    return null; // Only show on tablets
  }

  const textSize = getTextSize({
    mobile: 'text-sm',
    tablet: 'text-sm',
    desktop: 'text-sm'
  });

  return (
    <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b mb-4">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-1 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors whitespace-nowrap ${textSize} font-medium ${
                activeTab === tab.id 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
