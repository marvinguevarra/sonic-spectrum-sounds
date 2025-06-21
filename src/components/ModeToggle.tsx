
import React from 'react';
import { Button } from '@/components/ui/button';

interface ModeToggleProps {
  mode: 'phrases' | 'freestyle';
  onModeChange: (mode: 'phrases' | 'freestyle') => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex gap-2 p-2 bg-muted rounded-lg mb-4">
      <Button
        variant={mode === 'phrases' ? 'default' : 'outline'}
        onClick={() => onModeChange('phrases')}
        className="flex-1"
      >
        <span className="mr-2">📋</span>
        Common Phrases
      </Button>
      <Button
        variant={mode === 'freestyle' ? 'default' : 'outline'}
        onClick={() => onModeChange('freestyle')}
        className="flex-1"
      >
        <span className="mr-2">✏️</span>
        Freestyle
      </Button>
    </div>
  );
}
