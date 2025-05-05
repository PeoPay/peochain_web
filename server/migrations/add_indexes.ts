/**
 * Database Migration: Add Performance Indexes
 * 
 * This migration adds indexes to frequently queried fields to improve
 * query performance and reduce database load.
 */

import { db } from '../db';
import { sql } from 'drizzle-orm';
import { logger } from '../utils/logger';

/**
 * Run the migration to add indexes
 */
export async function addPerformanceIndexes() {
  try {
    logger.info('Starting database index migration');
    
    // Create indexes in a transaction
    await db.transaction(async (tx) => {
      // Index for waitlist entries by email (for lookups and uniqueness checks)
      await tx.execute(sql`
        CREATE INDEX IF NOT EXISTS idx_waitlist_entries_email 
        ON waitlist_entries (email);
      `);
      
      // Index for waitlist entries by referral code (for referral lookups)
      await tx.execute(sql`
        CREATE INDEX IF NOT EXISTS idx_waitlist_entries_referral_code 
        ON waitlist_entries (referral_code);
      `);
      
      // Index for waitlist entries by referred_by (for attribution)
      await tx.execute(sql`
        CREATE INDEX IF NOT EXISTS idx_waitlist_entries_referred_by 
        ON waitlist_entries (referred_by);
      `);
      
      // Index for waitlist entries by created_at (for time-based queries)
      await tx.execute(sql`
        CREATE INDEX IF NOT EXISTS idx_waitlist_entries_created_at 
        ON waitlist_entries (created_at);
      `);
      
      // Composite index for waitlist entries by country and region (for geographic stats)
      await tx.execute(sql`
        CREATE INDEX IF NOT EXISTS idx_waitlist_entries_geo 
        ON waitlist_entries (country, region);
      `);
      
      // Index for geographic stats by country (for country-based lookups)
      await tx.execute(sql`
        CREATE INDEX IF NOT EXISTS idx_geographic_stats_country 
        ON geographic_stats (country);
      `);
      
      // Index for daily stats by date (for time-series analysis)
      await tx.execute(sql`
        CREATE INDEX IF NOT EXISTS idx_daily_stats_date 
        ON daily_stats (date);
      `);
      
      // Index for referral channels by name (for channel lookups)
      await tx.execute(sql`
        CREATE INDEX IF NOT EXISTS idx_referral_channels_name 
        ON referral_channels (name);
      `);
      
      // Add partial index for active users
      await tx.execute(sql`
        CREATE INDEX IF NOT EXISTS idx_waitlist_entries_active 
        ON waitlist_entries (email, created_at) 
        WHERE status = 'active';
      `);
      
      logger.info('Successfully created database indexes');
    });
    
    // Analyze tables to update statistics
    await db.execute(sql`ANALYZE waitlist_entries;`);
    await db.execute(sql`ANALYZE geographic_stats;`);
    await db.execute(sql`ANALYZE daily_stats;`);
    await db.execute(sql`ANALYZE referral_channels;`);
    
    logger.info('Database index migration completed successfully');
    return true;
  } catch (error) {
    logger.error('Failed to create database indexes', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    return false;
  }
}

/**
 * Run the migration if this file is executed directly
 */
if (require.main === module) {
  addPerformanceIndexes()
    .then((success) => {
      if (success) {
        console.log('Database indexes created successfully');
        process.exit(0);
      } else {
        console.error('Failed to create database indexes');
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error('Error running migration:', error);
      process.exit(1);
    });
}
