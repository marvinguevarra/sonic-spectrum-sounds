
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import CategorySection from '@/components/CategorySection';
import AccessibilitySettings from '@/components/AccessibilitySettings';
import SpeechOutput from '@/components/SpeechOutput';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [theme, setTheme] = useState('autism');
  const [buttonSize, setButtonSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [gridSize, setGridSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(70);
  const [textSize, setTextSize] = useState('medium');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const { toast } = useToast();

  // Apply theme to document
  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  // Sample AAC categories and items
  const categories = [
    {
      title: 'Basic Needs',
      items: [
        { id: '1', label: 'I want', icon: '🙋', soundFile: '/sounds/i-want.mp3' },
        { id: '2', label: 'Help', icon: '🤝', soundFile: '/sounds/help.mp3' },
        { id: '3', label: 'More', icon: '➕', soundFile: '/sounds/more.mp3' },
        { id: '4', label: 'Stop', icon: '✋', soundFile: '/sounds/stop.mp3' },
        { id: '5', label: 'Please', icon: '🙏', soundFile: '/sounds/please.mp3' },
        { id: '6', label: 'Thank you', icon: '💖', soundFile: '/sounds/thank-you.mp3' },
      ]
    },
    {
      title: 'Feelings',
      items: [
        { id: '7', label: 'Happy', icon: '😊', soundFile: '/sounds/happy.mp3' },
        { id: '8', label: 'Sad', icon: '😢', soundFile: '/sounds/sad.mp3' },
        { id: '9', label: 'Angry', icon: '😠', soundFile: '/sounds/angry.mp3' },
        { id: '10', label: 'Scared', icon: '😨', soundFile: '/sounds/scared.mp3' },
        { id: '11', label: 'Excited', icon: '🤗', soundFile: '/sounds/excited.mp3' },
        { id: '12', label: 'Tired', icon: '😴', soundFile: '/sounds/tired.mp3' },
      ]
    },
    {
      title: 'Food & Drink',
      items: [
        { id: '13', label: 'Water', icon: '💧', soundFile: '/sounds/water.mp3' },
        { id: '14', label: 'Food', icon: '🍽️', soundFile: '/sounds/food.mp3' },
        { id: '15', label: 'Apple', icon: '🍎', soundFile: '/sounds/apple.mp3' },
        { id: '16', label: 'Milk', icon: '🥛', soundFile: '/sounds/milk.mp3' },
        { id: '17', label: 'Cookie', icon: '🍪', soundFile: '/sounds/cookie.mp3' },
        { id: '18', label: 'Juice', icon: '🧃', soundFile: '/sounds/juice.mp3' },
      ]
    },
    {
      title: 'Activities',
      items: [
        { id: '19', label: 'Play', icon: '🎮', soundFile: '/sounds/play.mp3' },
        { id: '20', label: 'Read', icon: '📚', soundFile: '/sounds/read.mp3' },
        { id: '21', label: 'Music', icon: '🎵', soundFile: '/sounds/music.mp3' },
        { id: '22', label: 'Outside', icon: '🌳', soundFile: '/sounds/outside.mp3' },
        { id: '23', label: 'TV', icon: '📺', soundFile: '/sounds/tv.mp3' },
        { id: '24', label: 'Sleep', icon: '🛏️', soundFile: '/sounds/sleep.mp3' },
      ]
    }
  ];

  const handleItemClick = (item: { id: string; label: string; icon: string }) => {
    setSelectedWords(prev => [...prev, item.label]);
    
    if (soundEnabled) {
      // Create a simple click sound since we don't have actual audio files
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
    }

    toast({
      title: "Word Added",
      description: `"${item.label}" added to sentence`,
      duration: 1000,
    });
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window && selectedWords.length > 0) {
      const utterance = new SpeechSynthesisUtterance(selectedWords.join(' '));
      utterance.rate = 0.8;
      utterance.volume = volume / 100;
      speechSynthesis.speak(utterance);
    }
  };

  const handleClear = () => {
    setSelectedWords([]);
    toast({
      title: "Cleared",
      description: "Sentence cleared",
      duration: 1000,
    });
  };

  return (
    <div className={`min-h-screen bg-background transition-all duration-300 ${textSize === 'large' ? 'text-lg' : textSize === 'xl' ? 'text-xl' : textSize === 'small' ? 'text-sm' : ''}`}>
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">
              AAC Soundboard
            </h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="lg" className="font-medium">
                  ⚙️ Settings
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Accessibility Settings</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <AccessibilitySettings
                    theme={theme}
                    onThemeChange={setTheme}
                    buttonSize={buttonSize}
                    onButtonSizeChange={setButtonSize}
                    gridSize={gridSize}
                    onGridSizeChange={setGridSize}
                    soundEnabled={soundEnabled}
                    onSoundToggle={setSoundEnabled}
                    volume={volume}
                    onVolumeChange={setVolume}
                    textSize={textSize}
                    onTextSizeChange={setTextSize}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Speech Output */}
        <SpeechOutput 
          selectedWords={selectedWords}
          onClear={handleClear}
          onSpeak={handleSpeak}
        />

        {/* Categories */}
        <div className="space-y-8">
          {categories.map((category) => (
            <CategorySection
              key={category.title}
              title={category.title}
              items={category.items}
              gridSize={gridSize}
              buttonSize={buttonSize}
              onItemClick={handleItemClick}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 border-t border-border bg-card/30 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            AAC Soundboard - Designed for accessibility and ease of use
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
