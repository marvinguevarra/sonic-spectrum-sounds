import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings, Download, Wifi, WifiOff, Bug } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import AccessibilitySettings from '@/components/AccessibilitySettings';
import { BugReportForm } from '@/components/BugReportForm';
import { useSettings } from '@/contexts/SettingsContext';
import { audioCacheService } from '@/services/audioCacheService';
import { elevenLabsService } from '@/services/elevenLabsService';
import { useToast } from '@/hooks/use-toast';

const AppHeader = () => {
  const { bilingualMode } = useSettings();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [cacheStats, setCacheStats] = useState({ totalFiles: 0, totalSize: 0 });

  useEffect(() => {
    loadCacheStats();
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadCacheStats = async () => {
    try {
      const stats = await audioCacheService.getCacheStats();
      setCacheStats(stats);
    } catch (error) {
      console.error('Failed to load cache stats:', error);
    }
  };

  const handlePreGenerate = async () => {
    if (!isOnline) {
      toast({
        title: "Offline",
        description: "Please connect to the internet to pre-generate audio files.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    
    try {
      toast({
        title: "Generating Audio",
        description: "Pre-generating audio files for offline use...",
      });

      // Mock progress for user feedback
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => Math.min(prev + 5, 90));
      }, 1000);
      
      await elevenLabsService.preGenerateAllPhrases();
      
      clearInterval(progressInterval);
      setGenerationProgress(100);
      
      setTimeout(() => {
        loadCacheStats();
        setIsGenerating(false);
        setGenerationProgress(0);
        toast({
          title: "Audio Generated",
          description: "All audio files have been cached for offline use!",
        });
      }, 1000);
      
    } catch (error) {
      console.error('Pre-generation failed:', error);
      setIsGenerating(false);
      setGenerationProgress(0);
      toast({
        title: "Generation Failed",
        description: "Failed to generate audio files. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground truncate">
              {bilingualMode ? '🇵🇭 Filipino AAC Soundboard' : '🇺🇸 English AAC Soundboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Connection Status Indicator */}
            <div className="flex items-center gap-1" aria-label={isOnline ? 'Online' : 'Offline'}>
              {isOnline ? (
                <Wifi className="h-4 w-4 text-green-600" aria-hidden="true" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-600" aria-hidden="true" />
              )}
              <span className="sr-only">{isOnline ? 'Connected' : 'Disconnected'}</span>
            </div>

            {/* Pre-Generate Audio Button */}
            <div className="flex flex-col items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreGenerate}
                disabled={isGenerating || !isOnline}
                className="font-medium"
                aria-describedby="cache-audio-desc"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline ml-2">
                  {isGenerating 
                    ? (bilingualMode ? 'Gumagawa...' : 'Generating...') 
                    : (bilingualMode ? 'I-cache ang Audio' : 'Cache Audio')
                  }
                </span>
              </Button>
              <span id="cache-audio-desc" className="sr-only">
                {bilingualMode 
                  ? 'I-download ang lahat ng audio para sa offline na paggamit'
                  : 'Download all audio files for offline use'
                }
              </span>
              {isGenerating && (
                <div className="w-full max-w-[100px]">
                  <Progress value={generationProgress} className="h-1" />
                  <span className="sr-only">
                    {bilingualMode ? `Progreso: ${generationProgress}%` : `Progress: ${generationProgress}%`}
                  </span>
                </div>
              )}
            </div>

            {/* Bug Report */}
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="font-medium"
                  aria-label={bilingualMode ? 'Mag-report ng bug o mag-suggest ng feature' : 'Report bug or suggest feature'}
                >
                  <Bug className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline ml-2">
                    {bilingualMode ? 'Report' : 'Report'}
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="sr-only">
                    {bilingualMode ? 'Mag-report ng Bug o Mag-suggest ng Feature' : 'Report Bug or Suggest Feature'}
                  </DialogTitle>
                </DialogHeader>
                <BugReportForm />
              </DialogContent>
            </Dialog>

            {/* Settings */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="font-medium"
                  aria-label={bilingualMode ? 'Buksan ang mga setting' : 'Open settings'}
                >
                  <Settings className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline ml-2">
                    {bilingualMode ? 'Mga Setting' : 'Settings'}
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[90vw] sm:w-[400px] max-w-[540px]">
                <SheetHeader>
                  <SheetTitle>
                    {bilingualMode ? 'Mga Setting ng Accessibility' : 'Accessibility Settings'}
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <AccessibilitySettings />
                  
                  {/* Cache Stats in Settings */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {bilingualMode ? 'Audio Cache' : 'Audio Cache'}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{cacheStats.totalFiles}</div>
                        <div className="text-sm text-muted-foreground">
                          {bilingualMode ? 'Naka-cache na Files' : 'Cached Files'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {(cacheStats.totalSize / 1024 / 1024).toFixed(1)} MB
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {bilingualMode ? 'Storage na Ginagamit' : 'Storage Used'}
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={async () => {
                        await audioCacheService.clearCache();
                        await loadCacheStats();
                        toast({
                          title: bilingualMode ? "Cache Cleared" : "Cache Cleared",
                          description: bilingualMode 
                            ? "Lahat ng naka-cache na audio files ay natanggal na."
                            : "All cached audio files have been removed.",
                        });
                      }} 
                      variant="outline"
                      disabled={cacheStats.totalFiles === 0}
                      className="w-full"
                    >
                      {bilingualMode ? 'I-clear ang Cache' : 'Clear Cache'}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
