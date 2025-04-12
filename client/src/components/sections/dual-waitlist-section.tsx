import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  waitlistFormSchema, 
  WaitlistFormData, 
  WaitlistSubmitResponse 
} from "@/lib/waitlist-schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Share2 } from "lucide-react";
import { SocialShare } from "@/components/ui/social-share";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "../ui/separator";

// User waitlist form component
function UserWaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referralData, setReferralData] = useState<{ code: string, count: number } | null>(null);
  const { toast } = useToast();
  const formId = "user-waitlist-form";
  const successMessageId = "user-waitlist-success";
  const loadingStateId = "user-waitlist-loading";
  
  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      referredBy: "",
      agreeToTerms: false,
      userType: "user" as const,
      metadata: ""
    },
  });
  
  // Get the referral code from URL if present
  React.useEffect(() => {
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
    <div className="space-y-6 w-full max-w-md mx-auto">
      {/* Hidden descriptive text for clarity */}
      <div className="sr-only">
        <h2>Join the PEOChain Global User Waitlist</h2>
        <p>
          Sign up to be among the first global users to access PEOChain's revolutionary blockchain platform.
          Get early access to features, updates, and exclusive benefits.
        </p>
      </div>
      
      {!isSubmitted ? (
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-5" 
            id={formId}
            aria-labelledby="user-waitlist-form-heading"
          >
            <div className="sr-only" id="user-waitlist-form-heading">
              PEOChain Global User Waitlist Registration
            </div>
            
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium" htmlFor="user-fullName">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input 
                      id="user-fullName"
                      placeholder="Enter your full name" 
                      className="px-4 py-3 border-foreground/20 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/60 text-foreground rounded-xl" 
                      {...field} 
                      aria-required="true"
                      aria-describedby="user-fullName-error"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 font-medium" id="user-fullName-error" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium" htmlFor="user-email">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input 
                      id="user-email"
                      placeholder="Your Email Address" 
                      type="email"
                      className="px-4 py-3 border-foreground/20 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/60 text-foreground rounded-xl" 
                      {...field} 
                      aria-required="true"
                      aria-describedby="user-email-error"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 font-medium" id="user-email-error" />
                </FormItem>
              )}
            />
            
            {/* Hidden field for user type */}
            <input type="hidden" name="userType" value="user" />
            
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                  <FormControl>
                    <Checkbox
                      id="user-terms-checkbox"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground h-5 w-5 mt-0.5"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-tight">
                    <FormLabel className="text-sm text-foreground/80 font-normal cursor-pointer" htmlFor="user-terms-checkbox">
                      Send me launch updates
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-[#6d9e79] hover:bg-[#5b8466] text-[#e1eae3] font-semibold py-6 rounded-xl"
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
                <span>Secure My Spot</span>
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <Card 
          className="bg-primary/10 border border-primary text-foreground" 
          role="alert" 
          aria-live="polite"
          id={successMessageId}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[#6d9e79] flex items-center justify-center text-white" aria-hidden="true">✓</div>
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
                  <h4 className="font-medium text-foreground mb-2">Refer Friends & Family</h4>
                  <p className="text-sm text-foreground/80 mb-4">
                    Share your referral link to gain priority access and special benefits.
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

// Developer waitlist form component
function DeveloperWaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referralData, setReferralData] = useState<{ code: string, count: number } | null>(null);
  const { toast } = useToast();
  const formId = "dev-waitlist-form";
  const successMessageId = "dev-waitlist-success";
  const loadingStateId = "dev-waitlist-loading";
  
  // Extended form schema for developers
  const form = useForm<WaitlistFormData & { role?: string, githubUrl?: string }>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      referredBy: "",
      agreeToTerms: false,
      role: "Developer",
      githubUrl: "",
      userType: "developer" as const,
      metadata: ""
    },
  });
  
  // Get the referral code from URL if present
  React.useEffect(() => {
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
        title: "Developer Registration Successful",
        description: "You've been added to our developer program waitlist!",
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

  function onSubmit(data: WaitlistFormData & { role?: string, githubUrl?: string }) {
    // Take only the fields that are in the WaitlistFormData type
    const formData: WaitlistFormData = {
      fullName: data.fullName,
      email: data.email,
      referredBy: data.referredBy,
      agreeToTerms: data.agreeToTerms,
      userType: "developer" as const,
      role: data.role,
      githubUrl: data.githubUrl
    };
    
    waitlistMutation.mutate(formData);
  }
  
  const handleCopyReferral = () => {
    if (referralData) {
      const referralLink = `${window.location.origin}/?ref=${referralData.code}`;
      navigator.clipboard.writeText(referralLink);
      toast({
        title: "Referral Link Copied!",
        description: "Share with fellow developers to earn rewards!",
        variant: "default",
      });
    }
  };

  return (
    <div className="space-y-6 w-full max-w-md mx-auto">
      {/* Hidden descriptive text for clarity */}
      <div className="sr-only">
        <h2>Join the PEOChain Developer Program</h2>
        <p>
          Sign up for early access to PEOChain's developer resources, including APIs, documentation,
          and beta-testing opportunities. Be among the first to build on our cutting-edge blockchain platform.
        </p>
      </div>
      
      {!isSubmitted ? (
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-5" 
            id={formId}
            aria-labelledby="dev-waitlist-form-heading"
          >
            <div className="sr-only" id="dev-waitlist-form-heading">
              PEOChain Developer Program Registration
            </div>
            
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium" htmlFor="dev-fullName">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input 
                      id="dev-fullName"
                      placeholder="Enter your full name" 
                      className="px-4 py-3 border-foreground/20 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/60 text-foreground rounded-xl" 
                      {...field} 
                      aria-required="true"
                      aria-describedby="dev-fullName-error"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 font-medium" id="dev-fullName-error" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium" htmlFor="dev-email">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input 
                      id="dev-email"
                      placeholder="Your Email Address" 
                      type="email"
                      className="px-4 py-3 border-foreground/20 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/60 text-foreground rounded-xl" 
                      {...field} 
                      aria-required="true"
                      aria-describedby="dev-email-error"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 font-medium" id="dev-email-error" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium" htmlFor="dev-role">
                    Professional Role
                  </FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger 
                        id="dev-role"
                        className="px-4 py-3 border-foreground/20 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/60 text-foreground rounded-xl" 
                      >
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Developer">Developer</SelectItem>
                      <SelectItem value="Tester">Tester</SelectItem>
                      <SelectItem value="BlockchainEngineer">Blockchain Engineer</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-medium" htmlFor="dev-github">
                    GitHub/Portfolio URL <span className="text-xs font-normal text-foreground/60">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      id="dev-github"
                      placeholder="https://github.com/yourusername" 
                      className="px-4 py-3 border-foreground/20 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/60 text-foreground rounded-xl" 
                      {...field} 
                      aria-describedby="dev-github-error"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 font-medium" id="dev-github-error" />
                </FormItem>
              )}
            />
            
            {/* Hidden field for user type */}
            <input type="hidden" name="userType" value="developer" />
            
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                  <FormControl>
                    <Checkbox
                      id="dev-terms-checkbox"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-[#38503f] data-[state=checked]:text-white h-5 w-5 mt-0.5"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-tight">
                    <FormLabel className="text-sm text-foreground/80 font-normal cursor-pointer" htmlFor="dev-terms-checkbox">
                      Send me technical updates and API access details
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-[#38503f] hover:bg-[#4a6a52] text-[#e1eae3] font-semibold py-6 rounded-xl"
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
                <span>Request Developer Access</span>
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <Card 
          className="bg-[#38503f]/10 border border-[#38503f] text-foreground" 
          role="alert" 
          aria-live="polite"
          id={successMessageId}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[#38503f] flex items-center justify-center text-white" aria-hidden="true">✓</div>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-foreground">Developer Registration Confirmed!</h3>
                  <p className="mt-2 text-foreground/80 text-sm">
                    Thanks for joining our developer program. We'll send you API access details and technical updates soon.
                  </p>
                </div>
              </div>
              
              {referralData && (
                <div className="mt-6 border-t border-[#38503f]/20 pt-6">
                  <h4 className="font-medium text-foreground mb-2">Refer Fellow Developers</h4>
                  <p className="text-sm text-foreground/80 mb-4">
                    Share your referral link with other developers to gain priority API access and expanded quotas.
                  </p>
                  
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-white/80 rounded-lg border border-[#38503f]/20">
                      <div className="text-sm font-medium truncate flex-1 w-full break-all sm:break-normal overflow-hidden" aria-label="Your referral link">
                        <span className="hidden sm:inline">{window.location.origin}/</span><span className="sm:hidden">...</span>?ref={referralData.code}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-shrink-0 bg-[#38503f]/10 hover:bg-[#38503f]/20 border-[#38503f]/20 text-[#38503f] w-full sm:w-auto"
                        onClick={handleCopyReferral}
                        aria-label="Copy referral link to clipboard"
                      >
                        <Share2 className="h-4 w-4 mr-1" aria-hidden="true" /> Copy Link
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 rounded-lg bg-[#38503f]/5 border border-[#38503f]/10">
                      <div className="text-sm">Current Referrals</div>
                      <div className="font-medium text-[#38503f]" aria-live="polite">{referralData.count}</div>
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

// Main dual waitlist component
export default function DualWaitlistSection() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<'user' | 'developer'>('user');
  
  return (
    <div className="w-full bg-[#fbf8f1] text-[#38503f] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* User Section */}
          <div className={`flex flex-col ${isMobile ? '' : 'h-full'}`}>
            <div className="bg-white/70 rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#38503f] mb-2">
                PEOCHAIN – The Future Awaits You!
              </h2>
              <p className="text-[#38503f]/80 mb-6">
                Be among the first to experience PEOCHAIN's revolutionary blockchain platform. 
                Sign up to receive updates, early access opportunities, and exclusive benefits.
              </p>
              
              {isMobile ? (
                <>
                  <Button 
                    onClick={() => setActiveTab('user')}
                    className={`w-full ${activeTab === 'user' 
                      ? 'bg-[#6d9e79] text-[#fbf8f1]' 
                      : 'bg-[#fbf8f1] text-[#6d9e79] border border-[#6d9e79]'} 
                      hover:bg-[#5b8466] hover:text-[#fbf8f1] font-semibold py-5 px-4 rounded-xl mb-6`}
                    aria-pressed={activeTab === 'user'}
                  >
                    Join the Revolution – Be Among the First Global Users
                  </Button>
                  
                  {activeTab === 'user' && <UserWaitlistForm />}
                </>
              ) : (
                <>
                  <Button 
                    className="w-full bg-[#6d9e79] hover:bg-[#5b8466] text-[#fbf8f1] font-semibold py-5 px-4 rounded-xl mb-6"
                  >
                    Join the Revolution – Be Among the First Global Users
                  </Button>
                  
                  <UserWaitlistForm />
                </>
              )}
            </div>
          </div>
          
          {/* Developer Section */}
          <div className={`flex flex-col ${isMobile ? '' : 'h-full'}`}>
            <div className="bg-white/70 rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#38503f] mb-2">
                Developer & Tester Early Access Program
              </h2>
              <p className="text-[#38503f]/80 mb-6">
                Gain early access to our APIs, documentation, and beta-testing opportunities. 
                Join our developer program to build the next generation of blockchain applications with PEOCHAIN.
              </p>
              
              {isMobile ? (
                <>
                  <Button 
                    onClick={() => setActiveTab('developer')}
                    className={`w-full ${activeTab === 'developer' 
                      ? 'bg-[#38503f] text-[#fbf8f1]' 
                      : 'bg-[#fbf8f1] text-[#38503f] border border-[#38503f]'} 
                      hover:bg-[#4a6a52] hover:text-[#fbf8f1] font-semibold py-5 px-4 rounded-xl mb-6`}
                    aria-pressed={activeTab === 'developer'}
                  >
                    Join Our Developer Program – Early API & Beta Access
                  </Button>
                  
                  {activeTab === 'developer' && <DeveloperWaitlistForm />}
                </>
              ) : (
                <>
                  <Button 
                    className="w-full bg-[#38503f] hover:bg-[#4a6a52] text-[#fbf8f1] font-semibold py-5 px-4 rounded-xl mb-6"
                  >
                    Join Our Developer Program – Early API & Beta Access
                  </Button>
                  
                  <DeveloperWaitlistForm />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}