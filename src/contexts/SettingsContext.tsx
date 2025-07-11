
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
  theme: string;
  setTheme: (theme: string) => void;
  buttonSize: 'small' | 'medium' | 'large';
  setButtonSize: (size: 'small' | 'medium' | 'large') => void;
  gridSize: 'small' | 'medium' | 'large';
  setGridSize: (size: 'small' | 'medium' | 'large') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  textSize: string;
  setTextSize: (size: string) => void;
  voiceType: 'male' | 'female';
  setVoiceType: (type: 'male' | 'female') => void;
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
  bilingualMode: boolean;
  setBilingualMode: (enabled: boolean) => void;
  controlStyle: 'switches' | 'buttons';
  setControlStyle: (style: 'switches' | 'buttons') => void;
  // Rate limiting settings
  rateLimitEnabled: boolean;
  setRateLimitEnabled: (enabled: boolean) => void;
  rateLimitInterval: number;
  setRateLimitInterval: (interval: number) => void;
  maxQueueSize: number;
  setMaxQueueSize: (size: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [theme, setTheme] = useState('autism');
  const [buttonSize, setButtonSize] = useState<'small' | 'medium' | 'large'>('large');
  const [gridSize, setGridSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(70);
  const [textSize, setTextSize] = useState('large');
  const [voiceType, setVoiceType] = useState<'male' | 'female'>('female');
  const [darkMode, setDarkMode] = useState(false);
  const [bilingualMode, setBilingualMode] = useState(true);
  const [controlStyle, setControlStyle] = useState<'switches' | 'buttons'>('buttons'); // Default to buttons for better accessibility
  // Rate limiting settings
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [rateLimitInterval, setRateLimitInterval] = useState(500); // 500ms default
  const [maxQueueSize, setMaxQueueSize] = useState(3);

  // Apply theme to document
  useEffect(() => {
    const themeClass = darkMode ? `theme-${theme} dark` : `theme-${theme}`;
    document.documentElement.className = themeClass;
  }, [theme, darkMode]);

  const value: SettingsContextType = {
    theme,
    setTheme,
    buttonSize,
    setButtonSize,
    gridSize,
    setGridSize,
    soundEnabled,
    setSoundEnabled,
    volume,
    setVolume,
    textSize,
    setTextSize,
    voiceType,
    setVoiceType,
    darkMode,
    setDarkMode,
    bilingualMode,
    setBilingualMode,
    controlStyle,
    setControlStyle,
    rateLimitEnabled,
    setRateLimitEnabled,
    rateLimitInterval,
    setRateLimitInterval,
    maxQueueSize,
    setMaxQueueSize,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
