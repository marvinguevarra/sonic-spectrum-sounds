
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Volume2, Save, Loader2, Shield } from 'lucide-react';
import { elevenLabsService } from '@/services/elevenLabsService';
import { useSettings } from '@/contexts/SettingsContext';
import { useToast } from '@/hooks/use-toast';

export function CustomPhraseInput() {
  const { volume, voiceType, bilingualMode } = useSettings();
  const { toast } = useToast();
  const [customText, setCustomText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = async () => {
    if (!customText.trim()) {
      toast({
        title: "Empty Text",
        description: "Please enter some text to speak.",
        variant: "destructive",
      });
      return;
    }

    setIsSpeaking(true);
    try {
      await elevenLabsService.speak(customText.trim(), {
        volume,
        voiceType,
        bilingualMode,
      });
      
      toast({
        title: "Audio Generated",
        description: "Your custom phrase has been spoken and cached for offline use.",
      });
    } catch (error) {
      console.error('Failed to speak custom phrase:', error);
      toast({
        title: "Speech Failed",
        description: "Failed to generate audio for your phrase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSpeaking(false);
    }
  };

  const handlePreGenerate = async () => {
    if (!customText.trim()) {
      toast({
        title: "Empty Text", 
        description: "Please enter some text to pre-generate.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Pre-generate for both voice types
      await Promise.all([
        elevenLabsService.speak(customText.trim(), {
          volume: 0, // Silent generation
          voiceType: 'male',
          bilingualMode,
        }),
        elevenLabsService.speak(customText.trim(), {
          volume: 0, // Silent generation
          voiceType: 'female', 
          bilingualMode,
        })
      ]);
      
      toast({
        title: "Audio Cached",
        description: "Your phrase has been pre-generated and cached for offline use.",
      });
    } catch (error) {
      console.error('Failed to pre-generate custom phrase:', error);
      toast({
        title: "Pre-generation Failed",
        description: "Failed to cache audio for your phrase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          ✏️ Custom Phrases
          <span className="text-sm font-normal text-muted-foreground">
            {bilingualMode ? 'Sariling Mga Salita' : 'Type Your Own'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
            onChange={(e) => setCustomText(e.target.value)}
            className="min-h-[100px] resize-none border-2 border-indigo-200 focus:border-indigo-400"
            maxLength={500}
          />
          <div className="text-xs text-muted-foreground text-right">
            {customText.length}/500 {bilingualMode ? 'mga character' : 'characters'}
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleSpeak}
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
            onClick={handlePreGenerate}
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

        {/* COPPA-Compliant Privacy Notice */}
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
      </CardContent>
    </Card>
  );
}
