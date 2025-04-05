import { db, pool } from "../db";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

// Define types for our local schema
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { pgTable, text, serial, integer, boolean, timestamp, jsonb, date } from 'drizzle-orm/pg-core';

// Re-define the schema tables needed for type definitions
const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

const waitlistEntries = pgTable("waitlist_entries", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  referralCode: text("referral_code").notNull().unique(),
  referredBy: text("referred_by"),
  referralCount: integer("referral_count").notNull().default(0),
  userType: text("user_type").notNull().default("user"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

const dailyWaitlistStats = pgTable("daily_waitlist_stats", {
  id: serial("id").primaryKey(),
  date: date("date").notNull().unique(),
  signups: integer("signups").notNull().default(0),
  referrals: integer("referrals").notNull().default(0),
  views: integer("views").notNull().default(0),
});

const geographicStats = pgTable("geographic_stats", {
  id: serial("id").primaryKey(),
  region: text("region").notNull().unique(),
  country: text("country").notNull(),
  userCount: integer("user_count").notNull().default(0),
  conversionRate: text("conversion_rate"),
});

const referralChannels = pgTable("referral_channels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  userCount: integer("user_count").notNull().default(0),
  conversionRate: text("conversion_rate"),
});

// Define types based on the schema
type User = InferSelectModel<typeof users>;
type InsertUser = InferInsertModel<typeof users>;
type WaitlistEntry = InferSelectModel<typeof waitlistEntries>;
type InsertWaitlistEntry = Omit<InferInsertModel<typeof waitlistEntries>, 'referralCode' | 'referralCount' | 'createdAt'>;
type DailyWaitlistStats = InferSelectModel<typeof dailyWaitlistStats>;
type InsertDailyWaitlistStats = InferInsertModel<typeof dailyWaitlistStats>;
type GeographicStats = InferSelectModel<typeof geographicStats>;
type InsertGeographicStats = InferInsertModel<typeof geographicStats>;
type ReferralChannel = InferSelectModel<typeof referralChannels>;
type InsertReferralChannel = InferInsertModel<typeof referralChannels>;
import { eq, sql, desc, asc, and, gte, lte } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Waitlist methods
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
  getWaitlistEntryByReferralCode(referralCode: string): Promise<WaitlistEntry | undefined>;
  incrementReferralCount(referralCode: string): Promise<void>;
  getAllWaitlistEntries(): Promise<WaitlistEntry[]>;

  // Analytics methods
  // Daily stats
  createOrUpdateDailyStats(stats: InsertDailyWaitlistStats): Promise<DailyWaitlistStats>;
  getDailyStatsForDateRange(startDate: Date, endDate: Date): Promise<DailyWaitlistStats[]>;
  getLatestDailyStats(limit?: number): Promise<DailyWaitlistStats[]>;
  
  // Geographic stats
  createOrUpdateGeographicStats(stats: InsertGeographicStats): Promise<GeographicStats>;
  getAllGeographicStats(): Promise<GeographicStats[]>;
  getTopRegionsByUserCount(limit?: number): Promise<GeographicStats[]>;
  
  // Referral channel stats
  createOrUpdateReferralChannel(channel: InsertReferralChannel): Promise<ReferralChannel>;
  getAllReferralChannels(): Promise<ReferralChannel[]>;
  getTopReferralChannels(limit?: number): Promise<ReferralChannel[]>;
  
  // Analytics overview
  getAnalyticsOverview(): Promise<{
    totalSignups: number;
    totalReferrals: number;
    avgReferralsPerUser: number;
    topReferrers: WaitlistEntry[];
    dailyStats: DailyWaitlistStats[];
    topChannels: ReferralChannel[];
    topRegions: GeographicStats[];
  }>;
}

// Split into separate service classes for better SRP
export class UserService {
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user || undefined;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  }
}

export class DatabaseStorage implements IStorage {
  private userService: UserService;
  
  constructor() {
    this.userService = new UserService();
  }
  
  async getUser(id: number): Promise<User | undefined> {
    return this.userService.getUser(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async createWaitlistEntry(insertEntry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    try {
      // Generate a unique referral code
      const referralCode = this.generateReferralCode(insertEntry.email);
      
      // Process referral if provided
      if (insertEntry.referredBy) {
        // Find the referring entry
        const referringEntry = await this.getWaitlistEntryByReferralCode(insertEntry.referredBy);
        if (referringEntry) {
          // Increment the referral count for the referring user
          await this.incrementReferralCount(insertEntry.referredBy);
        }
      }
      
      // Insert the new waitlist entry
      const [entry] = await db
        .insert(waitlistEntries)
        .values({
          ...insertEntry,
          referralCode,
        })
        .returning();
      
      // Update daily stats when a new entry is created
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      await this.updateDailyStatsForNewSignup(today, !!insertEntry.referredBy);
      
      return entry;
    } catch (error: any) {
      // Handle unique constraint violation
      if (error.code === '23505') { // PostgreSQL unique violation error code
        throw new Error(`Email ${insertEntry.email} already exists in the waitlist`);
      }
      throw error;
    }
  }
  
  // Helper method to generate a referral code
  private generateReferralCode(email: string): string {
    // Create a unique code based on email and timestamp
    const timestamp = Date.now().toString(36);
    const emailHash = email
      .split('')
      .reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) & 0xFFFFFFFF, 0)
      .toString(36);
    
    return `${emailHash.substring(0, 6)}${timestamp.substring(timestamp.length - 4)}`.toUpperCase();
  }
  
  async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined> {
    const [entry] = await db
      .select()
      .from(waitlistEntries)
      .where(eq(waitlistEntries.email, email));
    return entry || undefined;
  }
  
  async getAllWaitlistEntries(): Promise<WaitlistEntry[]> {
    return db.select().from(waitlistEntries);
  }
  
  async getWaitlistEntryByReferralCode(referralCode: string): Promise<WaitlistEntry | undefined> {
    const [entry] = await db
      .select()
      .from(waitlistEntries)
      .where(eq(waitlistEntries.referralCode, referralCode));
    return entry || undefined;
  }
  
  async incrementReferralCount(referralCode: string): Promise<void> {
    await db
      .update(waitlistEntries)
      .set({
        referralCount: sql`${waitlistEntries.referralCount} + 1`
      })
      .where(eq(waitlistEntries.referralCode, referralCode));
  }

  // Helper method to update daily stats when a new signup occurs
  private async updateDailyStatsForNewSignup(date: Date, wasReferred: boolean): Promise<void> {
    try {
      const dateString = date.toISOString().split('T')[0];
      
      // Try to find existing stats for this date
      const [existingStats] = await db
        .select()
        .from(dailyWaitlistStats)
        .where(eq(dailyWaitlistStats.date, dateString));
      
      if (existingStats) {
        // Update existing stats
        await db
          .update(dailyWaitlistStats)
          .set({
            signupCount: sql`${dailyWaitlistStats.signupCount} + 1`,
            totalReferrals: wasReferred ? sql`${dailyWaitlistStats.totalReferrals} + 1` : dailyWaitlistStats.totalReferrals,
          })
          .where(eq(dailyWaitlistStats.id, existingStats.id));
      } else {
        // Create new stats for this date
        await db
          .insert(dailyWaitlistStats)
          .values({
            date: dateString,
            signupCount: 1,
            totalReferrals: wasReferred ? 1 : 0,
            conversionRate: 0, // Will be calculated later
          });
      }
    } catch (error) {
      console.error("Error updating daily stats:", error);
    }
  }

  // Analytics methods implementation
  async createOrUpdateDailyStats(stats: InsertDailyWaitlistStats): Promise<DailyWaitlistStats> {
    try {
      // Check if stats for this date already exist
      const dateString = typeof stats.date === 'object' && stats.date !== null && 'toISOString' in stats.date
        ? (stats.date as Date).toISOString().split('T')[0] 
        : stats.date;
      
      const [existingStats] = await db
        .select()
        .from(dailyWaitlistStats)
        .where(eq(dailyWaitlistStats.date, dateString));
      
      if (existingStats) {
        // Update existing stats
        const [updatedStats] = await db
          .update(dailyWaitlistStats)
          .set(stats)
          .where(eq(dailyWaitlistStats.id, existingStats.id))
          .returning();
        
        return updatedStats;
      } else {
        // Create new stats
        const [newStats] = await db
          .insert(dailyWaitlistStats)
          .values(stats)
          .returning();
        
        return newStats;
      }
    } catch (error) {
      console.error("Error creating/updating daily stats:", error);
      throw error;
    }
  }

  async getDailyStatsForDateRange(startDate: Date, endDate: Date): Promise<DailyWaitlistStats[]> {
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];
    
    return db
      .select()
      .from(dailyWaitlistStats)
      .where(
        and(
          gte(dailyWaitlistStats.date, startDateStr),
          lte(dailyWaitlistStats.date, endDateStr)
        )
      )
      .orderBy(asc(dailyWaitlistStats.date));
  }

  async getLatestDailyStats(limit: number = 30): Promise<DailyWaitlistStats[]> {
    return db
      .select()
      .from(dailyWaitlistStats)
      .orderBy(desc(dailyWaitlistStats.date))
      .limit(limit);
  }

  async createOrUpdateGeographicStats(stats: InsertGeographicStats): Promise<GeographicStats> {
    try {
      // Check if stats for this region already exist
      const [existingStats] = await db
        .select()
        .from(geographicStats)
        .where(eq(geographicStats.region, stats.region));
      
      if (existingStats) {
        // Update existing stats
        const [updatedStats] = await db
          .update(geographicStats)
          .set({
            ...stats,
            updatedAt: new Date(),
          })
          .where(eq(geographicStats.id, existingStats.id))
          .returning();
        
        return updatedStats;
      } else {
        // Create new stats
        const [newStats] = await db
          .insert(geographicStats)
          .values(stats)
          .returning();
        
        return newStats;
      }
    } catch (error) {
      console.error("Error creating/updating geographic stats:", error);
      throw error;
    }
  }

  async getAllGeographicStats(): Promise<GeographicStats[]> {
    return db
      .select()
      .from(geographicStats)
      .orderBy(desc(geographicStats.userCount));
  }

  async getTopRegionsByUserCount(limit: number = 10): Promise<GeographicStats[]> {
    return db
      .select()
      .from(geographicStats)
      .orderBy(desc(geographicStats.userCount))
      .limit(limit);
  }

  async createOrUpdateReferralChannel(channel: InsertReferralChannel): Promise<ReferralChannel> {
    try {
      // Check if channel already exists
      const [existingChannel] = await db
        .select()
        .from(referralChannels)
        .where(eq(referralChannels.channelName, channel.channelName));
      
      if (existingChannel) {
        // Update existing channel
        const [updatedChannel] = await db
          .update(referralChannels)
          .set({
            ...channel,
            updatedAt: new Date(),
          })
          .where(eq(referralChannels.id, existingChannel.id))
          .returning();
        
        return updatedChannel;
      } else {
        // Create new channel
        const [newChannel] = await db
          .insert(referralChannels)
          .values(channel)
          .returning();
        
        return newChannel;
      }
    } catch (error) {
      console.error("Error creating/updating referral channel:", error);
      throw error;
    }
  }

  async getAllReferralChannels(): Promise<ReferralChannel[]> {
    return db
      .select()
      .from(referralChannels)
      .orderBy(desc(referralChannels.referralCount));
  }

  async getTopReferralChannels(limit: number = 10): Promise<ReferralChannel[]> {
    return db
      .select()
      .from(referralChannels)
      .orderBy(desc(referralChannels.referralCount))
      .limit(limit);
  }

  async getAnalyticsOverview(): Promise<{
    totalSignups: number;
    totalReferrals: number;
    avgReferralsPerUser: number;
    topReferrers: WaitlistEntry[];
    dailyStats: DailyWaitlistStats[];
    topChannels: ReferralChannel[];
    topRegions: GeographicStats[];
  }> {
    // Get total signups
    const [{ count: totalSignups }] = await db
      .select({ count: sql`count(*)` })
      .from(waitlistEntries);
    
    // Calculate total referrals
    const [referralResult] = await db
      .select({ total: sql`sum(referral_count)` })
      .from(waitlistEntries);
    
    const totalReferrals = referralResult?.total ? Number(referralResult.total) : 0;
    const signupCount = totalSignups ? Number(totalSignups) : 0;
    
    // Calculate average referrals per user (avoiding division by zero)
    const avgReferralsPerUser = signupCount > 0 ? totalReferrals / signupCount : 0;
    
    // Get top referrers
    const topReferrers = await db
      .select()
      .from(waitlistEntries)
      .orderBy(desc(waitlistEntries.referralCount))
      .limit(5);
    
    // Get latest daily stats
    const dailyStats = await this.getLatestDailyStats(30);
    
    // Get top referral channels
    const topChannels = await this.getTopReferralChannels(5);
    
    // Get top regions
    const topRegions = await this.getTopRegionsByUserCount(5);
    
    return {
      totalSignups: signupCount,
      totalReferrals,
      avgReferralsPerUser,
      topReferrers,
      dailyStats,
      topChannels,
      topRegions,
    };
  }
}

export const storage = new DatabaseStorage();