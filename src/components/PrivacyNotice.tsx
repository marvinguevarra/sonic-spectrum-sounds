
import React from 'react';
import { Shield } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

export function PrivacyNotice() {
  const { bilingualMode } = useSettings();

  return (
    <div className="text-xs text-muted-foreground space-y-2 p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-center gap-2 font-semibold text-green-800">
        <Shield className="h-4 w-4" />
        {bilingualMode ? 'Protektadong Privacy' : 'Privacy Protected'}
      </div>
      <div className="space-y-1">
        <p>• {bilingualMode 
          ? 'Lahat ng custom phrases ay naka-store lamang sa inyong device'
          : 'All custom phrases are stored only on your device'
        }</p>
        <p>• {bilingualMode 
          ? 'Walang personal information na pinapadala sa internet'
          : 'No personal information is sent over the internet'
        }</p>
        <p>• {bilingualMode 
          ? 'Safe para sa mga bata - walang data collection'
          : 'Safe for children - no data collection'
        }</p>
      </div>
    </div>
  );
}
