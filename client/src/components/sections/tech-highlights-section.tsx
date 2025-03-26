import React from 'react';
import { 
  Network, 
  ShieldCheck, 
  LockKeyhole, 
  Shield, 
  Link as LinkIcon,
  Gauge
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TechHighlight {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TechHighlightsSectionProps {
  onExploreClick?: () => void;
}

export default function TechHighlightsSection({ onExploreClick }: TechHighlightsSectionProps) {
  const highlights: TechHighlight[] = [
    {
      icon: <Network className="h-6 w-6" />,
      title: "Subnet Validator Network",
      description: "Parallel validator subnetworks, boosting throughput and decentralization dramatically."
    },
    {
      icon: <LockKeyhole className="h-6 w-6" />,
      title: "Zero-Knowledge Proofs (ZK-Proofs)",
      description: "Secure, private transactions publicly verifiable, balancing privacy and trust."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Threshold Signature Scheme (TSS)",
      description: "Collaborative validation for maximum security and decentralization."
    },
    {
      icon: <Gauge className="h-6 w-6" />,
      title: "Adaptive Block Production",
      description: "Dynamic adjustments maintaining network performance regardless of load."
    },
    {
      icon: <LinkIcon className="h-6 w-6" />,
      title: "Cross-Chain Interoperability",
      description: "Seamlessly connect with Ethereum, Solana, Polkadot, Cosmos—unlock liquidity and opportunities."
    }
  ];
  
  return (
    <section className="px-4 md:px-8 py-20 max-w-7xl mx-auto">
      <div className="glass rounded-lg p-10 md:p-16 border border-primary/10">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-12 text-center tracking-tight">
          Key <span className="text-primary">Technologies</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-12">
          {highlights.map((highlight, index) => (
            <div key={index} className="text-center p-4">
              <div className="bg-primary/10 p-5 inline-flex rounded-lg mb-8 text-primary">
                {highlight.icon}
              </div>
              <h3 className="font-poppins font-semibold text-lg mb-5 text-foreground">
                {highlight.title}
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="section-divider my-12"></div>
        
        <div className="text-center mt-10">
          <Button 
            onClick={onExploreClick}
            variant="outline"
            className="font-medium py-3 px-10 rounded-lg border-primary/40 text-primary hover:bg-primary/5"
          >
            Explore Our Technology
          </Button>
        </div>
      </div>
    </section>
  );
}