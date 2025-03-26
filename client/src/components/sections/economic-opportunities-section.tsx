import { Button } from "@/components/ui/button";
import { Briefcase, CreditCard, DollarSign } from "lucide-react";

interface EconomicOpportunity {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const opportunities: EconomicOpportunity[] = [
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Gig Economy",
    description: "Fast and secure micropayments for freelancers.",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Agribusiness Finance",
    description: "Instant, secure crop payments via blockchain escrow.",
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "SME Trade",
    description: "Efficient cross-border trade with minimal transaction costs.",
  },
];

export default function EconomicOpportunitiesSection() {
  return (
    <section className="px-4 md:px-8 py-16 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-6">
            Economic Opportunities Unlocked
          </h2>
          <p className="text-foreground/70 max-w-3xl mx-auto text-lg">
            Our cutting-edge blockchain technology naturally unlocks powerful economic opportunities, enabling decentralized finance, secure cross-border trade, SME lending, and more—seamlessly integrated into everyday financial activities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {opportunities.map((opportunity, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-primary/10 hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary mr-4">
                  {opportunity.icon}
                </div>
                <h3 className="font-semibold text-xl">{opportunity.title}</h3>
              </div>
              <p className="text-foreground/70">{opportunity.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="font-medium py-2 px-6 rounded-full border-primary text-primary hover:bg-primary/10"
            onClick={() => window.location.href = "/whitepaper"}
          >
            Explore Use Cases
          </Button>
        </div>
      </div>
    </section>
  );
}