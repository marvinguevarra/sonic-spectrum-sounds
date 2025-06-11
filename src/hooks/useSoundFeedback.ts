
import { useCallback } from 'react';

interface SoundFeedbackOptions {
  soundEnabled: boolean;
  volume: number;
}

export const useSoundFeedback = ({ soundEnabled, volume }: SoundFeedbackOptions) => {
  const playClickSound = useCallback(() => {
    if (!soundEnabled) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.value = (volume / 100) * 0.1;
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.log('Sound feedback failed:', error);
    }
  }, [soundEnabled, volume]);

  const playCelebrationSound = useCallback(() => {
    if (!soundEnabled) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create a celebratory chord sequence
      const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C octave
      
      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.value = freq;
          oscillator.type = 'triangle';
          gainNode.gain.value = (volume / 100) * 0.08;
          
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.3);
        }, index * 100);
      });
    } catch (error) {
      console.log('Celebration sound failed:', error);
    }
  }, [soundEnabled, volume]);

  return { playClickSound, playCelebrationSound };
};
