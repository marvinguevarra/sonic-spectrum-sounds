import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Volume2, RotateCcw } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';

export function MessageWindow() {
  const { 
    messageQueue, 
    removeFromMessage, 
    clearMessage, 
    speakMessage,
    settings 
  } = useAccessibility();

  if (messageQueue.length === 0) {
    return (
      <div className="bg-muted/30 border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center">
        <p className="text-muted-foreground text-lg">
          {settings.bilingualMode 
            ? 'Tap words to build your message • I-tap ang mga salita para sa mensahe'
            : 'Tap words to build your message'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background border-2 border-primary/20 rounded-lg p-4 space-y-4">
      {/* Message Display */}
      <div 
        className={cn(
          "min-h-[4rem] bg-muted/50 rounded-md p-3 flex flex-wrap gap-2 items-center",
          settings.fontSize === 'large' && "text-lg",
          settings.fontSize === 'extra-large' && "text-xl"
        )}
        role="log"
        aria-live="polite"
        aria-label={settings.bilingualMode ? "Message being built • Mensaheng ginagawa" : "Message being built"}
      >
        {messageQueue.map((word, index) => (
          <button
            key={index}
            onClick={() => removeFromMessage(index)}
            className={cn(
              "bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "transition-colors duration-200"
            )}
            aria-label={`Remove word: ${word}`}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2">
          <Button
            onClick={speakMessage}
            className={cn(
              "flex items-center gap-2",
              settings.buttonSize === 'large' && "h-12 px-6",
              settings.buttonSize === 'extra-large' && "h-16 px-8"
            )}
            aria-label={settings.bilingualMode ? "Speak message • Sabihin ang mensahe" : "Speak message"}
          >
            <Volume2 className="h-4 w-4" />
            {settings.bilingualMode ? 'Speak • Sabihin' : 'Speak'}
          </Button>

          <Button
            onClick={clearMessage}
            variant="outline"
            className={cn(
              "flex items-center gap-2",
              settings.buttonSize === 'large' && "h-12 px-6",
              settings.buttonSize === 'extra-large' && "h-16 px-8"
            )}
            aria-label={settings.bilingualMode ? "Clear message • Burahin ang mensahe" : "Clear message"}
          >
            <RotateCcw className="h-4 w-4" />
            {settings.bilingualMode ? 'Clear • Burahin' : 'Clear'}
          </Button>
        </div>

        {/* Word Count */}
        <div className="flex items-center text-sm text-muted-foreground px-3">
          {messageQueue.length} {messageQueue.length === 1 ? 'word' : 'words'}
        </div>
      </div>
    </div>
  );
}