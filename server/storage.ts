import { 
  users, type User, type InsertUser, 
  waitlistEntries, type WaitlistEntry, type InsertWaitlistEntry,
  dailyWaitlistStats, type DailyWaitlistStats, type InsertDailyWaitlistStats,
  geographicStats, type GeographicStats, type InsertGeographicStats,
  referralChannels, type ReferralChannel, type InsertReferralChannel
} from "@shared/schema";
import { db } from "./db";
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

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
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
}

export const storage = new DatabaseStorage();
