
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/data/categories';
import { AnimatedSoundButton } from './AnimatedSoundButton';

export function PersonalPhrasesTab() {
  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <Card key={category.title}>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              {category.title}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {category.items.map((item) => (
                <AnimatedSoundButton
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  labelFilipino={item.labelFilipino}
                  icon={item.icon}
                  soundFile={item.soundFile}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
