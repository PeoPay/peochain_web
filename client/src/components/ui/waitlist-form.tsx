import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { waitlistFormSchema, WaitlistFormData, WaitlistSubmitResponse } from "@/lib/waitlist-schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Share2 } from "lucide-react";
import { useLocation } from "wouter";
import { SocialShare } from "@/components/ui/social-share";

export function WaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referralData, setReferralData] = useState<{ code: string, count: number } | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  // Unique IDs for improved accessibility
  const formId = "waitlist-form";
  const successMessageId = "waitlist-success-message";
  const loadingStateId = "waitlist-loading-state";
  
  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      referredBy: "",
      agreeToTerms: false,
    },
  });
  
  // Get the referral code from URL if present
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('ref');
    
    if (referralCode) {
      form.setValue('referredBy', referralCode);
    }
  }, [form]);

  const waitlistMutation = useMutation<WaitlistSubmitResponse, Error, WaitlistFormData>({
    mutationFn: async (data: WaitlistFormData) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: (response) => {
      setIsSubmitted(true);
      
      if (response.success && response.data) {
        setReferralData({
          code: response.data.referralCode,
          count: response.data.referralCount
        });
      }
      
      toast({
        title: "Registration Successful",
        description: "You have been added to our waitlist!",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: WaitlistFormData) {
    waitlistMutation.mutate(data);
  }
  
  const handleCopyReferral = () => {
    if (referralData) {
      const referralLink = `${window.location.origin}/?ref=${referralData.code}`;
      navigator.clipboard.writeText(referralLink);
      toast({
        title: "Referral Link Copied!",
        description: "Share it with friends to earn rewards!",
        variant: "default",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden descriptive text for clarity */}
      <div className="sr-only">
        <h2>Join the PEOChain Developer Waitlist</h2>
        <p>
          Register for early access to PEOChain's developer resources, API keys, and technical documentation. 
          By joining the waitlist, you'll be among the first to build on our high-performance blockchain platform.
        </p>
      </div>
      
      {!isSubmitted ? (
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-6" 
            id={formId}
            aria-labelledby="waitlist-form-heading"
          >
            <div className="sr-only" id="waitlist-form-heading">PEOChain Developer Waitlist Registration</div>
            
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium" htmlFor="fullName">Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      id="fullName"
                      placeholder="Enter your full name" 
                      className="px-4 py-3 border-foreground/20 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/60 text-foreground rounded-xl" 
                      {...field} 
                      aria-required="true"
                      aria-describedby="fullName-error"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 font-medium" id="fullName-error" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium" htmlFor="email">Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      id="email"
                      placeholder="Your Email Address" 
                      type="email"
                      className="px-4 py-3 border-foreground/20 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/60 text-foreground rounded-xl" 
                      {...field} 
                      aria-required="true"
                      aria-describedby="email-error"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 font-medium" id="email-error" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                  <FormControl>
                    <Checkbox
                      id="terms-checkbox"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-5 w-5 mt-0.5"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-tight">
                    <FormLabel className="text-sm text-foreground/80 font-normal cursor-pointer" htmlFor="terms-checkbox">
                      Send me updates about PEOCHAIN's launch
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full btn-gradient text-white font-semibold py-6 rounded-xl"
              disabled={waitlistMutation.isPending}
              aria-live="polite"
              aria-busy={waitlistMutation.isPending}
              id={loadingStateId}
            >
              {waitlistMutation.isPending ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Processing...</span>
                </span>
              ) : (
                <span>Register for Developer Access</span>
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <Card 
          className="bg-primary/10 border border-primary text-foreground mt-8" 
          role="alert" 
          aria-live="polite"
          id={successMessageId}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white" aria-hidden="true">✓</div>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-foreground">You're In!</h3>
                  <p className="mt-2 text-foreground/80 text-sm">
                    Thank you for joining the waitlist. We'll notify you when we launch!
                  </p>
                </div>
              </div>
              
              {referralData && (
                <div className="mt-6 border-t border-primary/20 pt-6">
                  <h4 className="font-medium text-foreground mb-2">Refer Fellow Developers</h4>
                  <p className="text-sm text-foreground/80 mb-4">
                    Share your referral link with other developers to gain priority API access and expanded quotas.
                  </p>
                  
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-white/80 rounded-lg border border-primary/20">
                      <div className="text-sm font-medium truncate flex-1 w-full break-all sm:break-normal overflow-hidden" aria-label="Your referral link">
                        <span className="hidden sm:inline">{window.location.origin}/</span><span className="sm:hidden">...</span>?ref={referralData.code}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-shrink-0 bg-primary/10 hover:bg-primary/20 border-primary/20 text-primary w-full sm:w-auto"
                        onClick={handleCopyReferral}
                        aria-label="Copy referral link to clipboard"
                      >
                        <Share2 className="h-4 w-4 mr-1" aria-hidden="true" /> Copy Link
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="text-sm">Current Referrals</div>
                      <div className="font-medium text-primary" aria-live="polite">{referralData.count}</div>
                    </div>
                    
                    {/* Social Share Component */}
                    <SocialShare referralCode={referralData.code} className="mt-2" />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
