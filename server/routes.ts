import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage, type IStorage } from "./storage";
import { 
  insertWaitlistEntrySchema, 
  insertDailyWaitlistStatsSchema,
  insertGeographicStatsSchema,
  insertReferralChannelSchema 
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import JSZip from "jszip";
import { getAnalyticsService } from "./analytics";

// Authentication middleware for admin routes
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // For now, we'll use a simple API key authentication
  // In production, you would want to use a more secure method like JWT
  const apiKey = req.headers['x-api-key'];
  
  // This is a placeholder - in a real app, you would store this securely
  // and not hardcode it in your codebase
  const ADMIN_API_KEY = "peochain-analytics-2025";
  
  if (!apiKey || apiKey !== ADMIN_API_KEY) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access. Valid API key required."
    });
  }
  
  next();
};

import { createWaitlistRateLimiter, createReferralRateLimiter } from './middleware/rate-limit';

export async function registerRoutes(app: Express, storage: IStorage): Promise<Server> {
  // Create HTTP server
  const server = createServer(app);
  
  // Initialize rate limiters
  const waitlistRateLimiter = await createWaitlistRateLimiter();
  const referralRateLimiter = await createReferralRateLimiter();
  
  const errorHandler = (error: unknown, res: Response): void => {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      res.status(400).json({ success: false, message: validationError.message });
      return;
    }
    console.error('Unexpected error:', error);
    res.status(500).json({ success: false, message: 'An unexpected error occurred' });
  };

  // Waitlist API endpoint with improved error handling and rate limiting
  app.post("/api/waitlist", waitlistRateLimiter, async (req: Request, res: Response) => {
    try {
      // Format any developer metadata into JSON
      let metadata = null;
      if (req.body.userType === 'developer' && (req.body.role || req.body.githubUrl)) {
        metadata = JSON.stringify({
          role: req.body.role,
          githubUrl: req.body.githubUrl
        });
      }
      
      // Validate the request body against the schema
      const data = insertWaitlistEntrySchema.parse({
        fullName: req.body.fullName,
        email: req.body.email,
        referredBy: req.body.referredBy,
        userType: req.body.userType || 'user',
        metadata: metadata
      });
      
      try {
        // Add the entry to storage
        const entry = await storage.createWaitlistEntry(data);
        
        // Record signup in analytics service
        const analyticsService = getAnalyticsService();
        await analyticsService.recordSignup({
          email: entry.email,
          referredBy: entry.referredBy || undefined,
          userType: entry.userType,
          // Extract additional data from request headers for analytics
          country: req.headers['cf-ipcountry'] as string || 'unknown',
          device: req.headers['user-agent'] as string || undefined,
          source: req.query.source as string || req.headers['referer'] as string || undefined
        });
        
        // Record referral if applicable
        if (entry.referredBy) {
          await analyticsService.recordReferral({
            referralCode: entry.referredBy,
            newUserEmail: entry.email
          });
        }
        
        return res.status(201).json({ 
          success: true, 
          data: {
            id: entry.id,
            email: entry.email,
            fullName: entry.fullName,
            referralCode: entry.referralCode,
            referralCount: entry.referralCount,
            userType: entry.userType
          } 
        });
      } catch (error) {
        // Handle duplicate email error
        if (error instanceof Error && error.message.includes("already exists")) {
          return res.status(409).json({ 
            success: false, 
            message: "This email is already registered on our waitlist." 
          });
        }
        
        // Handle other storage errors
        console.error("Error creating waitlist entry:", error);
        return res.status(500).json({ 
          success: false, 
          message: "Failed to add you to the waitlist. Please try again." 
        });
      }
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      
      // Handle other errors
      console.error("Unexpected error in waitlist endpoint:", error);
      return res.status(500).json({ 
        success: false, 
        message: "An unexpected error occurred. Please try again." 
      });
    }
  });
  
  // Get referral information with rate limiting to prevent scanning
  app.get("/api/referral/:code", referralRateLimiter, async (req: Request, res: Response) => {
    try {
      const referralCode = req.params.code;
      const entry = await storage.getWaitlistEntryByReferralCode(referralCode);
      
      if (!entry) {
        return res.status(404).json({
          success: false,
          message: "Invalid referral code"
        });
      }
      
      return res.status(200).json({
        success: true,
        data: {
          referralCode: entry.referralCode,
          referralCount: entry.referralCount
        }
      });
    } catch (error) {
      console.error("Error fetching referral information:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch referral information"
      });
    }
  });

  // Analytics endpoints (protected by API key authentication)
  
  // Get analytics overview
  app.get("/api/analytics/overview", authenticate, async (req: Request, res: Response) => {
    try {
      const overview = await storage.getAnalyticsOverview();
      return res.status(200).json({
        success: true,
        data: overview
      });
    } catch (error) {
      console.error("Error fetching analytics overview:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch analytics overview"
      });
    }
  });

  // Get daily stats for a date range
  app.get("/api/analytics/daily-stats", authenticate, async (req: Request, res: Response) => {
    try {
      // Parse query parameters
      const startDateParam = req.query.startDate as string;
      const endDateParam = req.query.endDate as string;
      
      // Use default range of last 30 days if not provided
      const endDate = endDateParam ? new Date(endDateParam) : new Date();
      const startDate = startDateParam 
        ? new Date(startDateParam) 
        : new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days before end date
      
      const stats = await storage.getDailyStatsForDateRange(startDate, endDate);
      return res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error("Error fetching daily stats:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch daily statistics"
      });
    }
  });

  // Create or update daily stats
  app.post("/api/analytics/daily-stats", authenticate, async (req: Request, res: Response) => {
    try {
      const data = insertDailyWaitlistStatsSchema.parse(req.body);
      const stats = await storage.createOrUpdateDailyStats(data);
      return res.status(201).json({
        success: true,
        data: stats
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      
      console.error("Error creating/updating daily stats:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create or update daily statistics"
      });
    }
  });

  // Get all geographic stats
  app.get("/api/analytics/geographic-stats", authenticate, async (req: Request, res: Response) => {
    try {
      const stats = await storage.getAllGeographicStats();
      return res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error("Error fetching geographic stats:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch geographic statistics"
      });
    }
  });

  // Create or update geographic stats
  app.post("/api/analytics/geographic-stats", authenticate, async (req: Request, res: Response) => {
    try {
      const data = insertGeographicStatsSchema.parse(req.body);
      const stats = await storage.createOrUpdateGeographicStats(data);
      return res.status(201).json({
        success: true,
        data: stats
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      
      console.error("Error creating/updating geographic stats:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create or update geographic statistics"
      });
    }
  });

  // Get all referral channels
  app.get("/api/analytics/referral-channels", authenticate, async (req: Request, res: Response) => {
    try {
      const channels = await storage.getAllReferralChannels();
      return res.status(200).json({
        success: true,
        data: channels
      });
    } catch (error) {
      console.error("Error fetching referral channels:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch referral channels"
      });
    }
  });

  // Create or update referral channel
  app.post("/api/analytics/referral-channels", authenticate, async (req: Request, res: Response) => {
    try {
      const data = insertReferralChannelSchema.parse(req.body);
      const channel = await storage.createOrUpdateReferralChannel(data);
      return res.status(201).json({
        success: true,
        data: channel
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      
      console.error("Error creating/updating referral channel:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create or update referral channel"
      });
    }
  });

  // Get top waitlist referrers
  app.get("/api/analytics/top-referrers", authenticate, async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const entries = await storage.getAllWaitlistEntries();
      const sortedEntries = entries
        .sort((a: { referralCount: number }, b: { referralCount: number }) => b.referralCount - a.referralCount)
        .slice(0, limit);
      
      return res.status(200).json({
        success: true,
        data: sortedEntries
      });
    } catch (error) {
      console.error("Error fetching top referrers:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch top referrers"
      });
    }
  });

  // Export analytics data
  app.get("/api/analytics/export", authenticate, async (req: Request, res: Response) => {
    try {
      const overview = await storage.getAnalyticsOverview();
      const allEntries = await storage.getAllWaitlistEntries();
      
      // Get current date for filename
      const currentDate = new Date();
      const dateString = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      
      // Format CSV data
      const dailyStatsCSV = ['Date,Signups,Referrals,Conversion Rate\n'];
      overview.dailyStats.forEach(stat => {
        dailyStatsCSV.push(`${stat.date},${stat.signupCount},${stat.totalReferrals},${stat.conversionRate}\n`);
      });

      const regionsCSV = ['Region,Users,Engagement Score\n'];
      overview.topRegions.forEach(region => {
        regionsCSV.push(`${region.region},${region.userCount},${region.engagementScore}\n`);
      });

      const channelsCSV = ['Channel,Referrals,Conversion Rate\n'];
      overview.topChannels.forEach(channel => {
        channelsCSV.push(`${channel.channelName},${channel.referralCount},${channel.conversionRate}\n`);
      });
      
      // Create waitlist entries CSV
      const waitlistCSV = ['ID,Full Name,Email,Referral Code,Referral Count,User Type,Created At\n'];
      allEntries.forEach(entry => {
        // Escape commas in text fields by wrapping in quotes
        const fullName = entry.fullName.includes(',') ? `"${entry.fullName}"` : entry.fullName;
        waitlistCSV.push(`${entry.id},${fullName},${entry.email},${entry.referralCode},${entry.referralCount},${entry.userType},${entry.createdAt}\n`);
      });
      
      // Create summary file
      const totalSignups = allEntries.length;
      const totalReferrals = overview.totalReferrals;
      const avgReferralsPerUser = overview.avgReferralsPerUser;
      
      // Find signup spike day
      let spikeDay = '';
      let spikeCount = 0;
      
      overview.dailyStats.forEach(stat => {
        if (stat.signupCount > spikeCount) {
          spikeCount = stat.signupCount;
          spikeDay = stat.date.toString();
        }
      });
      
      const summaryText = `
PeoChain Analytics Summary
Generated: ${currentDate.toLocaleString()}

OVERVIEW
--------
Total Users: ${totalSignups}
Total Referrals: ${totalReferrals}
Average Referrals Per User: ${avgReferralsPerUser.toFixed(2)}
Highest Signup Day: ${spikeDay} (${spikeCount} signups)

TOP REFERRERS
-------------
${overview.topReferrers.slice(0, 5).map((user, index) => 
  `${index + 1}. ${user.fullName} (${user.email}): ${user.referralCount} referrals`
).join('\n')}

EXPORT CONTENTS
--------------
- daily_stats.csv: Daily signup and referral metrics
- regions.csv: Geographic distribution of users
- channels.csv: Referral channel performance
- waitlist.csv: Complete user waitlist data
`;

      // Create ZIP file containing all CSV data
      const zip = new JSZip();
      zip.file('daily_stats.csv', dailyStatsCSV.join(''));
      zip.file('regions.csv', regionsCSV.join(''));
      zip.file('channels.csv', channelsCSV.join(''));
      zip.file('waitlist.csv', waitlistCSV.join(''));
      zip.file('summary.txt', summaryText);
      
      const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
      
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename=peochain_analytics_${dateString}.zip`);
      res.send(zipContent);
    } catch (error) {
      console.error("Error exporting analytics:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to export analytics data"
      });
    }
  });

  return server;
}
