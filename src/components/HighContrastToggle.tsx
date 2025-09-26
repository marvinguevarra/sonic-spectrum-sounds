import React from 'react';
import { Button } from '@/components/ui/button';
import { Monitor, Eye } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';

export function HighContrastToggle() {
  const { settings, updateSetting } = useAccessibility();

  const toggleHighContrast = () => {
    updateSetting('highContrast', !settings.highContrast);
    
    // Apply high contrast class to document
    if (!settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
      document.documentElement.classList.add('keyboard-focus');
    } else {
      document.documentElement.classList.remove('high-contrast');
      document.documentElement.classList.remove('keyboard-focus');
    }
  };

  // Apply class on component mount if setting is already enabled
  React.useEffect(() => {
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
      document.documentElement.classList.add('keyboard-focus');
    } else {
      document.documentElement.classList.remove('high-contrast');
      document.documentElement.classList.remove('keyboard-focus');
    }
  }, [settings.highContrast]);

  return (
    <Button
      onClick={toggleHighContrast}
      variant={settings.highContrast ? 'default' : 'outline'}
      size="sm"
      className={cn(
        "flex items-center gap-2 transition-all",
        settings.highContrast && "bg-primary text-primary-foreground"
      )}
      aria-label={
        settings.bilingualMode 
          ? `${settings.highContrast ? 'Disable' : 'Enable'} high contrast mode • ${settings.highContrast ? 'I-disable' : 'I-enable'} ang high contrast`
          : `${settings.highContrast ? 'Disable' : 'Enable'} high contrast mode`
      }
      title="Toggle high contrast mode for better visibility"
    >
      {settings.highContrast ? (
        <Eye className="h-4 w-4" />
      ) : (
        <Monitor className="h-4 w-4" />
      )}
      <span className="hidden sm:inline">
        {settings.bilingualMode 
          ? (settings.highContrast ? 'High Contrast • Mataas na Contrast' : 'Normal • Normal')
          : (settings.highContrast ? 'High Contrast' : 'Normal View')
        }
      </span>
    </Button>
  );
}