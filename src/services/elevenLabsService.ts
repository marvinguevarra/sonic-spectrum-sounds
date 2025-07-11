
import { audioCacheService } from './audioCacheService';
import { audioManager } from './audioManager';

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
        // Only play if volume > 0 (for silent caching)
        if (options.volume > 0) {
          await this.playAudioBlob(cachedAudio, options.volume);
        }
        return;
      }

      console.log('No cached audio found, checking online status...');

      // Check if we're online
      if (!navigator.onLine) {
        console.log('Offline and no cached audio, using web speech');
        if (options.volume > 0) {
          this.fallbackToWebSpeech(text, options);
        }
        return;
      }

      // Generate and cache new audio
      console.log('Generating new audio via ElevenLabs API...');
      const audioBlob = await this.generateAudioBlob(text, options.voiceType);
      
      // Cache for future use
      await audioCacheService.cacheAudio(text, options.voiceType, audioBlob);
      console.log('Audio cached for future use');
      
      // Play the audio only if volume > 0
      if (options.volume > 0) {
        await this.playAudioBlob(audioBlob, options.volume);
      }
      
    } catch (error) {
      console.error('ElevenLabs speech failed:', error);
      console.log('Falling back to web speech for text:', text);
      if (options.volume > 0) {
        this.fallbackToWebSpeech(text, options);
      }
    }
  }

  async generateAndCachePhrase(text: string, voiceTypes: ('male' | 'female')[] = ['male', 'female']): Promise<void> {
    console.log('Pre-generating and caching phrase:', text);
    
    for (const voiceType of voiceTypes) {
      try {
        // Check if already cached
        const cached = await audioCacheService.getCachedAudio(text, voiceType);
        if (cached) {
          console.log(`Already cached: ${text} (${voiceType})`);
          continue;
        }

        // Generate and cache silently
        await this.speak(text, {
          volume: 0, // Silent generation
          voiceType,
          bilingualMode: true,
        });
        
        console.log(`Successfully cached: ${text} (${voiceType})`);
      } catch (error) {
        console.error(`Failed to cache ${text} (${voiceType}):`, error);
      }
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
    
    // Register with audio manager for stopping capability
    audioManager.setCurrentAudio(audio);
    
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
    
    // Add personal phrases
    const personalPhrases = [
      'Ako si', 'Taga dito ako', 'Gusto ko', 'Ayaw ko', 'Kailangan ko ng tulong',
      'Salamat sa tulong', 'Pwede ba', 'Hindi ko alam', 'Naiintindihan ko', 'Hindi ko naiintindihan'
    ];
    
    allTexts.push(...personalPhrases);
    
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
