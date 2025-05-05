/**
 * Performance Testing Utilities
 * 
 * This module provides utilities for performance testing and optimization.
 * It includes functions for measuring performance metrics and running Lighthouse audits.
 */

/**
 * Performance metrics to track
 */
export interface PerformanceMetrics {
  FCP: number; // First Contentful Paint
  LCP: number; // Largest Contentful Paint
  CLS: number; // Cumulative Layout Shift
  FID: number; // First Input Delay
  TTI: number; // Time to Interactive
  TBT: number; // Total Blocking Time
}

/**
 * Measure current page performance metrics
 * @returns Promise resolving to performance metrics
 */
export async function measurePerformance(): Promise<Partial<PerformanceMetrics>> {
  return new Promise((resolve) => {
    // Wait for the page to be fully loaded
    if (document.readyState === 'complete') {
      collectMetrics();
    } else {
      window.addEventListener('load', collectMetrics);
    }

    function collectMetrics() {
      // Use Performance API to get metrics
      const metrics: Partial<PerformanceMetrics> = {};
      
      // Use Performance Observer to get LCP
      if ('PerformanceObserver' in window) {
        // LCP
        try {
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            metrics.LCP = lastEntry.startTime;
          });
          
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
          
          // CLS
          const clsObserver = new PerformanceObserver((entryList) => {
            let clsValue = 0;
            for (const entry of entryList.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
            metrics.CLS = clsValue;
          });
          
          clsObserver.observe({ type: 'layout-shift', buffered: true });
          
          // FID
          const fidObserver = new PerformanceObserver((entryList) => {
            const firstInput = entryList.getEntries()[0];
            metrics.FID = (firstInput as any).processingStart - (firstInput as any).startTime;
          });
          
          fidObserver.observe({ type: 'first-input', buffered: true });
        } catch (e) {
          console.error('Error setting up PerformanceObserver:', e);
        }
      }
      
      // Get FCP from performance entries
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        metrics.FCP = fcpEntry.startTime;
      }
      
      // Set a timeout to collect all metrics
      setTimeout(() => {
        resolve(metrics);
      }, 3000); // Wait for 3 seconds to collect metrics
    }
  });
}

/**
 * Log performance metrics to console with formatting
 * @param metrics Performance metrics to log
 */
export function logPerformanceMetrics(metrics: Partial<PerformanceMetrics>): void {
  console.group('Performance Metrics');
  
  if (metrics.FCP !== undefined) {
    console.log(`First Contentful Paint (FCP): ${metrics.FCP.toFixed(2)}ms ${getRating(metrics.FCP, 1800, 3000)}`);
  }
  
  if (metrics.LCP !== undefined) {
    console.log(`Largest Contentful Paint (LCP): ${metrics.LCP.toFixed(2)}ms ${getRating(metrics.LCP, 2500, 4000)}`);
  }
  
  if (metrics.CLS !== undefined) {
    console.log(`Cumulative Layout Shift (CLS): ${metrics.CLS.toFixed(3)} ${getRating(metrics.CLS, 0.1, 0.25, true)}`);
  }
  
  if (metrics.FID !== undefined) {
    console.log(`First Input Delay (FID): ${metrics.FID.toFixed(2)}ms ${getRating(metrics.FID, 100, 300)}`);
  }
  
  if (metrics.TTI !== undefined) {
    console.log(`Time to Interactive (TTI): ${metrics.TTI.toFixed(2)}ms ${getRating(metrics.TTI, 3800, 7300)}`);
  }
  
  if (metrics.TBT !== undefined) {
    console.log(`Total Blocking Time (TBT): ${metrics.TBT.toFixed(2)}ms ${getRating(metrics.TBT, 200, 600)}`);
  }
  
  console.groupEnd();
}

/**
 * Get performance rating (Good, Needs Improvement, Poor)
 * @param value Metric value
 * @param goodThreshold Threshold for "Good" rating
 * @param poorThreshold Threshold for "Poor" rating
 * @param lowerIsBetter Whether lower values are better (default: true)
 * @returns Rating string with emoji
 */
function getRating(value: number, goodThreshold: number, poorThreshold: number, lowerIsBetter: boolean = true): string {
  if (lowerIsBetter) {
    if (value <= goodThreshold) return '✅ Good';
    if (value <= poorThreshold) return '⚠️ Needs Improvement';
    return '❌ Poor';
  } else {
    if (value >= goodThreshold) return '✅ Good';
    if (value >= poorThreshold) return '⚠️ Needs Improvement';
    return '❌ Poor';
  }
}

/**
 * Initialize performance monitoring
 * This can be called in the main application entry point
 */
export function initPerformanceMonitoring(): void {
  if (process.env.NODE_ENV === 'development') {
    window.addEventListener('load', async () => {
      // Wait for the page to be fully loaded and settled
      setTimeout(async () => {
        const metrics = await measurePerformance();
        logPerformanceMetrics(metrics);
      }, 3000);
    });
  }
}
