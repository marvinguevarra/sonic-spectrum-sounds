
export interface SpeechOptions {
  volume: number;
  voiceType: 'male' | 'female';
  bilingualMode: boolean;
}

class SpeechService {
  private getOptimalFilipineVoice(voiceType: 'male' | 'female'): SpeechSynthesisVoice | null {
    const voices = speechSynthesis.getVoices();
    
    // Try to find the best Filipino voice
    const filipinoVoices = voices.filter(voice => {
      const lang = voice.lang.toLowerCase();
      return lang.includes('fil') || 
             lang.includes('tl') || 
             lang.includes('ph') ||
             voice.name.toLowerCase().includes('filipino') ||
             voice.name.toLowerCase().includes('tagalog');
    });

    if (filipinoVoices.length > 0) {
      // Prefer female/male based on preference
      const preferredVoice = filipinoVoices.find(voice => 
        voice.name.toLowerCase().includes(voiceType)
      );
      return preferredVoice || filipinoVoices[0];
    }

    // Fallback to high-quality English voices that might handle Filipino better
    const qualityEnglishVoices = voices.filter(voice => {
      const name = voice.name.toLowerCase();
      return voice.lang.includes('en') && (
        name.includes('enhanced') ||
        name.includes('premium') ||
        name.includes('neural') ||
        name.includes('natural')
      );
    });

    if (qualityEnglishVoices.length > 0) {
      const preferredVoice = qualityEnglishVoices.find(voice => 
        voice.name.toLowerCase().includes(voiceType)
      );
      return preferredVoice || qualityEnglishVoices[0];
    }

    // Final fallback
    return voices.find(voice => 
      voice.lang.includes('en') && 
      voice.name.toLowerCase().includes(voiceType)
    ) || voices.find(voice => voice.lang.includes('en')) || null;
  }

  async speak(text: string, options: SpeechOptions): Promise<void> {
    if (!('speechSynthesis' in window) || !text.trim()) {
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Optimize settings for Filipino speech
      utterance.rate = options.bilingualMode ? 0.7 : 0.8; // Slower for Filipino
      utterance.pitch = options.bilingualMode ? 1.1 : 1.0; // Slightly higher pitch for Filipino
      utterance.volume = options.volume / 100;

      if (options.bilingualMode) {
        const filipinoVoice = this.getOptimalFilipineVoice(options.voiceType);
        if (filipinoVoice) {
          utterance.voice = filipinoVoice;
          // Set language explicitly for better pronunciation
          utterance.lang = filipinoVoice.lang;
        }
      } else {
        const englishVoice = this.getOptimalFilipineVoice(options.voiceType);
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
      }

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(event.error);

      speechSynthesis.speak(utterance);
    });
  }

  // Preload voices (call this on app init)
  async loadVoices(): Promise<void> {
    return new Promise((resolve) => {
      if (speechSynthesis.getVoices().length > 0) {
        resolve();
        return;
      }

      const loadVoices = () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
        resolve();
      };

      speechSynthesis.addEventListener('voiceschanged', loadVoices);
    });
  }
}

export const speechService = new SpeechService();
