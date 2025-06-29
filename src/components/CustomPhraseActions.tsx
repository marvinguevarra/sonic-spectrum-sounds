
import React from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Save, Loader2 } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

interface CustomPhraseActionsProps {
  customText: string;
  isSpeaking: boolean;
  isGenerating: boolean;
  onSpeak: () => void;
  onPreGenerate: () => void;
}

export function CustomPhraseActions({ 
  customText, 
  isSpeaking, 
  isGenerating, 
  onSpeak, 
  onPreGenerate 
}: CustomPhraseActionsProps) {
  const { bilingualMode } = useSettings();

  return (
    <div className="flex gap-2">
      <Button 
        onClick={onSpeak}
        disabled={!customText.trim() || isSpeaking || isGenerating}
        className="flex-1 bg-green-600 hover:bg-green-700"
      >
        {isSpeaking ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Volume2 className="h-4 w-4 mr-2" />
        )}
        {isSpeaking 
          ? (bilingualMode ? 'Nagsasalita...' : 'Speaking...')
          : (bilingualMode ? 'Magsalita' : 'Speak')
        }
      </Button>
      
      <Button 
        onClick={onPreGenerate}
        disabled={!customText.trim() || isSpeaking || isGenerating}
        variant="outline"
        className="flex-1 border-indigo-300 hover:bg-indigo-50"
      >
        {isGenerating ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Save className="h-4 w-4 mr-2" />
        )}
        {isGenerating 
          ? (bilingualMode ? 'Nagi-cache...' : 'Caching...')
          : (bilingualMode ? 'I-cache' : 'Cache')
        }
      </Button>
    </div>
  );
}
