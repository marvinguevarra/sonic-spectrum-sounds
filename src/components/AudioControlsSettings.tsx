import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/contexts/SettingsContext';
import { useAudioControls } from '@/hooks/useAudioControls';
import { Volume2, Clock, List, StopCircle } from 'lucide-react';

export function AudioControlsSettings() {
  const {
    rateLimitEnabled,
    setRateLimitEnabled,
    rateLimitInterval,
    setRateLimitInterval,
    maxQueueSize,
    setMaxQueueSize,
  } = useSettings();

  const { audioState, stopAudio, clearQueue } = useAudioControls();

  const handleIntervalChange = (value: number[]) => {
    setRateLimitInterval(value[0]);
  };

  const handleQueueSizeChange = (value: number[]) => {
    setMaxQueueSize(value[0]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          Audio Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Rate Limiting Toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="rate-limit-enabled" className="text-sm font-medium">
            Prevent sound overlap
          </Label>
          <Switch
            id="rate-limit-enabled"
            checked={rateLimitEnabled}
            onCheckedChange={setRateLimitEnabled}
          />
        </div>

        {rateLimitEnabled && (
          <>
            {/* Minimum Interval Setting */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Minimum time between sounds: {rateLimitInterval}ms
              </Label>
              <Slider
                value={[rateLimitInterval]}
                onValueChange={handleIntervalChange}
                min={100}
                max={2000}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>100ms (Fast)</span>
                <span>2000ms (Slow)</span>
              </div>
            </div>

            {/* Queue Size Setting */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <List className="h-4 w-4" />
                Maximum queued sounds: {maxQueueSize}
              </Label>
              <Slider
                value={[maxQueueSize]}
                onValueChange={handleQueueSizeChange}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 (No queue)</span>
                <span>10 (Long queue)</span>
              </div>
            </div>
          </>
        )}

        {/* Current Status */}
        <div className="pt-4 border-t space-y-3">
          <h4 className="text-sm font-medium">Current Status</h4>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Playing:</span>
              <div className="font-medium">
                {audioState.isPlaying ? 'Yes' : 'No'}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Queue:</span>
              <div className="font-medium">
                {audioState.queue.length} sounds
              </div>
            </div>
          </div>

          {audioState.currentPhrase && (
            <div>
              <span className="text-muted-foreground text-sm">Current phrase:</span>
              <div className="font-medium text-sm bg-accent/50 p-2 rounded text-center">
                {audioState.currentPhrase}
              </div>
            </div>
          )}

          {audioState.queue.length > 0 && (
            <div>
              <span className="text-muted-foreground text-sm">Queued phrases:</span>
              <div className="space-y-1 mt-1">
                {audioState.queue.map((phrase, index) => (
                  <div key={index} className="text-xs bg-accent/30 p-1 rounded">
                    {index + 1}. {phrase}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={stopAudio}
              disabled={!audioState.isPlaying}
              className="flex-1"
            >
              <StopCircle className="h-4 w-4 mr-1" />
              Stop
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearQueue}
              disabled={audioState.queue.length === 0}
              className="flex-1"
            >
              <List className="h-4 w-4 mr-1" />
              Clear Queue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}