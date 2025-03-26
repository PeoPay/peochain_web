import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, BarChart3, Zap, SmartphoneCharging, Medal, Shield, Gauge, Network, LockKeyhole, Link as LinkIcon, BarChart, LineChart } from "lucide-react";
import { useState } from "react";

// Import our new interactive components
import { TechCard, getAvailableTechnologies } from "@/components/ui/tech-tooltip";
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
    description: "Independent subnet architecture with 16-32 validators per subnet, enabling horizontal scalability with maximum cross-subnet throughput of 350,000 TPS using a directed acyclic graph (DAG) for transaction ordering."
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Proof of Synergy (PoSyg™)",
    description: "BFT-based consensus combining delegated proof-of-stake with multi-signature validation. Achieves deterministic finality in 1.2 seconds with 99.9% Byzantine fault tolerance when f < n/3 validators are compromised."
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "Dynamic Contribution Scoring (DCS)",
    description: "Algorithmic on-chain governance system using quadratic voting (QV) with EIP-1559 compatible fee mechanism and automated rewards distribution via elliptic curve cryptography for validator compensation."
  },
  {
    icon: <LockKeyhole className="h-6 w-6" />,
    title: "Zero-Knowledge Proofs (ZK-Proofs)",
    description: "Integrated zk-SNARKs with recursive composition for O(1) verification complexity. Supports both private transactions and layer-2 rollups with 12kB proof size and sub-100ms generation time."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Threshold Signature Scheme (TSS)",
    description: "t-of-n threshold ECDSA implementation requiring 2/3 validator signatures for cross-chain transactions. Eliminates single points of failure with 128-bit security parameter and quantum resistance through post-quantum cryptography."
  },
  {
    icon: <LinkIcon className="h-6 w-6" />,
    title: "Cross-Chain Compatibility",
    description: "Bi-directional bridges using hash time-locked contracts (HTLCs) and state verification via Merkle proofs. Supports EVM compatibility with 60% lower gas costs and atomic swap capability with Bitcoin, Ethereum, and Cosmos networks."
  }
];

const architectureLayers = [
  {
    title: "Consensus Layer",
    items: [
      "Byzantine Fault Tolerant consensus (BFT) with 99.9% uptime guarantee and f < n/3 fault tolerance",
      "Proof of Synergy (PoSyg): Multi-phase commit protocol with 1.2 second finality",
      "Dynamic Contribution Scoring (DCS): Validator reputation system using weighted quadratic voting",
      "Elliptic Curve Digital Signature Algorithm (ECDSA) for transaction validation with secp256k1 curve"
    ]
  },
  {
    title: "EVM Compatibility Layer",
    items: [
      "Full Ethereum Virtual Machine (EVM) support with Solidity 0.8.x compatibility",
      "State transition function optimized for 60% lower gas costs than Ethereum",
      "WebAssembly (WASM) runtime for high-performance smart contracts",
      "Just-In-Time (JIT) compilation for frequently executed contract bytecode"
    ]
  },
  {
    title: "Cross-Chain Bridge",
    items: [
      "Bi-directional message passing with Merkle proof verification",
      "Hash Time-Locked Contracts (HTLCs) for atomic swaps with Bitcoin, Ethereum, and Cosmos",
      "Cross-chain state validation with Threshold Signature Scheme (TSS)",
      "Post-quantum cryptography for long-term security (Kyber/Dilithium)"
    ]
  },
  {
    title: "Protocol API Layer",
    items: [
      "JSON-RPC 2.0 API with WebSocket and HTTP transport",
      "GraphQL subscription support for real-time data feeds",
      "Binary serialization protocol reducing bandwidth by up to 40%",
      "Native SDK support for React, iOS, Android, and server environments"
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
                <h3 className="text-2xl mb-4 text-foreground">Technical Benchmarks</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded text-primary mt-1">
                      <LineChart className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Performance Metrics</h4>
                      <p className="text-foreground/70 text-sm">
                        <span className="technical-term">Transaction throughput</span>: 350,000 TPS across all subnets with <span className="technical-term">latency</span> of 50-80ms and <span className="technical-term">block time</span> of 0.5-2 seconds
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded text-primary mt-1">
                      <LinkIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Scaling Architecture</h4>
                      <p className="text-foreground/70 text-sm">
                        <span className="technical-term">Horizontal scaling</span> through subnet partitioning with <span className="technical-term">state synchronization</span> via Merkle witnesses and <span className="technical-term">cross-subnet communication</span> through zero-knowledge proofs
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded text-primary mt-1">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Security Analysis</h4>
                      <p className="text-foreground/70 text-sm">
                        Formal verification of safety and liveness properties using <span className="technical-term">TLA+</span>. Proving deterministic finality under <span className="technical-term">Byzantine fault tolerance</span> with threshold protection against malicious validators
                      </p>
                    </div>
                  </div>
                </div>
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
            <h3 className="text-2xl mb-4 text-foreground text-center">
              PoSyg + DCS: Technical Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-card p-5 rounded-lg border border-primary/5">
                <h4 className="font-medium text-lg mb-2 text-foreground flex items-center">
                  <Medal className="h-5 w-5 text-primary mr-2" />
                  Validator Economics
                </h4>
                <p className="text-foreground/70 text-sm">
                  <span className="technical-term">Multi-dimensional scoring</span> algorithm tracking 6 validator metrics in real-time. Utilizes <span className="technical-term">Markov chain Monte Carlo</span> (MCMC) simulations for dynamic stake weight adjustments based on historical performance.
                </p>
              </div>
              <div className="bg-card p-5 rounded-lg border border-primary/5">
                <h4 className="font-medium text-lg mb-2 text-foreground flex items-center">
                  <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                  Cryptographic Security
                </h4>
                <p className="text-foreground/70 text-sm">
                  <span className="technical-term">BLS multi-signature scheme</span> with 256-bit security parameter and <span className="technical-term">verifiable random function</span> (VRF) for validator selection. <span className="technical-term">Vector commitment schemes</span> ensure data availability with logarithmic proof size.
                </p>
              </div>
              <div className="bg-card p-5 rounded-lg border border-primary/5">
                <h4 className="font-medium text-lg mb-2 text-foreground flex items-center">
                  <Gauge className="h-5 w-5 text-primary mr-2" />
                  Performance Metrics
                </h4>
                <p className="text-foreground/70 text-sm">
                  <span className="technical-term">Deterministic finality</span> in 1.2 seconds with <span className="technical-term">throughput</span> of 350,000 TPS across subnets. <span className="technical-term">Latency</span> of 50-80ms for cross-subnet communication with <span className="technical-term">DAG-based sharding</span> for horizontal scaling.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="visualizations" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="glass rounded-lg border border-primary/10 p-6">
              <h3 className="text-xl mb-6 text-foreground text-center">
                Subnet Validator Networks
              </h3>
              <div className="bg-muted/30 rounded-lg p-4">
                <SubnetDiagram className="w-full h-auto" />
              </div>
              <div className="text-sm text-foreground/70 mt-4">
                <p className="mb-2 text-center"><strong>Interactive subnet topology visualization</strong></p>
                <ul className="space-y-1 px-4">
                  <li><span className="technical-term">Main subnet</span>: Processes consensus and cross-subnet communications</li>
                  <li><span className="technical-term">Execution subnets</span>: Handle parallel transaction execution (16-32 validators each)</li>
                  <li><span className="technical-term">Cross-links</span>: Merkle root commitments for state verification between subnets</li>
                </ul>
              </div>
            </div>
            
            <div className="glass rounded-lg border border-primary/10 p-6">
              <h3 className="text-xl mb-6 text-foreground text-center">
                Adaptive Block Production
              </h3>
              <div className="bg-muted/30 rounded-lg">
                <AdaptiveBlockDiagram />
              </div>
              <div className="text-sm text-foreground/70 mt-4">
                <p className="mb-2 text-center"><strong>Dynamic block optimization algorithm</strong></p>
                <ul className="space-y-1 px-4">
                  <li><span className="technical-term">Block interval</span>: Dynamically adjusts between 0.5-2 seconds based on network conditions</li>
                  <li><span className="technical-term">Block size</span>: Scales from 2MB to 32MB with adaptive gas limits</li>
                  <li><span className="technical-term">Propagation path</span>: Optimized validator relay network with 99.9% block acceptance rate</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="glass rounded-lg border border-primary/10 p-6 mt-12">
            <h3 className="text-xl mb-6 text-foreground text-center">Network Performance Metrics</h3>
            <div className="mb-4 text-sm text-foreground/70">
              <p className="text-center">Real-time monitoring of key performance indicators (KPIs) with threshold alerts and anomaly detection.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-6">
                <div className="bg-muted/20 p-3 rounded-md">
                  <p><span className="technical-term">Analytics</span>: Latency profiling, validator participation rate, consensus rounds required for finality</p>
                </div>
                <div className="bg-muted/20 p-3 rounded-md">
                  <p><span className="technical-term">Diagnostics</span>: Network hash power, stake distribution entropy, eclipse attack resistance factor</p>
                </div>
              </div>
            </div>
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