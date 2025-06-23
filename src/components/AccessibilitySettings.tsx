
import React from 'react';
import { LanguageCulturalSection } from './accessibility/LanguageCulturalSection';
import { ControlStyleSection } from './accessibility/ControlStyleSection';
import { VisualAccessibilitySection } from './accessibility/VisualAccessibilitySection';
import { MotorAccessibilitySection } from './accessibility/MotorAccessibilitySection';
import { AudioAccessibilitySection } from './accessibility/AudioAccessibilitySection';

const AccessibilitySettings = () => {
  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto">
      <div className="space-y-6">
        <LanguageCulturalSection />
        <ControlStyleSection />
        <VisualAccessibilitySection />
        <MotorAccessibilitySection />
        <AudioAccessibilitySection />
      </div>
    </div>
  );
};

export default AccessibilitySettings;
