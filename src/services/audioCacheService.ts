
interface CachedAudio {
  id: string;
  text: string;
  voiceType: 'male' | 'female';
  audioBlob: Blob;
  timestamp: number;
}

class AudioCacheService {
  private dbName = 'AAC_AudioCache';
  private dbVersion = 1;
  private storeName = 'audioFiles';
  private db: IDBDatabase | null = null;

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('text', 'text', { unique: false });
        }
      };
    });
  }

  private getCacheKey(text: string, voiceType: 'male' | 'female'): string {
    return `${text}_${voiceType}`.replace(/[^a-zA-Z0-9]/g, '_');
  }

  async getCachedAudio(text: string, voiceType: 'male' | 'female'): Promise<Blob | null> {
    if (!this.db) await this.initialize();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const key = this.getCacheKey(text, voiceType);
      
      const request = store.get(key);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result as CachedAudio | undefined;
        resolve(result ? result.audioBlob : null);
      };
    });
  }

  async cacheAudio(text: string, voiceType: 'male' | 'female', audioBlob: Blob): Promise<void> {
    if (!this.db) await this.initialize();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      const cachedAudio: CachedAudio = {
        id: this.getCacheKey(text, voiceType),
        text,
        voiceType,
        audioBlob,
        timestamp: Date.now()
      };
      
      const request = store.put(cachedAudio);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async preGenerateAudio(texts: string[], voiceTypes: ('male' | 'female')[], apiKey: string): Promise<void> {
    console.log('Starting pre-generation of audio files...');
    
    for (const text of texts) {
      for (const voiceType of voiceTypes) {
        try {
          // Check if already cached
          const cached = await this.getCachedAudio(text, voiceType);
          if (cached) {
            console.log(`Audio already cached for: ${text} (${voiceType})`);
            continue;
          }

          // Generate new audio
          console.log(`Generating audio for: ${text} (${voiceType})`);
          const audioBlob = await this.generateAudioBlob(text, voiceType, apiKey);
          await this.cacheAudio(text, voiceType, audioBlob);
          console.log(`Cached audio for: ${text} (${voiceType})`);
          
          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Failed to generate audio for "${text}" (${voiceType}):`, error);
        }
      }
    }
    
    console.log('Audio pre-generation complete!');
  }

  private async generateAudioBlob(text: string, voiceType: 'male' | 'female', apiKey: string): Promise<Blob> {
    const voiceId = voiceType === 'female' ? '9BWtsMINqrJLrRacOk9x' : 'onwK4e9ZLuTAKqWW03F9';
    
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
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

  async getCacheStats(): Promise<{ totalFiles: number; totalSize: number }> {
    if (!this.db) await this.initialize();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const results = request.result as CachedAudio[];
        const totalFiles = results.length;
        const totalSize = results.reduce((sum, item) => sum + item.audioBlob.size, 0);
        resolve({ totalFiles, totalSize });
      };
    });
  }

  async clearCache(): Promise<void> {
    if (!this.db) await this.initialize();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

export const audioCacheService = new AudioCacheService();
