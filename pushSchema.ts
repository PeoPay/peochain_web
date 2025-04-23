import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import ws from "ws";
import * as schema from "./shared/schema";

// Needed for neon serverless driver to work
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

async function main() {
  console.log("Creating database connection...");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle({ client: pool });
  
  console.log("Creating tables if they don't exist...");
  
  // Create users table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);
  
  // Create waitlist_entries table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS waitlist_entries (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      referral_code TEXT NOT NULL UNIQUE,
      referred_by TEXT,
      referral_count INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
    )
  `);

  // Create daily_waitlist_stats table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS daily_waitlist_stats (
      id SERIAL PRIMARY KEY,
      date DATE NOT NULL UNIQUE,
      signup_count INTEGER NOT NULL DEFAULT 0,
      total_referrals INTEGER NOT NULL DEFAULT 0,
      conversion_rate INTEGER NOT NULL DEFAULT 0,
      metadata JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
    )
  `);

  // Create geographic_stats table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS geographic_stats (
      id SERIAL PRIMARY KEY,
      region TEXT NOT NULL UNIQUE,
      user_count INTEGER NOT NULL DEFAULT 0,
      engagement_score INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
    )
  `);

  // Create referral_channels table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS referral_channels (
      id SERIAL PRIMARY KEY,
      channel_name TEXT NOT NULL UNIQUE,
      referral_count INTEGER NOT NULL DEFAULT 0,
      conversion_rate INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
    )
  `);
  
  console.log("Tables created successfully!");
  
  // Test the connection by inserting a test record (will be ignored if exists)
  const dbWithSchema = drizzle({ client: pool, schema });
  await dbWithSchema.insert(schema.users)
    .values({
      username: "testuser",
      password: "testpassword"
    })
    .onConflictDoNothing();
  
  console.log("Schema test completed successfully!");
  await pool.end();
}

main().catch((e) => {
  console.error("Error applying schema:", e);
  process.exit(1);
});