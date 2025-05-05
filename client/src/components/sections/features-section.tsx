import { CircuitBoard, Shield, Link as LinkIcon, Smartphone, ArrowRight, Zap, Network } from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import { FeatureCard } from "@/components/ui/feature-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const features: Feature[] = [
  {
    icon: <CircuitBoard className="w-6 h-6 text-primary" />,
    title: "Proof of Synergy (PoSyg)",
    description: "Proof of Synergy (PoSyg) combines the energy efficiency and decentralization of Proof of Stake (PoS) with advanced cryptographic security, rewarding participants for securing and contributing actively to the network's resilience.",
    delay: 0
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Advanced Security",
    description: "Multi-layered security architecture combining zero-knowledge proofs, threshold signatures, and cryptographic validation to mitigate attack vectors and ensure transaction integrity.",
    delay: 100
  },
  {
    icon: <LinkIcon className="w-6 h-6 text-primary" />,
    title: "Cross-Chain Compatibility",
    description: "Advanced interoperability protocols enabling seamless communication between blockchain networks through standardized cross-chain messaging.",
    delay: 200
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "High Performance",
    description: "Process 100,000+ transactions per second with near-instant finality, enabling enterprise-grade applications at global scale.",
    delay: 300
  },
  {
    icon: <Network className="w-6 h-6 text-primary" />,
    title: "Subnet Architecture",
    description: "Parallel processing through specialized subnets that handle specific transaction types, dramatically increasing throughput while maintaining security.",
    delay: 400
  },
  {
    icon: <Smartphone className="w-6 h-6 text-primary" />,
    title: "Mobile-First Design",
    description: "Optimized for mobile devices with lightweight clients and efficient verification protocols, making blockchain accessible to everyone.",
    delay: 500
  }
];

const keyPoints = [
  "100,000+ transactions per second",
  "Near-instant finality",
  "Quantum-resistant security",
  "Cross-chain interoperability",
  "Energy-efficient consensus",
  "Developer-friendly SDKs",
  "Enterprise-grade reliability",
  "Decentralized governance"
];

export default function FeaturesSection() {
  return (
    <SectionContainer 
      id="features" 
      aria-labelledby="features-heading"
      className="bg-gradient-to-b from-background to-muted/30"
    >
      <div className="text-center mb-16">
        <h2 
          id="features-heading"
          className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4"
        >
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
          {keyPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="text-primary mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-foreground/80">{point}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            variant="primary"
            className={cn(
              "animate-fadeIn",
              feature.delay ? `[animation-delay:${feature.delay}ms]` : ""
            )}
          />
        ))}
      </div>
      
      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-primary/10 max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="font-medium text-lg text-foreground mb-1">Ready to explore PEOCHAIN?</h3>
            <p className="text-foreground/80">Read our technical whitepaper to learn more about our innovative technology.</p>
          </div>
          <Button 
            className="md:flex-shrink-0"
            onClick={() => window.location.href = '/whitepaper'}
          >
            <span>Read Whitepaper</span>
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
