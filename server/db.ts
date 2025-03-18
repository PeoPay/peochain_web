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

// Create a new connection pool instance using the provided DATABASE_URL.
// Pooling optimizes performance by efficiently managing multiple database connections.
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Initialize Drizzle ORM with the connection pool and imported schema definitions.
// Provides a type-safe and structured way to interact with the database, simplifying data operations.
export const db = drizzle({ client: pool, schema });
