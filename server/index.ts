import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import path from 'path';
import { apiLimiter, authLimiter, waitlistLimiter, createRateLimiter, suspiciousActivityDetector } from './middleware/rateLimiter';
import { securityHeaders } from './middleware/securityHeaders';
import { logger } from './utils/logger';
import { dbMonitor } from './utils/dbMonitor';
import { cache } from './utils/cache';
import { config, isProduction } from './config';
import { addPerformanceIndexes } from './migrations/add_indexes';
import { WSManager } from './wsManager';

// Initialize Express application
const app = express();

// Apply security headers
app.use(securityHeaders());

// Apply performance monitoring middleware
app.use(logger.trackApiRequest.bind(logger));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser(config.COOKIE_SECRET));

// Apply security middleware
const csrfProtection = csrf({ cookie: { signed: true } });

// Apply suspicious activity detection for all routes
app.use(suspiciousActivityDetector);

// Apply rate limiting middleware to specific API endpoints
app.use('/api/', apiLimiter); // Apply general rate limiting to all API routes
app.use('/api/auth', authLimiter); // Apply stricter rate limiting to auth routes
app.use('/api/waitlist', waitlistLimiter); // Apply stricter rate limiting to waitlist routes

// Apply even stricter rate limiting for sensitive operations
const sensitiveOperationsLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 requests per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many sensitive operations from this IP, please try again after an hour'
});

// Apply the sensitive operations limiter to admin routes
app.use('/api/admin', sensitiveOperationsLimiter);

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

// Database health check endpoint
app.get('/api/health/db', async (_req, res) => {
  const health = await dbMonitor.checkDatabaseHealth();
  
  if (health.healthy) {
    res.json({
      status: 'ok',
      responseTime: `${health.responseTime.toFixed(2)}ms`
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      responseTime: `${health.responseTime.toFixed(2)}ms`
    });
  }
});

// Cache health check endpoint
app.get('/api/health/cache', async (_req, res) => {
  try {
    const stats = await cache.getStats();
    res.json({
      status: stats.connected ? 'ok' : 'error',
      ...stats
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Cache health check failed',
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Performance metrics endpoint (protected)
app.get('/api/admin/performance', sensitiveOperationsLimiter, (_req, res) => {
  const dbStats = dbMonitor.getPerformanceStats();
  const suggestions = dbMonitor.analyzePerformance();
  
  res.json({
    database: {
      queryCount: dbStats.queryCount,
      averageQueryTime: `${dbStats.averageQueryTime.toFixed(2)}ms`,
      slowQueries: dbStats.slowQueries.slice(0, 5), // Show top 5 slow queries
      suggestions
    }
  });
});

// Apply CSRF protection to all routes that change state
app.post('/api/waitlist/join', csrfProtection, (_req, res) => {
  // Handle waitlist join with CSRF protection
  // ...
  res.json({ success: true });
});

app.post('/api/waitlist/refer', csrfProtection, (_req, res) => {
  // Handle waitlist referral with CSRF protection
  // ...
  res.json({ success: true });
});

// Provide CSRF token for forms
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Error handler for CSRF errors
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.code === 'EBADCSRFTOKEN') {
    // Handle CSRF token errors
    logger.warn('CSRF token validation failed', {
      ip: req.ip,
      path: req.path,
      method: req.method,
      headers: req.headers
    });
    
    return res.status(403).json({
      error: 'Invalid or missing CSRF token',
      message: 'Form submission failed due to security validation. Please refresh the page and try again.'
    });
  }
  
  // Pass to the centralized error handler
  next(err);
});

// Centralized error handler
app.use(logger.errorHandler.bind(logger));

// 404 handler
app.use((_req, res) => {
  logger.warn(`404 Not Found: ${_req.method} ${_req.path}`, {
    ip: _req.ip,
    userAgent: _req.get('User-Agent')
  });
  
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found'
  });
});

// Create HTTP server
const server = createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server });
const wsManager = new WSManager(wss);

// Start the server
(async () => {
  try {
    // Run database migrations if needed
    if (!isProduction()) {
      logger.info('Running database migrations in development mode');
      await addPerformanceIndexes();
    }
    
    // Initialize cache
    await cache.connect();
    
    // Start the server
    const PORT = config.PORT || 3000;
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`WebSocket server active with ${wsManager.getClientCount()} connections`);
    });
    
    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully');
      
      // Close server
      server.close(async () => {
        logger.info('HTTP server closed');
        
        // Shutdown WebSocket server
        wsManager.shutdown();
        
        // Disconnect from cache
        await cache.disconnect();
        
        // Exit process
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error('Failed to initialize server', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    process.exit(1);
  }
})();
