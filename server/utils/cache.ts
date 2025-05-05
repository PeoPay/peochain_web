/**
 * Redis-based Caching System
 * 
 * This module provides a caching layer using Redis for improved performance
 * by reducing database load and speeding up frequently accessed data.
 */

import Redis from 'ioredis';
import { logger } from './logger';

// Cache configuration
interface CacheConfig {
  host: string;
  port: number;
  password?: string;
  keyPrefix: string;
  defaultTTL: number; // in seconds
}

// Default configuration
const defaultConfig: CacheConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD,
  keyPrefix: 'peochain:',
  defaultTTL: 3600 // 1 hour
};

class CacheManager {
  private client: Redis;
  private config: CacheConfig;
  private isConnected: boolean = false;
  
  constructor(config: Partial<CacheConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    
    // Initialize Redis client
    this.client = new Redis({
      host: this.config.host,
      port: this.config.port,
      password: this.config.password,
      keyPrefix: this.config.keyPrefix,
      retryStrategy: (times: number) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      lazyConnect: true // Don't connect immediately
    });
    
    // Set up event handlers
    this.setupEventHandlers();
  }
  
  /**
   * Set up Redis client event handlers
   */
  private setupEventHandlers(): void {
    this.client.on('connect', () => {
      this.isConnected = true;
      logger.info('Redis cache connected');
    });
    
    this.client.on('error', (err: Error) => {
      this.isConnected = false;
      logger.error(`Redis cache error: ${err.message}`, { stack: err.stack });
    });
    
    this.client.on('reconnecting', () => {
      logger.warn('Redis cache reconnecting');
    });
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await this.disconnect();
      process.exit(0);
    });
  }
  
  /**
   * Connect to Redis server
   */
  async connect(): Promise<boolean> {
    try {
      if (!this.isConnected) {
        await this.client.connect();
        logger.info('Redis cache connected successfully');
        this.isConnected = true;
      }
      return true;
    } catch (error) {
      logger.error('Failed to connect to Redis cache', {
        error: error instanceof Error ? error.message : String(error),
        host: this.config.host,
        port: this.config.port
      });
      return false;
    }
  }
  
  /**
   * Get a value from cache
   * @param key Cache key
   * @returns The cached value or null if not found
   */
  async get<T>(key: string): Promise<T | null> {
    if (!this.isConnected) return null;
    
    try {
      const data = await this.client.get(key);
      
      if (!data) return null;
      
      return JSON.parse(data) as T;
    } catch (error) {
      logger.error(`Cache get error for key ${key}`, {
        error: error instanceof Error ? error.message : String(error)
      });
      return null;
    }
  }
  
  /**
   * Set a value in cache
   * @param key Cache key
   * @param value Value to cache
   * @param ttl Time to live in seconds (optional, uses default if not specified)
   */
  async set(key: string, value: any, ttl?: number): Promise<boolean> {
    if (!this.isConnected) return false;
    
    try {
      const serializedValue = JSON.stringify(value);
      const expiry = ttl || this.config.defaultTTL;
      
      await this.client.set(key, serializedValue, 'EX', expiry);
      return true;
    } catch (error) {
      logger.error(`Cache set error for key ${key}`, {
        error: error instanceof Error ? error.message : String(error)
      });
      return false;
    }
  }
  
  /**
   * Delete a value from cache
   * @param key Cache key
   */
  async delete(key: string): Promise<boolean> {
    if (!this.isConnected) return false;
    
    try {
      await this.client.del(key);
      return true;
    } catch (error) {
      logger.error(`Cache delete error for key ${key}`, {
        error: error instanceof Error ? error.message : String(error)
      });
      return false;
    }
  }
  
  /**
   * Clear cache by pattern
   * @param pattern Pattern to match keys (e.g., 'user:*')
   */
  async clearByPattern(pattern: string): Promise<boolean> {
    if (!this.isConnected) return false;
    
    try {
      // Use SCAN to find keys matching the pattern
      let cursor = '0';
      let keys: string[] = [];
      
      do {
        const [nextCursor, matchedKeys] = await this.client.scan(
          cursor,
          'MATCH',
          this.config.keyPrefix + pattern,
          'COUNT',
          '100'
        );
        
        cursor = nextCursor;
        keys = keys.concat(matchedKeys);
      } while (cursor !== '0');
      
      // Delete the found keys
      if (keys.length > 0) {
        await this.client.del(...keys);
        logger.info(`Cleared ${keys.length} cache keys matching pattern: ${pattern}`);
      }
      
      return true;
    } catch (error) {
      logger.error(`Cache clear error for pattern ${pattern}`, {
        error: error instanceof Error ? error.message : String(error)
      });
      return false;
    }
  }
  
  /**
   * Get cache stats
   */
  async getStats(): Promise<Record<string, any>> {
    if (!this.isConnected) return { connected: false };
    
    try {
      const info = await this.client.info();
      const parsedInfo: Record<string, any> = {};
      
      // Parse Redis INFO command output
      info.split('\r\n').forEach((line: string) => {
        if (line && !line.startsWith('#')) {
          const [key, value] = line.split(':');
          if (key && value) {
            parsedInfo[key] = value;
          }
        }
      });
      
      return {
        connected: this.isConnected,
        usedMemory: parsedInfo['used_memory_human'],
        connectedClients: parsedInfo['connected_clients'],
        uptime: parsedInfo['uptime_in_seconds'],
        hitRate: parsedInfo['keyspace_hits'] && parsedInfo['keyspace_misses']
          ? parseInt(parsedInfo['keyspace_hits']) / (parseInt(parsedInfo['keyspace_hits']) + parseInt(parsedInfo['keyspace_misses']))
          : 0
      };
    } catch (error) {
      logger.error('Cache stats error', {
        error: error instanceof Error ? error.message : String(error)
      });
      return { connected: this.isConnected, error: 'Failed to get cache stats' };
    }
  }
  
  /**
   * Disconnect from Redis
   */
  async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.quit();
      this.isConnected = false;
      logger.info('Redis cache disconnected');
    }
  }
  
  /**
   * Cache decorator for class methods
   * @param keyPattern Pattern for cache key, can include {this.property} and {0}, {1}, etc. for method args
   * @param ttl Time to live in seconds
   */
  static cacheMethod(keyPattern: string, ttl?: number) {
    return function (
      _target: any, // Prefixed with _ as it's unused
      _propertyKey: string, // Prefixed with _ as it's unused
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;
      
      descriptor.value = async function (...args: any[]) {
        // Generate cache key from pattern
        let cacheKey = keyPattern;
        
        // Replace {this.property} with actual values
        const thisMatches = keyPattern.match(/\{this\.([^}]+)\}/g);
        if (thisMatches) {
          for (const match of thisMatches) {
            const propName = match.slice(6, -1); // Remove '{this.' and '}'
            // Cast 'this' to 'any' to allow dynamic property access
            cacheKey = cacheKey.replace(match, String((this as any)[propName])); 
          }
        }
        
        // Replace {0}, {1}, etc. with method arguments
        const argMatches = keyPattern.match(/\{(\d+)\}/g);
        if (argMatches) {
          for (const match of argMatches) {
            const argIndex = parseInt(match.slice(1, -1)); // Remove '{' and '}'
            if (args[argIndex] !== undefined) {
              cacheKey = cacheKey.replace(match, String(args[argIndex]));
            }
          }
        }
        
        // Try to get from cache first
        const cachedResult = await cache.get(cacheKey);
        if (cachedResult !== null) {
          logger.debug(`Cache hit for key: ${cacheKey}`);
          return cachedResult;
        }
        
        // If not in cache, execute the original method
        logger.debug(`Cache miss for key: ${cacheKey}`);
        const result = await originalMethod.apply(this, args);
        
        // Cache the result
        await cache.set(cacheKey, result, ttl);
        
        return result;
      };
      
      return descriptor;
    };
  }
}

// Export a singleton instance
export const cache = new CacheManager();

// Export the decorator
export const cacheMethod = CacheManager.cacheMethod;
