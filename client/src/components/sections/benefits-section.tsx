import { Card, CardContent } from "@/components/ui/card";
import { BadgeDollarSign, Trophy, Sparkles, Headset } from "lucide-react";

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: <BadgeDollarSign className="w-6 h-6" />,
    title: "Zero-Fee Transactions",
    description: "Early adopters will receive zero-fee transactions for the first three months after launch."
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Priority Access",
    description: "Be the first to experience new features and products before they're available to the general public."
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Exclusive Token Allocation",
    description: "Waitlist members will receive an exclusive allocation of PEOCHAIN tokens during our initial offering."
  },
  {
    icon: <Headset className="w-6 h-6" />,
    title: "Dedicated Support",
    description: "Early adopters get access to a dedicated support channel for personalized assistance."
  }
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <Card className="glass rounded-3xl border-0 shadow-sm relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        
        <CardContent className="p-8 md:p-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
              Early Bird Benefits
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
              Early birds get exclusive perks—don't wait for the future, shape it with us! Join our waitlist today.
            </p>
            <div className="bg-primary/10 rounded-xl p-4 max-w-xl mx-auto mt-4">
              <p className="text-foreground/80 text-md">
                <span className="font-semibold text-primary">Proof of Synergy (PoSyg):</span> Our innovative consensus mechanism that combines security, accessibility, and collaboration to create a truly inclusive financial ecosystem for everyone.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/40 rounded-2xl p-6 flex items-start">
                <div className="bg-primary/10 p-3 rounded-xl mr-4 flex items-center justify-center text-primary">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-xl mb-2 text-foreground">{benefit.title}</h3>
                  <p className="text-foreground/70">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
