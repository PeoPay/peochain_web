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

export async function registerRoutes(app: Express, storage: IStorage): Promise<Server> {
  const errorHandler = (error: unknown, res: Response): void => {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      res.status(400).json({ success: false, message: validationError.message });
      return;
    }
    console.error('Unexpected error:', error);
    res.status(500).json({ success: false, message: 'An unexpected error occurred' });
  };

  // Waitlist API endpoint with improved error handling
  app.post("/api/waitlist", async (req: Request, res: Response) => {
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
  
  // Get referral information
  app.get("/api/referral/:code", async (req: Request, res: Response) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
// Export analytics data
  app.get("/api/analytics/export", authenticate, async (req: Request, res: Response) => {
    try {
      const overview = await storage.getAnalyticsOverview();
      
      // Format CSV data
      const dailyStatsCSV = ['Date,Signups,Referrals,Conversion Rate\n'];
      overview.dailyStats.forEach(stat => {
        dailyStatsCSV.push(`${stat.date},${stat.signupCount},${stat.totalReferrals},${stat.conversionRate}\n`);
      });

      const regionsCSV = ['Region,Users,Conversion Rate\n'];
      overview.topRegions.forEach(region => {
        regionsCSV.push(`${region.region},${region.userCount},${region.conversionRate}\n`);
      });

      const channelsCSV = ['Channel,Referrals,Conversion Rate\n'];
      overview.topChannels.forEach(channel => {
        channelsCSV.push(`${channel.channelName},${channel.referralCount},${channel.conversionRate}\n`);
      });

      // Create ZIP file
      const zip = new JSZip();
      zip.file('daily_stats.csv', dailyStatsCSV.join(''));
      zip.file('regions.csv', regionsCSV.join(''));
      zip.file('channels.csv', channelsCSV.join(''));
      
      const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
      
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename=analytics_export.zip');
      res.send(zipContent);
    } catch (error) {
      console.error("Error exporting analytics:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to export analytics data"
      });
    }
  });
