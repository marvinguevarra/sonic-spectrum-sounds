
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface BeachImageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BeachImageModal({ isOpen, onClose }: BeachImageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none shadow-none">
        <div className="relative">
          <Button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 rounded-full bg-black/50 hover:bg-black/70 text-white border-none"
            size="icon"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
          <img 
            src="/lovable-uploads/ed4ea606-c8ca-4be3-8656-a8ff5c389d26.png" 
            alt="Beach scene - Sports Illustrated Swimsuit"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
