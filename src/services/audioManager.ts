export interface AudioState {
  isPlaying: boolean;
  currentPhrase: string | null;
  queue: string[];
  lastPlayTime: number;
}

export interface RateLimitSettings {
  minInterval: number; // minimum ms between audio plays
  maxQueueSize: number; // maximum queued items
  enabled: boolean;
}

class AudioManager {
  private state: AudioState = {
    isPlaying: false,
    currentPhrase: null,
    queue: [],
    lastPlayTime: 0,
  };

  private rateLimitSettings: RateLimitSettings = {
    minInterval: 500, // 500ms default
    maxQueueSize: 3,
    enabled: true,
  };

  private listeners: Set<(state: AudioState) => void> = new Set();
  private currentAudio: HTMLAudioElement | null = null;

  subscribe(listener: (state: AudioState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach(listener => listener({ ...this.state }));
  }

  updateRateLimit(settings: Partial<RateLimitSettings>): void {
    this.rateLimitSettings = { ...this.rateLimitSettings, ...settings };
  }

  getRateLimit(): RateLimitSettings {
    return { ...this.rateLimitSettings };
  }

  getState(): AudioState {
    return { ...this.state };
  }

  canPlay(phraseId?: string): boolean {
    if (!this.rateLimitSettings.enabled) return true;
    
    const now = Date.now();
    const timeSinceLastPlay = now - this.state.lastPlayTime;
    
    // If same phrase is already playing, deny
    if (this.state.isPlaying && this.state.currentPhrase === phraseId) {
      return false;
    }
    
    // Check minimum interval
    if (timeSinceLastPlay < this.rateLimitSettings.minInterval) {
      return false;
    }
    
    return true;
  }

  async requestPlay(phraseId: string, playFunction: () => Promise<void>): Promise<boolean> {
    // Check if we can play immediately
    if (this.canPlay(phraseId)) {
      return this.executePlay(phraseId, playFunction);
    }

    // If rate limited and queue is full, reject
    if (this.state.queue.length >= this.rateLimitSettings.maxQueueSize) {
      console.warn('Audio queue is full, rejecting play request');
      return false;
    }

    // Add to queue if not already there
    if (!this.state.queue.includes(phraseId)) {
      this.state.queue.push(phraseId);
      this.notify();
    }

    return false; // Queued, not played immediately
  }

  private async executePlay(phraseId: string, playFunction: () => Promise<void>): Promise<boolean> {
    try {
      this.stopCurrent();
      
      this.state.isPlaying = true;
      this.state.currentPhrase = phraseId;
      this.state.lastPlayTime = Date.now();
      this.notify();

      await playFunction();
      
      this.state.isPlaying = false;
      this.state.currentPhrase = null;
      this.notify();
      
      // Process queue after a short delay
      setTimeout(() => this.processQueue(), 100);
      
      return true;
    } catch (error) {
      console.error('Audio play failed:', error);
      this.state.isPlaying = false;
      this.state.currentPhrase = null;
      this.notify();
      return false;
    }
  }

  private async processQueue(): Promise<void> {
    if (this.state.queue.length === 0 || this.state.isPlaying) return;
    
    const nextPhraseId = this.state.queue.shift();
    if (nextPhraseId) {
      this.notify();
      // Queue processing would need the play function to be re-provided
      // For now, we just clear the queue item
    }
  }

  stopCurrent(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }

    // Cancel any ongoing speech synthesis
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }

    this.state.isPlaying = false;
    this.state.currentPhrase = null;
    this.notify();
  }

  clearQueue(): void {
    this.state.queue = [];
    this.notify();
  }

  setCurrentAudio(audio: HTMLAudioElement): void {
    this.currentAudio = audio;
  }

  isRateLimited(phraseId?: string): boolean {
    return !this.canPlay(phraseId);
  }

  getTimeUntilNextPlay(): number {
    if (!this.rateLimitSettings.enabled) return 0;
    
    const now = Date.now();
    const timeSinceLastPlay = now - this.state.lastPlayTime;
    const remaining = this.rateLimitSettings.minInterval - timeSinceLastPlay;
    
    return Math.max(0, remaining);
  }
}

export const audioManager = new AudioManager();