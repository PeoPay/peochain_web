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
    <section className="px-4 md:px-8 py-12 max-w-7xl mx-auto">
      <div className="glass rounded-3xl p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {highlights.map((highlight, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary/10 p-3 inline-flex rounded-full mb-4 text-primary">
                {highlight.icon}
              </div>
              <h3 className="feature-title mb-2">
                {highlight.title}
              </h3>
              <p className="description text-sm">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button 
            onClick={onExploreClick}
            variant="outline"
            className="font-medium py-2 px-6 rounded-full border-primary text-primary hover:bg-primary/10"
          >
            Explore Our Technology
          </Button>
        </div>
      </div>
    </section>
  );
}