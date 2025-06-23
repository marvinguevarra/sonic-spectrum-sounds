
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { AccessibleToggleButton } from '@/components/ui/accessible-toggle-button';
import { useSettings } from '@/contexts/SettingsContext';

interface UniversalToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children?: React.ReactNode;
  label?: string;
  description?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  size?: 'default' | 'large';
  variant?: 'default' | 'outline' | 'cultural';
}

export function UniversalToggle({ 
  checked, 
  onCheckedChange, 
  children, 
  label,
  description,
  id,
  disabled,
  className,
  size = 'default',
  variant = 'default'
}: UniversalToggleProps) {
  const { controlStyle } = useSettings();

  if (controlStyle === 'buttons') {
    return (
      <div className="flex flex-col gap-2">
        <AccessibleToggleButton
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className={className}
          size={size}
          variant={variant}
          id={id}
          aria-describedby={description ? `${id}-desc` : undefined}
        >
          {children || label}
        </AccessibleToggleButton>
        {description && (
          <span id={`${id}-desc`} className="text-xs text-muted-foreground">
            {description}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={className}
        aria-describedby={description ? `${id}-desc` : undefined}
      />
      {(label || children) && (
        <div className="flex flex-col">
          <label htmlFor={id} className="font-medium cursor-pointer">
            {children || label}
          </label>
          {description && (
            <span id={`${id}-desc`} className="text-xs text-muted-foreground">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
