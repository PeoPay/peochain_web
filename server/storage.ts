import { 
  users, type User, type InsertUser, 
  waitlistEntries, type WaitlistEntry, type InsertWaitlistEntry,
  dailyWaitlistStats, type DailyWaitlistStats, type InsertDailyWaitlistStats,
  geographicStats, type GeographicStats, type InsertGeographicStats,
  referralChannels, type ReferralChannel, type InsertReferralChannel
} from "@shared/schema";
import { db } from "./db";
import { eq, sql, desc, asc, and, gte, lte } from "drizzle-orm";
import crypto from 'crypto';
import bcrypt from 'bcrypt';

// Constants for security settings
const REFERRAL_CODE_LENGTH = 8;
const { randomBytes } = crypto;
const BCRYPT_SALT_ROUNDS = 10; // Standard recommendation for bcrypt

// Secure referral code generation using cryptographically secure random values
function generateSecureReferralCode(): string {
  // Generate a cryptographically secure random string
  const randomBytesBuffer = randomBytes(REFERRAL_CODE_LENGTH);
  
  // Convert to a URL-safe base64 string and trim to desired length
  const base64 = randomBytesBuffer.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  
  // Take the first REFERRAL_CODE_LENGTH characters and uppercase
  return base64.substring(0, REFERRAL_CODE_LENGTH).toUpperCase();
}

/**
 * Hashes a password using bcrypt, a secure password hashing algorithm
 * @param password The plain text password to hash
 * @returns A promise that resolves to the hashed password
 */
async function hashPassword(password: string): Promise<string> {
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Failed to hash password');
  }
}

/**
 * Verifies a password against a stored hash
 * @param password The plain text password to verify
 * @param storedHash The stored hash to compare against
 * @returns A promise that resolves to true if the password matches, false otherwise
 */
async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    // Compare the provided password with the stored hash
    return await bcrypt.compare(password, storedHash);
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
}

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Waitlist methods
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  createWaitlistEntryBulk(entries: InsertWaitlistEntry[]): Promise<number>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
  getWaitlistEntryByReferralCode(referralCode: string): Promise<WaitlistEntry | undefined>;
  incrementReferralCount(referralCode: string): Promise<void>;
  getAllWaitlistEntries(): Promise<WaitlistEntry[]>;

  // Analytics methods
  // Daily stats
  createOrUpdateDailyStats(stats: InsertDailyWaitlistStats): Promise<DailyWaitlistStats>;
  createOrUpdateDailyStatsBulk(statsList: InsertDailyWaitlistStats[]): Promise<number>;
  getDailyStatsForDateRange(startDate: Date, endDate: Date): Promise<DailyWaitlistStats[]>;
  getLatestDailyStats(limit?: number): Promise<DailyWaitlistStats[]>;
  
  // Geographic stats
  createOrUpdateGeographicStats(stats: InsertGeographicStats): Promise<GeographicStats>;
  createOrUpdateGeographicStatsBulk(statsList: InsertGeographicStats[]): Promise<number>;
  getAllGeographicStats(): Promise<GeographicStats[]>;
  getTopRegionsByUserCount(limit?: number): Promise<GeographicStats[]>;
  
  // Referral channel stats
  createOrUpdateReferralChannel(channel: InsertReferralChannel): Promise<ReferralChannel>;
  createOrUpdateReferralChannelBulk(channels: InsertReferralChannel[]): Promise<number>;
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
  
  async createUser(userData: InsertUser): Promise<User> {
    try {
      // Hash the password before storing
      const hashedPassword = await hashPassword(userData.password);
      
      const [user] = await db
        .insert(users)
        .values({
          ...userData,
          password: hashedPassword
        })
        .returning();
      
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }
  
  async verifyUserPassword(username: string, password: string): Promise<boolean> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      
      if (!user) {
        return false;
      }
      
      return await verifyPassword(password, user.password);
    } catch (error) {
      console.error('Error verifying user password:', error);
      return false;
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
    return this.userService.createUser(insertUser);
  }
  
  async createWaitlistEntry(insertEntry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    try {
      // Generate a secure referral code
      const referralCode = generateSecureReferralCode();
      
      // Process referral if provided
      if (insertEntry.referredBy) {
        // Find the referring entry
        const referringEntry = await this.getWaitlistEntryByReferralCode(insertEntry.referredBy);
        if (referringEntry) {
          // Increment the referral count for the referring user
          await this.incrementReferralCount(insertEntry.referredBy);
        }
      }
      
      // Insert the new waitlist entry using upsert to handle duplicates gracefully
      const [entry] = await db
        .insert(waitlistEntries)
        .values({
          ...insertEntry,
          referralCode,
        })
        .onConflictDoUpdate({
          target: waitlistEntries.email,
          set: {
            fullName: insertEntry.fullName,
            userType: insertEntry.userType,
            metadata: insertEntry.metadata,
            // Don't update referralCode or referredBy to preserve existing referral chains
          }
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
  
  /**
   * Bulk insert waitlist entries for improved performance
   * @param entries Array of waitlist entries to insert
   * @returns Number of successfully inserted entries
   */
  async createWaitlistEntryBulk(entries: InsertWaitlistEntry[]): Promise<number> {
    if (entries.length === 0) return 0;
    
    try {
      // Process entries to hash passwords and generate referral codes
      const processedEntries = entries.map(entry => {
        // Generate a secure referral code
        const referralCode = generateSecureReferralCode();
        
        return {
          ...entry,
          referralCode,
        };
      });
      
      // Perform bulk insert with conflict handling
      const result = await db
        .insert(waitlistEntries)
        .values(processedEntries)
        .onConflictDoNothing({ target: waitlistEntries.email })
        .returning({ id: waitlistEntries.id });
      
      return result.length;
    } catch (error) {
      console.error('Error in bulk waitlist entry creation:', error);
      return 0;
    }
  }
  
  /**
   * Creates or updates geographic stats in bulk
   * @param stats Array of geographic stats to create or update
   * @returns Number of successfully processed stats
   */
  async createOrUpdateGeographicStatsBulk(stats: InsertGeographicStats[]): Promise<number> {
    if (stats.length === 0) return 0;
    
    try {
      let successCount = 0;
      
      // Process in batches to avoid potential issues with large arrays
      const BATCH_SIZE = 50;
      for (let i = 0; i < stats.length; i += BATCH_SIZE) {
        const batch = stats.slice(i, i + BATCH_SIZE);
        
        // Use upsert operation for each batch
        const result = await db
          .insert(geographicStats)
          .values(batch)
          .onConflictDoUpdate({
            target: geographicStats.region,
            set: {
              userCount: sql`excluded.user_count`,
              engagementScore: sql`excluded.engagement_score`
            }
          })
          .returning({ id: geographicStats.id });
        
        successCount += result.length;
      }
      
      return successCount;
    } catch (error) {
      console.error('Error in bulk geographic stats operation:', error);
      return 0;
    }
  }
  
  /**
   * Creates or updates referral channels in bulk
   * @param channels Array of referral channels to create or update
   * @returns Number of successfully processed channels
   */
  async createOrUpdateReferralChannelBulk(channels: InsertReferralChannel[]): Promise<number> {
    if (channels.length === 0) return 0;
    
    try {
      let successCount = 0;
      
      // Process in batches
      const BATCH_SIZE = 50;
      for (let i = 0; i < channels.length; i += BATCH_SIZE) {
        const batch = channels.slice(i, i + BATCH_SIZE);
        
        // Use upsert operation for each batch
        const result = await db
          .insert(referralChannels)
          .values(batch)
          .onConflictDoUpdate({
            target: referralChannels.channelName,
            set: {
              referralCount: sql`excluded.referral_count`,
              conversionRate: sql`excluded.conversion_rate`
            }
          })
          .returning({ id: referralChannels.id });
        
        successCount += result.length;
      }
      
      return successCount;
    } catch (error) {
      console.error('Error in bulk referral channel operation:', error);
      return 0;
    }
  }
  
  /**
   * Creates or updates daily waitlist stats in bulk
   * @param stats Array of daily stats to create or update
   * @returns Number of successfully processed stats
   */
  async createOrUpdateDailyStatsBulk(stats: InsertDailyWaitlistStats[]): Promise<number> {
    if (stats.length === 0) return 0;
    
    try {
      let successCount = 0;
      
      // Process in batches
      const BATCH_SIZE = 50;
      for (let i = 0; i < stats.length; i += BATCH_SIZE) {
        const batch = stats.slice(i, i + BATCH_SIZE);
        
        // Use upsert operation for each batch
        const result = await db
          .insert(dailyWaitlistStats)
          .values(batch)
          .onConflictDoUpdate({
            target: dailyWaitlistStats.date,
            set: {
              signupCount: sql`excluded.signup_count`,
              totalReferrals: sql`excluded.total_referrals`,
              conversionRate: sql`excluded.conversion_rate`
            }
          })
          .returning({ id: dailyWaitlistStats.id });
        
        successCount += result.length;
      }
      
      return successCount;
    } catch (error) {
      console.error('Error in bulk daily stats operation:', error);
      return 0;
    }
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
      
      // Use upsert operation to update or create daily stats
      await db
        .insert(dailyWaitlistStats)
        .values({
          date: dateString,
          signupCount: 1,
          totalReferrals: wasReferred ? 1 : 0,
          conversionRate: 0, // Will be calculated later
        })
        .onConflictDoUpdate({
          target: dailyWaitlistStats.date,
          set: {
            signupCount: sql`${dailyWaitlistStats.signupCount} + 1`,
            totalReferrals: wasReferred ? sql`${dailyWaitlistStats.totalReferrals} + 1` : dailyWaitlistStats.totalReferrals,
          }
        });
    } catch (error) {
      console.error("Error updating daily stats:", error);
    }
  }
  
  /**
   * Updates the daily stats for a specific date with new signup and referral data
   * @param date The date to update stats for
   * @param signupCount Number of new signups
   * @param referredCount Number of signups that were referred
   * @returns Boolean indicating success
   */
  async updateDailyStatsForDate(date: Date, signupCount: number, referredCount: number): Promise<boolean> {
    try {
      const dateStr = date.toISOString().split('T')[0];
      
      // Use upsert operation to update or create daily stats
      await db
        .insert(dailyWaitlistStats)
        .values({
          date: dateStr,
          signupCount,
          totalReferrals: referredCount,
          conversionRate: 0 // Will be calculated later
        })
        .onConflictDoUpdate({
          target: dailyWaitlistStats.date,
          set: {
            signupCount: sql`${dailyWaitlistStats.signupCount} + ${signupCount}`,
            totalReferrals: sql`${dailyWaitlistStats.totalReferrals} + ${referredCount}`
          }
        });
      
      return true;
    } catch (error) {
      console.error('Error updating daily stats:', error);
      return false;
    }
  }
  
  async createOrUpdateDailyStats(stats: InsertDailyWaitlistStats): Promise<DailyWaitlistStats> {
    try {
      // Check if stats for this date already exist
      const dateString = typeof stats.date === 'string' 
        ? stats.date 
        : (stats.date as Date).toISOString().split('T')[0];
      
      // Use upsert operation for better performance
      const [result] = await db
        .insert(dailyWaitlistStats)
        .values({
          ...stats,
          date: dateString,
        })
        .onConflictDoUpdate({
          target: dailyWaitlistStats.date,
          set: {
            signupCount: stats.signupCount,
            totalReferrals: stats.totalReferrals,
            conversionRate: stats.conversionRate,
            metadata: stats.metadata,
          }
        })
        .returning();
      
      return result;
    } catch (error) {
      console.error('Error creating/updating daily stats:', error);
      throw new Error('Failed to create or update daily stats');
    }
  }
  
  async getDailyStatsForDateRange(startDate: Date, endDate: Date): Promise<DailyWaitlistStats[]> {
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];
    
    return db
      .select()
      .from(dailyWaitlistStats)
      .where(and(
        gte(dailyWaitlistStats.date, startDateStr),
        lte(dailyWaitlistStats.date, endDateStr)
      ))
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
      // Use upsert operation for better performance
      const [result] = await db
        .insert(geographicStats)
        .values(stats)
        .onConflictDoUpdate({
          target: geographicStats.region,
          set: {
            userCount: stats.userCount,
            engagementScore: stats.engagementScore,
            updatedAt: sql`CURRENT_TIMESTAMP`,
          }
        })
        .returning();
      
      return result;
    } catch (error) {
      console.error('Error creating/updating geographic stats:', error);
      throw new Error('Failed to create or update geographic stats');
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
      // Use upsert operation for better performance
      const [result] = await db
        .insert(referralChannels)
        .values(channel)
        .onConflictDoUpdate({
          target: referralChannels.channelName,
          set: {
            referralCount: channel.referralCount,
            conversionRate: channel.conversionRate,
            updatedAt: sql`CURRENT_TIMESTAMP`,
          }
        })
        .returning();
      
      return result;
    } catch (error) {
      console.error('Error creating/updating referral channel:', error);
      throw new Error('Failed to create or update referral channel');
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
    const [signupResult] = await db
      .select({ count: sql`COUNT(*)` })
      .from(waitlistEntries);
    const totalSignups = Number(signupResult?.count || 0);
    
    // Get total referrals
    const [referralResult] = await db
      .select({ sum: sql`SUM(${waitlistEntries.referralCount})` })
      .from(waitlistEntries);
    const totalReferrals = Number(referralResult?.sum || 0);
    
    // Calculate average referrals per user
    const avgReferralsPerUser = totalSignups > 0 ? totalReferrals / totalSignups : 0;
    
    // Get top referrers
    const topReferrers = await db
      .select()
      .from(waitlistEntries)
      .orderBy(desc(waitlistEntries.referralCount))
      .limit(10);
    
    // Get latest daily stats
    const dailyStats = await this.getLatestDailyStats(30);
    
    // Get top channels
    const topChannels = await this.getTopReferralChannels(5);
    
    // Get top regions
    const topRegions = await this.getTopRegionsByUserCount(5);
    
    return {
      totalSignups,
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
