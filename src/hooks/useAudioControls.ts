import { useState, useEffect, useCallback } from 'react';
import { audioManager, AudioState, RateLimitSettings } from '@/services/audioManager';
import { elevenLabsService } from '@/services/elevenLabsService';
import { useSettings } from '@/contexts/SettingsContext';

export interface AudioControlsOptions {
  phraseId?: string;
  onPlayStart?: () => void;
  onPlayEnd?: () => void;
  onRateLimited?: () => void;
}

export function useAudioControls(options: AudioControlsOptions = {}) {
  const { phraseId, onPlayStart, onPlayEnd, onRateLimited } = options;
  const { 
    volume, 
    voiceType, 
    rateLimitEnabled, 
    rateLimitInterval, 
    maxQueueSize 
  } = useSettings();
  const [audioState, setAudioState] = useState<AudioState>(audioManager.getState());
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Subscribe to audio manager state changes
  useEffect(() => {
    const unsubscribe = audioManager.subscribe(setAudioState);
    return unsubscribe;
  }, []);

  // Sync rate limit settings with audio manager
  useEffect(() => {
    audioManager.updateRateLimit({
      enabled: rateLimitEnabled,
      minInterval: rateLimitInterval,
      maxQueueSize: maxQueueSize
    });
  }, [rateLimitEnabled, rateLimitInterval, maxQueueSize]);

  // Check if this specific phrase is rate limited
  const isCurrentlyRateLimited = useCallback(() => {
    return audioManager.isRateLimited(phraseId);
  }, [phraseId]);

  // Play audio with rate limiting
  const playAudio = useCallback(async (text: string): Promise<boolean> => {
    const playFunction = async () => {
      onPlayStart?.();
      try {
        await elevenLabsService.speak(text, {
          volume: volume / 100,
          voiceType,
          bilingualMode: true,
        });
        onPlayEnd?.();
      } catch (error) {
        console.error('Speech failed:', error);
        onPlayEnd?.();
        throw error;
      }
    };

    const played = await audioManager.requestPlay(phraseId || text, playFunction);
    
    if (!played) {
      onRateLimited?.();
      // Temporarily disable button to show feedback
      setIsButtonDisabled(true);
      setTimeout(() => setIsButtonDisabled(false), 300);
    }
    
    return played;
  }, [phraseId, volume, voiceType, onPlayStart, onPlayEnd, onRateLimited]);

  // Stop current audio
  const stopAudio = useCallback(() => {
    audioManager.stopCurrent();
  }, []);

  // Clear audio queue
  const clearQueue = useCallback(() => {
    audioManager.clearQueue();
  }, []);

  // Get rate limit settings
  const getRateLimit = useCallback(() => {
    return audioManager.getRateLimit();
  }, []);

  // Update rate limit settings
  const updateRateLimit = useCallback((settings: Partial<RateLimitSettings>) => {
    audioManager.updateRateLimit(settings);
  }, []);

  // Check if this phrase is currently playing
  const isCurrentlyPlaying = audioState.isPlaying && audioState.currentPhrase === phraseId;
  
  // Check if this phrase is in queue
  const isInQueue = phraseId ? audioState.queue.includes(phraseId) : false;
  
  // Time until next play is allowed
  const timeUntilNextPlay = audioManager.getTimeUntilNextPlay();

  return {
    // State
    audioState,
    isCurrentlyPlaying,
    isInQueue,
    isButtonDisabled: isButtonDisabled || isCurrentlyRateLimited(),
    timeUntilNextPlay,
    
    // Actions
    playAudio,
    stopAudio,
    clearQueue,
    
    // Rate limiting
    getRateLimit,
    updateRateLimit,
    isRateLimited: isCurrentlyRateLimited,
  };
}