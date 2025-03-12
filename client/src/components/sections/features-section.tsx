import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "ri-link-m",
    title: "Cross-Chain Compatibility",
    description: "Seamlessly operate across multiple blockchains, providing flexibility and reducing costs for all users."
  },
  {
    icon: "ri-smartphone-line",
    title: "Mobile-First Accessibility",
    description: "Access the full power of decentralized lending from any device, anytime, with our intuitive mobile interface."
  },
  {
    icon: "ri-bank-line",
    title: "Decentralized Lending",
    description: "Borrow and lend without intermediaries, with transparent terms and competitive rates powered by smart contracts."
  }
];

export default function FeaturesSection() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
          Revolutionary Features
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
          PEOCHAIN combines cutting-edge technology with user-friendly design to create the most accessible DeFi platform.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="feature-card glass rounded-3xl border-0 shadow-sm hover:shadow-lg transition-all">
            <CardContent className="p-6 md:p-8 flex flex-col h-full">
              <div className="bg-primary/10 p-4 rounded-2xl inline-flex mb-6 w-16 h-16 items-center justify-center">
                <i className={`${feature.icon} text-3xl text-primary`}></i>
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-4 text-foreground">{feature.title}</h3>
              <p className="text-foreground/70 mb-6 flex-grow">
                {feature.description}
              </p>
              <div className="flex items-center text-primary cursor-pointer">
                <span className="font-medium">Learn more</span>
                <i className="ri-arrow-right-line ml-2"></i>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
