import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, BarChart3, Zap, SmartphoneCharging, Medal, Shield, Gauge } from "lucide-react";

interface TechFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const techFeatures: TechFeature[] = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Proof of Synergy (PoSyg)",
    description: "Our unique consensus mechanism lets you earn income by contributing to network security—perfect for individuals looking to participate in the digital economy with minimal upfront investment."
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Dynamic Contribution Scoring",
    description: "Earn greater rewards based on your participation—helping small businesses and individual contributors receive fair compensation proportional to their actual economic contribution."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "High Performance",
    description: "Our platform processes 100,000 transactions per second with 1-second finality, enabling gig workers, small merchants and service providers to receive instant payments without delays."
  },
  {
    icon: <SmartphoneCharging className="h-6 w-6" />,
    title: "Mobile Money Integration",
    description: "Direct integration with popular mobile payment systems like M-Pesa and GCash lets unbanked entrepreneurs access loans, payment systems, and global markets previously unavailable to them."
  }
];

const architectureLayers = [
  {
    title: "Economic Reward Layer",
    items: [
      "Proof of Synergy (PoSyg): Converts network participation into income streams",
      "Dynamic Contribution Scoring (DCS): Ensures fair economic rewards based on actual contribution",
      "Income distribution system for individual validators and small businesses"
    ]
  },
  {
    title: "Business Application Layer",
    items: [
      "Smart contracts for business automation and cost reduction",
      "Ultra-low transaction fees enabling micro-businesses and gig economy services"
    ]
  },
  {
    title: "Market Access Bridge",
    items: [
      "Connect small businesses to global markets and trading opportunities",
      "Unlock previously inaccessible liquidity for small enterprises"
    ]
  },
  {
    title: "Financial Inclusion API",
    items: [
      "Simplified integration with existing business software",
      "Mobile payment compatibility for underbanked entrepreneurs",
      "Real-time settlement for immediate business cash flow"
    ]
  }
];

export default function TechnologySection() {
  return (
    <section id="technology" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
          Technology That Builds Your Income
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
          PEOCHAIN transforms complex blockchain innovations into practical tools for real economic growth. 
          Our technology directly connects to income generation, market access, and business expansion opportunities.
        </p>
      </div>
      
      <Tabs defaultValue="features" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="bg-primary/10">
            <TabsTrigger value="features" className="text-base">Key Features</TabsTrigger>
            <TabsTrigger value="architecture" className="text-base">System Architecture</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="features" className="mt-0">
          <div className="grid md:grid-cols-2 gap-8">
            {techFeatures.map((feature, index) => (
              <Card key={index} className="feature-card glass rounded-3xl border-0 shadow-sm">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-3 rounded-xl mr-4 mt-1 text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold text-xl mb-2 text-foreground">{feature.title}</h3>
                      <p className="text-foreground/70">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-primary/5 rounded-3xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h3 className="font-poppins font-semibold text-2xl mb-4 text-foreground">Economic Opportunity at Scale</h3>
                <p className="text-foreground/70 mb-4">
                  Our infrastructure supports millions of entrepreneur transactions daily, creating real income for merchants, 
                  service providers, and small businesses previously excluded from digital economies.
                </p>
                <p className="text-foreground/70">
                  PEOCHAIN democratizes financial services, turning technical capabilities into tangible economic empowerment—transforming 
                  blockchain from speculative technology into a practical tool for immediate income generation worldwide.
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
              <Card key={index} className="glass rounded-3xl border-0 shadow-sm">
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
          
          <div className="mt-12 p-6 bg-primary/5 rounded-3xl">
            <h3 className="font-poppins font-semibold text-2xl mb-4 text-foreground text-center">
              PoSyg + DCS: Key Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/40 p-5 rounded-2xl">
                <h4 className="font-medium text-lg mb-2 text-foreground flex items-center">
                  <Medal className="h-5 w-5 text-primary mr-2" />
                  Income Generation
                </h4>
                <p className="text-foreground/70 text-sm">
                  Convert your network participation into real income—validators earn tokens through economic contributions like processing transactions and supporting governance.
                </p>
              </div>
              <div className="bg-white/40 p-5 rounded-2xl">
                <h4 className="font-medium text-lg mb-2 text-foreground flex items-center">
                  <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                  Economic Fairness
                </h4>
                <p className="text-foreground/70 text-sm">
                  Our system prevents wealth concentration, ensuring small entrepreneurs and individuals receive fair compensation based on actual participation, not just capital size.
                </p>
              </div>
              <div className="bg-white/40 p-5 rounded-2xl">
                <h4 className="font-medium text-lg mb-2 text-foreground flex items-center">
                  <Gauge className="h-5 w-5 text-primary mr-2" />
                  Business Enablement
                </h4>
                <p className="text-foreground/70 text-sm">
                  Ultra-fast transaction processing (100,000 TPS) with 1-second finality enables new business models like micro-payments, gig economy services, and real-time settlements.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="text-center mt-12">
        <a href="#waitlist" className="btn-gradient inline-block text-white font-medium py-3 px-8 rounded-full">
          Join the Waitlist
        </a>
      </div>
    </section>
  );
}