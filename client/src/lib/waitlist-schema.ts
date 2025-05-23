import { z } from "zod";

export const waitlistFormSchema = z.object({
  fullName: z.string().min(3, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  referredBy: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to receive updates"
  }),
  // New fields for dual waitlist
  userType: z.enum(["user", "developer"]).default("user"),
  metadata: z.string().optional(),
  // Optional fields for developer form that will be stored in metadata
  role: z.string().optional(),
  githubUrl: z.string().optional()
});

export type WaitlistFormData = z.infer<typeof waitlistFormSchema>;

export type ReferralResponse = {
  success: boolean;
  data?: {
    referralCode: string;
    referralCount: number;
  };
  message?: string;
};

export type WaitlistSubmitResponse = {
  success: boolean;
  data?: {
    id: number;
    email: string;
    fullName: string;
    referralCode: string;
    referralCount: number;
  };
  message?: string;
};
