import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedHoverButton } from './EnhancedHoverButton';
import { AccessibleSoundButton } from './AccessibleSoundButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MousePointer, Sparkles, Volume2, Eye } from 'lucide-react';

const demoPhrase = {
  id: 'demo-hover',
  filipino: 'Kumusta ka?',
  english: 'How are you?',
  respectful: 'Kumusta po kayo?',
  category: 'greetings',
  emoji: '👋'
};

const demoPhrases = [
  {
    id: 'demo-1',
    filipino: 'Salamat',
    english: 'Thank you',
    respectful: 'Salamat po',
    category: 'polite',
    emoji: '🙏'
  },
  {
    id: 'demo-2',
    filipino: 'Tubig',
    english: 'Water',
    respectful: 'Tubig po',
    category: 'needs',
    emoji: '💧'
  },
  {
    id: 'demo-3',
    filipino: 'Masaya',
    english: 'Happy',
    respectful: 'Masaya po',
    category: 'feelings',
    emoji: '😊'
  }
];

export function HoverDemoSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Enhanced Hover Functionality Demo
          </CardTitle>
          <CardDescription>
            Experience the new progressive hover states, audio previews, and accessibility features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="enhanced" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="enhanced" className="flex items-center gap-2">
                <MousePointer className="w-4 h-4" />
                Enhanced Hover
              </TabsTrigger>
              <TabsTrigger value="comparison" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Before & After
              </TabsTrigger>
            </TabsList>

            <TabsContent value="enhanced" className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">New Features</Badge>
                  <span className="text-sm text-muted-foreground">
                    Hover over the buttons below to experience enhanced interactions
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {demoPhrases.map((phrase, index) => (
                    <EnhancedHoverButton
                      key={phrase.id}
                      phrase={phrase}
                      index={index}
                      showHoverPreview={true}
                      className="h-32"
                    />
                  ))}
                </div>

                <div className="space-y-2 text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium text-foreground">What to expect:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>Light Hover:</strong> Gentle highlight when mouse enters</li>
                    <li><strong>Progressive Feedback:</strong> Visual progress as dwell time advances</li>
                    <li><strong>Audio Preview:</strong> Optional audio plays at mid-hover (if enabled)</li>
                    <li><strong>Enhanced Tooltips:</strong> Rich preview with larger text and pronunciation</li>
                    <li><strong>Smooth Animations:</strong> Responsive to your accessibility settings</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Before */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Before</Badge>
                    <span className="text-sm text-muted-foreground">Standard button</span>
                  </div>
                  <AccessibleSoundButton
                    phrase={demoPhrase}
                    className="h-32"
                  />
                  <div className="text-xs text-muted-foreground">
                    Basic hover with simple dwell time functionality
                  </div>
                </div>

                {/* After */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">After</Badge>
                    <span className="text-sm text-muted-foreground">Enhanced hover button</span>
                  </div>
                  <EnhancedHoverButton
                    phrase={demoPhrase}
                    showHoverPreview={true}
                    className="h-32"
                  />
                  <div className="text-xs text-muted-foreground">
                    Progressive states, audio preview, rich tooltips, and enhanced accessibility
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <MousePointer className="w-4 h-4" />
              Progressive States
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Visual feedback progresses through light → countdown → locked states for clear interaction cues
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              Audio Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Optional audio preview plays during hover to help users identify phrases before activation
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Rich Tooltips
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Enhanced preview cards show enlarged text, pronunciation guides, and contextual information
          </CardContent>
        </Card>
      </div>
    </div>
  );
}