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
    description: "Proof of Synergy (PoSyg) combines the energy efficiency and decentralization of Proof of Stake (PoS) with advanced cryptographic security, rewarding participants for securing and contributing actively to the network's resilience."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Advanced Security",
    description: "Multi-layered security architecture combining zero-knowledge proofs, threshold signatures, and cryptographic validation to mitigate attack vectors and ensure transaction integrity."
  },
  {
    icon: <LinkIcon className="w-8 h-8" />,
    title: "Cross-Chain Compatibility",
    description: "Advanced interoperability protocols enabling seamless communication between blockchain networks through standardized cross-chain messaging."
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
          Why Join PEOCHAIN?
        </h2>
        
        <div className="bg-primary/5 p-6 rounded-xl mb-8 max-w-3xl mx-auto">
          <p className="text-foreground/90 text-lg font-medium">
            Traditional blockchains face the 'Blockchain Trilemma'—struggling to simultaneously achieve scalability, security, and decentralization. PEOCHAIN resolves this with innovative technology designed specifically to overcome these limitations.
          </p>
        </div>
        
        <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
          PEOCHAIN isn't another blockchain—it's a revolutionary new architecture designed to solve fundamental blockchain limitations. Our groundbreaking technology ensures security, scalability, and decentralization like never before.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-w-3xl mx-auto text-left">
          <div className="flex items-start gap-2">
            <div className="text-primary mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p className="text-foreground/90">
              <span className="font-medium">Solves Blockchain Trilemma:</span> Delivers scalability, security, and decentralization simultaneously.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="text-primary mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p className="text-foreground/90">
              <span className="font-medium">Unmatched Security:</span> Advanced cryptography provides robust transaction validation and data integrity.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="text-primary mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p className="text-foreground/90">
              <span className="font-medium">Massively Scalable:</span> Designed to handle up to 100,000 TPS with 1-second finality.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="text-primary mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p className="text-foreground/90">
              <span className="font-medium">Truly Decentralized:</span> Innovative consensus mechanism ensuring no single points of failure.
            </p>
          </div>
        </div>
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
              {index === 0 ? (
                <a href="/whitepaper" className="flex items-center text-primary cursor-pointer">
                  <span className="font-medium">Discover PoSyg</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              ) : (
                <a href="#waitlist" className="flex items-center text-primary cursor-pointer">
                  <span className="font-medium">Join Waitlist</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
