import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star, Network, Layers, LockKeyhole, Key, ArrowLeftRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface TechFeature {
  id: string;
  title: string;
  icon: React.ReactNode;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
}

export default function TechnicalFeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const features: TechFeature[] = [
    {
      id: "posyg",
      title: "Proof of Synergy (PoSyg™)",
      icon: <Star className="h-8 w-8" />,
      shortDescription: "Advanced, energy-efficient consensus with decentralization incentives.",
      longDescription: "Proof of Synergy is PeoChain's revolutionary consensus mechanism that combines the security of Proof of Stake with advanced validator incentives that reward collaboration and network health rather than just stake size. PoSyg introduces a dynamic stake multiplier based on contribution to overall network performance.",
      benefits: [
        "90% lower energy consumption than traditional Proof of Work",
        "Enhanced security through collaborative validation",
        "Optimized validator incentives for maximum decentralization",
        "Dynamic stake adjustments preventing validator centralization"
      ]
    },
    {
      id: "dcs",
      title: "Dynamic Contribution Scoring (DCS)",
      icon: <Network className="h-8 w-8" />,
      shortDescription: "Transparent validator scoring system ensuring fairness and network resilience.",
      longDescription: "Dynamic Contribution Scoring continuously evaluates validator performance across multiple metrics including uptime, transaction validation accuracy, network latency, and governance participation. This creates a meritocratic validation environment where technical contribution is rewarded alongside financial stake.",
      benefits: [
        "Real-time validator performance tracking and incentivization",
        "Protection against validator collusion or monopolization",
        "Granular metrics tracking for network health optimization",
        "Meritocratic validation rewards based on actual contribution"
      ]
    },
    {
      id: "subnet",
      title: "Subnet Validator Network",
      icon: <Layers className="h-8 w-8" />,
      shortDescription: "Independent subnets enabling high throughput.",
      longDescription: "PeoChain's subnet architecture divides transaction processing into specialized, parallel subnet validators that process transactions simultaneously. Each subnet maintains its own consensus while coordinating with the primary chain, enabling true horizontal scaling as network demand increases.",
      benefits: [
        "Unlimited theoretical TPS through horizontal scaling",
        "Specialized subnets optimized for specific transaction types",
        "Reduced validator hardware requirements for participation",
        "Predictable performance regardless of network load"
      ]
    },
    {
      id: "zkproofs",
      title: "Zero-Knowledge Proofs (ZK-Proofs)",
      icon: <LockKeyhole className="h-8 w-8" />,
      shortDescription: "Ensuring privacy, security, and scalability.",
      longDescription: "PeoChain integrates zero-knowledge cryptography to enable transaction verification without revealing sensitive data. Our custom ZK-SNARK implementation allows validators to verify transaction validity without seeing transaction details, enhancing both privacy and security while reducing the data footprint on the network.",
      benefits: [
        "Private transactions with mathematical security guarantees",
        "Reduced on-chain data requirements for better scalability",
        "Protection of sensitive financial information",
        "Enhanced compliance with data protection regulations"
      ]
    },
    {
      id: "tss",
      title: "Threshold Signature Scheme (TSS)",
      icon: <Key className="h-8 w-8" />,
      shortDescription: "Collaborative security architecture removing single points of failure.",
      longDescription: "PeoChain's Threshold Signature Scheme distributes cryptographic signing across multiple validators, requiring a minimum threshold of participants to authorize transactions. This eliminates single points of failure and enhances security by preventing any individual validator from controlling transaction authorization.",
      benefits: [
        "Elimination of single key vulnerability points",
        "Enhanced security for high-value transactions",
        "Protection against validator compromise or attacks",
        "Distributed transaction authorization across the network"
      ]
    },
    {
      id: "interop",
      title: "Cross-Chain Interoperability",
      icon: <ArrowLeftRight className="h-8 w-8" />,
      shortDescription: "Seamless asset transfers across multiple blockchain networks.",
      longDescription: "PeoChain's advanced interoperability protocol enables seamless communication with other blockchain networks through dedicated bridge contracts and cross-chain messaging protocols. This enables fluid asset transfers and cross-chain smart contract execution without centralized intermediaries.",
      benefits: [
        "Seamless asset transfers between major blockchain ecosystems",
        "Cross-chain smart contract execution capabilities",
        "Unified liquidity across fragmented blockchain ecosystems",
        "Bridge contracts with threshold security for cross-chain transfers"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const selectedFeatureData = features.find(feature => feature.id === selectedFeature);

  return (
    <section id="tech-features" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="section-title">
          Innovative Technology Stack
        </h2>
        <p className="description max-w-2xl mx-auto text-lg">
          PeoChain is built on cutting-edge technologies designed to solve blockchain's fundamental limitations.
          Click on each feature to learn more.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {features.map((feature) => (
          <motion.div 
            key={feature.id}
            variants={itemVariants}
            className="glass p-6 rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedFeature(feature.id)}
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/20 p-4 rounded-full text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-foreground/70 mb-4">{feature.shortDescription}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-auto"
              >
                Learn More <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature Detail Dialog */}
      <Dialog open={!!selectedFeature} onOpenChange={(open) => !open && setSelectedFeature(null)}>
        <DialogContent className={isMobile ? "max-w-full w-[95%] rounded-xl" : "max-w-4xl rounded-xl"}>
          {selectedFeatureData && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-xl">
                  <div className="bg-primary/20 p-3 rounded-full text-primary">
                    {selectedFeatureData.icon}
                  </div>
                  {selectedFeatureData.title}
                </DialogTitle>
                <DialogDescription className="text-base text-foreground/80 mt-4">
                  {selectedFeatureData.longDescription}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2 text-foreground">Key Benefits:</h4>
                <ul className="space-y-2">
                  {selectedFeatureData.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-primary/10 text-primary p-1 rounded-full mr-3 mt-0.5">
                        <Star className="h-4 w-4" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <DialogFooter className="mt-6">
                <Button onClick={() => setSelectedFeature(null)}>Close</Button>
                <Button variant="outline">Read Whitepaper</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}