
import React from 'react';
import { useSettings } from '@/contexts/SettingsContext';

export function UsageTips() {
  const { bilingualMode } = useSettings();

  return (
    <div className="text-xs text-muted-foreground space-y-1 p-3 bg-blue-50 border border-blue-200 rounded-lg">
      <p>💡 {bilingualMode ? 'Mga Tip:' : 'Tips:'}</p>
      <p>• {bilingualMode 
        ? 'Pindutin ang "Magsalita" para marinig ang inyong phrase at ma-cache ito'
        : 'Click "Speak" to hear your phrase and cache it automatically'
      }</p>
      <p>• {bilingualMode 
        ? 'Pindutin ang "I-cache" para i-store ang audio para sa offline use'
        : 'Click "Cache" to store audio for offline use without playing'
      }</p>
      <p>• {bilingualMode 
        ? 'Mga naka-cache na phrases ay gagana kahit walang internet'
        : 'Cached phrases will work even when offline'
      }</p>
    </div>
  );
}
