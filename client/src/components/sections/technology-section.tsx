import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, BarChart3, Zap, SmartphoneCharging, Medal, Shield, Gauge, Network, LockKeyhole, Link as LinkIcon, BarChart, LineChart } from "lucide-react";
import { useState } from "react";

// Import our new interactive components
import { TechCard, availableTechnologies } from "@/components/ui/tech-tooltip";
import { SubnetDiagram } from "@/components/ui/subnet-diagram";
import { AdaptiveBlockDiagram } from "@/components/ui/adaptive-block-diagram";
import { MetricsDashboard } from "@/components/ui/metrics-dashboard";

interface TechFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
  techId?: string; // For linking to tech tooltips
}

const techFeatures: TechFeature[] = [
  {
    icon: <Network className="h-6 w-6" />,
    title: "Subnet Validator Networks",
    description: "Independent subnetworks validate transactions simultaneously, enabling unprecedented scalability without compromising decentralization."
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Proof of Synergy (PoSyg™)",
    description: "Our innovative consensus mechanism blends the strongest attributes of Proof of Stake with collaborative validation to ensure maximum security and energy efficiency."
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "Dynamic Contribution Scoring (DCS)",
    description: "Reward system transparently incentivizes community contributions, creating trust and sustainable growth on-chain."
  },
  {
    icon: <LockKeyhole className="h-6 w-6" />,
    title: "Zero-Knowledge Proofs (ZK-Proofs)",
    description: "Advanced cryptography ensures privacy and scalability simultaneously, enabling truly secure decentralized finance."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Threshold Signature Scheme (TSS)",
    description: "Collaborative validation improving network reliability and resilience, eliminating single points of failure."
  },
  {
    icon: <LinkIcon className="h-6 w-6" />,
    title: "Cross-Chain Compatibility",
    description: "Seamlessly interact with multiple blockchain networks, enhancing liquidity, usability, and decentralization."
  }
];

const architectureLayers = [
  {
    title: "Consensus Layer",
    items: [
      "Proof of Synergy (PoSyg): Balances efficiency and security",
      "Dynamic Contribution Scoring (DCS): Rewards network contributors",
      "Validator management and reward distribution"
    ]
  },
  {
    title: "EVM Compatibility Layer",
    items: [
      "Smart contract and state management support",
      "Optimized for low-cost transactions"
    ]
  },
  {
    title: "Cross-Chain Bridge",
    items: [
      "Secure asset transfers between blockchains",
      "Advanced security for smooth interoperability"
    ]
  },
  {
    title: "PeoPay API Layer",
    items: [
      "REST API endpoints for easier development",
      "Mobile integration for better user experience",
      "Real-time transaction processing"
    ]
  }
];

export default function TechnologySection() {
  const [simulateMetrics, setSimulateMetrics] = useState(true);
  
  return (
    <section id="technology" className="px-4 md:px-8 py-20 md:py-28 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="font-poppins font-bold text-3xl md:text-5xl text-foreground mb-6 tracking-tight">
          Core <span className="text-primary">Technology</span>
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto text-lg leading-relaxed">
          PEOCHAIN is engineered for next-generation performance, security, and scalability.
        </p>
      </div>
      
      <Tabs defaultValue="features" className="w-full">
        <div className="flex justify-center mb-12">
          <TabsList className="bg-muted border border-border">
            <TabsTrigger value="features" className="text-base px-8">Features</TabsTrigger>
            <TabsTrigger value="architecture" className="text-base px-8">Architecture</TabsTrigger>
            <TabsTrigger value="visualizations" className="text-base px-8">Visualizations</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="features" className="mt-0">
          <div className="mb-16">
            <h3 className="font-poppins font-semibold text-2xl mb-8 text-foreground text-center">
              Interactive Technology Cards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TechCard techId="posyg" />
              <TechCard techId="subnet" />
              <TechCard techId="adaptive-block" />
              <TechCard techId="zk-proofs" />
              <TechCard techId="tss" />
              <TechCard techId="cross-chain" />
            </div>
            <div className="text-center mt-2 text-sm text-foreground/60">
              Click on any card to learn more about the technology
            </div>
          </div>
          
          <div className="section-divider my-16"></div>
          
          <div className="glass rounded-lg p-8 border border-primary/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h3 className="font-poppins font-semibold text-2xl mb-4 text-foreground">Scalability for Mass Adoption</h3>
                <p className="text-foreground/70 mb-4">
                  With 1-second finality and the ability to process up to 100,000 TPS, PEOCHAIN is optimized for 
                  high-demand applications and mass adoption.
                </p>
                <p className="text-foreground/70">
                  These features make PEOCHAIN a leader in blockchain innovation, accessibility, and performance, 
                  designed to enable next-generation decentralized applications worldwide.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-primary/10 rounded-full p-12 text-primary">
                  <BarChart3 className="h-24 w-24" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="architecture" className="mt-0">
          <div className="grid md:grid-cols-2 gap-8">
            {architectureLayers.map((layer, index) => (
              <Card key={index} className="glass rounded-lg border border-primary/10 shadow-sm">
                <CardContent className="p-6 md:p-8">
                  <h3 className="font-poppins font-semibold text-xl mb-4 text-foreground">
                    {layer.title}
                  </h3>
                  <ul className="space-y-2">
                    {layer.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="text-primary mt-1 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-foreground/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="font-poppins font-semibold text-2xl mb-4 text-foreground text-center">
              PoSyg + DCS: Key Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-card p-5 rounded-lg border border-primary/5">
                <h4 className="font-medium text-lg mb-2 text-foreground flex items-center">
                  <Medal className="h-5 w-5 text-primary mr-2" />
                  Synergy Scoring
                </h4>
                <p className="text-foreground/70 text-sm">
                  Validators earn points by reliably proposing blocks and participating in governance, encouraging consistent contributions.
                </p>
              </div>
              <div className="bg-card p-5 rounded-lg border border-primary/5">
                <h4 className="font-medium text-lg mb-2 text-foreground flex items-center">
                  <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                  Security Features
                </h4>
                <p className="text-foreground/70 text-sm">
                  Synergy-weighted voting strengthens the network against attacks like Sybil and 51% attacks, ensuring resilience.
                </p>
              </div>
              <div className="bg-card p-5 rounded-lg border border-primary/5">
                <h4 className="font-medium text-lg mb-2 text-foreground flex items-center">
                  <Gauge className="h-5 w-5 text-primary mr-2" />
                  High Performance
                </h4>
                <p className="text-foreground/70 text-sm">
                  With 1-second finality and the ability to process up to 100,000 TPS, PEOCHAIN is optimized for high-demand applications.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="visualizations" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="glass rounded-lg border border-primary/10 p-6">
              <h3 className="font-poppins font-semibold text-xl mb-6 text-foreground text-center">
                Subnet Validator Networks
              </h3>
              <div className="bg-muted/30 rounded-lg p-4">
                <SubnetDiagram className="w-full h-auto" />
              </div>
              <p className="text-sm text-foreground/70 text-center mt-4">
                Hover over different parts of the network to see how subnets interact
              </p>
            </div>
            
            <div className="glass rounded-lg border border-primary/10 p-6">
              <h3 className="font-poppins font-semibold text-xl mb-6 text-foreground text-center">
                Adaptive Block Production
              </h3>
              <div className="bg-muted/30 rounded-lg">
                <AdaptiveBlockDiagram />
              </div>
            </div>
          </div>
          
          <div className="glass rounded-lg border border-primary/10 p-6 mt-12">
            <MetricsDashboard 
              simulationActive={simulateMetrics}
              onToggleSimulation={() => setSimulateMetrics(!simulateMetrics)}
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="text-center mt-12">
        <a href="#waitlist" className="btn-gradient inline-block text-white font-medium py-3 px-10 rounded-lg">
          Join the Waitlist
        </a>
      </div>
    </section>
  );
}