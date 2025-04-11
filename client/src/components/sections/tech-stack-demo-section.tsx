import React from 'react';
import CrossChainVisualization from '../visualizations/cross-chain-visualization';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Layers, Network, Shield, Code, Zap } from 'lucide-react';

export default function TechStackDemoSection() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="section-title">
          Advanced Interoperability Layer
        </h2>
        <p className="description max-w-3xl mx-auto text-lg mb-8">
          PeoChain's revolutionary cross-chain integration technology connects with all major blockchain networks, 
          enabling fluid asset transfers, secure data exchange, and cross-chain smart contracts.
        </p>
        
        {/* Technical Architecture Overview Tabs */}
        <Tabs defaultValue="overview" className="max-w-4xl mx-auto mb-12">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="overview">Architecture</TabsTrigger>
            <TabsTrigger value="protocol">Protocol</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="text-left bg-white/40 backdrop-blur p-6 rounded-lg mt-4">
            <div className="flex items-start mb-4">
              <Layers className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Mesh Network Architecture</h3>
                <p className="text-sm text-muted-foreground">
                  PeoChain's mesh network connects blockchain networks through dedicated relay nodes and subnet validators 
                  that maintain consensus between chains. Our architecture allows for:
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-primary mr-1 mt-1 flex-shrink-0" />
                    <span>Parallel validation of cross-chain transactions (100,000+ TPS)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-primary mr-1 mt-1 flex-shrink-0" />
                    <span>Automatic load balancing across subnet validators</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-primary mr-1 mt-1 flex-shrink-0" />
                    <span>Horizontal scaling through dynamic subnet creation</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="protocol" className="text-left bg-white/40 backdrop-blur p-6 rounded-lg mt-4">
            <div className="flex items-start mb-4">
              <Network className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-1">PeoChain Protocol Stack</h3>
                <p className="text-sm text-muted-foreground">
                  Our technological stack consists of a common messaging protocol, bridge contracts, and dedicated subnet validators
                  that ensure reliable data transmission between chains:
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-primary mr-1 mt-1 flex-shrink-0" />
                    <span>PCXP (PeoChain Exchange Protocol) for standardized cross-chain messaging</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-primary mr-1 mt-1 flex-shrink-0" />
                    <span>Merkle-based state verification for transaction finality</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-primary mr-1 mt-1 flex-shrink-0" />
                    <span>Adaptive consensus mechanisms matching destination chain requirements</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="text-left bg-white/40 backdrop-blur p-6 rounded-lg mt-4">
            <div className="flex items-start mb-4">
              <Shield className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Multi-layer Security Framework</h3>
                <p className="text-sm text-muted-foreground">
                  PeoChain employs multiple security mechanisms to ensure the integrity and safety of cross-chain operations:
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-primary mr-1 mt-1 flex-shrink-0" />
                    <span>Zero-knowledge proofs to verify cross-chain transactions without revealing sensitive data</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-primary mr-1 mt-1 flex-shrink-0" />
                    <span>Threshold signature schemes requiring multiple subnet validators to approve transactions</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-primary mr-1 mt-1 flex-shrink-0" />
                    <span>Fraud-proof systems with economic penalties for malicious validator behavior</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="applications" className="text-left bg-white/40 backdrop-blur p-6 rounded-lg mt-4">
            <div className="flex items-start mb-4">
              <Code className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Cross-Chain Applications</h3>
                <p className="text-sm text-muted-foreground">
                  PeoChain enables developers to build next-generation applications that leverage the strengths of multiple blockchains:
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-primary mr-1 mt-1 flex-shrink-0" />
                    <span>Unified liquidity pools across multiple chains for enhanced capital efficiency</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-primary mr-1 mt-1 flex-shrink-0" />
                    <span>Multi-chain NFT marketplaces with seamless trading between ecosystem</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-primary mr-1 mt-1 flex-shrink-0" />
                    <span>Cross-chain governance systems for decentralized autonomous organizations</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="glass rounded-3xl p-6 md:p-10">
        <div className="mb-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-4">Interactive Cross-Chain Demo</h3>
          <p className="text-center text-base">
            Experience firsthand how PeoChain acts as the central hub enabling seamless interoperability between 
            different blockchain ecosystems. Our revolutionary technology bridges disparate networks, allowing for 
            the free flow of assets, data, and smart contract interactions across previously isolated chains.
          </p>
        </div>
        <CrossChainVisualization />
        
        <div className="mt-8 bg-white/50 backdrop-blur rounded-xl p-6">
          <h4 className="text-lg font-semibold mb-3">Key Technical Advantages</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h5 className="font-medium">Ultra-Fast Finality</h5>
              </div>
              <p className="text-sm text-muted-foreground">
                Our subnet validators achieve transaction finality in under 2 seconds across any connected blockchain, 
                regardless of the destination chain's native consensus mechanism.
              </p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h5 className="font-medium">Quantum-Resistant Security</h5>
              </div>
              <p className="text-sm text-muted-foreground">
                PeoChain's cryptographic protocols are designed to withstand quantum computing attacks, 
                future-proofing cross-chain assets and data against emerging security threats.
              </p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <h5 className="font-medium">Universal API</h5>
              </div>
              <p className="text-sm text-muted-foreground">
                Developers access all connected chains through a single, unified API, dramatically simplifying 
                the building of cross-chain applications and reducing development time by up to 70%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}