import React, { useState } from 'react';
import { 
  Network, 
  ShieldCheck, 
  LockKeyhole, 
  Shield, 
  Link as LinkIcon,
  Gauge,
  Terminal,
  Box,
  Cpu,
  Database
} from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define the technology data structure
interface TechData {
  id: string;
  title: string;
  shortDescription: string;
  icon: React.ReactNode;
  longDescription: string;
  benefits: string[];
  technicalPoints: string[];
}

// All available technologies
const technologies: TechData[] = [
  {
    id: 'posyg',
    title: 'Proof of Synergy (PoSyg™)',
    shortDescription: 'Efficient consensus mechanism that rewards validator contribution and collaboration.',
    icon: <ShieldCheck className="h-6 w-6" />,
    longDescription: 'Proof of Synergy (PoSyg™) is PEOCHAIN\'s proprietary consensus mechanism that balances security, decentralization, and energy efficiency. Unlike traditional Proof of Stake, PoSyg evaluates validator contributions to the network over time.',
    benefits: [
      'Energy-efficient alternative to Proof of Work',
      'Rewards consistent validator participation and network support',
      'Prevents centralization by considering factors beyond just stake amount',
      'Provides enhanced security through collaborative validation',
    ],
    technicalPoints: [
      'Validators earn synergy scores based on uptime, transaction processing, and governance participation',
      'Block rewards are distributed based on both stake amount and synergy score',
      'Economic incentives discourage malicious behavior and encourage cooperation',
      'Adaptive difficulty adjustments to ensure network stability under varying loads',
    ]
  },
  {
    id: 'zk-proofs',
    title: 'Zero-Knowledge Proofs',
    shortDescription: 'Cryptographic method allowing data validation without revealing the data itself.',
    icon: <LockKeyhole className="h-6 w-6" />,
    longDescription: 'Zero-Knowledge Proofs enable one party (the prover) to prove to another party (the verifier) that a statement is true without revealing any information beyond the validity of the statement itself.',
    benefits: [
      'Enhanced privacy for financial transactions',
      'Reduced on-chain data storage requirements',
      'Improved scalability through off-chain computation',
      'Enables confidential smart contracts and private DeFi',
    ],
    technicalPoints: [
      'Implements zk-SNARKs (Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge)',
      'Constant-size verification regardless of computation complexity',
      'Compatible with existing Ethereum smart contracts',
      'Batches multiple transactions into single proofs for throughput optimization',
    ]
  },
  {
    id: 'subnet',
    title: 'Subnet Validator Networks',
    shortDescription: 'Parallel validator networks that process transactions simultaneously, increasing throughput.',
    icon: <Network className="h-6 w-6" />,
    longDescription: 'Subnet Validator Networks are independent groups of validators that focus on specific types of transactions or smart contracts, enabling parallel processing and specialization.',
    benefits: [
      'Horizontal scaling through parallel transaction processing',
      'Specialized subnets for specific use cases (DeFi, NFTs, Identity)',
      'Improved resource allocation and reduced network congestion',
      'Customizable validation rules for different transaction types',
    ],
    technicalPoints: [
      'Cross-subnet communication through atomic message passing',
      'Dynamic subnet creation and validator assignment',
      'Subnet-specific state storage and execution environments',
      'Hierarchical consensus with main chain finality guarantees',
    ]
  },
  {
    id: 'tss',
    title: 'Threshold Signature Scheme',
    shortDescription: 'Collaborative validation method where multiple validators sign transactions together.',
    icon: <Shield className="h-6 w-6" />,
    longDescription: 'Threshold Signature Scheme (TSS) is a cryptographic method that allows a group of validators to collectively generate signatures without any single validator having access to the complete private key.',
    benefits: [
      'Enhanced security through distributed key management',
      'Elimination of single points of failure',
      'Resistance against key compromise attacks',
      'Improved cross-chain interoperability',
    ],
    technicalPoints: [
      'Implements t-of-n threshold cryptography',
      'Distributed key generation without trusted dealers',
      'Compatible with ECDSA and Schnorr signature schemes',
      'Supports flexible threshold configurations for different security needs',
    ]
  },
  {
    id: 'cross-chain',
    title: 'Cross-Chain Compatibility',
    shortDescription: 'Seamless interaction with other blockchain networks to enhance liquidity and usability.',
    icon: <LinkIcon className="h-6 w-6" />,
    longDescription: 'Cross-Chain Compatibility enables PEOCHAIN to communicate and transact with other blockchain networks like Ethereum, Solana, and more through secure bridging protocols.',
    benefits: [
      'Access to liquidity from multiple blockchain ecosystems',
      'Interoperability with popular DeFi protocols and applications',
      'Ability to leverage multiple blockchain strengths in a single application',
      'Simplified user experience across blockchain networks',
    ],
    technicalPoints: [
      'Implements TSS-based bridge for secure cross-chain asset transfers',
      'Native support for popular token standards (ERC-20, ERC-721, SPL)',
      'Atomic swaps for trustless cross-chain trading',
      'Cross-chain smart contract calls and message passing',
    ]
  },
  {
    id: 'adaptive-block',
    title: 'Adaptive Block Production',
    shortDescription: 'Dynamic block size and timing adjustments to maintain optimal network performance.',
    icon: <Gauge className="h-6 w-6" />,
    longDescription: 'Adaptive Block Production technology automatically adjusts block parameters based on network conditions to maintain optimal performance under varying loads.',
    benefits: [
      'Consistent transaction throughput regardless of network load',
      'Reduced transaction fees during high-demand periods',
      'Improved user experience with predictable confirmation times',
      'Efficient resource utilization across the network',
    ],
    technicalPoints: [
      'Dynamic block size adjustment based on transaction queue length',
      'Variable block time depending on network congestion',
      'Automatic fee market adjustment to balance cost and speed',
      'Machine learning-based prediction of network demand patterns',
    ]
  },
  {
    id: 'smart-contracts',
    title: 'Advanced Smart Contracts',
    shortDescription: 'Enhanced programmable logic with improved security, efficiency, and developer tools.',
    icon: <Terminal className="h-6 w-6" />,
    longDescription: 'PEOCHAIN\'s Advanced Smart Contract system builds on existing standards while adding new features for security, efficiency, and usability.',
    benefits: [
      'Complete EVM compatibility for easy migration of existing applications',
      'Advanced security features to prevent common vulnerabilities',
      'Optimized execution for lower gas costs',
      'Rich developer tooling and simplified testing procedures',
    ],
    technicalPoints: [
      'Support for Solidity and Vyper with PEOCHAIN extensions',
      'Built-in formal verification for critical contract components',
      'Stateless smart contract execution for better parallelization',
      'Native oracle integration for real-world data access',
    ]
  },
  {
    id: 'sharding',
    title: 'Horizontal Sharding',
    shortDescription: 'Database partitioning that spreads the data load across multiple validators.',
    icon: <Database className="h-6 w-6" />,
    longDescription: "Horizontal Sharding divides the blockchain state into smaller, more manageable pieces (shards) that can be processed in parallel by different validators.",
    benefits: [
      'Nearly unlimited scalability potential',
      'Reduced hardware requirements for validators',
      'Improved data availability and retrieval times',
      'Enhanced validator participation with lower barriers to entry',
    ],
    technicalPoints: [
      'Dynamic shard assignment based on transaction types and volumes',
      'Cross-shard transaction protocol with atomicity guarantees',
      'Data availability sampling to ensure shard integrity',
      'Fraud proof system for secure light client verification',
    ]
  },
  {
    id: 'modular',
    title: 'Modular Architecture',
    shortDescription: 'Flexible, upgradable system where components can be improved independently.',
    icon: <Box className="h-6 w-6" />,
    longDescription: 'Modular Architecture separates blockchain functions (consensus, execution, data availability, settlement) into specialized layers that can evolve independently.',
    benefits: [
      'Future-proof design that can adapt to emerging technologies',
      'Specialized optimization for each blockchain function',
      'Simplified governance through targeted upgrades',
      'Flexible configuration for different deployment scenarios',
    ],
    technicalPoints: [
      'Clear separation between consensus and execution layers',
      'Pluggable consensus modules supporting multiple algorithms',
      'Standardized interfaces between blockchain components',
      'Zero-downtime upgrades through phased module replacement',
    ]
  },
  {
    id: 'vm',
    title: 'Multi-VM Support',
    shortDescription: 'Support for multiple virtual machines enabling diverse programming languages.',
    icon: <Cpu className="h-6 w-6" />,
    longDescription: 'Multi-VM Support allows PEOCHAIN to run smart contracts written in different programming languages by supporting multiple virtual machine environments simultaneously.',
    benefits: [
      'Developer flexibility to use preferred programming languages',
      'Ecosystem diversity with specialized environments for different use cases',
      'Improved security through language-specific safety features',
      'Easy migration path for existing blockchain applications',
    ],
    technicalPoints: [
      'Native support for EVM, WASM, and Move VM',
      'Unified resource accounting across virtual machines',
      'Cross-VM communication protocol for contract interoperability',
      'Sandboxed execution environments for enhanced security',
    ]
  }
];

// Simple tooltip version
export function TechTooltip({ techId }: { techId: string }) {
  const tech = technologies.find(t => t.id === techId);
  
  if (!tech) return null;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="tech-card cursor-help">
            <div className="bg-primary/10 p-4 rounded-lg inline-flex text-primary mb-4">
              {tech.icon}
            </div>
            <h3 className="font-poppins font-semibold text-lg mb-2 text-foreground">
              {tech.title}
            </h3>
            <p className="text-foreground/70 text-sm">
              {tech.shortDescription}
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4">
          <p className="font-medium">{tech.title}</p>
          <p className="text-sm mt-2">{tech.longDescription}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Modal dialog version for more detailed information
export function TechCard({ techId }: { techId: string }) {
  const [open, setOpen] = useState(false);
  const tech = technologies.find(t => t.id === techId);
  
  if (!tech) return null;
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="tech-card cursor-pointer hover:scale-105 transition-transform duration-200 hover:shadow-md bg-card rounded-lg p-6 border border-primary/10">
          <div className="bg-primary/10 p-4 rounded-lg inline-flex text-primary mb-4">
            {tech.icon}
          </div>
          <h3 className="font-poppins font-semibold text-lg mb-2 text-foreground">
            {tech.title}
          </h3>
          <p className="text-foreground/70 text-sm">
            {tech.shortDescription}
          </p>
          <div className="mt-4 text-xs text-primary/80 font-medium">
            Click to learn more
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <span className="text-primary">{tech.icon}</span> 
            {tech.title}
          </DialogTitle>
          <DialogDescription className="text-base">
            {tech.longDescription}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h4 className="font-semibold text-lg mb-3 text-foreground">Key Benefits</h4>
            <ul className="space-y-2">
              {tech.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="text-primary mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-foreground/70 text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-3 text-foreground">Technical Details</h4>
            <ul className="space-y-2">
              {tech.technicalPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="text-primary mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-foreground/70 text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Export a collection of tech cards for convenience
export function TechCards({ techIds, tooltipOnly }: { techIds: string[], tooltipOnly?: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {techIds.map(id => (
        tooltipOnly ? 
          <TechTooltip key={id} techId={id} /> : 
          <TechCard key={id} techId={id} />
      ))}
    </div>
  );
}

// Function to get technology data by ID
export const getTechById = (id: string): TechData | undefined => {
  return technologies.find(tech => tech.id === id);
};

// Export the technologies array for other components
export const availableTechnologies = technologies;