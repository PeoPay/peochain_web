/**
 * Database Connection and ORM Setup
 *
 * This module initializes and configures the database connection pool using Neon Database's
 * serverless solution with Drizzle ORM for enhanced developer experience and type safety.
 * It ensures environment validation, sets up WebSocket-based communication, and integrates
 * the database schema definitions.
 *
 * Dependencies:
 * - @neondatabase/serverless: Neon serverless database client.
 * - drizzle-orm/neon-serverless: ORM library specifically designed for Neon.
 * - ws: WebSocket library for real-time database communication.
 * - @shared/schema: Shared schema definitions for maintaining consistent data structures.
 */

import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure Neon Database to use the 'ws' WebSocket implementation for real-time interactions.
neonConfig.webSocketConstructor = ws;

// Validate the presence of DATABASE_URL environment variable for secure and accurate connection setup.
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Ensure your database has been provisioned and DATABASE_URL is correctly configured.",
  );
}

// Pool configuration based on environment and expected load
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  // Configure appropriate pool size based on environment
  max: process.env.NODE_ENV === 'production' ? 20 : 10, // Maximum connections in pool
  min: process.env.NODE_ENV === 'production' ? 5 : 2,   // Minimum idle connections maintained
  idleTimeoutMillis: 30000,                             // How long a connection can be idle before being closed
  connectionTimeoutMillis: 5000,                        // How long to wait for a connection
  // Enable statement timeout to prevent long-running queries
  statement_timeout: 10000,                             // 10 seconds max query time
  // Log slow queries in development
  log: process.env.NODE_ENV !== 'production' 
    ? (query: string, params: any[]) => {
        if (query.includes('SELECT') && !query.includes('pg_')) {
          console.log('SLOW QUERY:', query, params);
        }
      }
    : undefined
};

// Create a new connection pool instance using the configured options.
// Pooling optimizes performance by efficiently managing multiple database connections.
export const pool = new Pool(poolConfig);

// Initialize Drizzle ORM with the connection pool and imported schema definitions.
// Provides a type-safe and structured way to interact with the database, simplifying data operations.
export const db = drizzle({ client: pool, schema });

// Graceful shutdown handler to close pool on process termination
process.on('SIGINT', () => {
  console.log('Closing database pool connections...');
  pool.end().then(() => {
    console.log('Database pool has been closed');
    process.exit(0);
  });
});
