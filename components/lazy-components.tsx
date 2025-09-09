'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Helper function to create dynamic components with consistent options
function createDynamicComponent<T = any>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: {
    loading?: () => React.ReactElement | null;
    ssr?: boolean;
  } = {}
) {
  return dynamic(importFn, {
    loading: options.loading || (() => null),
    ssr: options.ssr !== false,
  });
}

// Only include components that actually exist and have proper exports
export const LazyHeroStackScroller = createDynamicComponent(
  () => import('./hero-stack-scroller'),
  {
    loading: () => (
      <div className="h-[70vh] lg:h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading banner...</p>
        </div>
      </div>
    ),
    ssr: false,
  }
);

export const LazyPremiumMapInterface = createDynamicComponent(
  () => import('./premium-map-interface'),
  {
    loading: () => (
      <div className="h-96 flex items-center justify-center bg-slate-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading interactive map...</p>
        </div>
      </div>
    ),
    ssr: false,
  }
);

export const LazyModernWikiHub = createDynamicComponent(
  () => import('./modern-wiki-hub'),
  {
    loading: () => (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="h-12 bg-slate-200 rounded animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    ),
    ssr: false,
  }
);

export const LazyPremiumFeatures = createDynamicComponent(
  () => import('./premium-features'),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-40 bg-slate-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    ),
    ssr: false,
  }
);

export const LazyStatsSection = createDynamicComponent(
  () => import('./stats-section'),
  {
    loading: () => (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center space-y-2">
            <div className="h-8 bg-slate-200 rounded animate-pulse"></div>
            <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    ),
    ssr: false,
  }
);

export const LazyCommunitySection = createDynamicComponent(
  () => import('./community-section'),
  {
    loading: () => (
      <div className="space-y-6">
        <div className="h-8 bg-slate-200 rounded animate-pulse w-48 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    ),
    ssr: false,
  }
);

// Provider components
export const LazyMotionProvider = createDynamicComponent(
  () => import('./providers/motion-provider'),
  {
    loading: () => <div></div>,
    ssr: false,
  }
);

export const LazyQueryProvider = createDynamicComponent(
  () => import('./providers/query-provider'),
  {
    loading: () => <div></div>,
  }
);

// Export all working lazy components
export const LazyComponents = {
  HeroStackScroller: LazyHeroStackScroller,
  PremiumMapInterface: LazyPremiumMapInterface,
  ModernWikiHub: LazyModernWikiHub,
  PremiumFeatures: LazyPremiumFeatures,
  StatsSection: LazyStatsSection,
  CommunitySection: LazyCommunitySection,
  MotionProvider: LazyMotionProvider,
  QueryProvider: LazyQueryProvider,
} as const;