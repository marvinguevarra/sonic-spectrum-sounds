
import * as React from "react"
import { useResponsive } from './use-responsive'

export function useMobileLayout() {
  const { deviceType, isMobile, isTablet } = useResponsive()
  
  // Dynamic grid columns based on content and device
  const getPersonalPhrasesGrid = () => {
    if (isMobile) return 'grid-cols-2' // 2 columns for better text wrapping
    if (isTablet) return 'grid-cols-3' // 3 columns for tablets
    return 'grid-cols-4' // 4 columns for desktop
  }

  // Dynamic button sizing for personal phrases
  const getButtonSize = () => {
    if (isMobile) return 'medium' // Medium size for mobile (better text display)
    if (isTablet) return 'medium' // Medium size for tablets
    return 'medium' // Medium size for desktop
  }

  // Dynamic gap spacing
  const getGapSize = () => {
    if (isMobile) return 'gap-3' // Smaller gaps on mobile
    if (isTablet) return 'gap-4' // Medium gaps on tablet
    return 'gap-4' // Standard gaps on desktop
  }

  // Text wrapping classes for long phrases
  const getTextWrapClasses = () => {
    return 'break-words hyphens-auto overflow-wrap-break-word'
  }

  // Dynamic padding for buttons
  const getButtonPadding = () => {
    if (isMobile) return 'p-2' // More padding on mobile for better touch
    if (isTablet) return 'p-3' // Medium padding on tablet
    return 'p-4' // Standard padding on desktop
  }

  return {
    deviceType,
    isMobile,
    isTablet,
    getPersonalPhrasesGrid,
    getButtonSize,
    getGapSize,
    getTextWrapClasses,
    getButtonPadding
  }
}
