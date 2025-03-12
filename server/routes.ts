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
      });
      
      try {
        // Add the entry to storage
        const entry = await storage.createWaitlistEntry(data);
        return res.status(201).json({ success: true, data: entry });
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

  const httpServer = createServer(app);
  return httpServer;
}
