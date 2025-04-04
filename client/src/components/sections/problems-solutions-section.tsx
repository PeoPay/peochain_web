import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, ZapIcon, ShieldCheck, Zap, Network, Users, Clock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type ComparisonCategory = 'scalability' | 'security' | 'decentralization' | 'user-experience';

interface ComparisonItem {
  category: ComparisonCategory;
  title: string;
  description: string;
  legacy: {
    text: string;
    isPositive: boolean;
  };
  peochain: {
    text: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
}

export default function ProblemsSolutionsSection() {
  const [activeTab, setActiveTab] = useState<ComparisonCategory>('scalability');

  const comparisonData: ComparisonItem[] = [
    {
      category: 'scalability',
      title: "Transaction Throughput",
      description: "Number of transactions that can be processed per second",
      legacy: {
        text: "Bitcoin: 7 TPS, Ethereum: 15-30 TPS",
        isPositive: false
      },
      peochain: {
        text: "100,000+ TPS with sub-second finality",
        isPositive: true
      },
      icon: <Zap className="h-5 w-5" />
    },
    {
      category: 'scalability',
      title: "Energy Consumption",
      description: "Energy required to process transactions",
      legacy: {
        text: "High energy usage in Proof of Work chains",
        isPositive: false
      },
      peochain: {
        text: "95% less energy than traditional PoW chains",
        isPositive: true
      },
      icon: <ZapIcon className="h-5 w-5" />
    },
    {
      category: 'scalability',
      title: "Network Fees",
      description: "Cost to execute transactions on the network",
      legacy: {
        text: "High fees during network congestion (up to $200+ on Ethereum)",
        isPositive: false
      },
      peochain: {
        text: "Consistently low fees (avg. $0.004 per transaction)",
        isPositive: true
      },
      icon: <Clock className="h-5 w-5" />
    },
    {
      category: 'security',
      title: "Quantum Resistance",
      description: "Protection against quantum computing attacks",
      legacy: {
        text: "Vulnerable to quantum computing attacks",
        isPositive: false
      },
      peochain: {
        text: "Quantum-resistant cryptography integrated at protocol level",
        isPositive: true
      },
      icon: <ShieldCheck className="h-5 w-5" />
    },
    {
      category: 'security',
      title: "Consensus Security",
      description: "Mechanism to prevent attacks and ensure valid transactions",
      legacy: {
        text: "51% attacks possible with sufficient resources",
        isPositive: false
      },
      peochain: {
        text: "PoSyg provides enhanced resistance to collusion attacks",
        isPositive: true
      },
      icon: <ShieldCheck className="h-5 w-5" />
    },
    {
      category: 'decentralization',
      title: "Validator Requirements",
      description: "Resources needed to participate in network consensus",
      legacy: {
        text: "High barriers: expensive hardware or large stakes",
        isPositive: false
      },
      peochain: {
        text: "Accessible verification with Dynamic Contribution Scoring",
        isPositive: true
      },
      icon: <Users className="h-5 w-5" />
    },
    {
      category: 'decentralization',
      title: "Governance Structure",
      description: "How protocol decisions are made",
      legacy: {
        text: "Often controlled by mining pools or large stakeholders",
        isPositive: false
      },
      peochain: {
        text: "Multi-tiered governance with proportional voting power",
        isPositive: true
      },
      icon: <Users className="h-5 w-5" />
    },
    {
      category: 'user-experience',
      title: "Interoperability",
      description: "Ability to communicate with other blockchains",
      legacy: {
        text: "Limited or requires complex bridging solutions",
        isPositive: false
      },
      peochain: {
        text: "Native cross-chain communication with major networks",
        isPositive: true
      },
      icon: <Network className="h-5 w-5" />
    },
    {
      category: 'user-experience',
      title: "Transaction Confirmation",
      description: "Time to finalize a transaction",
      legacy: {
        text: "Minutes to hours depending on network",
        isPositive: false
      },
      peochain: {
        text: "0.5 seconds average confirmation time",
        isPositive: true
      },
      icon: <Clock className="h-5 w-5" />
    }
  ];

  const filteredData = comparisonData.filter(item => item.category === activeTab);

  return (
    <section id="problems-solutions" className="px-4 md:px-8 py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Legacy Blockchain Problems vs PeoChain Solutions</h2>
          <p className="text-foreground/70 max-w-3xl mx-auto text-lg">
            PeoChain's architecture directly addresses the critical limitations of traditional blockchain systems, providing tangible solutions to long-standing challenges.
          </p>
        </div>

        <Tabs defaultValue="scalability" value={activeTab} onValueChange={(value) => setActiveTab(value as ComparisonCategory)} className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="scalability" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Zap className="mr-2 h-4 w-4" />
              Scalability
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="decentralization" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="mr-2 h-4 w-4" />
              Decentralization
            </TabsTrigger>
            <TabsTrigger value="user-experience" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Network className="mr-2 h-4 w-4" />
              User Experience
            </TabsTrigger>
          </TabsList>

          {['scalability', 'security', 'decentralization', 'user-experience'].map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              {filteredData.map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-2 rounded-full text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <CardDescription className="cursor-help border-b border-dotted border-foreground/30">
                                {item.description}
                              </CardDescription>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>Click to learn more about {item.title.toLowerCase()}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-background/80 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm text-foreground/70">Legacy Blockchains</h4>
                          {!item.legacy.isPositive ? (
                            <XCircle className="h-5 w-5 text-red-500" />
                          ) : (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                        <p className={`text-base ${!item.legacy.isPositive ? "text-foreground/80" : "text-foreground"}`}>
                          {item.legacy.text}
                        </p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg border-2 border-primary/20">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm text-primary">PeoChain Solution</h4>
                          {item.peochain.isPositive ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </div>
                        <p className="text-base font-medium">
                          {item.peochain.text}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}