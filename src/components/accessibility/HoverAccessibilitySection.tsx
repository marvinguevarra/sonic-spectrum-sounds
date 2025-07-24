import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { MousePointer, Volume2, Timer, Eye, Hand } from 'lucide-react';

export function HoverAccessibilitySection() {
  const { settings, updateSetting } = useAccessibility();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MousePointer className="w-5 h-5" />
            Enhanced Hover Settings
          </CardTitle>
          <CardDescription>
            Customize hover behavior and feedback for improved accessibility
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Dwell Time Controls */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              <Label className="text-sm font-medium">Dwell Time</Label>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {settings.dwellTime === 0 ? 'Disabled' : `${settings.dwellTime}ms`}
                </span>
                <span className="text-xs text-muted-foreground">
                  0 = Click required
                </span>
              </div>
              <Slider
                value={[settings.dwellTime]}
                onValueChange={(value) => updateSetting('dwellTime', value[0])}
                min={0}
                max={3000}
                step={100}
                className="w-full"
              />
            </div>
          </div>

          {/* Hover Preview Settings */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <Label className="text-sm font-medium">Hover Preview</Label>
            </div>
            
            <div className="space-y-4">
              {/* Preview Delay */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="hover-preview-delay" className="text-sm">
                    Preview Delay
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    {settings.hoverPreviewDelay}ms
                  </span>
                </div>
                <Slider
                  value={[settings.hoverPreviewDelay]}
                  onValueChange={(value) => updateSetting('hoverPreviewDelay', value[0])}
                  min={100}
                  max={2000}
                  step={100}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Progressive Hover */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Hand className="w-4 h-4" />
              <Label className="text-sm font-medium">Progressive Hover Features</Label>
            </div>
            
            <div className="space-y-4">
              {/* Progressive Hover Toggle */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm">Progressive Hover States</Label>
                  <p className="text-xs text-muted-foreground">
                    Show visual feedback as hover progresses through stages
                  </p>
                </div>
                <Switch
                  checked={settings.progressiveHover}
                  onCheckedChange={(checked) => updateSetting('progressiveHover', checked)}
                />
              </div>

              {/* Hover Lock */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm">Hover Lock</Label>
                  <p className="text-xs text-muted-foreground">
                    Lock hover state once activated (experimental)
                  </p>
                </div>
                <Switch
                  checked={settings.hoverLockEnabled}
                  onCheckedChange={(checked) => updateSetting('hoverLockEnabled', checked)}
                />
              </div>
            </div>
          </div>

          {/* Audio Preview Settings */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <Label className="text-sm font-medium">Audio Preview</Label>
            </div>
            
            <div className="space-y-4">
              {/* Audio Preview Toggle */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm">Audio Preview on Hover</Label>
                  <p className="text-xs text-muted-foreground">
                    Play audio preview when hovering over buttons
                  </p>
                </div>
                <Switch
                  checked={settings.audioPreviewEnabled}
                  onCheckedChange={(checked) => updateSetting('audioPreviewEnabled', checked)}
                />
              </div>
            </div>
          </div>

          {/* Debounce Settings */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Interaction Timing</Label>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="debounce-time" className="text-sm">
                  Debounce Time
                </Label>
                <span className="text-sm text-muted-foreground">
                  {settings.debounceTime}ms
                </span>
              </div>
              <Slider
                value={[settings.debounceTime]}
                onValueChange={(value) => updateSetting('debounceTime', value[0])}
                min={100}
                max={1000}
                step={50}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Prevents accidental multiple activations
              </p>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Touch/Mobile Alternatives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hand className="w-5 h-5" />
            Touch & Mobile Alternatives
          </CardTitle>
          <CardDescription>
            Alternative interaction methods for touch devices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">On touch devices, hover functionality is automatically adapted:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Long press replaces hover for dwell time activation</li>
              <li>Double tap for quick preview</li>
              <li>Visual feedback indicates progress</li>
              <li>Audio preview still available with touch and hold</li>
            </ul>
          </div>

        </CardContent>
      </Card>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Hover Accessibility Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong>Progressive Hover:</strong> Provides multi-stage visual feedback as you hover</p>
          <p><strong>Audio Preview:</strong> Helps users with visual impairments identify buttons</p>
          <p><strong>Dwell Time:</strong> Allows hands-free activation after hovering</p>
          <p><strong>Reduced Motion:</strong> Hover effects respect your motion preferences</p>
        </CardContent>
      </Card>
    </div>
  );
}