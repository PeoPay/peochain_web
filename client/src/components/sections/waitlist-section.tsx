import { Card, CardContent } from "@/components/ui/card";
import { WaitlistForm } from "@/components/ui/waitlist-form";
import { BadgeDollarSign, Clock, Medal, Headset } from "lucide-react";

export default function WaitlistSection() {
  return (
    <section id="waitlist" className="px-4 md:px-8 py-16 md:py-24 max-w-3xl mx-auto">
      <Card className="glass rounded-3xl border-0 shadow-sm">
        <CardContent className="p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
              Join Now – Accelerate Your Economic Future!
            </h2>
            <p className="text-foreground/80 max-w-2xl mx-auto text-lg">
              PEOCHAIN is almost here, and early adopters will gain the strongest economic advantage! Join our waitlist today to secure priority access to income-generating opportunities and business growth tools before the general public.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-primary/5 p-4 rounded-xl flex items-start">
              <BadgeDollarSign className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-foreground">Boost Your Profits Early</h3>
                <p className="text-foreground/70 text-sm">Zero transaction fees for the first 3 months after launch, maximizing your earnings from day one.</p>
              </div>
            </div>
            
            <div className="bg-primary/5 p-4 rounded-xl flex items-start">
              <Clock className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-foreground">Exclusive Early Access</h3>
                <p className="text-foreground/70 text-sm">Gain first-hand experience with features enhancing your business and earning potential before public release.</p>
              </div>
            </div>
            
            <div className="bg-primary/5 p-4 rounded-xl flex items-start">
              <Medal className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-foreground">Exclusive Token Allocation</h3>
                <p className="text-foreground/70 text-sm">Be first to benefit from increased token value through early-stage ecosystem growth.</p>
              </div>
            </div>
            
            <div className="bg-primary/5 p-4 rounded-xl flex items-start">
              <Headset className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-foreground">Personalized Business Support</h3>
                <p className="text-foreground/70 text-sm">Tailored support helping you effectively leverage blockchain for increased earnings.</p>
              </div>
            </div>
          </div>
          
          <WaitlistForm />
          
          <p className="text-center text-foreground/60 text-sm mt-8">
            We respect your privacy—your info stays safe with us.
          </p>
          
          <div className="mt-10 p-6 bg-primary/10 rounded-xl">
            <p className="text-center text-foreground/80 font-medium">
              Don't miss this opportunity to transform your economic potential. PEOCHAIN launches soon—secure your advantage today!
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
