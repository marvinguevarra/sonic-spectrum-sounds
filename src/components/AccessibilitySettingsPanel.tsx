import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { RotateCcw, Eye, Hand, Scan, Volume2, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AccessibilitySettingsPanel() {
  const { settings, updateSetting, resetToDefaults } = useAccessibility();

  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto p-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {settings.bilingualMode ? 'Accessibility Settings • Mga Setting para sa Accessibility' : 'Accessibility Settings'}
        </h2>
        <Button
          onClick={resetToDefaults}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          {settings.bilingualMode ? 'Reset • I-reset' : 'Reset'}
        </Button>
      </div>

      {/* Visual Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            {settings.bilingualMode ? 'Visual • Pangmata' : 'Visual'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>
                {settings.bilingualMode ? 'Theme • Tema' : 'Theme'}
              </Label>
              <Select 
                value={settings.theme} 
                onValueChange={(value) => updateSetting('theme', value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    {settings.bilingualMode ? 'Light • Maliwanag' : 'Light'}
                  </SelectItem>
                  <SelectItem value="dark">
                    {settings.bilingualMode ? 'Dark • Madilim' : 'Dark'}
                  </SelectItem>
                  <SelectItem value="high-contrast">
                    {settings.bilingualMode ? 'High Contrast • Mataas na Contrast' : 'High Contrast'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>
                {settings.bilingualMode ? 'Font Size • Laki ng Titik' : 'Font Size'}
              </Label>
              <Select 
                value={settings.fontSize} 
                onValueChange={(value) => updateSetting('fontSize', value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">
                    {settings.bilingualMode ? 'Small • Maliit' : 'Small'}
                  </SelectItem>
                  <SelectItem value="medium">
                    {settings.bilingualMode ? 'Medium • Katamtaman' : 'Medium'}
                  </SelectItem>
                  <SelectItem value="large">
                    {settings.bilingualMode ? 'Large • Malaki' : 'Large'}
                  </SelectItem>
                  <SelectItem value="extra-large">
                    {settings.bilingualMode ? 'Extra Large • Napakaki' : 'Extra Large'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>
                {settings.bilingualMode ? 'High Contrast • Mataas na Contrast' : 'High Contrast'}
              </Label>
              <Switch
                checked={settings.highContrast}
                onCheckedChange={(checked) => updateSetting('highContrast', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>
                {settings.bilingualMode ? 'Reduce Motion • Bawasan ang Kilos' : 'Reduce Motion'}
              </Label>
              <Switch
                checked={settings.reduceMotion}
                onCheckedChange={(checked) => updateSetting('reduceMotion', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label>
                {settings.bilingualMode ? 'Show Focus • Ipakita ang Focus' : 'Show Focus'}
              </Label>
              <Switch
                checked={settings.showFocus}
                onCheckedChange={(checked) => updateSetting('showFocus', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motor Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hand className="h-5 w-5" />
            {settings.bilingualMode ? 'Motor • Pangkilos' : 'Motor'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>
                {settings.bilingualMode ? 'Button Size • Laki ng Button' : 'Button Size'}
              </Label>
              <Select 
                value={settings.buttonSize} 
                onValueChange={(value) => updateSetting('buttonSize', value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">
                    {settings.bilingualMode ? 'Small • Maliit' : 'Small'}
                  </SelectItem>
                  <SelectItem value="medium">
                    {settings.bilingualMode ? 'Medium • Katamtaman' : 'Medium'}
                  </SelectItem>
                  <SelectItem value="large">
                    {settings.bilingualMode ? 'Large • Malaki' : 'Large'}
                  </SelectItem>
                  <SelectItem value="extra-large">
                    {settings.bilingualMode ? 'Extra Large • Napakaki' : 'Extra Large'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>
                {settings.bilingualMode ? 'Grid Spacing • Pagitan ng Grid' : 'Grid Spacing'}
              </Label>
              <Select 
                value={settings.gridSize} 
                onValueChange={(value) => updateSetting('gridSize', value as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">
                    {settings.bilingualMode ? 'Compact • Siksik' : 'Compact'}
                  </SelectItem>
                  <SelectItem value="comfortable">
                    {settings.bilingualMode ? 'Comfortable • Komportable' : 'Comfortable'}
                  </SelectItem>
                  <SelectItem value="spacious">
                    {settings.bilingualMode ? 'Spacious • Maluwag' : 'Spacious'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>
                {settings.bilingualMode ? 'Dwell Time (ms) • Oras ng Pag-hover' : 'Dwell Time (ms)'}
              </Label>
              <div className="mt-2">
                <Slider
                  value={[settings.dwellTime]}
                  onValueChange={([value]) => updateSetting('dwellTime', value)}
                  max={3000}
                  min={0}
                  step={100}
                  className="w-full"
                />
                <span className="text-sm text-muted-foreground">
                  {settings.dwellTime}ms {settings.dwellTime === 0 && '(disabled)'}
                </span>
              </div>
            </div>

            <div>
              <Label>
                {settings.bilingualMode ? 'Debounce Time (ms) • Oras ng Debounce' : 'Debounce Time (ms)'}
              </Label>
              <div className="mt-2">
                <Slider
                  value={[settings.debounceTime]}
                  onValueChange={([value]) => updateSetting('debounceTime', value)}
                  max={1000}
                  min={100}
                  step={50}
                  className="w-full"
                />
                <span className="text-sm text-muted-foreground">
                  {settings.debounceTime}ms
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scanning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="h-5 w-5" />
            {settings.bilingualMode ? 'Scanning • Pag-scan' : 'Scanning'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>
              {settings.bilingualMode ? 'Enable Scanning • Paganahin ang Scanning' : 'Enable Scanning'}
            </Label>
            <Switch
              checked={settings.scanningEnabled}
              onCheckedChange={(checked) => updateSetting('scanningEnabled', checked)}
            />
          </div>

          {settings.scanningEnabled && (
            <div className="space-y-4 pl-4 border-l-2 border-muted">
              <div>
                <Label>
                  {settings.bilingualMode ? 'Switch Mode • Mode ng Switch' : 'Switch Mode'}
                </Label>
                <Select 
                  value={settings.switchMode} 
                  onValueChange={(value) => updateSetting('switchMode', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">
                      {settings.bilingualMode ? 'Single Switch • Isang Switch' : 'Single Switch'}
                    </SelectItem>
                    <SelectItem value="two-switch">
                      {settings.bilingualMode ? 'Two Switch • Dalawang Switch' : 'Two Switch'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>
                  {settings.bilingualMode ? 'Scan Speed (ms) • Bilis ng Scan' : 'Scan Speed (ms)'}
                </Label>
                <div className="mt-2">
                  <Slider
                    value={[settings.scanSpeed]}
                    onValueChange={([value]) => updateSetting('scanSpeed', value)}
                    max={5000}
                    min={500}
                    step={100}
                    className="w-full"
                  />
                  <span className="text-sm text-muted-foreground">
                    {settings.scanSpeed}ms
                  </span>
                </div>
              </div>

              <div>
                <Label>
                  {settings.bilingualMode ? 'Scan Loops • Ulit ng Scan' : 'Scan Loops'}
                </Label>
                <div className="mt-2">
                  <Slider
                    value={[settings.scanLoops]}
                    onValueChange={([value]) => updateSetting('scanLoops', value)}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <span className="text-sm text-muted-foreground">
                    {settings.scanLoops} {settings.scanLoops === 1 ? 'loop' : 'loops'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label>
                  {settings.bilingualMode ? 'Auto Accept • Awtomatikong Tanggap' : 'Auto Accept'}
                </Label>
                <Switch
                  checked={settings.autoAccept}
                  onCheckedChange={(checked) => updateSetting('autoAccept', checked)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Audio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            {settings.bilingualMode ? 'Audio • Tunog' : 'Audio'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>
              {settings.bilingualMode ? 'Audio Feedback • Audio Feedback' : 'Audio Feedback'}
            </Label>
            <Switch
              checked={settings.audioFeedback}
              onCheckedChange={(checked) => updateSetting('audioFeedback', checked)}
            />
          </div>

          <div>
            <Label>
              {settings.bilingualMode ? 'Speech Rate • Bilis ng Pananalita' : 'Speech Rate'}
            </Label>
            <div className="mt-2">
              <Slider
                value={[settings.speechRate]}
                onValueChange={([value]) => updateSetting('speechRate', value)}
                max={2.0}
                min={0.5}
                step={0.1}
                className="w-full"
              />
              <span className="text-sm text-muted-foreground">
                {settings.speechRate}x
              </span>
            </div>
          </div>

          <div>
            <Label>
              {settings.bilingualMode ? 'Speech Volume • Lakas ng Tunog' : 'Speech Volume'}
            </Label>
            <div className="mt-2">
              <Slider
                value={[settings.speechVolume]}
                onValueChange={([value]) => updateSetting('speechVolume', value)}
                max={1.0}
                min={0.0}
                step={0.1}
                className="w-full"
              />
              <span className="text-sm text-muted-foreground">
                {Math.round(settings.speechVolume * 100)}%
              </span>
            </div>
          </div>

          <div>
            <Label>
              {settings.bilingualMode ? 'Voice Type • Uri ng Boses' : 'Voice Type'}
            </Label>
            <Select 
              value={settings.voiceType} 
              onValueChange={(value) => updateSetting('voiceType', value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">
                  {settings.bilingualMode ? 'Default • Default' : 'Default'}
                </SelectItem>
                <SelectItem value="child">
                  {settings.bilingualMode ? 'Child • Bata' : 'Child'}
                </SelectItem>
                <SelectItem value="adult-male">
                  {settings.bilingualMode ? 'Adult Male • Lalaking Matanda' : 'Adult Male'}
                </SelectItem>
                <SelectItem value="adult-female">
                  {settings.bilingualMode ? 'Adult Female • Babaeng Matanda' : 'Adult Female'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cognitive Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            {settings.bilingualMode ? 'Cognitive • Pang-isip' : 'Cognitive'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>
              {settings.bilingualMode ? 'Word Prediction • Hula ng Salita' : 'Word Prediction'}
            </Label>
            <Switch
              checked={settings.wordPrediction}
              onCheckedChange={(checked) => updateSetting('wordPrediction', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>
              {settings.bilingualMode ? 'Phrase Suggestions • Mungkahi ng Pangungusap' : 'Phrase Suggestions'}
            </Label>
            <Switch
              checked={settings.phraseSuggestions}
              onCheckedChange={(checked) => updateSetting('phraseSuggestions', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>
              {settings.bilingualMode ? 'Visual Cues • Visual na Hudyat' : 'Visual Cues'}
            </Label>
            <Switch
              checked={settings.visualCues}
              onCheckedChange={(checked) => updateSetting('visualCues', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>
              {settings.bilingualMode ? 'Simplified Interface • Pinasimpleng Interface' : 'Simplified Interface'}
            </Label>
            <Switch
              checked={settings.simplifiedInterface}
              onCheckedChange={(checked) => updateSetting('simplifiedInterface', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Language & Culture */}
      <Card>
        <CardHeader>
          <CardTitle>
            {settings.bilingualMode ? 'Language & Culture • Wika at Kultura' : 'Language & Culture'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>
              {settings.bilingualMode ? 'Respectful Mode • Respectful Mode' : 'Respectful Mode'}
            </Label>
            <Switch
              checked={settings.respectfulMode}
              onCheckedChange={(checked) => updateSetting('respectfulMode', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>
              {settings.bilingualMode ? 'Bilingual Mode • Bilingual Mode' : 'Bilingual Mode'}
            </Label>
            <Switch
              checked={settings.bilingualMode}
              onCheckedChange={(checked) => updateSetting('bilingualMode', checked)}
            />
          </div>

          <div>
            <Label>
              {settings.bilingualMode ? 'Primary Language • Pangunahing Wika' : 'Primary Language'}
            </Label>
            <Select 
              value={settings.primaryLanguage} 
              onValueChange={(value) => updateSetting('primaryLanguage', value as any)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="filipino">
                  {settings.bilingualMode ? 'Filipino • Filipino' : 'Filipino'}
                </SelectItem>
                <SelectItem value="english">
                  {settings.bilingualMode ? 'English • Ingles' : 'English'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <div className="text-sm text-muted-foreground space-y-2 p-4 bg-muted/30 rounded-lg">
        <p className="font-medium">
          {settings.bilingualMode ? 'Keyboard Controls • Mga Kontrol sa Keyboard:' : 'Keyboard Controls:'}
        </p>
        <ul className="space-y-1 list-disc list-inside">
          <li>
            {settings.bilingualMode 
              ? 'Space/Enter: Start scanning or select • Space/Enter: Simulan ang scan o pumili'
              : 'Space/Enter: Start scanning or select'
            }
          </li>
          <li>
            {settings.bilingualMode 
              ? 'Escape: Stop scanning • Escape: Itigil ang scan'
              : 'Escape: Stop scanning'
            }
          </li>
          {settings.switchMode === 'two-switch' && (
            <>
              <li>
                {settings.bilingualMode 
                  ? 'Arrow Right: Advance scan • Arrow Right: Magpatuloy sa scan'
                  : 'Arrow Right: Advance scan'
                }
              </li>
              <li>
                {settings.bilingualMode 
                  ? 'Arrow Down: Select • Arrow Down: Pumili'
                  : 'Arrow Down: Select'
                }
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}