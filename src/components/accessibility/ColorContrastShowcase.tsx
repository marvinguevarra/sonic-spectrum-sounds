import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { 
  primaryButtons, 
  secondaryButtons, 
  accentColors, 
  autismFriendlyColors,
  highVisibilityColors,
  colorBlindFriendlyColors,
  focusIndicators,
  type ColorCombination 
} from '@/data/colorContrastAudit';

interface ColorSampleProps {
  combination: ColorCombination;
}

const ColorSample: React.FC<ColorSampleProps> = ({ combination }) => {
  const getWcagIcon = (level: string) => {
    switch (level) {
      case 'AAA':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'AA':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'A':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getWcagColor = (level: string) => {
    switch (level) {
      case 'AAA':
        return 'bg-green-100 text-green-800';
      case 'AA':
        return 'bg-blue-100 text-blue-800';
      case 'A':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-2">
      <div 
        className="p-4 rounded-md border-2 min-h-[80px] flex items-center justify-center text-center font-medium"
        style={{ 
          backgroundColor: combination.background, 
          color: combination.foreground,
          borderColor: combination.foreground
        }}
      >
        <div>
          <div className="text-lg font-semibold">{combination.name}</div>
          {combination.culturalMeaning && (
            <div className="text-sm opacity-90 mt-1">{combination.culturalMeaning}</div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          {getWcagIcon(combination.wcagLevel)}
          <Badge className={getWcagColor(combination.wcagLevel)}>
            WCAG {combination.wcagLevel}
          </Badge>
        </div>
        <div className="text-muted-foreground">
          {combination.contrastRatio.toFixed(2)}:1
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>BG: {combination.hexBackground}</span>
        <span>FG: {combination.hexForeground}</span>
      </div>
    </div>
  );
};

interface ColorSectionProps {
  title: string;
  description: string;
  combinations: ColorCombination[];
}

const ColorSection: React.FC<ColorSectionProps> = ({ title, description, combinations }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {title}
        <Badge variant="outline">
          {combinations.length} combinations
        </Badge>
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {combinations.map((combination, index) => (
          <ColorSample key={index} combination={combination} />
        ))}
      </div>
    </CardContent>
  </Card>
);

export const ColorContrastShowcase: React.FC = () => {
  const totalCombinations = [
    ...primaryButtons,
    ...secondaryButtons,
    ...accentColors,
    ...autismFriendlyColors,
    ...highVisibilityColors,
    ...colorBlindFriendlyColors,
    ...focusIndicators
  ];

  const aaCompliant = totalCombinations.filter(c => c.wcagLevel === 'AA' || c.wcagLevel === 'AAA');
  const aaaCompliant = totalCombinations.filter(c => c.wcagLevel === 'AAA');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filipino AAC Color Accessibility Audit</CardTitle>
          <CardDescription>
            All colors meet WCAG 2.1 Level AA standards while preserving Filipino cultural identity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{aaaCompliant.length}</div>
              <div className="text-sm text-muted-foreground">WCAG AAA Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{aaCompliant.length}</div>
              <div className="text-sm text-muted-foreground">WCAG AA+ Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalCombinations.length}</div>
              <div className="text-sm text-muted-foreground">Total Combinations</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ColorSection
        title="Primary Buttons"
        description="Main action buttons with Philippine flag blue and sampaguita white"
        combinations={primaryButtons}
      />

      <ColorSection
        title="Secondary Buttons"
        description="Supporting actions with tropical ocean colors"
        combinations={secondaryButtons}
      />

      <ColorSection
        title="Filipino Cultural Accents"
        description="Colors inspired by Philippine culture and nature"
        combinations={accentColors}
      />

      <ColorSection
        title="Autism-Friendly Theme"
        description="Calming colors designed for sensory sensitivities"
        combinations={autismFriendlyColors}
      />

      <ColorSection
        title="High Visibility Theme"
        description="Maximum contrast for users with visual impairments"
        combinations={highVisibilityColors}
      />

      <ColorSection
        title="Color-Blind Friendly"
        description="Deuteranopia and Protanopia safe color combinations"
        combinations={colorBlindFriendlyColors}
      />

      <ColorSection
        title="Focus Indicators"
        description="Keyboard navigation and focus ring colors"
        combinations={focusIndicators}
      />

      <Card>
        <CardHeader>
          <CardTitle>Cultural Color Meanings</CardTitle>
          <CardDescription>
            Each color choice reflects Filipino cultural values and accessibility needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#fafafa' }}></div>
              <div>
                <div className="font-medium">Sampaguita White</div>
                <div className="text-sm text-muted-foreground">National flower, purity</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#0d4f8c' }}></div>
              <div>
                <div className="font-medium">Philippine Blue</div>
                <div className="text-sm text-muted-foreground">Flag blue, unity</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#ff8c42' }}></div>
              <div>
                <div className="font-medium">Manila Sunset</div>
                <div className="text-sm text-muted-foreground">Bay sunsets, warmth</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#0077be' }}></div>
              <div>
                <div className="font-medium">Tropical Ocean</div>
                <div className="text-sm text-muted-foreground">Clear waters, peace</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#2d5a3d' }}></div>
              <div>
                <div className="font-medium">Forest Green</div>
                <div className="text-sm text-muted-foreground">Rainforest, nature</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: '#f4e4a6' }}></div>
              <div>
                <div className="font-medium">Beach Sand</div>
                <div className="text-sm text-muted-foreground">Coastal beaches, comfort</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};