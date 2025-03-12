import { pgTable, text, serial, integer, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Waitlist schema for storing waitlist registrations
export const waitlistEntries = pgTable("waitlist_entries", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  referralCode: text("referral_code").notNull().unique(),
  referredBy: text("referred_by"),
  referralCount: integer("referral_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertWaitlistEntrySchema = createInsertSchema(waitlistEntries)
  .pick({
    fullName: true,
    email: true,
    referredBy: true,
  })
  .extend({
    referredBy: z.string().optional(),
  });

export type InsertWaitlistEntry = z.infer<typeof insertWaitlistEntrySchema>;
export type WaitlistEntry = typeof waitlistEntries.$inferSelect;
