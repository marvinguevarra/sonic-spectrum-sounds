import React, { useEffect, useRef, useCallback } from 'react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

interface ScanningControllerProps {
  totalItems: number;
  onSelect?: (index: number) => void;
  children: React.ReactNode;
}

export function ScanningController({ totalItems, onSelect, children }: ScanningControllerProps) {
  const { 
    settings, 
    scanningActive, 
    currentScanIndex, 
    setScanningActive, 
    setCurrentScanIndex 
  } = useAccessibility();
  
  const scanTimerRef = useRef<NodeJS.Timeout>();
  const loopCountRef = useRef(0);

  // Handle scan progression
  const progressScan = useCallback(() => {
    if (!scanningActive || totalItems === 0) return;

    const nextIndex = (currentScanIndex + 1) % totalItems;
    
    // Check if we've completed a full loop
    if (nextIndex === 0) {
      loopCountRef.current += 1;
      
      // Stop scanning after specified number of loops
      if (loopCountRef.current >= settings.scanLoops) {
        setScanningActive(false);
        loopCountRef.current = 0;
        setCurrentScanIndex(0);
        return;
      }
    }
    
    setCurrentScanIndex(nextIndex);
  }, [scanningActive, totalItems, settings.scanLoops, setCurrentScanIndex, setScanningActive, currentScanIndex]);

  // Set up scanning timer
  useEffect(() => {
    if (scanningActive && settings.scanningEnabled) {
      scanTimerRef.current = setTimeout(progressScan, settings.scanSpeed);
    }
    
    return () => {
      if (scanTimerRef.current) {
        clearTimeout(scanTimerRef.current);
      }
    };
  }, [scanningActive, settings.scanningEnabled, settings.scanSpeed, progressScan, currentScanIndex]);

  // Handle keyboard/switch input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!settings.scanningEnabled) return;

      // Space bar or Enter to start/select
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        
        if (!scanningActive) {
          // Start scanning
          setScanningActive(true);
          setCurrentScanIndex(0);
          loopCountRef.current = 0;
        } else {
          // Select current item
          setScanningActive(false);
          loopCountRef.current = 0;
          onSelect?.(currentScanIndex);
        }
      }
      
      // Escape to stop scanning
      if (event.code === 'Escape') {
        event.preventDefault();
        setScanningActive(false);
        loopCountRef.current = 0;
      }
    };

    // Handle switch input (for two-switch mode)
    const handleSwitchInput = (event: KeyboardEvent) => {
      if (!settings.scanningEnabled || settings.switchMode !== 'two-switch') return;

      // First switch (Arrow Right) - advance scan
      if (event.code === 'ArrowRight') {
        event.preventDefault();
        if (scanningActive) {
          progressScan();
        } else {
          setScanningActive(true);
          setCurrentScanIndex(0);
          loopCountRef.current = 0;
        }
      }

      // Second switch (Arrow Down) - select
      if (event.code === 'ArrowDown') {
        event.preventDefault();
        if (scanningActive) {
          setScanningActive(false);
          loopCountRef.current = 0;
          onSelect?.(currentScanIndex);
        }
      }
    };

    if (settings.switchMode === 'single') {
      document.addEventListener('keydown', handleKeyPress);
    } else {
      document.addEventListener('keydown', handleSwitchInput);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keydown', handleSwitchInput);
    };
  }, [
    settings.scanningEnabled,
    settings.switchMode,
    scanningActive,
    currentScanIndex,
    onSelect,
    setScanningActive,
    setCurrentScanIndex,
    progressScan
  ]);

  // Auto-select feature
  useEffect(() => {
    if (settings.autoAccept && scanningActive && currentScanIndex >= 0) {
      const autoSelectTimer = setTimeout(() => {
        setScanningActive(false);
        loopCountRef.current = 0;
        onSelect?.(currentScanIndex);
      }, settings.scanSpeed * 2); // Wait twice the scan speed for auto-select

      return () => clearTimeout(autoSelectTimer);
    }
  }, [settings.autoAccept, scanningActive, currentScanIndex, settings.scanSpeed, onSelect, setScanningActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scanTimerRef.current) {
        clearTimeout(scanTimerRef.current);
      }
      setScanningActive(false);
      loopCountRef.current = 0;
    };
  }, [setScanningActive]);

  return <>{children}</>;
}