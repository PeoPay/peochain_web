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

export function WaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referralData, setReferralData] = useState<{ code: string, count: number } | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
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
      {!isSubmitted ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your full name" 
                      className="px-4 py-3 border-foreground/20 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/60 text-foreground rounded-xl" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium">Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your Email Address" 
                      type="email"
                      className="px-4 py-3 border-foreground/20 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/60 text-foreground rounded-xl" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
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
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-4 w-4"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm text-foreground/70 font-normal">
                      Send me updates on PEOCHAIN's launch and exclusive offers!
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full btn-gradient text-white font-semibold py-6 rounded-xl"
              disabled={waitlistMutation.isPending}
            >
              {waitlistMutation.isPending ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Processing...
                </span>
              ) : (
                <span>Secure My Spot</span>
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <Card className="bg-primary/10 border border-primary text-foreground mt-8">
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">✓</div>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-foreground">Registration Successful!</h3>
                  <p className="mt-2 text-foreground/70">
                    Thank you for joining the PEOCHAIN waitlist. We'll notify you when we're ready to launch!
                  </p>
                </div>
              </div>
              
              {referralData && (
                <div className="mt-6 border-t border-primary/20 pt-6">
                  <h4 className="font-medium text-foreground mb-2">Refer Friends, Move Up the Waitlist</h4>
                  <p className="text-sm text-foreground/70 mb-4">
                    Share your unique referral link with friends. Each successful referral moves you up in our priority access list!
                  </p>
                  
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/80 rounded-lg border border-primary/20">
                      <div className="text-sm font-medium truncate mr-2">
                        {window.location.origin}/?ref={referralData.code}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-shrink-0 bg-primary/10 hover:bg-primary/20 border-primary/20 text-primary"
                        onClick={handleCopyReferral}
                      >
                        <Share2 className="h-4 w-4 mr-1" /> Copy
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="text-sm">Current Referrals</div>
                      <div className="font-medium text-primary">{referralData.count}</div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-foreground/60 mt-4">
                    The more friends you refer, the earlier you'll get access to PEOCHAIN.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
