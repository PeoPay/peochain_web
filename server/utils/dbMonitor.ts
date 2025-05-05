/**
 * Database Performance Monitoring Utility
 * 
 * This module provides utilities for monitoring database performance,
 * tracking slow queries, and optimizing database operations.
 */

import { logger } from './logger';
import { db } from '../db';
import { sql } from 'drizzle-orm';

// Interface for query metrics
interface QueryMetric {
  query: string;
  duration: number;
  timestamp: number;
  params?: any[];
}

// Configuration for the DB monitor
interface DBMonitorConfig {
  slowQueryThreshold: number; // in milliseconds
  logAllQueries: boolean;
  trackTopSlowQueries: number;
}

class DBMonitor {
  private config: DBMonitorConfig;
  private slowQueries: QueryMetric[] = [];
  private queryCount = 0;
  private totalQueryTime = 0;
  
  constructor(config?: Partial<DBMonitorConfig>) {
    // Default configuration
    this.config = {
      slowQueryThreshold: 100, // 100ms
      logAllQueries: process.env.NODE_ENV !== 'production',
      trackTopSlowQueries: 20,
      ...config
    };
    
    // Initialize monitoring
    this.setupMonitoring();
  }
  
  /**
   * Execute a query with performance tracking
   */
  async executeQuery<T>(
    queryName: string,
    queryFn: () => Promise<T>,
    params?: any[]
  ): Promise<T> {
    const start = performance.now();
    
    try {
      // Execute the query
      const result = await queryFn();
      
      // Calculate duration
      const duration = performance.now() - start;
      
      // Track query metrics
      this.trackQuery(queryName, duration, params);
      
      return result;
    } catch (error) {
      // Log error with query information
      logger.error(`Database query error: ${queryName}`, {
        error: error instanceof Error ? error.message : String(error),
        params,
        duration: performance.now() - start
      });
      
      throw error;
    }
  }
  
  /**
   * Track a query's performance metrics
   */
  private trackQuery(query: string, duration: number, params?: any[]): void {
    // Update overall stats
    this.queryCount++;
    this.totalQueryTime += duration;
    
    // Log all queries if configured
    if (this.config.logAllQueries) {
      logger.debug(`DB Query: ${query}`, {
        duration: `${duration.toFixed(2)}ms`,
        params
      });
    }
    
    // Track slow queries
    if (duration > this.config.slowQueryThreshold) {
      logger.warn(`Slow query detected: ${query}`, {
        duration: `${duration.toFixed(2)}ms`,
        params
      });
      
      // Add to slow queries list
      this.slowQueries.push({
        query,
        duration,
        timestamp: Date.now(),
        params
      });
      
      // Keep only the top N slowest queries
      if (this.slowQueries.length > this.config.trackTopSlowQueries) {
        this.slowQueries.sort((a, b) => b.duration - a.duration);
        this.slowQueries = this.slowQueries.slice(0, this.config.trackTopSlowQueries);
      }
    }
  }
  
  /**
   * Get database performance statistics
   */
  getPerformanceStats() {
    return {
      queryCount: this.queryCount,
      totalQueryTime: this.totalQueryTime,
      averageQueryTime: this.queryCount > 0 ? this.totalQueryTime / this.queryCount : 0,
      slowQueries: this.slowQueries.slice().sort((a, b) => b.duration - a.duration),
    };
  }
  
  /**
   * Reset performance statistics
   */
  resetStats(): void {
    this.queryCount = 0;
    this.totalQueryTime = 0;
    this.slowQueries = [];
  }
  
  /**
   * Check database health
   */
  async checkDatabaseHealth(): Promise<{ healthy: boolean; responseTime: number }> {
    const start = performance.now();
    
    try {
      // Simple query to check database connectivity
      await db.execute(sql`SELECT 1`);
      
      const responseTime = performance.now() - start;
      return { healthy: true, responseTime };
    } catch (error) {
      logger.error('Database health check failed', {
        error: error instanceof Error ? error.message : String(error)
      });
      
      return { healthy: false, responseTime: performance.now() - start };
    }
  }
  
  /**
   * Setup query monitoring
   */
  private setupMonitoring(): void {
    // Log database stats periodically in development
    if (process.env.NODE_ENV !== 'production') {
      setInterval(() => {
        const stats = this.getPerformanceStats();
        
        if (stats.queryCount > 0) {
          logger.info('Database performance stats', {
            queryCount: stats.queryCount,
            averageQueryTime: `${stats.averageQueryTime.toFixed(2)}ms`,
            totalQueryTime: `${stats.totalQueryTime.toFixed(2)}ms`,
            slowQueryCount: stats.slowQueries.length
          });
          
          // Reset stats after reporting
          this.resetStats();
        }
      }, 60000); // Log every minute
    }
  }
  
  /**
   * Analyze database performance and suggest optimizations
   */
  analyzePerformance(): string[] {
    const stats = this.getPerformanceStats();
    const suggestions: string[] = [];
    
    // Check for overall performance issues
    if (stats.averageQueryTime > 50) {
      suggestions.push('Average query time is high. Consider adding indexes or optimizing queries.');
    }
    
    // Check for frequent slow queries
    if (stats.slowQueries.length > 5) {
      suggestions.push('Multiple slow queries detected. Review the slow query log for optimization opportunities.');
    }
    
    // Analyze slow queries for patterns
    const queryPatterns: Record<string, number> = {};
    
    for (const slowQuery of stats.slowQueries) {
      // Extract operation type (SELECT, INSERT, UPDATE, DELETE)
      const match = slowQuery.query.match(/^(SELECT|INSERT|UPDATE|DELETE)/i);
      const operationType = match ? match[1].toUpperCase() : 'OTHER';
      
      queryPatterns[operationType] = (queryPatterns[operationType] || 0) + 1;
    }
    
    // Suggest optimizations based on patterns
    if (queryPatterns['SELECT'] > 3) {
      suggestions.push('Multiple slow SELECT queries. Consider adding indexes or implementing query caching.');
    }
    
    if (queryPatterns['INSERT'] > 3) {
      suggestions.push('Multiple slow INSERT queries. Consider using bulk inserts or optimizing table structure.');
    }
    
    if (queryPatterns['UPDATE'] > 3) {
      suggestions.push('Multiple slow UPDATE queries. Check for missing indexes on columns used in WHERE clauses.');
    }
    
    return suggestions;
  }
}

// Export a singleton instance
export const dbMonitor = new DBMonitor();

// Export a decorator for tracking database methods
export function trackDatabaseMethod(operationName?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const methodName = operationName || `${target.constructor.name}.${propertyKey}`;
    
    descriptor.value = async function (...args: any[]) {
      return dbMonitor.executeQuery(methodName, () => originalMethod.apply(this, args), args);
    };
    
    return descriptor;
  };
}
