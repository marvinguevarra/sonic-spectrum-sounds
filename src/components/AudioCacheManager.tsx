
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { audioCacheService } from '@/services/audioCacheService';
import { elevenLabsService } from '@/services/elevenLabsService';

export function AudioCacheManager() {
  const [cacheStats, setCacheStats] = useState({ totalFiles: 0, totalSize: 0 });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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
    setIsGenerating(true);
    setGenerationProgress(0);
    
    try {
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
      }, 1000);
      
    } catch (error) {
      console.error('Pre-generation failed:', error);
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  const handleClearCache = async () => {
    try {
      await audioCacheService.clearCache();
      await loadCacheStats();
    } catch (error) {
      console.error('Failed to clear cache:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔊 Offline Audio Cache
          <span className={`text-sm px-2 py-1 rounded ${isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{cacheStats.totalFiles}</div>
            <div className="text-sm text-muted-foreground">Cached Audio Files</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{formatFileSize(cacheStats.totalSize)}</div>
            <div className="text-sm text-muted-foreground">Storage Used</div>
          </div>
        </div>

        {isGenerating && (
          <div className="space-y-2">
            <Progress value={generationProgress} className="w-full" />
            <p className="text-sm text-center text-muted-foreground">
              Generating audio files... {generationProgress}%
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Button 
            onClick={handlePreGenerate} 
            disabled={isGenerating || !isOnline}
            className="w-full"
          >
            {isGenerating ? 'Generating...' : 'Pre-Generate All Audio'}
          </Button>
          
          <Button 
            onClick={handleClearCache} 
            variant="outline"
            disabled={isGenerating || cacheStats.totalFiles === 0}
            className="w-full"
          >
            Clear Cache
          </Button>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Pre-generate audio files while online for offline use</p>
          <p>• ElevenLabs voices will work offline once cached</p>
          <p>• Audio files are stored locally in your browser</p>
        </div>
      </CardContent>
    </Card>
  );
}
