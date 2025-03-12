import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "ri-pulse-line",
    title: "Proof of Synergy (PoSyg)",
    description: "Our innovative consensus mechanism champions trust, fairness, and collaboration, creating a vibrant community where ethical contributors are rewarded."
  },
  {
    icon: "ri-coins-line",
    title: "Decentralized Lending",
    description: "Say goodbye to traditional banking barriers! Lend, borrow, and earn with flexibility and ease—all powered by secure blockchain technology."
  },
  {
    icon: "ri-global-line",
    title: "Financial Inclusion",
    description: "Breaking barriers to build a more inclusive financial future, serving the underbanked and unlocking opportunities for the next billion users."
  },
  {
    icon: "ri-shield-check-line",
    title: "Advanced Security",
    description: "Cutting-edge protocols protect you from emerging threats, ensuring peace of mind while you focus on innovating and growing in this new financial era."
  },
  {
    icon: "ri-link-m",
    title: "Cross-Chain Compatibility",
    description: "Seamlessly operate across multiple blockchains without complicated technical knowledge, breaking down barriers between ecosystems."
  },
  {
    icon: "ri-smartphone-line",
    title: "Mobile-First Design",
    description: "Access the power of decentralized finance anytime, anywhere. Whether you're at home or on the go, PEOCHAIN puts financial freedom in your pocket."
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
          Why Join PEOCHAIN Lending?
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
          Welcome to PEOCHAIN Lending, where traditional banking barriers vanish, and financial empowerment begins! Our platform brings lending to your fingertips—anytime, anywhere.
        </p>
        <p className="text-foreground/70 max-w-2xl mx-auto text-lg mt-4">
          We drive progress by blending unparalleled security, accessibility, and collaboration, all underpinned by our innovative <span className="text-primary font-medium">Proof of Synergy (PoSyg)</span> mechanism.
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
