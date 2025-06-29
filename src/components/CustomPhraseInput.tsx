
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { elevenLabsService } from '@/services/elevenLabsService';
import { useSettings } from '@/contexts/SettingsContext';
import { useToast } from '@/hooks/use-toast';
import { CustomPhraseForm } from './CustomPhraseForm';
import { CustomPhraseActions } from './CustomPhraseActions';
import { PrivacyNotice } from './PrivacyNotice';
import { UsageTips } from './UsageTips';

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
        <CustomPhraseForm 
          customText={customText}
          onTextChange={setCustomText}
        />

        <CustomPhraseActions
          customText={customText}
          isSpeaking={isSpeaking}
          isGenerating={isGenerating}
          onSpeak={handleSpeak}
          onPreGenerate={handlePreGenerate}
        />

        <PrivacyNotice />

        <UsageTips />
      </CardContent>
    </Card>
  );
}
