import { Router, Express, Request, Response, NextFunction } from 'express';
import { Server } from 'http';
import { IStorage } from '../../services/storage';
// Define a basic schema for waitlist entries without relying on the types package
import { z } from 'zod';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { createServer } from 'http';

// Define our own schema to match what's in the types package
const insertWaitlistEntrySchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  referredBy: z.string().optional(),
  userType: z.string().optional(),
  metadata: z.any().optional(),
});

// Authentication middleware
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // This is a simple implementation. In production, use proper authentication.
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ 
      error: { 
        message: 'Unauthorized: Invalid or missing API key', 
        status: 401 
      } 
    });
  }
  
  next();
};

export async function registerRoutes(app: Express, storage: IStorage): Promise<Server> {
  const errorHandler = (error: unknown, res: Response): void => {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      res.status(400).json({ error: { message: validationError.message, status: 400 }});
    } else if (error instanceof Error) {
      res.status(500).json({ error: { message: error.message, status: 500 }});
    } else {
      res.status(500).json({ error: { message: 'An unexpected error occurred', status: 500 }});
    }
  };

  // Create a server instance
  const server = createServer(app);

  // Waitlist API
  app.post("/api/waitlist", async (req: Request, res: Response) => {
    try {
      const validatedData = insertWaitlistEntrySchema.parse(req.body);
      const entry = await storage.createWaitlistEntry(validatedData);
      res.status(201).json(entry);
    } catch (error) {
      errorHandler(error, res);
    }
  });

  // Referral lookup
  app.get("/api/referral/:code", async (req: Request, res: Response) => {
    try {
      const { code } = req.params;
      const entry = await storage.getWaitlistEntryByReferralCode(code);
      
      if (!entry) {
        return res.status(404).json({ error: { message: 'Referral code not found', status: 404 }});
      }
      
      // Only return necessary info for privacy
      res.status(200).json({
        fullName: entry.fullName,
        referralCode: entry.referralCode,
        referralCount: entry.referralCount
      });
    } catch (error) {
      errorHandler(error, res);
    }
  });

  // Analytics API - Overview
  app.get("/api/analytics/overview", authenticate, async (req: Request, res: Response) => {
    try {
      const overview = await storage.getAnalyticsOverview();
      res.status(200).json(overview);
    } catch (error) {
      errorHandler(error, res);
    }
  });

  // Analytics API - Daily Stats
  app.get("/api/analytics/daily-stats", authenticate, async (req: Request, res: Response) => {
    try {
      const { start, end } = req.query;
      
      if (start && end) {
        const startDate = new Date(start as string);
        const endDate = new Date(end as string);
        const stats = await storage.getDailyStatsForDateRange(startDate, endDate);
        res.status(200).json(stats);
      } else {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 30;
        const stats = await storage.getLatestDailyStats(limit);
        res.status(200).json(stats);
      }
    } catch (error) {
      errorHandler(error, res);
    }
  });

  // Add or update daily stats
  app.post("/api/analytics/daily-stats", authenticate, async (req: Request, res: Response) => {
    try {
      const stats = await storage.createOrUpdateDailyStats(req.body);
      res.status(200).json(stats);
    } catch (error) {
      errorHandler(error, res);
    }
  });

  // Geographic Stats
  app.get("/api/analytics/geographic-stats", authenticate, async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      if (req.query.top) {
        const stats = await storage.getTopRegionsByUserCount(limit);
        res.status(200).json(stats);
      } else {
        const stats = await storage.getAllGeographicStats();
        res.status(200).json(stats);
      }
    } catch (error) {
      errorHandler(error, res);
    }
  });

  // Add or update geographic stats
  app.post("/api/analytics/geographic-stats", authenticate, async (req: Request, res: Response) => {
    try {
      const stats = await storage.createOrUpdateGeographicStats(req.body);
      res.status(200).json(stats);
    } catch (error) {
      errorHandler(error, res);
    }
  });

  // Referral Channel Stats
  app.get("/api/analytics/referral-channels", authenticate, async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      if (req.query.top) {
        const channels = await storage.getTopReferralChannels(limit);
        res.status(200).json(channels);
      } else {
        const channels = await storage.getAllReferralChannels();
        res.status(200).json(channels);
      }
    } catch (error) {
      errorHandler(error, res);
    }
  });

  // Add or update referral channel
  app.post("/api/analytics/referral-channels", authenticate, async (req: Request, res: Response) => {
    try {
      const channel = await storage.createOrUpdateReferralChannel(req.body);
      res.status(200).json(channel);
    } catch (error) {
      errorHandler(error, res);
    }
  });

  // Top referrers
  app.get("/api/analytics/top-referrers", authenticate, async (req: Request, res: Response) => {
    try {
      const { topReferrers } = await storage.getAnalyticsOverview();
      res.status(200).json(topReferrers);
    } catch (error) {
      errorHandler(error, res);
    }
  });

  // Export all waitlist data (for admin export)
  app.get("/api/analytics/export", authenticate, async (req: Request, res: Response) => {
    try {
      const entries = await storage.getAllWaitlistEntries();
      
      // Remove sensitive data
      const sanitizedEntries = entries.map(entry => ({
        ...entry,
        // Removing any sensitive data that shouldn't be exported
        metadata: undefined
      }));
      
      res.status(200).json(sanitizedEntries);
    } catch (error) {
      errorHandler(error, res);
    }
  });

  return server;
}