'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, HardDrive, Zap, X } from 'lucide-react';
import { usePerformanceMonitor, useMemoryMonitor } from '@/lib/performance';

interface PerformanceMonitorProps {
  enabled?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  showInProduction?: boolean;
}

export function PerformanceMonitor({ 
  enabled = true, 
  position = 'bottom-right',
  showInProduction = false 
}: PerformanceMonitorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const performanceMetrics = usePerformanceMonitor();
  const memoryInfo = useMemoryMonitor();

  // Don't show in production unless explicitly enabled
  useEffect(() => {
    const shouldShow = enabled && (process.env.NODE_ENV === 'development' || showInProduction);
    setIsVisible(shouldShow);
  }, [enabled, showInProduction]);

  if (!isVisible) return null;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (time: number) => {
    return time.toFixed(2) + 'ms';
  };

  const getPerformanceColor = (metric: string, value: number) => {
    switch (metric) {
      case 'lcp':
        return value <= 2500 ? 'text-green-500' : value <= 4000 ? 'text-yellow-500' : 'text-red-500';
      case 'fid':
        return value <= 100 ? 'text-green-500' : value <= 300 ? 'text-yellow-500' : 'text-red-500';
      case 'cls':
        return value <= 0.1 ? 'text-green-500' : value <= 0.25 ? 'text-yellow-500' : 'text-red-500';
      case 'ttfb':
        return value <= 800 ? 'text-green-500' : value <= 1800 ? 'text-yellow-500' : 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className={`fixed z-[9999] ${positionClasses[position]}`}>
      <AnimatePresence>
        {!isExpanded ? (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsExpanded(true)}
            className="w-12 h-12 bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 hover:bg-black/90 transition-colors"
          >
            <Activity className="w-5 h-5" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-black/90 text-white rounded-lg p-4 backdrop-blur-md border border-white/20 min-w-80 max-w-96"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Performance Monitor
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Core Web Vitals */}
            <div className="space-y-3 mb-4">
              <h4 className="text-sm font-medium text-white/80 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Core Web Vitals
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-white/60">LCP:</span>
                    <span className={performanceMetrics.lcp ? getPerformanceColor('lcp', performanceMetrics.lcp) : 'text-white/40'}>
                      {performanceMetrics.lcp ? formatTime(performanceMetrics.lcp) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">FID:</span>
                    <span className={performanceMetrics.fid ? getPerformanceColor('fid', performanceMetrics.fid) : 'text-white/40'}>
                      {performanceMetrics.fid ? formatTime(performanceMetrics.fid) : 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-white/60">CLS:</span>
                    <span className={performanceMetrics.cls ? getPerformanceColor('cls', performanceMetrics.cls) : 'text-white/40'}>
                      {performanceMetrics.cls ? performanceMetrics.cls.toFixed(3) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">TTFB:</span>
                    <span className={performanceMetrics.ttfb ? getPerformanceColor('ttfb', performanceMetrics.ttfb) : 'text-white/40'}>
                      {performanceMetrics.ttfb ? formatTime(performanceMetrics.ttfb) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Memory Usage */}
            {memoryInfo.usedJSHeapSize && (
              <div className="space-y-3 mb-4">
                <h4 className="text-sm font-medium text-white/80 flex items-center gap-1">
                  <Cpu className="w-3 h-3" />
                  Memory Usage
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/60">Used:</span>
                    <span className="text-blue-400">
                      {formatBytes(memoryInfo.usedJSHeapSize)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Total:</span>
                    <span className="text-white/80">
                      {formatBytes(memoryInfo.totalJSHeapSize || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Limit:</span>
                    <span className="text-white/60">
                      {formatBytes(memoryInfo.jsHeapSizeLimit || 0)}
                    </span>
                  </div>
                  
                  {/* Memory Usage Bar */}
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (memoryInfo.usedJSHeapSize / (memoryInfo.totalJSHeapSize || 1)) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Performance Tips */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-white/80 flex items-center gap-1">
                <HardDrive className="w-3 h-3" />
                Quick Tips
              </h4>
              <div className="text-xs text-white/60 space-y-1">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full" />
                  <span>LCP &lt; 2.5s (Good)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full" />
                  <span>FID &lt; 100ms (Good)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full" />
                  <span>CLS &lt; 0.1 (Good)</span>
                </div>
              </div>
            </div>

            {/* Environment Info */}
            <div className="mt-4 pt-3 border-t border-white/20 text-xs text-white/40">
              <div className="flex justify-between">
                <span>Environment:</span>
                <span className="text-white/60">{process.env.NODE_ENV}</span>
              </div>
              <div className="flex justify-between">
                <span>Build:</span>
                <span className="text-white/60">{process.env.NEXT_PUBLIC_BUILD_TIME?.slice(0, 10) || 'Unknown'}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Performance Alert Component
interface PerformanceAlertProps {
  threshold?: {
    lcp?: number;
    fid?: number;
    cls?: number;
  };
}

export function PerformanceAlert({ threshold = { lcp: 4000, fid: 300, cls: 0.25 } }: PerformanceAlertProps) {
  const [alerts, setAlerts] = useState<string[]>([]);
  const performanceMetrics = usePerformanceMonitor();

  useEffect(() => {
    const newAlerts: string[] = [];

    if (performanceMetrics.lcp && performanceMetrics.lcp > (threshold.lcp || 4000)) {
      newAlerts.push(`LCP is slow: ${performanceMetrics.lcp.toFixed(2)}ms`);
    }

    if (performanceMetrics.fid && performanceMetrics.fid > (threshold.fid || 300)) {
      newAlerts.push(`FID is high: ${performanceMetrics.fid.toFixed(2)}ms`);
    }

    if (performanceMetrics.cls && performanceMetrics.cls > (threshold.cls || 0.25)) {
      newAlerts.push(`CLS is high: ${performanceMetrics.cls.toFixed(3)}`);
    }

    setAlerts(newAlerts);
  }, [performanceMetrics, threshold]);

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999]">
      <AnimatePresence>
        {alerts.map((alert, index) => (
          <motion.div
            key={alert}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg mb-2 shadow-lg text-sm font-medium"
          >
            ⚠️ Performance Alert: {alert}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}