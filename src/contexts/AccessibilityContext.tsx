import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AccessibilitySettings {
  // Motor Accessibility
  buttonSize: 'small' | 'medium' | 'large' | 'extra-large';
  gridSize: 'compact' | 'comfortable' | 'spacious';
  dwellTime: number; // in milliseconds
  debounceTime: number; // in milliseconds
  
  // Enhanced hover functionality
  hoverPreviewDelay: number;
  audioPreviewEnabled: boolean;
  progressiveHover: boolean;
  hoverLockEnabled: boolean;
  
  // Visual Accessibility
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  theme: 'light' | 'dark' | 'high-contrast';
  reduceMotion: boolean;
  showFocus: boolean;
  
  // Scanning
  scanningEnabled: boolean;
  scanSpeed: number; // in milliseconds
  scanLoops: number;
  autoAccept: boolean;
  switchMode: 'single' | 'two-switch';
  
  // Audio
  audioFeedback: boolean;
  speechRate: number;
  speechVolume: number;
  voiceType: 'default' | 'child' | 'adult-male' | 'adult-female';
  
  // Cognitive Support
  wordPrediction: boolean;
  phraseSuggestions: boolean;
  visualCues: boolean;
  simplifiedInterface: boolean;
  
  // Cultural & Language
  respectfulMode: boolean;
  bilingualMode: boolean;
  primaryLanguage: 'english' | 'filipino';
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => void;
  resetToDefaults: () => void;
  
  // Scanning state
  scanningActive: boolean;
  currentScanIndex: number;
  setScanningActive: (active: boolean) => void;
  setCurrentScanIndex: (index: number) => void;
  
  // Message construction
  messageQueue: string[];
  addToMessage: (text: string) => void;
  removeFromMessage: (index: number) => void;
  clearMessage: () => void;
  speakMessage: () => void;
}

const defaultSettings: AccessibilitySettings = {
  // Motor
  buttonSize: 'medium',
  gridSize: 'comfortable',
  dwellTime: 1000,
  debounceTime: 300,
  
  // Enhanced hover functionality
  hoverPreviewDelay: 500,
  audioPreviewEnabled: false,
  progressiveHover: true,
  hoverLockEnabled: false,
  
  // Visual
  highContrast: false,
  fontSize: 'medium',
  theme: 'light',
  reduceMotion: false,
  showFocus: true,
  
  // Scanning
  scanningEnabled: false,
  scanSpeed: 1500,
  scanLoops: 3,
  autoAccept: false,
  switchMode: 'single',
  
  // Audio
  audioFeedback: true,
  speechRate: 1.0,
  speechVolume: 0.8,
  voiceType: 'default',
  
  // Cognitive
  wordPrediction: false,
  phraseSuggestions: true,
  visualCues: true,
  simplifiedInterface: false,
  
  // Cultural & Language
  respectfulMode: true,
  bilingualMode: true,
  primaryLanguage: 'filipino',
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('accessibility-settings');
      if (saved) {
        try {
          return { ...defaultSettings, ...JSON.parse(saved) };
        } catch {
          return defaultSettings;
        }
      }
    }
    return defaultSettings;
  });

  const [scanningActive, setScanningActive] = useState(false);
  const [currentScanIndex, setCurrentScanIndex] = useState(0);
  const [messageQueue, setMessageQueue] = useState<string[]>([]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    }
  }, [settings]);

  // Apply CSS custom properties based on settings
  useEffect(() => {
    const root = document.documentElement;
    
    // Button size
    const buttonSizes = {
      small: '2.5rem',
      medium: '3.5rem',
      large: '4.5rem',
      'extra-large': '6rem'
    };
    root.style.setProperty('--button-size', buttonSizes[settings.buttonSize]);
    
    // Grid spacing
    const gridSpacing = {
      compact: '0.5rem',
      comfortable: '1rem',
      spacious: '1.5rem'
    };
    root.style.setProperty('--grid-spacing', gridSpacing[settings.gridSize]);
    
    // Font size
    const fontSizes = {
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
      'extra-large': '1.5rem'
    };
    root.style.setProperty('--base-font-size', fontSizes[settings.fontSize]);
    
    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reduce motion
    if (settings.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    
    // Show focus
    if (settings.showFocus) {
      root.classList.add('show-focus');
    } else {
      root.classList.remove('show-focus');
    }
    
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
  };

  const addToMessage = (text: string) => {
    setMessageQueue(prev => [...prev, text]);
  };

  const removeFromMessage = (index: number) => {
    setMessageQueue(prev => prev.filter((_, i) => i !== index));
  };

  const clearMessage = () => {
    setMessageQueue([]);
  };

  const speakMessage = async () => {
    if (messageQueue.length === 0) return;
    
    const fullMessage = messageQueue.join(' ');
    
    // Use existing speech service
    try {
      // This will be integrated with the existing elevenLabsService
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(fullMessage);
        utterance.rate = settings.speechRate;
        utterance.volume = settings.speechVolume;
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Speech failed:', error);
    }
  };

  const value: AccessibilityContextType = {
    settings,
    updateSetting,
    resetToDefaults,
    scanningActive,
    currentScanIndex,
    setScanningActive,
    setCurrentScanIndex,
    messageQueue,
    addToMessage,
    removeFromMessage,
    clearMessage,
    speakMessage,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}