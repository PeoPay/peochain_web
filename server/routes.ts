import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistEntrySchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Waitlist API endpoint
  app.post("/api/waitlist", async (req: Request, res: Response) => {
    try {
      // Validate the request body against the schema
      const data = insertWaitlistEntrySchema.parse({
        fullName: req.body.fullName,
        email: req.body.email,
        referredBy: req.body.referredBy,
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
            referralCount: entry.referralCount
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

  const httpServer = createServer(app);
  return httpServer;
}
