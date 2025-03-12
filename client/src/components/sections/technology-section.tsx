import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TechFeature {
  title: string;
  description: string;
  icon: string;
}

const techFeatures: TechFeature[] = [
  {
    icon: "ri-shield-flash-line",
    title: "Proof of Synergy (PoSyg)",
    description: "A hybrid consensus system combining the energy efficiency of Proof of Stake with the strong security of Proof of Work, ensuring a secure network with low energy consumption."
  },
  {
    icon: "ri-line-chart-line",
    title: "Dynamic Contribution Scoring",
    description: "Rewards users for supporting the network—whether by staking or participating in governance—building an active, community-driven ecosystem."
  },
  {
    icon: "ri-speed-up-line",
    title: "High Performance",
    description: "Process up to 100,000 transactions per second with 1-second finality, making it one of the fastest blockchain platforms ideal for microtransactions."
  },
  {
    icon: "ri-smartphone-line",
    title: "Mobile Money Integration",
    description: "Connects with platforms like M-Pesa and GCash, giving users in emerging markets access to DeFi services without needing a traditional bank account."
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
  return (
    <section id="technology" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-4">
          Our Technology
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
          PEOCHAIN is a blockchain platform built for speed, security, and scalability, 
          aiming to promote global financial inclusion through innovative technology.
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
                    <div className="bg-primary/10 p-3 rounded-xl mr-4 mt-1">
                      <i className={`${feature.icon} text-2xl text-primary`}></i>
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
                <h3 className="font-poppins font-semibold text-2xl mb-4 text-foreground">Scalability for Mass Adoption</h3>
                <p className="text-foreground/70 mb-4">
                  With 1-second finality and the ability to process up to 100,000 TPS, PEOCHAIN is optimized for 
                  high-demand applications and mass adoption.
                </p>
                <p className="text-foreground/70">
                  These features make PEOCHAIN a leader in blockchain innovation, accessibility, and performance, 
                  designed to meet the financial needs of underserved communities worldwide.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-primary/10 rounded-full p-12">
                  <i className="ri-line-chart-line text-8xl text-primary"></i>
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
                      <li key={idx} className="flex items-start">
                        <i className="ri-check-line text-primary mr-2 mt-1"></i>
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
                  <i className="ri-medal-line text-primary mr-2"></i>
                  Synergy Scoring
                </h4>
                <p className="text-foreground/70 text-sm">
                  Validators earn points by reliably proposing blocks and participating in governance, encouraging consistent contributions.
                </p>
              </div>
              <div className="bg-white/40 p-5 rounded-2xl">
                <h4 className="font-medium text-lg mb-2 text-foreground flex items-center">
                  <i className="ri-shield-check-line text-primary mr-2"></i>
                  Security Features
                </h4>
                <p className="text-foreground/70 text-sm">
                  Synergy-weighted voting strengthens the network against attacks like Sybil and 51% attacks, ensuring resilience.
                </p>
              </div>
              <div className="bg-white/40 p-5 rounded-2xl">
                <h4 className="font-medium text-lg mb-2 text-foreground flex items-center">
                  <i className="ri-speed-line text-primary mr-2"></i>
                  High Performance
                </h4>
                <p className="text-foreground/70 text-sm">
                  With 1-second finality and the ability to process up to 100,000 TPS, PEOCHAIN is optimized for high-demand applications.
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