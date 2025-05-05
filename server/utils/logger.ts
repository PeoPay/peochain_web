/**
 * Centralized logging utility for the application
 * 
 * This module provides structured logging with different log levels,
 * performance tracking, and error handling capabilities.
 */

import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';

// Log levels
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

// Log entry interface
interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  context?: Record<string, any>;
}

// Performance metrics interface
interface PerformanceMetric {
  operation: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  success: boolean;
  metadata?: Record<string, any>;
}

class Logger {
  private logLevel: LogLevel;
  private logToConsole: boolean;
  private logToFile: boolean;
  private logFilePath: string;
  private performanceMetrics: Map<string, PerformanceMetric>;
  
  constructor() {
    // Set log level based on environment
    this.logLevel = process.env.NODE_ENV === 'production' 
      ? LogLevel.INFO 
      : LogLevel.DEBUG;
    
    // Configure logging targets
    this.logToConsole = true;
    this.logToFile = process.env.NODE_ENV === 'production';
    this.logFilePath = path.join(process.cwd(), 'logs');
    this.performanceMetrics = new Map();
    
    // Create logs directory if it doesn't exist
    if (this.logToFile && !fs.existsSync(this.logFilePath)) {
      fs.mkdirSync(this.logFilePath, { recursive: true });
    }
  }
  
  /**
   * Log an error message
   */
  error(message: string, context?: Record<string, any>): void {
    if (this.logLevel >= LogLevel.ERROR) {
      this.log('ERROR', message, context);
    }
  }
  
  /**
   * Log a warning message
   */
  warn(message: string, context?: Record<string, any>): void {
    if (this.logLevel >= LogLevel.WARN) {
      this.log('WARN', message, context);
    }
  }
  
  /**
   * Log an info message
   */
  info(message: string, context?: Record<string, any>): void {
    if (this.logLevel >= LogLevel.INFO) {
      this.log('INFO', message, context);
    }
  }
  
  /**
   * Log a debug message
   */
  debug(message: string, context?: Record<string, any>): void {
    if (this.logLevel >= LogLevel.DEBUG) {
      this.log('DEBUG', message, context);
    }
  }
  
  /**
   * Start tracking performance for an operation
   */
  startPerformanceMetric(operation: string, metadata?: Record<string, any>): string {
    const id = this.generateMetricId(operation);
    
    this.performanceMetrics.set(id, {
      operation,
      startTime: performance.now(),
      success: true, // Assume success until marked as failure
      metadata
    });
    
    return id;
  }
  
  /**
   * End tracking performance for an operation
   */
  endPerformanceMetric(id: string, success: boolean = true): void {
    const metric = this.performanceMetrics.get(id);
    
    if (metric) {
      metric.endTime = performance.now();
      metric.duration = metric.endTime - metric.startTime;
      metric.success = success;
      
      // Log the performance metric
      this.info(`Performance: ${metric.operation}`, {
        duration: `${metric.duration.toFixed(2)}ms`,
        success: metric.success,
        ...metric.metadata
      });
      
      // Remove the metric from the map
      this.performanceMetrics.delete(id);
    }
  }
  
  /**
   * Track database query performance
   */
  async trackDatabaseQuery<T>(
    operation: string, 
    queryFn: () => Promise<T>, 
    metadata?: Record<string, any>
  ): Promise<T> {
    const metricId = this.startPerformanceMetric(`DB:${operation}`, metadata);
    
    try {
      const result = await queryFn();
      this.endPerformanceMetric(metricId, true);
      return result;
    } catch (error) {
      this.endPerformanceMetric(metricId, false);
      this.error(`Database query error: ${operation}`, {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        ...metadata
      });
      throw error;
    }
  }
  
  /**
   * Track API request performance
   */
  trackApiRequest(req: any, res: any, next: any): void {
    const startTime = performance.now();
    const requestId = this.generateMetricId(`API:${req.method}:${req.path}`);
    
    // Store request ID for correlation
    req.requestId = requestId;
    
    // Log request
    this.info(`API Request: ${req.method} ${req.path}`, {
      requestId,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      query: req.query,
      body: this.sanitizeRequestBody(req.body)
    });
    
    // Track response time
    res.on('finish', () => {
      const duration = performance.now() - startTime;
      const success = res.statusCode < 400;
      
      this.info(`API Response: ${req.method} ${req.path}`, {
        requestId,
        statusCode: res.statusCode,
        duration: `${duration.toFixed(2)}ms`,
        success
      });
    });
    
    next();
  }
  
  /**
   * Create a centralized error handler middleware
   */
  errorHandler(err: any, req: any, res: any, next: any): void {
    // Log the error
    this.error(`Unhandled error: ${err.message}`, {
      requestId: req.requestId,
      stack: err.stack,
      path: req.path,
      method: req.method
    });
    
    // Send appropriate response
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 
      ? 'Internal Server Error' 
      : err.message || 'An error occurred';
    
    res.status(statusCode).json({
      error: message,
      requestId: req.requestId
    });
  }
  
  /**
   * Set the log level
   */
  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }
  
  /**
   * Internal method to log a message
   */
  private log(level: string, message: string, context?: Record<string, any>): void {
    const timestamp = new Date().toISOString();
    const logEntry: LogEntry = {
      timestamp,
      level,
      message,
      context
    };
    
    // Log to console
    if (this.logToConsole) {
      const coloredLevel = this.colorizeLevel(level);
      console.log(`[${timestamp}] ${coloredLevel}: ${message}`);
      
      if (context) {
        console.log(context);
      }
    }
    
    // Log to file
    if (this.logToFile) {
      const logFile = path.join(this.logFilePath, `${this.getDateString()}.log`);
      const logLine = JSON.stringify(logEntry) + '\n';
      
      fs.appendFile(logFile, logLine, (err) => {
        if (err) {
          console.error(`Failed to write to log file: ${err.message}`);
        }
      });
    }
  }
  
  /**
   * Generate a unique ID for a metric
   */
  private generateMetricId(operation: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const hash = createHash('md5')
      .update(`${operation}:${timestamp}:${random}`)
      .digest('hex')
      .substring(0, 8);
    
    return hash;
  }
  
  /**
   * Get the current date as a string (YYYY-MM-DD)
   */
  private getDateString(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }
  
  /**
   * Colorize log level for console output
   */
  private colorizeLevel(level: string): string {
    switch (level) {
      case 'ERROR':
        return '\x1b[31mERROR\x1b[0m'; // Red
      case 'WARN':
        return '\x1b[33mWARN\x1b[0m';  // Yellow
      case 'INFO':
        return '\x1b[36mINFO\x1b[0m';  // Cyan
      case 'DEBUG':
        return '\x1b[90mDEBUG\x1b[0m'; // Gray
      default:
        return level;
    }
  }
  
  /**
   * Sanitize request body to remove sensitive information
   */
  private sanitizeRequestBody(body: any): any {
    if (!body) return body;
    
    const sensitiveFields = ['password', 'token', 'secret', 'key', 'apiKey', 'credit_card'];
    const sanitized = { ...body };
    
    for (const field of sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = '***REDACTED***';
      }
    }
    
    return sanitized;
  }
}

// Export a singleton instance
export const logger = new Logger();

// Export a performance tracking decorator for class methods
export function trackPerformance(operation?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const operationName = operation || `${target.constructor.name}.${propertyKey}`;
    
    descriptor.value = async function (...args: any[]) {
      const metricId = logger.startPerformanceMetric(operationName);
      
      try {
        const result = await originalMethod.apply(this, args);
        logger.endPerformanceMetric(metricId, true);
        return result;
      } catch (error) {
        logger.endPerformanceMetric(metricId, false);
        throw error;
      }
    };
    
    return descriptor;
  };
}
