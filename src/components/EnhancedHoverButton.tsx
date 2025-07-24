import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Phrase } from '@/types/phrase';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useAudioControls } from '@/hooks/useAudioControls';
import { cn } from '@/lib/utils';
import { Volume2, Play, Pause, Clock, Eye } from 'lucide-react';

interface EnhancedHoverButtonProps {
  phrase: Phrase;
  index?: number;
  onClick?: () => void;
  variant?: 'message' | 'speak-only';
  className?: string;
  showHoverPreview?: boolean;
}

export function EnhancedHoverButton({ 
  phrase, 
  index = 0, 
  onClick, 
  variant = 'message',
  className,
  showHoverPreview = true
}: EnhancedHoverButtonProps) {
  const { 
    settings, 
    scanningActive, 
    currentScanIndex, 
    addToMessage 
  } = useAccessibility();

  // Rate-limited audio controls
  const { playAudio, isButtonDisabled } = useAudioControls({
    phraseId: phrase.id,
    onRateLimited: () => {
      console.log('Hover interaction rate limited');
    }
  });
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dwellTimerRef = useRef<number>();
  const hoverTimerRef = useRef<number>();
  const previewTimerRef = useRef<number>();
  
  const [hoverState, setHoverState] = useState<'none' | 'light' | 'countdown' | 'locked'>('none');
  const [hoverProgress, setHoverProgress] = useState(0);
  const [isHoverPreviewActive, setIsHoverPreviewActive] = useState(false);
  const [hoverAudioPlayed, setHoverAudioPlayed] = useState(false);
  
  const isScanning = scanningActive && currentScanIndex === index;

  // Enhanced hover settings from accessibility context
  const hoverSettings = {
    dwellTime: settings.dwellTime || 1000,
    hoverPreviewDelay: settings.hoverPreviewDelay || 500,
    audioPreviewEnabled: settings.audioPreviewEnabled || false,
    progressiveHover: settings.progressiveHover || true,
    hoverLockEnabled: settings.hoverLockEnabled || false,
    reducedMotion: settings.reduceMotion || false,
  };

  // Handle scanning focus
  useEffect(() => {
    if (isScanning && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isScanning]);

  // Determine display text
  const getDisplayText = () => {
    if (settings.respectfulMode && phrase.respectful) {
      return phrase.respectful;
    }
    return phrase.filipino;
  };

  // Play audio preview on hover (rate limited)
  const playHoverAudio = useCallback(async () => {
    if (!hoverSettings.audioPreviewEnabled || hoverAudioPlayed) return;
    
    try {
      const textToSpeak = getDisplayText();
      const played = await playAudio(textToSpeak);
      
      if (played) {
        setHoverAudioPlayed(true);
      }
    } catch (error) {
      console.error('Hover audio preview failed:', error);
    }
  }, [hoverAudioPlayed, hoverSettings.audioPreviewEnabled, getDisplayText, playAudio]);

  // Main interaction handler (rate limited)
  const handleInteraction = async () => {
    // Skip if already rate limited
    if (isButtonDisabled) {
      return;
    }

    const textToSpeak = getDisplayText();
    
    if (variant === 'message') {
      addToMessage(textToSpeak);
    }
    
    // Use rate-limited audio playback
    const played = await playAudio(textToSpeak);
    
    // Audio feedback for button press (only if audio played successfully)
    if (played && settings.audioFeedback) {
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

  // Enhanced hover enter with progressive states
  const handleMouseEnter = useCallback(() => {
    if (hoverSettings.reducedMotion) {
      setHoverState('light');
    } else {
      setHoverState('light');
      
      // Start hover preview timer
      if (showHoverPreview) {
        previewTimerRef.current = window.setTimeout(() => {
          setIsHoverPreviewActive(true);
        }, hoverSettings.hoverPreviewDelay);
      }
      
      // Start progressive hover if enabled
      if (hoverSettings.progressiveHover && hoverSettings.dwellTime > 0) {
        let startTime = Date.now();
        
        const updateProgress = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / hoverSettings.dwellTime, 1);
          
          setHoverProgress(progress);
          
          if (progress < 0.3) {
            setHoverState('light');
          } else if (progress < 0.8) {
            setHoverState('countdown');
            
            // Play audio preview at midpoint
            if (progress > 0.5 && !hoverAudioPlayed) {
              playHoverAudio();
            }
          } else if (progress >= 1) {
            setHoverState('locked');
            handleInteraction();
            return;
          }
          
          hoverTimerRef.current = requestAnimationFrame(updateProgress);
        };
        
        hoverTimerRef.current = requestAnimationFrame(updateProgress);
      } else if (hoverSettings.dwellTime > 0) {
        // Simple dwell time
        dwellTimerRef.current = window.setTimeout(() => {
          handleInteraction();
        }, hoverSettings.dwellTime);
      }
    }
  }, [hoverSettings, showHoverPreview, playHoverAudio, handleInteraction, hoverAudioPlayed]);

  // Enhanced hover leave
  const handleMouseLeave = useCallback(() => {
    setHoverState('none');
    setHoverProgress(0);
    setIsHoverPreviewActive(false);
    setHoverAudioPlayed(false);
    
    if (dwellTimerRef.current) {
      clearTimeout(dwellTimerRef.current);
    }
    if (hoverTimerRef.current) {
      cancelAnimationFrame(hoverTimerRef.current);
    }
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
    }
  }, []);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (dwellTimerRef.current) clearTimeout(dwellTimerRef.current);
      if (hoverTimerRef.current) cancelAnimationFrame(hoverTimerRef.current);
      if (previewTimerRef.current) clearTimeout(previewTimerRef.current);
    };
  }, []);

  const displayText = getDisplayText();

  // Hover preview content
  const HoverPreviewContent = () => (
    <div className="space-y-3 max-w-xs">
      {/* Large text display */}
      <div className="text-center space-y-2">
        {phrase.emoji && (
          <div className="text-4xl">{phrase.emoji}</div>
        )}
        <div className="text-lg font-semibold">{displayText}</div>
        {settings.bilingualMode && (
          <div className="text-sm text-muted-foreground">{phrase.english}</div>
        )}
      </div>
      
      {/* Pronunciation guide */}
      <div className="text-xs text-muted-foreground text-center">
        Category: {phrase.category}
      </div>
      
      {/* Audio controls */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Volume2 className="w-3 h-3" />
        <span>Hover to preview audio</span>
      </div>
      
      {/* Action hint */}
      <div className="text-xs text-center text-muted-foreground">
        {variant === 'message' ? 'Click to add to message' : 'Click to speak'}
      </div>
    </div>
  );

  // Button with enhanced hover states
  const ButtonComponent = (
    <Button
      ref={buttonRef}
      onClick={handleInteraction}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative h-auto min-h-[var(--button-size)] w-full flex flex-col items-center justify-center gap-2 p-4",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        
        // Progressive hover states
        hoverState === 'light' && "bg-accent/50 scale-[1.02]",
        hoverState === 'countdown' && "bg-accent scale-[1.05] shadow-lg",
        hoverState === 'locked' && "bg-primary/20 scale-[1.08] shadow-xl",
        
        // Scanning highlight
        isScanning && "ring-4 ring-primary ring-offset-2 bg-primary/20",
        
        // High contrast mode
        settings.highContrast && "border-2 border-foreground",
        
        // Button size adjustments
        settings.buttonSize === 'small' && "text-sm gap-1 p-2",
        settings.buttonSize === 'large' && "text-lg gap-3 p-6",
        settings.buttonSize === 'extra-large' && "text-xl gap-4 p-8",
        
        // Reduced motion
        hoverSettings.reducedMotion && "transition-none",
        
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
      {/* Progress indicator for dwell time */}
      {hoverState === 'countdown' && !hoverSettings.reducedMotion && (
        <div 
          className="absolute inset-0 bg-primary/20 rounded-md transition-all duration-100"
          style={{ 
            clipPath: `inset(0 ${100 - (hoverProgress * 100)}% 0 0)` 
          }}
        />
      )}
      
      {/* Emoji/Icon */}
      {phrase.emoji && (
        <span 
          className={cn(
            "text-2xl transition-all duration-200",
            settings.buttonSize === 'small' && "text-lg",
            settings.buttonSize === 'large' && "text-3xl",
            settings.buttonSize === 'extra-large' && "text-4xl",
            hoverState !== 'none' && "scale-110"
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
            "w-8 h-8 object-cover rounded transition-all duration-200",
            settings.buttonSize === 'small' && "w-6 h-6",
            settings.buttonSize === 'large' && "w-12 h-12",
            settings.buttonSize === 'extra-large' && "w-16 h-16",
            hoverState !== 'none' && "scale-110"
          )}
          aria-hidden="true"
        />
      )}
      
      {/* Primary text */}
      <span 
        className={cn(
          "font-semibold text-center break-words leading-tight transition-all duration-200",
          settings.fontSize === 'small' && "text-xs",
          settings.fontSize === 'large' && "text-lg",
          settings.fontSize === 'extra-large' && "text-xl",
          hoverState === 'countdown' && "font-bold"
        )}
      >
        {displayText}
      </span>
      
      {/* English translation */}
      {settings.bilingualMode && (
        <span 
          className={cn(
            "text-muted-foreground text-center break-words leading-tight transition-all duration-200",
            settings.fontSize === 'small' && "text-xs",
            settings.fontSize === 'medium' && "text-sm",
            settings.fontSize === 'large' && "text-base",
            settings.fontSize === 'extra-large' && "text-lg"
          )}
        >
          {phrase.english}
        </span>
      )}
      
      {/* Audio preview indicator */}
      {hoverAudioPlayed && (
        <div className="absolute top-2 right-2">
          <Volume2 className="w-3 h-3 text-primary" />
        </div>
      )}
      
      {/* Scanning indicator */}
      {isScanning && (
        <div className="absolute inset-0 border-4 border-primary rounded-md animate-pulse" />
      )}
      
      {/* Hover lock indicator */}
      {hoverState === 'locked' && (
        <div className="absolute bottom-2 right-2">
          <Eye className="w-4 h-4 text-primary" />
        </div>
      )}
    </Button>
  );

  // Wrap with hover preview if enabled
  if (showHoverPreview && !settings.reduceMotion) {
    return (
      <TooltipProvider delayDuration={hoverSettings.hoverPreviewDelay}>
        <HoverCard openDelay={hoverSettings.hoverPreviewDelay}>
          <HoverCardTrigger asChild>
            <Tooltip>
              <TooltipTrigger asChild>
                {ButtonComponent}
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {displayText}
              </TooltipContent>
            </Tooltip>
          </HoverCardTrigger>
          <HoverCardContent 
            side="top" 
            className="w-auto"
          >
            <HoverPreviewContent />
          </HoverCardContent>
        </HoverCard>
      </TooltipProvider>
    );
  }

  return ButtonComponent;
}