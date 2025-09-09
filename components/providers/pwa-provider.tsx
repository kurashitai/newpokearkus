'use client';

import { useEffect, useState, createContext, useContext, ReactNode } from 'react';

interface PWAContextType {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  isUpdateAvailable: boolean;
  promptInstall: () => void;
  updateApp: () => void;
  deferredPrompt: BeforeInstallPromptEvent | null;
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

export const usePWA = () => {
  const context = useContext(PWAContext);
  if (context === undefined) {
    throw new Error('usePWA must be used within a PWAProvider');
  }
  return context;
};

interface PWAProviderProps {
  children: ReactNode;
}

export function PWAProvider({ children }: PWAProviderProps) {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [serviceWorker, setServiceWorker] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Check if app is installed
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInWebAppScope = (window.navigator as any)?.standalone === true;
      setIsInstalled(isStandalone || isInWebAppScope);
    };

    checkInstalled();

    // Register service worker
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none'
          });

          setServiceWorker(registration);

          console.log('PWA: Service Worker registered successfully');

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setIsUpdateAvailable(true);
                  console.log('PWA: New version available');
                }
              });
            }
          });

          // Handle service worker messages
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'SW_UPDATE_AVAILABLE') {
              setIsUpdateAvailable(true);
            }
          });

        } catch (error) {
          console.error('PWA: Service Worker registration failed:', error);
        }
      }
    };

    registerServiceWorker();

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      console.log('PWA: Install prompt available');
    };

    // Handle app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      console.log('PWA: App installed successfully');
    };

    // Handle online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      console.log('PWA: App is online');
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log('PWA: App is offline');
    };

    // Set initial online status
    setIsOnline(navigator.onLine);

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const promptInstall = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          console.log('PWA: User accepted the install prompt');
        } else {
          console.log('PWA: User dismissed the install prompt');
        }
        
        setDeferredPrompt(null);
        setIsInstallable(false);
      } catch (error) {
        console.error('PWA: Error prompting install:', error);
      }
    }
  };

  const updateApp = () => {
    if (serviceWorker && serviceWorker.waiting) {
      serviceWorker.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  };

  // Preload critical resources
  useEffect(() => {
    const preloadResources = () => {
      const criticalResources = [
        '/logo.png',
        '/POKEARKUS.jpg',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png'
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.png') || resource.endsWith('.jpg') ? 'image' : 'fetch';
        document.head.appendChild(link);
      });
    };

    preloadResources();
  }, []);

  // Background sync for offline actions
  const registerBackgroundSync = (tag: string, data?: any) => {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then(registration => {
        return (registration as any).sync.register(tag);
      }).catch(error => {
        console.error('PWA: Background sync registration failed:', error);
      });
    }
  };

  // Push notification subscription
  const subscribeToPushNotifications = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        });

        console.log('PWA: Push notification subscription successful');
        return subscription;
      } catch (error) {
        console.error('PWA: Push notification subscription failed:', error);
        return null;
      }
    }
    return null;
  };

  const contextValue: PWAContextType = {
    isInstallable,
    isInstalled,
    isOnline,
    isUpdateAvailable,
    promptInstall,
    updateApp,
    deferredPrompt
  };

  return (
    <PWAContext.Provider value={contextValue}>
      {children}
    </PWAContext.Provider>
  );
}

// PWA Install Button Component
interface PWAInstallButtonProps {
  className?: string;
  children?: ReactNode;
}

export function PWAInstallButton({ className, children }: PWAInstallButtonProps) {
  const { isInstallable, promptInstall } = usePWA();

  if (!isInstallable) {
    return null;
  }

  return (
    <button
      onClick={promptInstall}
      className={className}
      aria-label="Install PokeArkus App"
    >
      {children || '📱 Install App'}
    </button>
  );
}

// PWA Update Banner Component
interface PWAUpdateBannerProps {
  className?: string;
}

export function PWAUpdateBanner({ className }: PWAUpdateBannerProps) {
  const { isUpdateAvailable, updateApp } = usePWA();

  if (!isUpdateAvailable) {
    return null;
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className="bg-blue-600 text-white px-4 py-3 text-center">
        <span className="mr-4">🚀 A new version of PokeArkus is available!</span>
        <button
          onClick={updateApp}
          className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
        >
          Update Now
        </button>
      </div>
    </div>
  );
}

// PWA Offline Indicator Component
interface PWAOfflineIndicatorProps {
  className?: string;
}

export function PWAOfflineIndicator({ className }: PWAOfflineIndicatorProps) {
  const { isOnline } = usePWA();

  if (isOnline) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 md:bottom-6 left-4 z-50 ${className}`}>
      <div className="bg-yellow-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        <span className="text-sm font-medium">Offline Mode</span>
      </div>
    </div>
  );
}