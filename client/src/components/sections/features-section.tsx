import { Card, CardContent } from "@/components/ui/card";
import { CircuitBoard, Banknote, Globe2, Shield, Link as LinkIcon, Smartphone, ArrowRight } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <CircuitBoard className="w-8 h-8" />,
    title: "Proof of Synergy (PoSyg)",
    description: "Rewarding Real-World Economic Actions—Earn tokens through honest participation, governance, and economic transactions. PoSyg secures the network and empowers your financial activities simultaneously."
  },
  {
    icon: <Banknote className="w-8 h-8" />,
    title: "Decentralized Lending",
    description: "Say goodbye to traditional banking barriers! Lend, borrow, and earn with flexibility and ease—all powered by secure blockchain technology."
  },
  {
    icon: <Globe2 className="w-8 h-8" />,
    title: "Financial Inclusion",
    description: "We're Not Just Giving You Wallets—We're Giving You Opportunities. PEOCHAIN directly increases earning potential, enables affordable loans, and connects you to local and global markets."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Advanced Security",
    description: "Cutting-edge protocols protect you from emerging threats, ensuring peace of mind while you focus on innovating and growing in this new financial era."
  },
  {
    icon: <LinkIcon className="w-8 h-8" />,
    title: "Cross-Chain Compatibility",
    description: "Seamlessly operate across multiple blockchains without complicated technical knowledge, breaking down barriers between ecosystems."
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile-First Design",
    description: "Access income-generating opportunities anytime, anywhere. Whether you're at home or on the go, PEOCHAIN puts economic tools in your pocket that can directly increase your earnings and business potential."
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
          Why Join PEOCHAIN?
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
          Join PEOCHAIN and Transform Your Economic Reality—Access Blockchain-Powered Loans, Payments, and Market Opportunities. Increase Your Income Potential, Not Just Your Wallet.
        </p>
        <p className="text-foreground/70 max-w-2xl mx-auto text-lg mt-4">
          We drive progress by blending unparalleled security, accessibility, and collaboration, all underpinned by our innovative <span className="text-primary font-medium">Proof of Synergy (PoSyg)</span> mechanism.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="feature-card glass rounded-3xl border-0 shadow-sm hover:shadow-lg transition-all">
            <CardContent className="p-6 md:p-8 flex flex-col h-full">
              <div className="bg-primary/10 p-4 rounded-2xl inline-flex mb-6 w-16 h-16 items-center justify-center text-primary">
                {feature.icon}
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-4 text-foreground">{feature.title}</h3>
              <p className="text-foreground/70 mb-6 flex-grow">
                {feature.description}
              </p>
              <a href="#waitlist" className="flex items-center text-primary cursor-pointer">
                <span className="font-medium">Secure Economic Opportunity</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
