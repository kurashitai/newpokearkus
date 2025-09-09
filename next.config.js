/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export configuration
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Force dynamic rendering to avoid Framer Motion SSR issues
  experimental: {
    // Force dynamic rendering
    isrMemoryCacheSize: 0,
  },
  
  // Image optimization for static export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features for performance
  experimental: {
    // Modern bundling
    esmExternals: true,
    // Optimize fonts
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Exclude framer-motion from server bundle to prevent SSR issues
    if (isServer) {
      config.externals = [
        ...config.externals,
        'framer-motion',
      ];
      
      // Additional SSR optimizations for problematic modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'framer-motion': false,
      };
    }

    // Only apply optimization changes in production to avoid dev conflicts
    if (!dev) {
      // Optimize bundle splitting
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // Vendor libraries
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              reuseExistingChunk: true,
            },
            // Framer Motion
            framerMotion: {
              test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
              name: 'framer-motion',
              priority: 20,
              reuseExistingChunk: true,
            },
            // UI components
            ui: {
              test: /[\\/]components[\\/](ui)[\\/]/,
              name: 'ui-components',
              priority: 15,
              reuseExistingChunk: true,
            },
            // Common utilities
            utils: {
              test: /[\\/](lib|utils)[\\/]/,
              name: 'utils',
              priority: 12,
              reuseExistingChunk: true,
            },
          },
        },
      };

      // Tree shaking optimizations
      if (!config.optimization.usedExports) {
        config.optimization.usedExports = true;
      }
      config.optimization.sideEffects = false;

      // Minification options
      config.optimization.minimize = true;
      config.optimization.minimizer = [
        ...config.optimization.minimizer,
        new webpack.optimize.ModuleConcatenationPlugin(),
      ];
    }

    // Bundle analyzer (optional)
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: 'bundle-analyzer-report.html',
        })
      );
    }

    // Optimize imports
    config.resolve.alias = {
      ...config.resolve.alias,
      // Reduce bundle size for these libraries
      'date-fns': 'date-fns/esm',
    };

    return config;
  },

  // Headers for caching and security
  // Note: Headers don't work with static export
  // These would be handled by the hosting provider

  // Redirects for SEO
  // Note: Redirects don't work with static export
  // These would be handled by the hosting provider

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version || '1.0.0',
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },

  // TypeScript configuration - enable checking for better code quality
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checking
  },

  // ESLint configuration - enable checking for better code quality
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint checking
  },

  // Powering optimizations
  poweredByHeader: false,
  
  // Compression
  compress: true,

  // Development configuration
  ...(process.env.NODE_ENV === 'development' && {
    // Enable React Strict Mode
    reactStrictMode: true,
  }),

  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    // Generate source maps
    productionBrowserSourceMaps: false,
  }),
};

module.exports = nextConfig;