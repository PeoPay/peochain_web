import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { waitlistFormSchema, WaitlistFormData } from "@/lib/waitlist-schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export function WaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      agreeToTerms: false,
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data: WaitlistFormData) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
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
            
            <div className="p-3 bg-white/40 rounded-md border border-primary/20 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-shield-keyhole-line text-primary"></i>
                <span className="text-sm font-semibold">Privacy & Security Notice</span>
              </div>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Your data is encrypted with bank-grade 256-bit SSL encryption. We never store sensitive financial information. 
                PEOCHAIN is compliant with financial regulations and implements multi-signature security protocols. 
                Read our <a href="#" className="text-primary hover:underline">Privacy Policy</a> for details.
              </p>
            </div>
            
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
                      I acknowledge the privacy notice and agree to receive updates about PEOCHAIN's launch and exclusive offers.
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
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <i className="ri-check-line text-primary text-xl"></i>
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-foreground">Registration Successful!</h3>
                <p className="mt-2 text-foreground/70">
                  Thank you for joining the PEOCHAIN waitlist. We'll notify you when we're ready to launch! How will you use your financial freedom? Tell us on our social media channels.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
