/**
 * Security Headers Middleware
 * 
 * This middleware adds various security headers to HTTP responses
 * to protect against common web vulnerabilities.
 */

import { Request, Response, NextFunction } from 'express';

/**
 * Apply security headers to all responses
 */
export function securityHeaders() {
  return (req: Request, res: Response, next: NextFunction) => {
    // Content Security Policy (CSP)
    // Restricts the sources from which resources can be loaded
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://api.peochain.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ');
    
    // Set CSP header
    res.setHeader('Content-Security-Policy', cspDirectives);
    
    // X-Content-Type-Options
    // Prevents browsers from MIME-sniffing a response away from the declared content-type
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // X-Frame-Options
    // Prevents clickjacking attacks by ensuring the page cannot be embedded in a frame
    res.setHeader('X-Frame-Options', 'DENY');
    
    // X-XSS-Protection
    // Enables the Cross-site scripting (XSS) filter in most browsers
    res.setHeader('X-XSS-Protection', '1; mode=block');
    
    // Strict-Transport-Security
    // Enforces secure (HTTPS) connections to the server
    if (process.env.NODE_ENV === 'production') {
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
      );
    }
    
    // Referrer-Policy
    // Controls how much referrer information should be included with requests
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Permissions-Policy (formerly Feature-Policy)
    // Limits which browser features the site can use
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    );
    
    // Cache-Control
    // For dynamic content, prevent caching of sensitive information
    if (req.path.startsWith('/api/')) {
      res.setHeader('Cache-Control', 'no-store, max-age=0');
    }
    
    next();
  };
}
