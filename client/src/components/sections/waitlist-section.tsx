import { Card, CardContent } from "@/components/ui/card";
import { WaitlistForm } from "@/components/ui/waitlist-form";

export default function WaitlistSection() {
  return (
    <section id="waitlist" className="px-4 md:px-8 py-16 md:py-24 max-w-3xl mx-auto">
      <Card className="glass rounded-3xl border-0 shadow-sm">
        <CardContent className="p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
              The Waitlist – Your VIP Pass Awaits!
            </h2>
            <p className="text-foreground/80 max-w-2xl mx-auto text-lg">
              PEOCHAIN Lending is almost here, and YOU can be at the forefront! Join our waitlist now to secure early access to this game-changing platform. Early birds get exclusive perks—don't wait for the future, shape it with us!
            </p>
            <p className="text-foreground/90 mt-4 max-w-2xl mx-auto text-lg italic">
              "Imagine a world where your money works for you, not the banks. With PEOCHAIN Lending, that's not a dream—it's your future."
            </p>
          </div>
          
          <div className="mb-6 p-3 bg-primary/5 rounded-lg flex flex-col md:flex-row items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <i className="ri-shield-check-line text-primary"></i>
              <span className="text-sm font-medium">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-lock-line text-primary"></i>
              <span className="text-sm font-medium">Encrypted Data</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-check-double-line text-primary"></i>
              <span className="text-sm font-medium">GDPR Compliant</span>
            </div>
          </div>
          
          <WaitlistForm />
          
          <div className="mt-8 flex flex-col gap-3">
            <p className="text-center text-foreground/60 text-sm flex items-center justify-center gap-2">
              <i className="ri-lock-fill text-primary"></i>
              We respect your privacy—your info stays safe with us.
            </p>
            <div className="flex items-center justify-center gap-4">
              <img src="https://cdn.cdnlogo.com/logos/n/31/norton-secured.svg" alt="Norton Secured" className="h-8 opacity-60" />
              <img src="https://cdn.cdnlogo.com/logos/s/89/ssl.svg" alt="SSL Certified" className="h-8 opacity-60" />
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-primary/10 rounded-xl">
            <p className="text-center text-foreground/80 font-medium">
              The next billion users are counting on this. Be part of something bigger—PEOCHAIN Lending launches soon. Stay tuned!
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
