import { Card, CardContent } from "@/components/ui/card";
import { WaitlistForm } from "@/components/ui/waitlist-form";

export default function WaitlistSection() {
  return (
    <section id="waitlist" className="px-4 md:px-8 py-16 md:py-24 max-w-3xl mx-auto">
      <Card className="glass rounded-3xl border-0 shadow-sm">
        <CardContent className="p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
              Secure Your Early Access – Experience the Next Generation of Blockchain First!
            </h2>
            <p className="text-foreground/80 max-w-2xl mx-auto text-lg">
              Join now for exclusive early access to PEOCHAIN's revolutionary technology, zero-fee transactions, and priority support. Be part of redefining blockchain technology from the start.
            </p>
            <p className="text-foreground/90 mt-4 max-w-2xl mx-auto text-lg italic">
              "Our technology solves the blockchain trilemma with 100,000+ TPS and 1-second finality while maintaining true decentralization. Early adopters get first access to these capabilities."
            </p>
          </div>
          
          <WaitlistForm />
          
          <p className="text-center text-foreground/60 text-sm mt-8">
            We respect your privacy—your info stays safe with us.
          </p>
          
          <div className="mt-12 p-6 bg-primary/10 rounded-xl">
            <p className="text-center text-foreground/80 font-medium">
              PEOCHAIN's next-generation technology will redefine blockchain capabilities and unlock unprecedented applications. Join the technological revolution.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
