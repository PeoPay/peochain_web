import React from 'react';
import { 
  Network, 
  LockKeyhole, 
  Shield, 
  Link as LinkIcon,
  Gauge,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TechTooltip } from '@/components/ui/tech-tooltip';
import { SectionContainer } from '@/components/ui/section-container';
import { cn } from '@/lib/utils';

interface TechHighlight {
  icon: React.ReactNode;
  title: string;
  description: string;
  tooltipContent: React.ReactNode;
  delay?: number;
}

interface TechHighlightsSectionProps {
  onExploreClick?: () => void;
}

export default function TechHighlightsSection({ onExploreClick }: TechHighlightsSectionProps) {
  const highlights: TechHighlight[] = [
    {
      icon: <Network className="h-6 w-6 text-primary" />,
      title: "Subnet Validator Network",
      description: "Parallel validator subnetworks, boosting throughput and decentralization dramatically.",
      tooltipContent: (
        <div>
          <h4 className="font-semibold text-primary mb-1">Subnet Validator Network</h4>
          <p className="text-sm">Independent validator subnetworks that process transactions in parallel, significantly increasing network throughput while maintaining security.</p>
          <ul className="text-xs mt-2 space-y-1 list-disc pl-4">
            <li>Scales horizontally to handle massive transaction volume</li>
            <li>Each subnet specializes in specific transaction types</li>
            <li>Improves fault tolerance through redundancy</li>
            <li>Enables 100,000+ TPS while maintaining decentralization</li>
          </ul>
        </div>
      ),
      delay: 0
    },
    {
      icon: <LockKeyhole className="h-6 w-6 text-primary" />,
      title: "Zero-Knowledge Proofs (ZK-Proofs)",
      description: "Secure, private transactions publicly verifiable, balancing privacy and trust.",
      tooltipContent: (
        <div>
          <h4 className="font-semibold text-primary mb-1">Zero-Knowledge Proofs</h4>
          <p className="text-sm">Cryptographic method allowing one party to prove to another that a statement is true without revealing any additional information.</p>
          <ul className="text-xs mt-2 space-y-1 list-disc pl-4">
            <li>Enables private transactions that can still be verified</li>
            <li>Reduces data requirements while maintaining security</li>
            <li>Allows for confidential smart contracts</li>
            <li>Significantly improves scalability and privacy</li>
          </ul>
        </div>
      ),
      delay: 100
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Threshold Signature Scheme (TSS)",
      description: "Collaborative validation for maximum security and decentralization.",
      tooltipContent: (
        <div>
          <h4 className="font-semibold text-primary mb-1">Threshold Signature Scheme</h4>
          <p className="text-sm">Cryptographic protocol requiring multiple parties to collaborate to generate a single valid signature, eliminating single points of failure.</p>
          <ul className="text-xs mt-2 space-y-1 list-disc pl-4">
            <li>Distributes signing authority across multiple validators</li>
            <li>Prevents compromise even if some participants are hacked</li>
            <li>Improves security without sacrificing performance</li>
            <li>Maintains functionality even if some nodes go offline</li>
          </ul>
        </div>
      ),
      delay: 200
    },
    {
      icon: <Gauge className="h-6 w-6 text-primary" />,
      title: "Adaptive Block Production",
      description: "Dynamic adjustments maintaining network performance regardless of load.",
      tooltipContent: (
        <div>
          <h4 className="font-semibold text-primary mb-1">Adaptive Block Production</h4>
          <p className="text-sm">Real-time adjustment of block parameters based on network conditions to maintain optimal performance under varying loads.</p>
          <ul className="text-xs mt-2 space-y-1 list-disc pl-4">
            <li>Dynamically adjusts block size and frequency</li>
            <li>Optimizes transaction fees based on network demand</li>
            <li>Automatically redistributes validator loads</li>
            <li>Prevents congestion during high-traffic periods</li>
          </ul>
        </div>
      ),
      delay: 300
    },
    {
      icon: <LinkIcon className="h-6 w-6 text-primary" />,
      title: "Cross-Chain Interoperability",
      description: "Seamlessly connect with Ethereum, Solana, Polkadot, Cosmos—unlock liquidity and opportunities.",
      tooltipContent: (
        <div>
          <h4 className="font-semibold text-primary mb-1">Cross-Chain Interoperability</h4>
          <p className="text-sm">Native integration with major blockchain ecosystems enabling seamless asset transfers and cross-chain smart contract execution.</p>
          <ul className="text-xs mt-2 space-y-1 list-disc pl-4">
            <li>Built-in bridges to Ethereum, Solana, Polkadot, and Cosmos</li>
            <li>Atomic swaps for secure cross-chain transactions</li>
            <li>Unified liquidity across multiple blockchains</li>
            <li>Composable DeFi applications spanning multiple chains</li>
          </ul>
        </div>
      ),
      delay: 400
    }
  ];
  
  return (
    <SectionContainer 
      id="tech-highlights" 
      aria-labelledby="tech-highlights-heading"
      className="bg-gradient-to-b from-background/50 to-muted/30"
    >
      <h2 
        id="tech-highlights-heading" 
        className="sr-only"
      >
        Technology Highlights
      </h2>
      
      <div className="bg-white/50 backdrop-blur-sm rounded-xl border border-primary/10 p-6 md:p-10 shadow-md">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {highlights.map((highlight, index) => (
            <div 
              key={index} 
              className={cn(
                "text-center flex flex-col items-center animate-fadeIn",
                highlight.delay ? `[animation-delay:${highlight.delay}ms]` : ""
              )}
            >
              <div 
                className="bg-primary/10 p-3 inline-flex rounded-full mb-4 text-primary"
                aria-hidden="true"
              >
                {highlight.icon}
              </div>
              <h3 className="font-medium mb-2 text-sm md:text-base">
                <TechTooltip content={highlight.tooltipContent} expanded={true}>
                  <span className="cursor-help border-b border-dotted border-primary/50">
                    {highlight.title}
                  </span>
                </TechTooltip>
              </h3>
              <p className="text-foreground/80 text-xs md:text-sm">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button 
            onClick={onExploreClick}
            variant="outline"
            size="lg"
            className="font-medium rounded-full border-primary text-primary hover:bg-primary/10 transition-colors"
          >
            Explore Our Technology
            <Zap className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}