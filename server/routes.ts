import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage, type IStorage } from "./storage";
import { 
  insertWaitlistEntrySchema, 
  insertDailyWaitlistStatsSchema,
  insertGeographicStatsSchema,
  insertReferralChannelSchema,
  insertAiChatSchema,
  insertAiMessageSchema
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

  // AI Assistant API Endpoints
  
  // Create a new chat session
  app.post("/api/ai/chat", async (req: Request, res: Response) => {
    try {
      // Generate a unique session ID
      const sessionId = `chat_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      
      // Create chat session in database
      const chat = await storage.createChat({
        sessionId,
        userId: req.body.userId,
        waitlistEntryId: req.body.waitlistEntryId
      });
      
      return res.status(201).json({
        success: true,
        data: {
          chatId: chat.id,
          sessionId: chat.sessionId
        }
      });
    } catch (error) {
      console.error("Error creating chat session:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create chat session"
      });
    }
  });
  
  // Send a message and get AI response
  app.post("/api/ai/message", async (req: Request, res: Response) => {
    try {
      const { sessionId, message } = req.body;
      
      if (!sessionId || !message) {
        return res.status(400).json({
          success: false,
          message: "Session ID and message are required"
        });
      }
      
      // Get or create chat session
      let chat = await storage.getChatBySessionId(sessionId);
      
      if (!chat) {
        // Create new chat if session doesn't exist
        chat = await storage.createChat({
          sessionId,
          userId: req.body.userId,
          waitlistEntryId: req.body.waitlistEntryId
        });
      }
      
      // Store user message
      await storage.addMessageToChat({
        chatId: chat.id,
        role: "user",
        content: message
      });
      
      // In a real implementation, we'd call an external AI service here
      // For now, we'll use a simple response system based on keywords
      let aiResponse = "";
      
      // Simple pattern matching to generate responses
      const lowerCaseMessage = message.toLowerCase();
      
      if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
        aiResponse = "Hello! I'm PeoChain's AI assistant. How can I help you learn about blockchain technology today?";
      } else if (lowerCaseMessage.includes("blockchain")) {
        aiResponse = "Blockchain is a distributed ledger technology that enables secure, transparent, and immutable transactions. It's the foundation of cryptocurrencies like Bitcoin, but has many other applications!";
      } else if (lowerCaseMessage.includes("peochain")) {
        aiResponse = "PeoChain is an educational platform focused on transforming blockchain education through interactive, engaging digital experiences. We simplify complex blockchain concepts to make learning accessible for everyone.";
      } else if (lowerCaseMessage.includes("waitlist")) {
        aiResponse = "You can join our waitlist by providing your name and email. We'll notify you as soon as PeoChain launches, and you'll get early access to our platform. You can also refer friends to earn rewards!";
      } else if (lowerCaseMessage.includes("refer") || lowerCaseMessage.includes("referral")) {
        aiResponse = "Our referral program allows you to earn rewards by inviting friends to join the PeoChain waitlist. Once you join, you'll receive a unique referral code that you can share with others.";
      } else if (lowerCaseMessage.includes("nft") || lowerCaseMessage.includes("token")) {
        aiResponse = "Non-Fungible Tokens (NFTs) are unique digital assets representing ownership of items like art, collectibles, or other digital content. They use blockchain technology to verify authenticity and ownership.";
      } else if (lowerCaseMessage.includes("defi") || lowerCaseMessage.includes("decentralized finance")) {
        aiResponse = "Decentralized Finance (DeFi) refers to financial applications built on blockchain technology that operate without central authorities like banks. DeFi applications aim to provide traditional financial services in a decentralized way.";
      } else if (lowerCaseMessage.includes("thank")) {
        aiResponse = "You're welcome! If you have any other questions about blockchain or PeoChain, feel free to ask. I'm here to help!";
      } else {
        aiResponse = "Thank you for your message. I'm still learning about blockchain topics. Could you ask me something about blockchain technology, PeoChain, or our waitlist?";
      }
      
      // Store AI response
      const aiMessage = await storage.addMessageToChat({
        chatId: chat.id,
        role: "assistant",
        content: aiResponse
      });
      
      return res.status(200).json({
        success: true,
        data: {
          message: aiMessage.content,
          timestamp: aiMessage.createdAt
        }
      });
    } catch (error) {
      console.error("Error processing message:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to process message"
      });
    }
  });
  
  // Get chat history
  app.get("/api/ai/chat/:sessionId", async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.params;
      
      const chatWithMessages = await storage.getChatWithMessagesBySessionId(sessionId);
      
      if (!chatWithMessages) {
        return res.status(404).json({
          success: false,
          message: "Chat session not found"
        });
      }
      
      // Format messages for client
      const formattedMessages = chatWithMessages.messages.map(msg => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        timestamp: msg.createdAt
      }));
      
      return res.status(200).json({
        success: true,
        data: {
          chatId: chatWithMessages.chat.id,
          sessionId: chatWithMessages.chat.sessionId,
          messages: formattedMessages
        }
      });
    } catch (error) {
      console.error("Error fetching chat history:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch chat history"
      });
    }
  });

  return server;
}
