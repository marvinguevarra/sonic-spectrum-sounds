import { audioCacheService } from './audioCacheService';

interface ElevenLabsOptions {
  volume: number;
  voiceType: 'male' | 'female';
  bilingualMode: boolean;
}

class ElevenLabsService {
  private apiKey = 'sk_ac9b67be981a2c329824802ea0cd888db9fcc395ffdad0d1';
  private baseUrl = 'https://api.elevenlabs.io/v1';

  // High-quality voices optimized for Filipino/Tagalog
  private getVoiceId(voiceType: 'male' | 'female'): string {
    // Using voices that handle Filipino well
    return voiceType === 'female' ? '9BWtsMINqrJLrRacOk9x' : 'onwK4e9ZLuTAKqWW03F9'; // Aria (female) or Daniel (male)
  }

  async speak(text: string, options: ElevenLabsOptions): Promise<void> {
    if (!text.trim()) return;

    console.log('ElevenLabs speaking text:', text);

    try {
      // First, try to get cached audio
      const cachedAudio = await audioCacheService.getCachedAudio(text, options.voiceType);
      
      if (cachedAudio) {
        console.log('Using cached audio for:', text);
        await this.playAudioBlob(cachedAudio, options.volume);
        return;
      }

      console.log('No cached audio found, checking online status...');

      // Check if we're online
      if (!navigator.onLine) {
        console.log('Offline and no cached audio, using web speech');
        this.fallbackToWebSpeech(text, options);
        return;
      }

      // Generate and cache new audio
      console.log('Generating new audio via ElevenLabs API...');
      const audioBlob = await this.generateAudioBlob(text, options.voiceType);
      
      // Cache for future use
      await audioCacheService.cacheAudio(text, options.voiceType, audioBlob);
      console.log('Audio cached for future use');
      
      // Play the audio
      await this.playAudioBlob(audioBlob, options.volume);
      
    } catch (error) {
      console.error('ElevenLabs speech failed:', error);
      console.log('Falling back to web speech for text:', text);
      this.fallbackToWebSpeech(text, options);
    }
  }

  private async generateAudioBlob(text: string, voiceType: 'male' | 'female'): Promise<Blob> {
    const voiceId = this.getVoiceId(voiceType);
    
    const response = await fetch(`${this.baseUrl}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': this.apiKey,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.8,
          style: 0.2,
          use_speaker_boost: true
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    return await response.blob();
  }

  private async playAudioBlob(audioBlob: Blob, volume: number): Promise<void> {
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    audio.volume = volume / 100;
    
    return new Promise((resolve, reject) => {
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        resolve();
      };
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        reject(new Error('Audio playback failed'));
      };
      
      audio.play().catch(reject);
    });
  }

  async preGenerateAllPhrases(): Promise<void> {
    // Import phrases data
    const { BASIC_NEEDS, FAMILY_TERMS, COMMON_FOODS, POLITE_PHRASES } = await import('@/data/phrases');
    
    const allTexts = [
      ...BASIC_NEEDS.flatMap(phrase => [phrase.filipino, phrase.respectful].filter(Boolean)),
      ...FAMILY_TERMS.map(phrase => phrase.filipino),
      ...COMMON_FOODS.map(phrase => phrase.filipino),
      ...POLITE_PHRASES.flatMap(phrase => [phrase.filipino, phrase.respectful].filter(Boolean)),
    ] as string[];
    
    // Remove duplicates
    const uniqueTexts = [...new Set(allTexts)];
    
    console.log(`Pre-generating audio for ${uniqueTexts.length} phrases...`);
    
    await audioCacheService.preGenerateAudio(
      uniqueTexts,
      ['male', 'female'],
      this.apiKey
    );
  }

  private fallbackToWebSpeech(text: string, options: ElevenLabsOptions): void {
    console.log('Web speech synthesis speaking text:', text);
    
    if (!('speechSynthesis' in window)) {
      console.error('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.bilingualMode ? 'fil-PH' : 'en-US';
    utterance.rate = options.bilingualMode ? 0.7 : 0.9;
    utterance.volume = options.volume / 100;
    
    // Try to find a suitable voice
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      // Look for Filipino voice first
      const filipinoVoice = voices.find(voice => 
        voice.lang.includes('fil') || voice.lang.includes('tl')
      );
      
      if (filipinoVoice) {
        utterance.voice = filipinoVoice;
      } else {
        // Fallback to any available voice
        utterance.voice = voices[0];
      }
    }

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
    };

    speechSynthesis.speak(utterance);
  }
}

export const elevenLabsService = new ElevenLabsService();
