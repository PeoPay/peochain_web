/**
 * Application Configuration
 * 
 * This module centralizes configuration management using environment variables
 * with proper validation and defaults for different environments.
 */

import { z } from 'zod';
import { logger } from './utils/logger';

// Define environment type
export enum Environment {
  Development = 'development',
  Test = 'test',
  Production = 'production'
}

// Configuration schema with validation
const configSchema = z.object({
  // Environment
  NODE_ENV: z.enum([Environment.Development, Environment.Test, Environment.Production])
    .default(Environment.Development),
  
  // Server
  PORT: z.coerce.number().int().positive().default(3000),
  HOST: z.string().default('0.0.0.0'),
  
  // Database
  DATABASE_URL: z.string(),
  DB_POOL_SIZE: z.coerce.number().int().positive().default(10),
  DB_IDLE_TIMEOUT: z.coerce.number().int().positive().default(30000),
  
  // Redis Cache
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
  REDIS_PASSWORD: z.string().optional(),
  
  // Security
  SESSION_SECRET: z.string().min(32).default('peochain_development_session_secret_key'),
  COOKIE_SECRET: z.string().min(32).default('peochain_development_cookie_secret_key'),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(10).max(14).default(10),
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(15 * 60 * 1000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(100),
  
  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  
  // CORS
  CORS_ORIGIN: z.string().url().or(z.literal('*')).default('*'),
  
  // Feature Flags
  ENABLE_CACHE: z.coerce.boolean().default(true),
  ENABLE_RATE_LIMITING: z.coerce.boolean().default(true),
  ENABLE_CSRF: z.coerce.boolean().default(true),
});

// Configuration type
export type Config = z.infer<typeof configSchema>;

// Load and validate configuration
function loadConfig(): Config {
  try {
    // Parse environment variables
    const config = configSchema.parse(process.env);
    
    // Additional validation for production environment
    if (config.NODE_ENV === Environment.Production) {
      // Ensure strong secrets in production
      if (config.SESSION_SECRET === 'peochain_development_session_secret_key') {
        throw new Error('Production environment requires a strong SESSION_SECRET');
      }
      
      if (config.COOKIE_SECRET === 'peochain_development_cookie_secret_key') {
        throw new Error('Production environment requires a strong COOKIE_SECRET');
      }
    }
    
    return config;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors = error.errors.map(err => 
        `${err.path.join('.')}: ${err.message}`
      ).join('\n');
      
      logger.error(`Configuration validation failed:\n${validationErrors}`);
      process.exit(1);
    }
    
    logger.error('Failed to load configuration', {
      error: error instanceof Error ? error.message : String(error)
    });
    process.exit(1);
  }
}

// Export configuration
export const config = loadConfig();

// Helper function to check if we're in a specific environment
export function isEnvironment(env: Environment): boolean {
  return config.NODE_ENV === env;
}

// Helper function to check if we're in development
export function isDevelopment(): boolean {
  return isEnvironment(Environment.Development);
}

// Helper function to check if we're in test
export function isTest(): boolean {
  return isEnvironment(Environment.Test);
}

// Helper function to check if we're in production
export function isProduction(): boolean {
  return isEnvironment(Environment.Production);
}
