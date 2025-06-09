
import React from 'react';
import SoundboardButton from './SoundboardButton';
import { Card } from '@/components/ui/card';

interface CategoryItem {
  id: string;
  label: string;
  icon: string;
  soundFile?: string;
}

interface CategorySectionProps {
  title: string;
  items: CategoryItem[];
  gridSize?: 'small' | 'medium' | 'large';
  buttonSize?: 'small' | 'medium' | 'large';
  onItemClick: (item: CategoryItem) => void;
}

const CategorySection = ({ 
  title, 
  items, 
  gridSize = 'medium',
  buttonSize = 'medium',
  onItemClick 
}: CategorySectionProps) => {
  const gridClass = `category-grid-${gridSize}`;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-4 px-2">{title}</h2>
      <div className={`category-grid ${gridClass}`}>
        {items.map((item) => (
          <SoundboardButton
            key={item.id}
            label={item.label}
            icon={item.icon}
            category={title}
            soundFile={item.soundFile}
            size={buttonSize}
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
