/**
 * InfluxDB Time-Series Analytics Service
 * 
 * This module implements a robust analytics system using InfluxDB for time-series metrics.
 * It enables efficient storage, querying, and analysis of time-based data such as user signups,
 * referrals, and system performance metrics.
 */

import {
  InfluxDB,
  Point,
  flux,
  fluxDuration,
  ClientOptions
} from '@influxdata/influxdb-client';
import { log } from './vite';
import { getWebSocketManager } from './websocket';

// Default configuration with fallbacks
const DEFAULT_CONFIG = {
  url: process.env.INFLUXDB_URL || 'https://us-east-1-1.aws.cloud2.influxdata.com',
  token: process.env.INFLUXDB_TOKEN || '',
  org: process.env.INFLUXDB_ORG || 'peochain',
  bucket: process.env.INFLUXDB_BUCKET || 'waitlist-metrics'
};

export class AnalyticsService {
  private influxClient: InfluxDB;
  private bucket: string;
  private org: string;
  private enabled: boolean = false;

  constructor(config: Partial<ClientOptions & { bucket: string; org: string }> = {}) {
    const mergedConfig = {
      ...DEFAULT_CONFIG,
      ...config
    };

    // Don't attempt to connect if no token is provided
    this.enabled = !!mergedConfig.token;
    this.bucket = mergedConfig.bucket;
    this.org = mergedConfig.org;

    if (this.enabled) {
      this.influxClient = new InfluxDB({
        url: mergedConfig.url,
        token: mergedConfig.token,
      });
      log('InfluxDB analytics service initialized', 'analytics');
    } else {
      log('InfluxDB analytics service disabled (no token provided)', 'analytics');
      // Create a dummy client to prevent errors when methods are called
      this.influxClient = new InfluxDB({
        url: 'http://localhost',
        token: 'dummy'
      });
    }
  }

  /**
   * Record a user signup event in InfluxDB
   */
  public async recordSignup(data: {
    email: string;
    referredBy?: string;
    userType: string;
    country?: string;
    device?: string;
    source?: string;
  }): Promise<boolean> {
    if (!this.enabled) return false;

    try {
      const { email, referredBy, userType, country, device, source } = data;
      const point = new Point('signup')
        .tag('user_type', userType)
        .tag('referred', referredBy ? 'yes' : 'no')
        .stringField('email', email);

      if (country) point.tag('country', country);
      if (device) point.tag('device', device);
      if (source) point.tag('source', source);
      if (referredBy) point.stringField('referred_by', referredBy);

      const writeApi = this.influxClient.getWriteApi(this.org, this.bucket, 'ms');
      writeApi.writePoint(point);
      await writeApi.close();

      // Notify connected clients via WebSocket
      const wsManager = getWebSocketManager();
      if (wsManager) {
        wsManager.publishEvent({
          type: 'NEW_SIGNUP',
          data: {
            email: this.anonymizeEmail(email),
            position: await this.getTotalSignupCount(),
            referralCode: '',
          }
        });

        // Also update the analytics overview
        const totalSignups = await this.getTotalSignupCount();
        const totalReferrals = await this.getTotalReferralCount();
        
        wsManager.publishEvent({
          type: 'ANALYTICS_UPDATE',
          data: {
            totalSignups,
            totalReferrals,
          }
        });
      }

      log(`Recorded signup event for ${email}`, 'analytics');
      return true;
    } catch (error) {
      log(`Error recording signup: ${error}`, 'analytics');
      return false;
    }
  }

  /**
   * Record a referral event in InfluxDB
   */
  public async recordReferral(data: {
    referralCode: string;
    newUserEmail: string;
  }): Promise<boolean> {
    if (!this.enabled) return false;

    try {
      const { referralCode, newUserEmail } = data;
      const point = new Point('referral')
        .tag('referral_code', referralCode)
        .stringField('new_user', newUserEmail);

      const writeApi = this.influxClient.getWriteApi(this.org, this.bucket, 'ms');
      writeApi.writePoint(point);
      await writeApi.close();

      // Notify connected clients via WebSocket
      const wsManager = getWebSocketManager();
      if (wsManager) {
        const referralCount = await this.getReferralCountByCode(referralCode);
        
        wsManager.publishEvent({
          type: 'NEW_REFERRAL',
          data: {
            referralCode,
            count: referralCount,
          }
        });
      }

      log(`Recorded referral event for code ${referralCode}`, 'analytics');
      return true;
    } catch (error) {
      log(`Error recording referral: ${error}`, 'analytics');
      return false;
    }
  }

  /**
   * Record a general analytics event in InfluxDB
   */
  public async recordEvent(measurement: string, tags: Record<string, string>, fields: Record<string, string | number | boolean>): Promise<boolean> {
    if (!this.enabled) return false;

    try {
      const point = new Point(measurement);
      
      // Add tags
      Object.entries(tags).forEach(([key, value]) => {
        point.tag(key, value);
      });
      
      // Add fields
      Object.entries(fields).forEach(([key, value]) => {
        if (typeof value === 'number') {
          point.floatField(key, value);
        } else if (typeof value === 'boolean') {
          point.booleanField(key, value);
        } else {
          point.stringField(key, value);
        }
      });

      const writeApi = this.influxClient.getWriteApi(this.org, this.bucket, 'ms');
      writeApi.writePoint(point);
      await writeApi.close();

      log(`Recorded ${measurement} event`, 'analytics');
      return true;
    } catch (error) {
      log(`Error recording event: ${error}`, 'analytics');
      return false;
    }
  }

  /**
   * Get the total number of signups
   */
  public async getTotalSignupCount(): Promise<number> {
    if (!this.enabled) return 0;

    try {
      const query = flux`
        from(bucket: ${this.bucket})
          |> range(start: -365d)
          |> filter(fn: (r) => r._measurement == "signup")
          |> count()
          |> yield(name: "count")
      `;

      const queryApi = this.influxClient.getQueryApi(this.org);
      const result = await queryApi.collectRows(query);
      
      if (result.length > 0) {
        return result[0]._value as number;
      }
      
      return 0;
    } catch (error) {
      log(`Error getting total signup count: ${error}`, 'analytics');
      return 0;
    }
  }

  /**
   * Get the total number of referrals
   */
  public async getTotalReferralCount(): Promise<number> {
    if (!this.enabled) return 0;

    try {
      const query = flux`
        from(bucket: ${this.bucket})
          |> range(start: -365d)
          |> filter(fn: (r) => r._measurement == "referral")
          |> count()
          |> yield(name: "count")
      `;

      const queryApi = this.influxClient.getQueryApi(this.org);
      const result = await queryApi.collectRows(query);
      
      if (result.length > 0) {
        return result[0]._value as number;
      }
      
      return 0;
    } catch (error) {
      log(`Error getting total referral count: ${error}`, 'analytics');
      return 0;
    }
  }

  /**
   * Get the number of referrals by a specific referral code
   */
  public async getReferralCountByCode(referralCode: string): Promise<number> {
    if (!this.enabled) return 0;

    try {
      const query = flux`
        from(bucket: ${this.bucket})
          |> range(start: -365d)
          |> filter(fn: (r) => r._measurement == "referral")
          |> filter(fn: (r) => r.referral_code == ${referralCode})
          |> count()
          |> yield(name: "count")
      `;

      const queryApi = this.influxClient.getQueryApi(this.org);
      const result = await queryApi.collectRows(query);
      
      if (result.length > 0) {
        return result[0]._value as number;
      }
      
      return 0;
    } catch (error) {
      log(`Error getting referral count for code ${referralCode}: ${error}`, 'analytics');
      return 0;
    }
  }

  /**
   * Get daily signup counts for the past N days
   */
  public async getDailySignups(days: number = 30): Promise<Array<{ date: string; count: number }>> {
    if (!this.enabled) return [];

    try {
      const query = flux`
        from(bucket: ${this.bucket})
          |> range(start: -${days}d)
          |> filter(fn: (r) => r._measurement == "signup")
          |> aggregateWindow(every: 1d, fn: count)
          |> yield(name: "count")
      `;

      const queryApi = this.influxClient.getQueryApi(this.org);
      const result = await queryApi.collectRows(query);
      
      return result.map(row => ({
        date: new Date(row._time).toISOString().split('T')[0],
        count: row._value as number
      }));
    } catch (error) {
      log(`Error getting daily signups: ${error}`, 'analytics');
      return [];
    }
  }

  /**
   * Get top countries by signup count
   */
  public async getTopCountries(limit: number = 10): Promise<Array<{ country: string; count: number }>> {
    if (!this.enabled) return [];

    try {
      const query = flux`
        from(bucket: ${this.bucket})
          |> range(start: -365d)
          |> filter(fn: (r) => r._measurement == "signup")
          |> filter(fn: (r) => exists r.country)
          |> group(columns: ["country"])
          |> count()
          |> sort(columns: ["_value"], desc: true)
          |> limit(n: ${limit})
          |> yield(name: "count")
      `;

      const queryApi = this.influxClient.getQueryApi(this.org);
      const result = await queryApi.collectRows(query);
      
      return result.map(row => ({
        country: row.country as string,
        count: row._value as number
      }));
    } catch (error) {
      log(`Error getting top countries: ${error}`, 'analytics');
      return [];
    }
  }

  /**
   * Get top referrers by referral count
   */
  public async getTopReferrers(limit: number = 10): Promise<Array<{ code: string; count: number }>> {
    if (!this.enabled) return [];

    try {
      const query = flux`
        from(bucket: ${this.bucket})
          |> range(start: -365d)
          |> filter(fn: (r) => r._measurement == "referral")
          |> group(columns: ["referral_code"])
          |> count()
          |> sort(columns: ["_value"], desc: true)
          |> limit(n: ${limit})
          |> yield(name: "count")
      `;

      const queryApi = this.influxClient.getQueryApi(this.org);
      const result = await queryApi.collectRows(query);
      
      return result.map(row => ({
        code: row.referral_code as string,
        count: row._value as number
      }));
    } catch (error) {
      log(`Error getting top referrers: ${error}`, 'analytics');
      return [];
    }
  }

  /**
   * Helper method to anonymize email addresses for privacy
   */
  private anonymizeEmail(email: string): string {
    const [name, domain] = email.split('@');
    if (!domain) return email;
    
    const firstLetter = name.charAt(0);
    const maskedName = `${firstLetter}${'*'.repeat(Math.min(5, name.length - 1))}`;
    
    return `${maskedName}@${domain}`;
  }
}

// Singleton instance
let analyticsService: AnalyticsService | null = null;

export function getAnalyticsService(): AnalyticsService {
  if (!analyticsService) {
    analyticsService = new AnalyticsService();
  }
  return analyticsService;
}