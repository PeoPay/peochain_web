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
          
          <WaitlistForm />
          
          <p className="text-center text-foreground/60 text-sm mt-8">
            We respect your privacy—your info stays safe with us.
          </p>
          
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
