
import * as React from "react"

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useResponsive() {
  const [deviceType, setDeviceType] = React.useState<DeviceType>('desktop')
  const [isMobile, setIsMobile] = React.useState(false)
  const [isTablet, setIsTablet] = React.useState(false)
  const [isDesktop, setIsDesktop] = React.useState(true)

  React.useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth
      
      if (width < MOBILE_BREAKPOINT) {
        setDeviceType('mobile')
        setIsMobile(true)
        setIsTablet(false)
        setIsDesktop(false)
      } else if (width < TABLET_BREAKPOINT) {
        setDeviceType('tablet')
        setIsMobile(false)
        setIsTablet(true)
        setIsDesktop(false)
      } else {
        setDeviceType('desktop')
        setIsMobile(false)
        setIsTablet(false)
        setIsDesktop(true)
      }
    }

    // Set initial state
    updateDeviceType()

    // Add event listener
    window.addEventListener('resize', updateDeviceType)
    
    return () => window.removeEventListener('resize', updateDeviceType)
  }, [])

  return {
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    // Responsive size helpers
    getTextSize: (sizes: { mobile: string; tablet: string; desktop: string }) => {
      switch (deviceType) {
        case 'mobile': return sizes.mobile
        case 'tablet': return sizes.tablet
        case 'desktop': return sizes.desktop
        default: return sizes.desktop
      }
    },
    getButtonSize: (sizes: { mobile: string; tablet: string; desktop: string }) => {
      switch (deviceType) {
        case 'mobile': return sizes.mobile
        case 'tablet': return sizes.tablet
        case 'desktop': return sizes.desktop
        default: return sizes.desktop
      }
    },
    getGridCols: (cols: { mobile: string; tablet: string; desktop: string }) => {
      switch (deviceType) {
        case 'mobile': return cols.mobile
        case 'tablet': return cols.tablet
        case 'desktop': return cols.desktop
        default: return cols.desktop
      }
    }
  }
}
