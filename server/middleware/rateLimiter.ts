import { Request, Response, NextFunction } from 'express';
import { rateLimit, Options } from 'express-rate-limit';

// Define rate limit configurations for different endpoints
const rateLimitConfig = {
  // General API rate limit
  api: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again after 15 minutes'
  },
  
  // Authentication endpoints (login, register)
  auth: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 auth requests per hour
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many authentication attempts from this IP, please try again after an hour'
  },
  
  // Waitlist signup endpoint
  waitlist: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 waitlist signups per hour
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many waitlist signup attempts from this IP, please try again after an hour'
  }
};

// Create rate limiters
export const apiLimiter = rateLimit(rateLimitConfig.api);
export const authLimiter = rateLimit(rateLimitConfig.auth);
export const waitlistLimiter = rateLimit(rateLimitConfig.waitlist);

/**
 * Create a customized rate limiter with specified options
 * @param options Rate limiting options
 * @returns Express middleware for rate limiting
 */
export function createRateLimiter(options: Partial<Options>) {
  return rateLimit({
    windowMs: options.windowMs || 60 * 60 * 1000, // Default: 1 hour
    max: options.max || 100, // Default: 100 requests per windowMs
    standardHeaders: options.standardHeaders !== undefined ? options.standardHeaders : true,
    legacyHeaders: options.legacyHeaders !== undefined ? options.legacyHeaders : false,
    message: options.message || 'Rate limit exceeded, please try again later',
    ...options
  });
}

// Custom rate limiter for specific IP addresses or users
export function createDynamicRateLimiter(options: {
  windowMs?: number;
  max?: number;
  keyGenerator?: (req: Request) => string;
}) {
  return rateLimit({
    windowMs: options.windowMs || 60 * 60 * 1000, // Default: 1 hour
    max: options.max || 100, // Default: 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: options.keyGenerator || ((req) => req.ip || 'unknown'),
    message: 'Rate limit exceeded, please try again later'
  });
}

// Middleware to detect and block suspicious activity
export function suspiciousActivityDetector(req: Request, res: Response, next: NextFunction) {
  // Check for common attack patterns
  const userAgent = req.headers['user-agent'] || '';
  const suspiciousUserAgents = ['sqlmap', 'nikto', 'nmap', 'masscan', 'ZmEu'];
  
  // Check if the request has a suspicious user agent
  if (suspiciousUserAgents.some(agent => userAgent.toLowerCase().includes(agent.toLowerCase()))) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  // Check for SQL injection attempts in query parameters
  const queryParams = Object.values(req.query).join(' ');
  const sqlInjectionPatterns = ['SELECT', 'UNION', 'INSERT', 'DROP', 'DELETE', 'UPDATE', '--', '/*', '*/'];
  
  if (sqlInjectionPatterns.some(pattern => 
    queryParams.toUpperCase().includes(pattern) && 
    !req.path.includes('/graphql') // Exclude GraphQL queries which might legitimately contain these
  )) {
    return res.status(403).json({ error: 'Access denied' });
  }
  
  next();
}
