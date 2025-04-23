// src/components/ui/enhanced-waitlist-form.tsx
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  waitlistFormSchema,
  WaitlistFormData,
  WaitlistSubmitResponse,
} from "@/lib/waitlist-schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Share2,
  Trophy,
  Users,
  Award,
  Check,
  Gift,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import { SocialShare, EnhancedSocialShare } from "@/components/ui/social-share";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import confetti from "canvas-confetti";

interface EnhancedWaitlistFormProps {
  defaultUserType?: "user" | "developer";
  className?: string;
}

export function EnhancedWaitlistForm({
  defaultUserType = "user",
  className,
}: EnhancedWaitlistFormProps) {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [showReferral, setShowReferral] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null);
  const [referralStats, setReferralStats] = useState<{
    count: number;
    achievements: string[];
  }>({
    count: 0,
    achievements: [],
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(defaultUserType);

  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Get referral code from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setReferralCode(ref);

    // Also check for user_type query param
    const userType = params.get("user_type");
    if (userType && (userType === "user" || userType === "developer")) {
      setActiveTab(userType);
    }
  }, []);

  // Get referral stats if we have a referral code
  const referralStatsQuery = useQuery({
    queryKey: ["referralStats", referralCode],
    queryFn: async () => {
      if (!referralCode || !isSubmitSuccess) return null;
      const response = await apiRequest(
        "GET",
        `/api/waitlist/referral/${referralCode}`,
      );
      return await response.json();
    },
    enabled: !!referralCode && isSubmitSuccess,
    refetchInterval: isSubmitSuccess ? 10000 : false, // Poll every 10 seconds after success
  });

  // Update local stats when query data changes
  useEffect(() => {
    if (referralStatsQuery.data?.success && referralStatsQuery.data?.data) {
      const { referralCount } = referralStatsQuery.data.data;

      // Calculate achievements
      const achievements = [];
      if (referralCount >= 1) achievements.push("first_referral");
      if (referralCount >= 5) achievements.push("five_referrals");
      if (referralCount >= 10) achievements.push("ten_referrals");
      if (referralCount >= 25) achievements.push("twenty_five_referrals");
      if (referralCount >= 50) achievements.push("fifty_referrals");

      setReferralStats({
        count: referralCount,
        achievements,
      });
    }
  }, [referralStatsQuery.data]);

  // Form submission mutation
  const formMutation = useMutation({
    mutationFn: async (data: WaitlistFormData & { userType: string }) => {
      const payload = {
        ...data,
        metadata: {
          userType: data.userType,
          source: document.referrer || "direct",
          device: isMobile ? "mobile" : "desktop",
          utm_source:
            new URLSearchParams(window.location.search).get("utm_source") ||
            undefined,
          utm_medium:
            new URLSearchParams(window.location.search).get("utm_medium") ||
            undefined,
          utm_campaign:
            new URLSearchParams(window.location.search).get("utm_campaign") ||
            undefined,
        },
      };

      const response = await apiRequest("POST", "/api/waitlist", payload);
      return await response.json();
    },
    onSuccess: (data: WaitlistSubmitResponse) => {
      if (data.success) {
        form.reset();
        setIsSubmitSuccess(true);
        setShowReferral(true);

        if (data.data?.referralCode) {
          setReferralCode(data.data.referralCode);
        }

        if (data.data?.waitlistPosition) {
          setWaitlistPosition(data.data.waitlistPosition);
        }

        setShowSuccessDialog(true);

        // Trigger confetti effect
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        toast({
          title: "You've joined the waitlist!",
          description: "Thank you for joining the PeoChain waitlist.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Submission failed",
          description:
            data.message || "Something went wrong. Please try again.",
        });
      }
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "Something went wrong. Please try again.",
      });
    },
  });

  // Form definition
  const form = useForm<WaitlistFormData & { userType: string }>({
    resolver: zodResolver(
      waitlistFormSchema.extend({
        userType: z.string().min(1, { message: "Please select user type" }),
      }),
    ),
    defaultValues: {
      fullName: "",
      email: "",
      agreeToTerms: false,
      referredBy: referralCode || undefined,
      userType: activeTab,
    },
  });

  // Make sure form value keeps in sync with active tab
  useEffect(() => {
    form.setValue("userType", activeTab);
  }, [activeTab, form]);

  function onSubmit(data: WaitlistFormData & { userType: string }) {
    formMutation.mutate(data);
  }

  const handleCopyReferral = () => {
    if (!referralCode) return;

    const referralUrl = `${window.location.origin}?ref=${referralCode}`;
    navigator.clipboard.writeText(referralUrl);

    toast({
      title: "Referral link copied!",
      description: "Share it with friends to climb the waitlist.",
    });
  };

  const getAchievementLabel = (achievement: string) => {
    switch (achievement) {
      case "first_referral":
        return "First Referral";
      case "five_referrals":
        return "5 Referrals";
      case "ten_referrals":
        return "10 Referrals";
      case "twenty_five_referrals":
        return "25 Referrals";
      case "fifty_referrals":
        return "50 Referrals";
      default:
        return achievement;
    }
  };

  const nextAchievementThreshold = (() => {
    const count = referralStats.count;
    if (count < 1) return 1;
    if (count < 5) return 5;
    if (count < 10) return 10;
    if (count < 25) return 25;
    if (count < 50) return 50;
    return null;
  })();

  const nextAchievementProgress = (() => {
    const count = referralStats.count;
    if (count < 1) return (count / 1) * 100;
    if (count < 5) return (count / 5) * 100;
    if (count < 10) return (count / 10) * 100;
    if (count < 25) return (count / 25) * 100;
    if (count < 50) return (count / 50) * 100;
    return 100;
  })();

  const userTypeDescription = {
    user: "Join as a user to get early access to the PeoChain platform and all its features.",
    developer:
      "Join as a developer to build on the PeoChain blockchain and access developer tools.",
  };

  return (
    <div className={className}>
      {!isSubmitSuccess ? (
        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="developer">Developer</TabsTrigger>
          </TabsList>

          <TabsContent value="user" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Join the PeoChain Waitlist</CardTitle>
                <CardDescription>{userTypeDescription.user}</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="agreeToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the{" "}
                              <a
                                href="/terms-of-service"
                                target="_blank"
                                className="text-primary underline"
                              >
                                Terms of Service
                              </a>{" "}
                              and{" "}
                              <a
                                href="/privacy-policy"
                                target="_blank"
                                className="text-primary underline"
                              >
                                Privacy Policy
                              </a>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <input type="hidden" {...form.register("userType")} />

                    {referralCode && (
                      <FormField
                        control={form.control}
                        name="referredBy"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>Referral Code</FormLabel>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="cursor-help">
                                      <AlertCircle size={16} />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      You were referred by someone with this
                                      code
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <FormControl>
                              <Input readOnly {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={formMutation.isPending}
                    >
                      {formMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Joining...
                        </>
                      ) : (
                        "Join Waitlist"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="developer" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Developer Waitlist</CardTitle>
                <CardDescription>
                  {userTypeDescription.developer}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="agreeToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the{" "}
                              <a
                                href="/terms-of-service"
                                target="_blank"
                                className="text-primary underline"
                              >
                                Terms of Service
                              </a>{" "}
                              and{" "}
                              <a
                                href="/privacy-policy"
                                target="_blank"
                                className="text-primary underline"
                              >
                                Privacy Policy
                              </a>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <input type="hidden" {...form.register("userType")} />

                    {referralCode && (
                      <FormField
                        control={form.control}
                        name="referredBy"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>Referral Code</FormLabel>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="cursor-help">
                                      <AlertCircle size={16} />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      You were referred by someone with this
                                      code
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <FormControl>
                              <Input readOnly {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={formMutation.isPending}
                    >
                      {formMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Joining Developer Waitlist...
                        </>
                      ) : (
                        "Join Developer Waitlist"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-primary" />
              You're on the waitlist!
            </CardTitle>
            <CardDescription>
              {waitlistPosition ? (
                <>
                  You're <strong>#{waitlistPosition}</strong> on our waitlist.
                </>
              ) : (
                <>You've successfully joined our waitlist.</>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="mb-2 text-sm font-medium">Your Referral Link</h3>
              <div className="flex w-full items-center space-x-2">
                <Input
                  readOnly
                  value={`${window.location.origin}?ref=${referralCode}`}
                  className="font-mono text-xs"
                />
                <Button size="sm" onClick={handleCopyReferral}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Share this link to move up the waitlist! Each referral improves
                your position.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Referral Count</h3>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4 text-primary" />
                    <span>
                      {referralStats.count}{" "}
                      {referralStats.count === 1 ? "person" : "people"} referred
                    </span>
                  </div>
                </div>

                {nextAchievementThreshold && (
                  <div className="text-right">
                    <h3 className="text-xs font-medium">Next achievement</h3>
                    <p className="text-sm font-semibold">
                      {nextAchievementThreshold} referrals
                    </p>
                  </div>
                )}
              </div>

              {nextAchievementThreshold && (
                <div className="space-y-1">
                  <Progress value={nextAchievementProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">
                    {referralStats.count} / {nextAchievementThreshold}
                  </p>
                </div>
              )}
            </div>

            {referralStats.achievements.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Your Achievements</h3>
                <div className="grid grid-cols-2 gap-2">
                  {referralStats.achievements.map((achievement) => (
                    <div
                      key={achievement}
                      className="flex items-center rounded-md border border-primary/20 bg-primary/5 p-2"
                    >
                      <Award className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-xs font-medium">
                        {getAchievementLabel(achievement)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Share on social media</h3>
              <div className="flex flex-wrap gap-2">
                <EnhancedSocialShare
                  referralCode={referralCode || ""}
                  waitlistPosition={waitlistPosition}
                  referralCount={referralStats.count}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/whitepaper")}
              className="w-full sm:w-auto"
            >
              Read our Whitepaper
            </Button>
          </CardFooter>
        </Card>
      )}

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Check className="h-6 w-6 text-primary" />
                </div>
              </div>
              Welcome to PeoChain!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              {waitlistPosition ? (
                <>
                  You're <strong>#{waitlistPosition}</strong> on our waitlist.
                </>
              ) : (
                <>You've successfully joined our waitlist.</>
              )}
              <br />
              Share your referral link to move up the list!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyReferral}
              className="flex items-center"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Copy Referral Link
            </Button>
          </div>
          <AlertDialogFooter className="flex flex-col sm:flex-row">
            <AlertDialogAction className="mb-2 sm:mb-0">
              Great!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
