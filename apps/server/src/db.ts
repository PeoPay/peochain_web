import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { config } from './config';

// Create PostgreSQL connection
const pool = new Pool({
  connectionString: config.databaseUrl,
});

// Initialize Drizzle
export const db = drizzle(pool);