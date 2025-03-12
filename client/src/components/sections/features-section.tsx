import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "ri-coins-line",
    title: "Lend & Earn",
    description: "Deposit your assets and watch your rewards grow with high-yield returns on your investments."
  },
  {
    icon: "ri-bank-line",
    title: "Borrow Instantly",
    description: "Access funds without intermediaries—fast, fair, and flexible terms powered by secure smart contracts."
  },
  {
    icon: "ri-global-line",
    title: "Be Inclusive",
    description: "Help bridge the financial gap for communities worldwide, providing banking services to the underbanked."
  },
  {
    icon: "ri-shield-check-line",
    title: "Stay Secure",
    description: "Trust in our decentralized security framework and smart contract protections for your assets."
  },
  {
    icon: "ri-link-m",
    title: "Cross-Chain Compatibility",
    description: "Seamlessly operate across multiple blockchains, providing flexibility and reducing costs for all users."
  },
  {
    icon: "ri-smartphone-line",
    title: "Mobile-First Accessibility",
    description: "Access the full power of decentralized lending from any device, anytime, with our intuitive mobile interface."
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
          Why Join PEOCHAIN Lending?
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
          Welcome to PEOCHAIN Lending, where traditional banking barriers vanish, and financial empowerment begins! Our platform brings lending to your fingertips—anytime, anywhere.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mb-16">
        <div className="flex flex-col items-center">
          <img src="https://cdn.cdnlogo.com/logos/e/57/ethereum-diamond-logo.svg" alt="Ethereum" className="h-10 w-auto opacity-70" />
          <span className="text-xs mt-2 text-foreground/60">Ethereum Secured</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="https://cdn.cdnlogo.com/logos/p/99/polygon-token.svg" alt="Polygon" className="h-10 w-auto opacity-70" />
          <span className="text-xs mt-2 text-foreground/60">Polygon Partner</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="https://cdn.cdnlogo.com/logos/c/63/chainlink-link.svg" alt="Chainlink" className="h-10 w-auto opacity-70" />
          <span className="text-xs mt-2 text-foreground/60">Chainlink Oracles</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="https://cdn.cdnlogo.com/logos/a/29/avalanche.svg" alt="Avalanche" className="h-10 w-auto opacity-70" />
          <span className="text-xs mt-2 text-foreground/60">Avalanche Network</span>
        </div>
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
              <a href="#waitlist" className="flex items-center text-primary cursor-pointer">
                <span className="font-medium">Join Waitlist</span>
                <i className="ri-arrow-right-line ml-2"></i>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
