/**
 * Rate Limiting Middleware
 * 
 * This module implements API rate limiting to prevent abuse of the system,
 * particularly the waitlist and referral features. It supports both memory-based
 * and Redis-based stores for distributed rate limiting in a multi-instance environment.
 */

import rateLimit from 'express-rate-limit';
import { MemoryStore } from 'express-rate-limit';
import { createClient } from 'redis';
import { RedisStore } from 'rate-limit-redis';
import { log } from '../vite';

// Default rate limit settings
const DEFAULT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const DEFAULT_MAX_REQUESTS = 100; // 100 requests per window

// Rate limiter for the waitlist API
export const createWaitlistRateLimiter = async () => {
  // Allow more relaxed limits in development mode
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const windowMs = isDevelopment ? 5 * 60 * 1000 : DEFAULT_WINDOW_MS; // 5 min in dev, 15 min in prod
  const maxRequests = isDevelopment ? 50 : 10; // 50 per window in dev, 10 in prod
  
  // Attempt to use Redis if configured, fall back to memory store
  let store: MemoryStore | RedisStore;
  
  try {
    if (process.env.REDIS_URL) {
      const redisClient = createClient({ url: process.env.REDIS_URL });
      await redisClient.connect();
      
      store = new RedisStore({
        client: redisClient,
        prefix: 'waitlist:ratelimit:',
        sendCommand: (...args: string[]) => redisClient.sendCommand(args)
      });
      
      log('Using Redis store for rate limiting', 'rate-limit');
    } else {
      store = new MemoryStore();
      log('Using Memory store for rate limiting', 'rate-limit');
    }
  } catch (error) {
    log(`Error configuring Redis for rate limiting: ${error}`, 'rate-limit');
    store = new MemoryStore();
    log('Falling back to Memory store for rate limiting', 'rate-limit');
  }
  
  return rateLimit({
    windowMs,
    max: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    store,
    skipSuccessfulRequests: false,
    message: {
      success: false,
      message: 'Too many sign-up attempts. Please try again later.'
    },
    keyGenerator: (req) => {
      // Use both IP and email (if provided) for more precise rate limiting
      const ip = req.ip || req.socket.remoteAddress || '0.0.0.0';
      const email = req.body?.email || '';
      return `${ip}:${email}`;
    }
  });
};

// Rate limiter for referral code lookups
export const createReferralRateLimiter = async () => {
  // Set stricter limits for referral lookups to prevent scanning
  const windowMs = DEFAULT_WINDOW_MS;
  const maxRequests = 30; // 30 lookups per window
  
  // Use memory store for simplicity
  const store = new MemoryStore();
  
  return rateLimit({
    windowMs,
    max: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    store,
    message: {
      success: false,
      message: 'Too many referral code lookups. Please try again later.'
    }
  });
};