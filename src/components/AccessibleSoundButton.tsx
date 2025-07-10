import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phrase } from '@/types/phrase';
import { elevenLabsService } from '@/services/elevenLabsService';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';

interface AccessibleSoundButtonProps {
  phrase: Phrase;
  index?: number;
  onClick?: () => void;
  variant?: 'message' | 'speak-only';
  className?: string;
}

export function AccessibleSoundButton({ 
  phrase, 
  index = 0, 
  onClick, 
  variant = 'message',
  className 
}: AccessibleSoundButtonProps) {
  const { 
    settings, 
    scanningActive, 
    currentScanIndex, 
    addToMessage 
  } = useAccessibility();
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dwellTimerRef = useRef<NodeJS.Timeout>();
  const isScanning = scanningActive && currentScanIndex === index;

  // Handle scanning focus
  useEffect(() => {
    if (isScanning && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isScanning]);

  // Determine which text to use based on respectful mode and context
  const getDisplayText = () => {
    // For respectful contexts, always use respectful form if available
    if (settings.respectfulMode && phrase.respectful) {
      return phrase.respectful;
    }
    return phrase.filipino;
  };

  // Handle button interaction
  const handleInteraction = async () => {
    const textToSpeak = getDisplayText();
    
    // Add to message queue if in message mode
    if (variant === 'message') {
      addToMessage(textToSpeak);
    }
    
    // Always speak the phrase immediately
    try {
      // Map accessibility voice types to service voice types
      const voiceType = settings.voiceType === 'adult-male' || settings.voiceType === 'default' ? 'male' : 'female';
      
      await elevenLabsService.speak(textToSpeak, {
        volume: settings.speechVolume * 100, // Convert to 0-100 range
        voiceType,
        bilingualMode: settings.bilingualMode,
      });
    } catch (error) {
      console.error('Speech failed:', error);
      
      // Fallback to browser speech synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = settings.speechRate;
        utterance.volume = settings.speechVolume;
        speechSynthesis.speak(utterance);
      }
    }
    
    // Audio feedback for button press
    if (settings.audioFeedback) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1 * settings.speechVolume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    onClick?.();
  };

  // Handle dwell time for motor accessibility
  const handleMouseEnter = () => {
    if (settings.dwellTime > 0) {
      dwellTimerRef.current = setTimeout(() => {
        handleInteraction();
      }, settings.dwellTime);
    }
  };

  const handleMouseLeave = () => {
    if (dwellTimerRef.current) {
      clearTimeout(dwellTimerRef.current);
    }
  };

  // Cleanup dwell timer
  useEffect(() => {
    return () => {
      if (dwellTimerRef.current) {
        clearTimeout(dwellTimerRef.current);
      }
    };
  }, []);

  const displayText = getDisplayText();

  return (
    <Button
      ref={buttonRef}
      onClick={handleInteraction}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative h-auto min-h-[var(--button-size)] w-full flex flex-col items-center justify-center gap-2 p-4",
        "hover:scale-105 transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        // Scanning highlight
        isScanning && "ring-4 ring-primary ring-offset-2 bg-primary/20",
        // High contrast mode
        settings.highContrast && "border-2 border-foreground",
        // Button size adjustments
        settings.buttonSize === 'small' && "text-sm gap-1 p-2",
        settings.buttonSize === 'large' && "text-lg gap-3 p-6",
        settings.buttonSize === 'extra-large' && "text-xl gap-4 p-8",
        className
      )}
      variant="outline"
      aria-label={`
        ${displayText}. 
        ${phrase.english}. 
        ${variant === 'message' ? 'Add to message' : 'Speak only'}
      `}
      aria-pressed={isScanning}
    >
      {/* Emoji/Icon */}
      {phrase.emoji && (
        <span 
          className={cn(
            "text-2xl",
            settings.buttonSize === 'small' && "text-lg",
            settings.buttonSize === 'large' && "text-3xl",
            settings.buttonSize === 'extra-large' && "text-4xl"
          )}
          aria-hidden="true"
        >
          {phrase.emoji}
        </span>
      )}
      
      {/* Image if available */}
      {phrase.image && !phrase.emoji && (
        <img 
          src={phrase.image} 
          alt=""
          className={cn(
            "w-8 h-8 object-cover rounded",
            settings.buttonSize === 'small' && "w-6 h-6",
            settings.buttonSize === 'large' && "w-12 h-12",
            settings.buttonSize === 'extra-large' && "w-16 h-16"
          )}
          aria-hidden="true"
        />
      )}
      
      {/* Primary text (Filipino/Respectful) */}
      <span 
        className={cn(
          "font-semibold text-center break-words leading-tight",
          settings.fontSize === 'small' && "text-xs",
          settings.fontSize === 'large' && "text-lg",
          settings.fontSize === 'extra-large' && "text-xl"
        )}
      >
        {displayText}
      </span>
      
      {/* English translation */}
      {settings.bilingualMode && (
        <span 
          className={cn(
            "text-muted-foreground text-center break-words leading-tight",
            settings.fontSize === 'small' && "text-xs",
            settings.fontSize === 'medium' && "text-sm",
            settings.fontSize === 'large' && "text-base",
            settings.fontSize === 'extra-large' && "text-lg"
          )}
        >
          {phrase.english}
        </span>
      )}
      
      {/* Scanning indicator */}
      {isScanning && (
        <div className="absolute inset-0 border-4 border-primary rounded-md animate-pulse" />
      )}
    </Button>
  );
}