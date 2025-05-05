/**
 * Suspicious Activity Detection Middleware
 * 
 * This middleware monitors requests for suspicious patterns and behaviors,
 * such as unusual request patterns, potential injection attempts, and other
 * security-related anomalies.
 */

import { Request, Response, NextFunction } from 'express';
import { createHash } from 'crypto';

// Interface for tracking client activity
interface ClientActivity {
  lastRequests: number[];
  suspiciousPatterns: number;
  blockedUntil?: Date;
  ipHash: string;
}

// Configuration options for the middleware
interface SuspiciousActivityOptions {
  windowMs: number;
  maxSuspiciousPatterns: number;
  blockDurationMs: number;
  logOnly: boolean;
}

// Default configuration
const DEFAULT_OPTIONS: SuspiciousActivityOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxSuspiciousPatterns: 5, // Number of suspicious patterns before blocking
  blockDurationMs: 60 * 60 * 1000, // 1 hour block
  logOnly: false // Set to true to only log suspicious activity without blocking
};

// Store client activity data
const clientActivityMap = new Map<string, ClientActivity>();

// Patterns to detect in requests
const SUSPICIOUS_PATTERNS = [
  /(\b|_)((select|update|delete|insert|drop|alter)\s+)/i, // SQL injection
  /<script.*?>.*?<\/script>/i, // XSS attempts
  /\.\.\//g, // Path traversal
  /\$\{.*?\}/g, // Template injection
  /\b(exec|system|passthru|eval)\s*\(/i, // Command injection
];

/**
 * Hash an IP address to protect privacy while still allowing tracking
 */
function hashIpAddress(ip: string): string {
  return createHash('sha256').update(ip).digest('hex');
}

/**
 * Check if a request contains suspicious patterns
 */
function containsSuspiciousPatterns(req: Request): boolean {
  // Check URL parameters
  const url = req.originalUrl || req.url;
  
  // Check request body if it exists
  const body = typeof req.body === 'string' 
    ? req.body 
    : JSON.stringify(req.body || '');
  
  // Check headers for suspicious content
  const headers = JSON.stringify(req.headers);
  
  // Combine all request data to check
  const requestData = `${url}|${body}|${headers}`;
  
  // Check against suspicious patterns
  return SUSPICIOUS_PATTERNS.some(pattern => pattern.test(requestData));
}

/**
 * Clean up old client activity data
 */
function cleanupOldData(windowMs: number): void {
  const now = Date.now();
  
  for (const [key, activity] of clientActivityMap.entries()) {
    // Remove entries with no recent requests
    if (activity.lastRequests.length === 0 || 
        now - Math.max(...activity.lastRequests) > windowMs * 2) {
      clientActivityMap.delete(key);
    }
    
    // Remove expired blocks
    if (activity.blockedUntil && activity.blockedUntil < new Date()) {
      activity.blockedUntil = undefined;
    }
    
    // Remove old request timestamps
    activity.lastRequests = activity.lastRequests.filter(
      timestamp => now - timestamp <= windowMs
    );
  }
}

/**
 * Create suspicious activity detection middleware
 */
export function createSuspiciousActivityDetection(options: Partial<SuspiciousActivityOptions> = {}) {
  // Merge provided options with defaults
  const mergedOptions: SuspiciousActivityOptions = {
    ...DEFAULT_OPTIONS,
    ...options
  };
  
  // Set up periodic cleanup
  setInterval(
    () => cleanupOldData(mergedOptions.windowMs),
    mergedOptions.windowMs / 2
  );
  
  // Return the middleware function
  return function suspiciousActivityDetection(req: Request, res: Response, next: NextFunction) {
    // Get client IP
    const clientIp = req.ip || req.socket.remoteAddress || '0.0.0.0';
    const ipHash = hashIpAddress(clientIp);
    
    // Get or create client activity record
    let clientActivity = clientActivityMap.get(ipHash);
    if (!clientActivity) {
      clientActivity = {
        lastRequests: [],
        suspiciousPatterns: 0,
        ipHash
      };
      clientActivityMap.set(ipHash, clientActivity);
    }
    
    // Check if client is blocked
    if (clientActivity.blockedUntil && clientActivity.blockedUntil > new Date()) {
      if (mergedOptions.logOnly) {
        console.warn(`Suspicious activity detected from ${ipHash} (currently in block period)`);
      } else {
        return res.status(403).json({
          error: 'Access temporarily blocked due to suspicious activity',
          retryAfter: Math.ceil((clientActivity.blockedUntil.getTime() - Date.now()) / 1000)
        });
      }
    }
    
    // Record this request
    const now = Date.now();
    clientActivity.lastRequests.push(now);
    
    // Check for suspicious patterns
    if (containsSuspiciousPatterns(req)) {
      clientActivity.suspiciousPatterns++;
      
      console.warn(`Suspicious pattern detected from ${ipHash} (count: ${clientActivity.suspiciousPatterns})`);
      
      // Block client if too many suspicious patterns
      if (clientActivity.suspiciousPatterns >= mergedOptions.maxSuspiciousPatterns) {
        const blockUntil = new Date(now + mergedOptions.blockDurationMs);
        clientActivity.blockedUntil = blockUntil;
        
        console.warn(`Client ${ipHash} blocked until ${blockUntil.toISOString()}`);
        
        if (!mergedOptions.logOnly) {
          return res.status(403).json({
            error: 'Access temporarily blocked due to suspicious activity',
            retryAfter: Math.ceil(mergedOptions.blockDurationMs / 1000)
          });
        }
      }
    }
    
    // Continue to next middleware
    next();
  };
}

// Export a default instance with standard settings
export const suspiciousActivityDetection = createSuspiciousActivityDetection();
