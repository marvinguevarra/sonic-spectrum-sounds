
import React from 'react';
import SoundboardButton from './SoundboardButton';
import { useSettings } from '@/contexts/SettingsContext';

interface CategoryItem {
  id: string;
  label: string;
  labelFilipino?: string;
  icon: string;
  soundFile?: string;
}

interface CategorySectionProps {
  title: string;
  items: CategoryItem[];
  onItemClick: (item: CategoryItem) => void;
}

const CategorySection = ({ title, items, onItemClick }: CategorySectionProps) => {
  const { gridSize, textSize } = useSettings();
  const gridClass = `category-grid-${gridSize}`;

  return (
    <div className="mb-6 sm:mb-8">
      <h2 className={`font-bold text-foreground mb-3 sm:mb-4 px-1 sm:px-2 ${
        textSize === 'xl' ? 'text-2xl sm:text-3xl' :
        textSize === 'large' ? 'text-xl sm:text-2xl' :
        textSize === 'small' ? 'text-lg sm:text-xl' :
        'text-xl sm:text-2xl'
      }`}>
        {title}
      </h2>
      <div className={`category-grid ${gridClass}`}>
        {items.map((item) => (
          <SoundboardButton
            key={item.id}
            id={item.id}
            label={item.label}
            labelFilipino={item.labelFilipino}
            icon={item.icon}
            category={title}
            soundFile={item.soundFile}
            onClick={() => onItemClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
