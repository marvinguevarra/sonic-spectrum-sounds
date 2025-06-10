
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
  const [buttonSize, setButtonSize] = useState<'small' | 'medium' | 'large'>('large'); // Default to large for mobile
  const [gridSize, setGridSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(70);
  const [textSize, setTextSize] = useState('large'); // Default to large for mobile
  const [voiceType, setVoiceType] = useState<'male' | 'female'>('female');
  const [darkMode, setDarkMode] = useState(false);
  const [bilingualMode, setBilingualMode] = useState(false);

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
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
