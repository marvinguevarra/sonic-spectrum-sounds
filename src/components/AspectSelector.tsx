
import React from 'react';
import { Button } from '@/components/ui/button';

type Aspect = 'completed' | 'ongoing' | 'contemplated';

interface AspectSelectorProps {
  currentAspect: Aspect;
  onAspectChange: (aspect: Aspect) => void;
}

export function AspectSelector({ currentAspect, onAspectChange }: AspectSelectorProps) {
  return (
    <div className="flex gap-2 p-3 bg-muted rounded-lg">
      <Button
        variant={currentAspect === 'completed' ? 'default' : 'outline'}
        onClick={() => onAspectChange('completed')}
        className={`flex-1 ${currentAspect === 'completed' ? 'bg-green-600 hover:bg-green-700' : ''}`}
      >
        <span className="mr-2">✓</span>
        Tapos na
      </Button>
      <Button
        variant={currentAspect === 'ongoing' ? 'default' : 'outline'}
        onClick={() => onAspectChange('ongoing')}
        className={`flex-1 ${currentAspect === 'ongoing' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}`}
      >
        <span className="mr-2">↻</span>
        Ginagawa
      </Button>
      <Button
        variant={currentAspect === 'contemplated' ? 'default' : 'outline'}
        onClick={() => onAspectChange('contemplated')}
        className={`flex-1 ${currentAspect === 'contemplated' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
      >
        <span className="mr-2">→</span>
        Gagawin
      </Button>
    </div>
  );
}
