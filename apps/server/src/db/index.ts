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
 */

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { pgTable, text, serial, integer, boolean, timestamp, jsonb, date } from 'drizzle-orm/pg-core';

// Define schema locally to avoid import issues in the monorepo
const schema = {
  users: pgTable("users", {
    id: serial("id").primaryKey(),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
  }),

  waitlistEntries: pgTable("waitlist_entries", {
    id: serial("id").primaryKey(),
    fullName: text("full_name").notNull(),
    email: text("email").notNull().unique(),
    referralCode: text("referral_code").notNull().unique(),
    referredBy: text("referred_by"),
    referralCount: integer("referral_count").notNull().default(0),
    userType: text("user_type").notNull().default("user"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  }),

  dailyWaitlistStats: pgTable("daily_waitlist_stats", {
    id: serial("id").primaryKey(),
    date: date("date").notNull().unique(),
    signups: integer("signups").notNull().default(0),
    referrals: integer("referrals").notNull().default(0),
    views: integer("views").notNull().default(0),
  }),

  geographicStats: pgTable("geographic_stats", {
    id: serial("id").primaryKey(),
    region: text("region").notNull().unique(),
    country: text("country").notNull(),
    userCount: integer("user_count").notNull().default(0),
    conversionRate: text("conversion_rate"),
  }),

  referralChannels: pgTable("referral_channels", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    userCount: integer("user_count").notNull().default(0),
    conversionRate: text("conversion_rate"),
  })
};

// Validate that environment variables are properly configured
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Initialize connection pool with the database URL
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Initialize Drizzle ORM with the connection pool and schema
export const db = drizzle(pool, { schema });