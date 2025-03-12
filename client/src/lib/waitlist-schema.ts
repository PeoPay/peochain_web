import { z } from "zod";

export const waitlistFormSchema = z.object({
  fullName: z.string().min(3, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to receive updates"
  })
});

export type WaitlistFormData = z.infer<typeof waitlistFormSchema>;
