
import * as React from "react"
import { cn } from "@/lib/utils"

export interface AccessibleToggleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  children: React.ReactNode
  size?: 'default' | 'large'
  variant?: 'default' | 'outline' | 'cultural'
}

const AccessibleToggleButton = React.forwardRef<
  HTMLButtonElement,
  AccessibleToggleButtonProps
>(({ 
  className, 
  checked, 
  onCheckedChange, 
  children, 
  size = 'default', 
  variant = 'default',
  disabled,
  ...props 
}, ref) => {
  const sizeClasses = {
    default: "min-h-[44px] px-4 py-2 text-sm",
    large: "min-h-[56px] px-6 py-3 text-base"
  }

  const variantClasses = {
    default: checked 
      ? "bg-primary text-primary-foreground border-primary" 
      : "bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground",
    outline: checked
      ? "bg-primary text-primary-foreground border-primary"
      : "bg-transparent text-foreground border-input hover:bg-accent hover:text-accent-foreground",
    cultural: checked
      ? "bg-blue-600 text-white border-blue-600"
      : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
  }

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-md border-2 font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "touch-manipulation select-none",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      onClick={() => onCheckedChange(!checked)}
      {...props}
    >
      {children}
    </button>
  )
})

AccessibleToggleButton.displayName = "AccessibleToggleButton"

export { AccessibleToggleButton }
