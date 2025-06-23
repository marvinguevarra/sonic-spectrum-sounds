
// PWA utility functions for full-screen mode and installation

export const registerServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      console.log('SW registered successfully: ', registration);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, refresh the page
              window.location.reload();
            }
          });
        }
      });
    } catch (registrationError) {
      console.error('SW registration failed: ', registrationError);
    }
  }
};

export const requestFullScreen = (): void => {
  const docEl = document.documentElement;
  
  if (docEl.requestFullscreen) {
    docEl.requestFullscreen();
  } else if ((docEl as any).mozRequestFullScreen) {
    (docEl as any).mozRequestFullScreen();
  } else if ((docEl as any).webkitRequestFullScreen) {
    (docEl as any).webkitRequestFullScreen();
  } else if ((docEl as any).msRequestFullscreen) {
    (docEl as any).msRequestFullscreen();
  }
};

export const exitFullScreen = (): void => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if ((document as any).mozCancelFullScreen) {
    (document as any).mozCancelFullScreen();
  } else if ((document as any).webkitExitFullscreen) {
    (document as any).webkitExitFullscreen();
  } else if ((document as any).msExitFullscreen) {
    (document as any).msExitFullscreen();
  }
};

export const isFullScreen = (): boolean => {
  return !!(
    document.fullscreenElement ||
    (document as any).mozFullScreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).msFullscreenElement
  );
};

export const isPWAInstalled = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.matchMedia('(display-mode: fullscreen)').matches ||
         (window.navigator as any).standalone === true;
};

export const hideAddressBar = (): void => {
  // Force address bar to hide on mobile browsers
  setTimeout(() => {
    window.scrollTo(0, 1);
  }, 100);
  
  // Additional iOS Safari specific handling
  if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }
};

export const setViewportHeight = (): void => {
  // Set CSS custom property for actual viewport height
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Initialize PWA features
export const initializePWA = (): void => {
  // Register service worker
  registerServiceWorker();
  
  // Set up viewport height for mobile
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);
  
  // Hide address bar on mobile
  window.addEventListener('load', hideAddressBar);
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      setViewportHeight();
      hideAddressBar();
    }, 100);
  });
  
  // Prevent zoom on iOS
  document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
  });
  
  // Prevent double-tap zoom
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (e) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  
  // Handle PWA installation
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    (window as any).deferredPrompt = e;
  });
};
