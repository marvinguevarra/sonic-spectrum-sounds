
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

    console.log('ElevenLabs speaking text:', text); // Debug log

    // Check if we're online first
    if (!navigator.onLine) {
      console.log('Offline detected, using web speech directly');
      this.fallbackToWebSpeech(text, options);
      return;
    }

    try {
      const voiceId = this.getVoiceId(options.voiceType);
      
      const response = await fetch(`${this.baseUrl}/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2', // Best for Filipino
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

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.volume = options.volume / 100;
      
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
    } catch (error) {
      console.error('ElevenLabs speech failed:', error);
      console.log('Falling back to web speech for text:', text); // Debug log
      // Fallback to browser speech
      this.fallbackToWebSpeech(text, options);
    }
  }

  private fallbackToWebSpeech(text: string, options: ElevenLabsOptions): void {
    console.log('Web speech synthesis speaking text:', text); // Debug log
    
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
