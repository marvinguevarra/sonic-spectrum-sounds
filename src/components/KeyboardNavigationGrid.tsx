import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AccessibleSoundButton } from '@/components/AccessibleSoundButton';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';
import { Phrase } from '@/types/phrase';

interface KeyboardNavigationGridProps {
  phrases: Phrase[];
  className?: string;
  'aria-label'?: string;
}

export function KeyboardNavigationGrid({ 
  phrases, 
  className, 
  'aria-label': ariaLabel 
}: KeyboardNavigationGridProps) {
  const { settings, scanningActive } = useAccessibility();
  const [focusedButtonIndex, setFocusedButtonIndex] = useState<number>(-1);
  const [gridDimensions, setGridDimensions] = useState({ cols: 4, rows: 0 });
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Calculate grid dimensions based on screen size
  const calculateGridDimensions = useCallback(() => {
    const screenWidth = window.innerWidth;
    let cols = 4; // Desktop default
    
    if (screenWidth < 640) cols = 2; // Mobile
    else if (screenWidth < 1024) cols = 3; // Tablet
    
    const rows = Math.ceil(phrases.length / cols);
    setGridDimensions({ cols, rows });
  }, [phrases.length]);

  useEffect(() => {
    calculateGridDimensions();
    window.addEventListener('resize', calculateGridDimensions);
    return () => window.removeEventListener('resize', calculateGridDimensions);
  }, [calculateGridDimensions]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (scanningActive) return; // Don't interfere with scanning

    const { key } = event;
    const totalButtons = phrases.length;
    
    if (totalButtons === 0) return;

    let newIndex = focusedButtonIndex;

    switch (key) {
      case 'Tab':
        // Tab moves left-to-right, top-to-bottom
        if (event.shiftKey) {
          newIndex = focusedButtonIndex <= 0 ? totalButtons - 1 : focusedButtonIndex - 1;
        } else {
          newIndex = focusedButtonIndex >= totalButtons - 1 ? 0 : focusedButtonIndex + 1;
        }
        event.preventDefault();
        break;
        
      case 'ArrowRight':
        newIndex = Math.min(focusedButtonIndex + 1, totalButtons - 1);
        if (focusedButtonIndex % gridDimensions.cols === gridDimensions.cols - 1) {
          // At right edge, wrap to next row start
          newIndex = Math.min(focusedButtonIndex + 1, totalButtons - 1);
        }
        event.preventDefault();
        break;
        
      case 'ArrowLeft':
        newIndex = Math.max(focusedButtonIndex - 1, 0);
        event.preventDefault();
        break;
        
      case 'ArrowDown':
        newIndex = Math.min(focusedButtonIndex + gridDimensions.cols, totalButtons - 1);
        event.preventDefault();
        break;
        
      case 'ArrowUp':
        newIndex = Math.max(focusedButtonIndex - gridDimensions.cols, 0);
        event.preventDefault();
        break;
        
      case 'Enter':
      case ' ':
        if (focusedButtonIndex >= 0) {
          const buttonElement = gridRef.current?.children[focusedButtonIndex]?.children[0] as HTMLElement;
          buttonElement?.click();
          event.preventDefault();
        }
        break;
        
      case 'Escape':
        setFocusedButtonIndex(-1);
        event.preventDefault();
        break;
        
      default:
        return;
    }

    if (newIndex !== focusedButtonIndex && newIndex >= 0 && newIndex < totalButtons) {
      setFocusedButtonIndex(newIndex);
    }
  }, [focusedButtonIndex, gridDimensions, phrases.length, scanningActive]);

  // Focus the button element when focusedButtonIndex changes
  useEffect(() => {
    if (focusedButtonIndex >= 0 && gridRef.current) {
      const buttonElement = gridRef.current.children[focusedButtonIndex]?.children[0] as HTMLElement;
      buttonElement?.focus();
    }
  }, [focusedButtonIndex]);

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (phrases.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {settings.bilingualMode 
          ? 'No phrases available • Walang available na mga salita'
          : 'No phrases available'
        }
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className={cn(
        "grid gap-2 auto-rows-fr",
        "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4", // Responsive: 2 mobile, 3 tablet, 4 desktop
        "[&>*]:min-h-[48px]", // Minimum 48px height for accessibility
        className
      )}
      role="grid"
      aria-label={ariaLabel}
    >
      {phrases.map((phrase, index) => (
        <div key={phrase.id} role="gridcell">
          <AccessibleSoundButton
            phrase={phrase}
            index={index}
            variant="message"
            className={cn(
              "w-full h-full",
              "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
              settings.highContrast && "focus-visible:ring-yellow-400",
              focusedButtonIndex === index && "ring-3 ring-purple-500 ring-offset-2",
              settings.highContrast && focusedButtonIndex === index && "ring-yellow-400"
            )}
            aria-label={`${phrase.respectful && settings.respectfulMode ? phrase.respectful : phrase.filipino} - ${phrase.english}`}
          />
        </div>
      ))}
      
      {/* Screen Reader Instructions */}
      <div className="sr-only col-span-full" aria-live="polite">
        {settings.bilingualMode 
          ? "Use Tab to navigate buttons, Arrow keys to move in grid, Enter or Space to activate • Gamitin ang Tab para sa navigation, Arrow keys para sa grid, Enter o Space para i-activate"
          : "Use Tab to navigate buttons, Arrow keys to move in grid, Enter or Space to activate"
        }
      </div>
    </div>
  );
}