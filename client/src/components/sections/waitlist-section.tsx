import { Card, CardContent } from "@/components/ui/card";
import { WaitlistForm } from "@/components/ui/waitlist-form";

export default function WaitlistSection() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24 max-w-3xl mx-auto">
      <Card className="glass rounded-3xl border-0 shadow-sm">
        <CardContent className="p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
              Join the Waitlist
            </h2>
            <p className="text-foreground/80 max-w-2xl mx-auto text-lg">
              PEOCHAIN Lending is almost here, and YOU can be at the forefront! Join our waitlist now to secure early access to this game-changing platform. Early birds get exclusive perks—don't wait for the future, shape it with us!
            </p>
          </div>
          
          <WaitlistForm />
        </CardContent>
      </Card>
    </section>
  );
}
