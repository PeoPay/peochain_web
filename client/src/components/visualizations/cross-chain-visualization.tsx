import React, { useState, useEffect } from 'react';
import { SiEthereum, SiPolkadot, SiCoinbase, SiBitcoin, SiSolana, SiCardano } from "react-icons/si";
import { Send, Award, Repeat, Globe, Zap, Shield, FolderClosed, ArrowRightLeft, Database, Activity, Lock, FileText, Network, Layers, Blocks, BarChart3, Cpu, RefreshCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TechTooltip } from '@/components/ui/tech-tooltip';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Define the types of cross-chain transactions we can demonstrate
type TransactionType = 'asset' | 'data' | 'smart-contract' | 'governance';
type ChainType = 'ethereum' | 'polkadot' | 'cosmos' | 'bitcoin' | 'solana' | 'cardano';

interface ChainInfo {
  id: ChainType;
  name: string;
  icon: React.ReactNode;
  color: string;
  position: { x: number; y: number };
  capabilities: string[];
  transactionSpeed: string;
  consensus: string;
}

interface TransactionMetrics {
  timeToFinality: string;
  estimatedFee: string;
  securityLevel: 'Low' | 'Medium' | 'High';
  carbonImpact: 'Minimal' | 'Moderate' | 'Significant';
}

export default function CrossChainVisualization() {
  const [activeDemo, setActiveDemo] = useState<TransactionType>('asset');
  const [animating, setAnimating] = useState(false);
  const [selectedSource, setSelectedSource] = useState<ChainType | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<ChainType | null>(null);
  const [completedPaths, setCompletedPaths] = useState<string[]>([]);
  const [activePath, setActivePath] = useState<string | null>(null);
  const [visualizationMode, setVisualizationMode] = useState<'standard' | 'advanced'>('standard');
  const [metrics, setMetrics] = useState<TransactionMetrics | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState<'normal' | 'detailed'>('normal');
  
  // Define the blockchain networks to display
  const chains: ChainInfo[] = [
    { 
      id: 'ethereum', 
      name: 'Ethereum', 
      icon: <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
              <SiEthereum className="h-8 w-8 relative z-10" />
            </div>, 
      color: '#627EEA', 
      position: { x: 20, y: 30 },
      capabilities: ['Smart Contracts', 'DeFi', 'NFTs'],
      transactionSpeed: '~12 seconds',
      consensus: 'Proof of Stake'
    },
    { 
      id: 'polkadot', 
      name: 'Polkadot', 
      icon: <div className="relative">
              <div className="absolute inset-0 bg-pink-100 rounded-full opacity-30 animate-pulse"></div>
              <SiPolkadot className="h-8 w-8 relative z-10" />
            </div>, 
      color: '#E6007A', 
      position: { x: 80, y: 30 },
      capabilities: ['Parachains', 'Interoperability', 'Governance'],
      transactionSpeed: '~6 seconds',
      consensus: 'Nominated Proof of Stake'
    },
    { 
      id: 'cosmos', 
      name: 'Cosmos', 
      icon: <div className="relative">
              <div className="absolute inset-0 bg-indigo-100 rounded-full opacity-30 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-center h-8 w-8">
                <div className="absolute inset-0 bg-indigo-900 rounded-full opacity-10"></div>
                <Network className="h-6 w-6 text-indigo-900" />
              </div>
            </div>, 
      color: '#2E3148', 
      position: { x: 20, y: 70 },
      capabilities: ['IBC Protocol', 'Sovereignty', 'SDK'],
      transactionSpeed: '~6 seconds',
      consensus: 'Tendermint BFT'
    },
    { 
      id: 'bitcoin', 
      name: 'Bitcoin', 
      icon: <div className="relative">
              <div className="absolute inset-0 bg-orange-100 rounded-full opacity-30 animate-pulse"></div>
              <SiBitcoin className="h-8 w-8 relative z-10" />
            </div>, 
      color: '#F7931A', 
      position: { x: 80, y: 70 },
      capabilities: ['Store of Value', 'Lightning Network', 'Security'],
      transactionSpeed: '~10 minutes',
      consensus: 'Proof of Work'
    },
    { 
      id: 'solana', 
      name: 'Solana', 
      icon: <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full opacity-30 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-center h-8 w-8">
                <div className="absolute inset-0 bg-green-500 rounded-full opacity-10"></div>
                <Zap className="h-6 w-6 text-green-500" />
              </div>
            </div>, 
      color: '#14F195', 
      position: { x: 50, y: 20 },
      capabilities: ['High Throughput', 'Low Fees', 'dApps'],
      transactionSpeed: '~400ms',
      consensus: 'Proof of History + PoS'
    },
    { 
      id: 'cardano', 
      name: 'Cardano', 
      icon: <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-center h-8 w-8">
                <div className="absolute inset-0 bg-blue-700 rounded-full opacity-10"></div>
                <Layers className="h-6 w-6 text-blue-700" />
              </div>
            </div>, 
      color: '#0033AD', 
      position: { x: 50, y: 80 },
      capabilities: ['Formal Verification', 'Multi-Asset', 'Hydra'],
      transactionSpeed: '~20 seconds',
      consensus: 'Ouroboros PoS'
    }
  ];
  
  // PeoChain is positioned in the center
  const peoChain = {
    name: 'PeoChain',
    position: { x: 50, y: 50 },
    color: '#4a6fa5',
    capabilities: [
      'Cross-Chain Bridge',
      'Atomic Swaps',
      'Layer-0 Protocol',
      'Quantum Resistance',
      'Carbon Neutral'
    ]
  };
  
  const demonstrations = [
    { 
      id: 'asset' as TransactionType, 
      name: 'Asset Transfer', 
      icon: <div className="relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
              <Send className="h-5 w-5 relative z-10" />
            </div>, 
      description: 'Send tokens and assets between blockchains'
    },
    { 
      id: 'data' as TransactionType, 
      name: 'Data Exchange', 
      icon: <div className="relative">
              <div className="absolute inset-0 bg-indigo-100 rounded-full opacity-20 animate-pulse"></div>
              <ArrowRightLeft className="h-5 w-5 relative z-10" />
            </div>, 
      description: 'Securely share data and state between chains'
    },
    { 
      id: 'smart-contract' as TransactionType, 
      name: 'Cross-Chain Contracts', 
      icon: <div className="relative">
              <div className="absolute inset-0 bg-purple-100 rounded-full opacity-20 animate-pulse"></div>
              <FolderClosed className="h-5 w-5 relative z-10" />
            </div>, 
      description: 'Execute smart contracts across multiple blockchains'
    },
    { 
      id: 'governance' as TransactionType,
      name: 'Governance Integration',
      icon: <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full opacity-20 animate-pulse"></div>
              <FileText className="h-5 w-5 relative z-10" />
            </div>,
      description: 'Unified voting and proposals across ecosystems'
    }
  ];
  
  // Handle selecting a chain as source or target
  const handleChainClick = (chainId: ChainType) => {
    if (animating) return;
    
    if (!selectedSource) {
      setSelectedSource(chainId);
    } else if (selectedSource === chainId) {
      setSelectedSource(null);
    } else if (!selectedTarget) {
      setSelectedTarget(chainId);
      simulateTransaction(selectedSource, chainId);
    } else {
      setSelectedSource(chainId);
      setSelectedTarget(null);
    }
  };
  
  // State for transaction details
  const [transactionDetails, setTransactionDetails] = useState<{
    title: string;
    description: string;
    steps: string[];
    currentStep: number;
    technicalDetails?: string[];
  } | null>(null);
  
  // Calculate metrics for the transaction
  const calculateMetrics = (source: ChainType, target: ChainType, type: TransactionType): TransactionMetrics => {
    const sourceChain = chains.find(c => c.id === source)!;
    const targetChain = chains.find(c => c.id === target)!;
    
    // Simulated logic for calculating metrics
    const timeMap: Record<TransactionType, number> = {
      'asset': 20,
      'data': 15,
      'smart-contract': 35,
      'governance': 45
    };
    
    const baseTime = timeMap[type];
    const slowdownFactor = source === 'bitcoin' || target === 'bitcoin' ? 3 : 1;
    const speedupFactor = (source === 'solana' || target === 'solana') ? 0.7 : 1;
    
    const timeToFinality = Math.round(baseTime * slowdownFactor * speedupFactor);
    
    // Fee calculation based on chain types and transaction type
    let fee = type === 'smart-contract' ? 2.5 : (type === 'governance' ? 1.8 : 1.2);
    if (source === 'ethereum' || target === 'ethereum') fee *= 2;
    if (source === 'solana' || target === 'solana') fee *= 0.3;
    
    // Security assessment
    let security: 'Low' | 'Medium' | 'High' = 'Medium';
    if (source === 'bitcoin' || target === 'bitcoin') security = 'High';
    if (type === 'governance') security = 'High';
    
    // Carbon impact calculation
    let carbonImpact: 'Minimal' | 'Moderate' | 'Significant' = 'Moderate';
    if (source === 'bitcoin' || target === 'bitcoin') carbonImpact = 'Significant';
    if (source === 'solana' || target === 'solana' || source === 'cardano' || target === 'cardano') 
      carbonImpact = 'Minimal';
    
    return {
      timeToFinality: `~${timeToFinality} seconds`,
      estimatedFee: `$${fee.toFixed(2)}`,
      securityLevel: security,
      carbonImpact: carbonImpact
    };
  };
  
  // Simulate transaction animation
  const simulateTransaction = async (source: ChainType, target: ChainType) => {
    const pathId = `${source}-${target}-${activeDemo}`;
    setActivePath(pathId);
    setAnimating(true);
    
    // Calculate transaction metrics
    const transactionMetrics = calculateMetrics(source, target, activeDemo);
    setMetrics(transactionMetrics);
    
    // Get transaction details
    const details = getTransactionDetails(source, target);
    setTransactionDetails({
      ...details,
      currentStep: 0
    });
    
    const stepDelay = animationSpeed === 'detailed' ? 2000 : 1000;
    
    // Step 1: Source blockchain initiation
    await new Promise(resolve => setTimeout(resolve, stepDelay));
    setTransactionDetails(prev => prev ? { ...prev, currentStep: 1 } : null);
    
    // Step 2: PeoChain processing
    await new Promise(resolve => setTimeout(resolve, stepDelay * 1.5));
    setTransactionDetails(prev => prev ? { ...prev, currentStep: 2 } : null);
    
    // Step 3: Destination blockchain confirmation
    await new Promise(resolve => setTimeout(resolve, stepDelay * 1.5));
    setTransactionDetails(prev => prev ? { ...prev, currentStep: 3 } : null);
    
    // Mark path as completed
    setCompletedPaths([...completedPaths, pathId]);
    setActivePath(null);
    
    // Keep details visible but clear animation state
    setAnimating(false);
    
    // Reset selections after a delay
    setTimeout(() => {
      setSelectedSource(null);
      setSelectedTarget(null);
      setTransactionDetails(null);
      setMetrics(null);
    }, 5000);
  };
  
  // Reset the demonstration
  const resetDemo = () => {
    setSelectedSource(null);
    setSelectedTarget(null);
    setActivePath(null);
    setCompletedPaths([]);
    setAnimating(false);
    setTransactionDetails(null);
    setMetrics(null);
  };
  
  // Get transaction icon based on type
  const getTransactionIcon = () => {
    switch (activeDemo) {
      case 'asset':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full opacity-30 animate-pulse"></div>
            <Send className="h-4 w-4 text-white relative z-10" />
          </div>
        );
      case 'data':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full opacity-30 animate-pulse"></div>
            <ArrowRightLeft className="h-4 w-4 text-white relative z-10" />
          </div>
        );
      case 'smart-contract':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full opacity-30 animate-pulse"></div>
            <FolderClosed className="h-4 w-4 text-white relative z-10" />
          </div>
        );
      case 'governance':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full opacity-30 animate-pulse"></div>
            <FileText className="h-4 w-4 text-white relative z-10" />
          </div>
        );
      default:
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-white rounded-full opacity-30 animate-pulse"></div>
            <Send className="h-4 w-4 text-white relative z-10" />
          </div>
        );
    }
  };
  
  // Get security icon based on level
  const getSecurityIcon = (level: 'Low' | 'Medium' | 'High') => {
    switch (level) {
      case 'Low':
        return <Lock className="h-4 w-4 text-yellow-500" />;
      case 'Medium':
        return <Lock className="h-4 w-4 text-blue-500" />;
      case 'High':
        return <Lock className="h-4 w-4 text-green-500" />;
      default:
        return <Lock className="h-4 w-4" />;
    }
  };
  
  // Get carbon impact icon
  const getCarbonIcon = (impact: 'Minimal' | 'Moderate' | 'Significant') => {
    switch (impact) {
      case 'Minimal':
        return <Zap className="h-4 w-4 text-green-500" />;
      case 'Moderate':
        return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'Significant':
        return <Zap className="h-4 w-4 text-red-500" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };
  
  // Get transaction details for display
  const getTransactionDetails = (source: ChainType, target: ChainType) => {
    const sourceChain = chains.find(c => c.id === source)!;
    const targetChain = chains.find(c => c.id === target)!;
    
    switch (activeDemo) {
      case 'asset':
        return {
          title: `Asset Transfer: ${sourceChain.name} → ${targetChain.name}`,
          description: `Transferring tokenized assets from ${sourceChain.name} to ${targetChain.name} via PeoChain's secure bridge protocol with zero slippage.`,
          steps: [
            "1. Asset locked in source chain smart contract with multi-signature verification",
            "2. PeoChain validators reach consensus and verify transaction authenticity",
            "3. Equivalent assets minted on destination chain with proof-of-reserve"
          ],
          technicalDetails: [
            "Merkle proof validation",
            "State transition verification",
            "Threshold signature scheme",
            "Atomic commitment protocol"
          ]
        };
      case 'data':
        return {
          title: `Data Exchange: ${sourceChain.name} → ${targetChain.name}`,
          description: `Securely transmitting verified state data from ${sourceChain.name} to ${targetChain.name} with quantum-resistant cryptographic proof.`,
          steps: [
            "1. Data cryptographically committed on source chain with zero-knowledge proof",
            "2. PeoChain validates data integrity across subnets with Byzantine fault tolerance",
            "3. State update confirmed on destination chain with cryptographic attestation"
          ],
          technicalDetails: [
            "Homomorphic encryption",
            "Verifiable random function",
            "Post-quantum cryptography",
            "Consensus sequencing"
          ]
        };
      case 'smart-contract':
        return {
          title: `Cross-Chain Contract: ${sourceChain.name} → ${targetChain.name}`,
          description: `Executing a smart contract that spans ${sourceChain.name} and ${targetChain.name} chains simultaneously with atomic guarantees.`,
          steps: [
            "1. Contract execution triggered on source chain with gas optimization",
            "2. PeoChain propagates function calls across networks with state synchronization",
            "3. Synchronized execution completed with rollback protection on all chains"
          ],
          technicalDetails: [
            "Just-in-time compilation",
            "Optimistic execution",
            "Cross-chain virtual machine",
            "Failure recovery mechanism"
          ]
        };
      case 'governance':
        return {
          title: `Governance Integration: ${sourceChain.name} → ${targetChain.name}`,
          description: `Synchronizing governance proposals and votes between ${sourceChain.name} and ${targetChain.name} via PeoChain's distributed coordination protocol.`,
          steps: [
            "1. Governance proposal submitted with quadratic voting on source chain",
            "2. PeoChain propagates proposal to relevant ecosystems with sybil resistance",
            "3. Combined voting power tallied with transparent on-chain verification"
          ],
          technicalDetails: [
            "Distributed key generation",
            "Homogeneous vote accounting",
            "Sybil-resistant identity",
            "Quadratic funding mechanism"
          ]
        };
      default:
        return {
          title: `Transaction: ${sourceChain.name} → ${targetChain.name}`,
          description: `Transferring data between blockchains.`,
          steps: [
            "1. Transaction initiated",
            "2. Cross-chain validation",
            "3. Finalization on target chain"
          ]
        };
    }
  };
  
  // Calculate path for visualization
  const getPath = (sourceId: ChainType, targetId: ChainType) => {
    const source = chains.find(c => c.id === sourceId)!;
    const target = chains.find(c => c.id === targetId)!;
    
    // Calculate path through PeoChain
    return {
      path1: `M${source.position.x},${source.position.y} L${peoChain.position.x},${peoChain.position.y}`,
      path2: `M${peoChain.position.x},${peoChain.position.y} L${target.position.x},${target.position.y}`
    };
  };
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Cross-Chain Interoperability Demo</h3>
      
      <div className="flex flex-col gap-4">
        {/* Transaction Type Selector */}
        <div className="flex flex-wrap gap-2">
          {demonstrations.map(demo => (
            <Button
              key={demo.id}
              variant={activeDemo === demo.id ? "default" : "outline"}
              size="sm"
              onClick={() => {
                if (!animating) {
                  setActiveDemo(demo.id);
                  resetDemo();
                }
              }}
              className={`flex items-center gap-2 ${activeDemo === demo.id ? '' : 'opacity-70'}`}
            >
              {demo.icon}
              <span>{demo.name}</span>
            </Button>
          ))}
        </div>
        
        {/* Visualization controls */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setVisualizationMode(visualizationMode === 'standard' ? 'advanced' : 'standard')}
              className="text-xs"
            >
              <Cpu className="h-3 w-3 mr-1" />
              {visualizationMode === 'standard' ? 'Standard View' : 'Technical View'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setAnimationSpeed(animationSpeed === 'normal' ? 'detailed' : 'normal')}
              className="text-xs"
            >
              <Activity className="h-3 w-3 mr-1" />
              {animationSpeed === 'normal' ? 'Normal Speed' : 'Detailed View'}
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={resetDemo}
            disabled={animating}
            className="text-xs"
          >
            <RefreshCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
        </div>
        
        {/* Main visualization area */}
        <div className="bg-white/80 rounded-lg p-4 relative min-h-[400px] border border-primary/10">
          {/* Network visualization */}
          <div className="relative w-full h-[350px]">
            {/* Connection paths */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Draw paths for completed transactions */}
              {completedPaths.map(pathId => {
                const [sourceId, targetId] = pathId.split('-');
                const paths = getPath(sourceId as ChainType, targetId as ChainType);
                return (
                  <g key={pathId}>
                    <path 
                      d={paths.path1} 
                      stroke="#4a6fa5" 
                      strokeWidth="1.5" 
                      fill="none" 
                      strokeDasharray="1,1"
                      className="opacity-40"
                    />
                    <path 
                      d={paths.path2} 
                      stroke="#4a6fa5" 
                      strokeWidth="1.5" 
                      fill="none" 
                      strokeDasharray="1,1"
                      className="opacity-40"
                    />
                  </g>
                );
              })}
              
              {/* Draw active transaction path */}
              {activePath && selectedSource && selectedTarget && (
                <g>
                  <path 
                    d={getPath(selectedSource, selectedTarget).path1} 
                    stroke="#4a6fa5" 
                    strokeWidth="2" 
                    fill="none"
                    className={`${transactionDetails?.currentStep === 1 ? 'animate-pulse' : ''}`}
                    strokeDasharray={transactionDetails?.currentStep && transactionDetails.currentStep >= 1 ? "none" : "2,2"}
                    strokeOpacity={transactionDetails?.currentStep && transactionDetails.currentStep >= 1 ? "1" : "0.6"}
                  />
                  <path 
                    d={getPath(selectedSource, selectedTarget).path2} 
                    stroke="#4a6fa5" 
                    strokeWidth="2" 
                    fill="none"
                    className={`${transactionDetails?.currentStep === 2 ? 'animate-pulse' : ''}`}
                    strokeDasharray={transactionDetails?.currentStep && transactionDetails.currentStep >= 2 ? "none" : "2,2"}
                    strokeOpacity={transactionDetails?.currentStep && transactionDetails.currentStep >= 2 ? "1" : "0.3"}
                  />
                  
                  {/* Animated transaction pulse */}
                  {transactionDetails?.currentStep === 1 && (
                    <circle r="2" fill="#4a6fa5" className="animate-ping">
                      <animateMotion 
                        dur="1.5s" 
                        repeatCount="indefinite"
                        path={getPath(selectedSource, selectedTarget).path1}
                      />
                    </circle>
                  )}
                  
                  {transactionDetails?.currentStep === 2 && (
                    <circle r="2" fill="#4a6fa5" className="animate-ping">
                      <animateMotion 
                        dur="1.5s" 
                        repeatCount="indefinite"
                        path={getPath(selectedSource, selectedTarget).path2}
                      />
                    </circle>
                  )}
                </g>
              )}
            </svg>
            
            {/* Blockchain nodes */}
            {chains.map(chain => (
              <div
                key={chain.id}
                className={`absolute transition-all duration-300 ease-in-out flex flex-col items-center cursor-pointer
                  ${selectedSource === chain.id ? 'scale-110 z-20' : ''}
                  ${selectedTarget === chain.id ? 'scale-110 z-20' : ''}
                  ${animating && (selectedSource !== chain.id && selectedTarget !== chain.id) ? 'opacity-50' : ''}
                `}
                style={{
                  left: `${chain.position.x}%`,
                  top: `${chain.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => handleChainClick(chain.id)}
              >
                <div className={`p-3 rounded-full ${selectedSource === chain.id || selectedTarget === chain.id ? 'bg-primary/10' : 'hover:bg-primary/5'}`}>
                  {chain.icon}
                </div>
                <div className="text-sm font-medium mt-1">{chain.name}</div>
                
                {visualizationMode === 'advanced' && (selectedSource === chain.id || selectedTarget === chain.id) && (
                  <div className="mt-1 px-2 py-1 bg-white/80 rounded-md shadow-sm border border-primary/10 text-xs">
                    <div className="text-xs text-gray-500">{chain.consensus}</div>
                    <div className="text-xs text-gray-500">{chain.transactionSpeed}</div>
                  </div>
                )}
              </div>
            ))}
            
            {/* PeoChain in the center */}
            <div
              className={`absolute transition-all duration-300 ease-in-out flex flex-col items-center
                ${animating ? 'scale-110 z-20 bg-primary/10 rounded-full p-3' : 'p-3'}
              `}
              style={{
                left: `${peoChain.position.x}%`,
                top: `${peoChain.position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="flex items-center justify-center h-12 w-12 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-md">
                {getTransactionIcon()}
              </div>
              <div className="text-sm font-semibold mt-1 text-primary">{peoChain.name}</div>
              
              {animating && (
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 animate-pulse">
                  <div className="px-2 py-1 bg-primary text-white text-xs rounded-md whitespace-nowrap">
                    Processing...
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Transaction details display */}
          {transactionDetails && (
            <div className="mt-4 p-3 rounded-lg border border-primary/10 bg-white/80">
              <h4 className="text-sm font-semibold">{transactionDetails.title}</h4>
              <p className="text-xs text-gray-600 mt-1">{transactionDetails.description}</p>
              
              <div className="mt-2 space-y-2">
                {transactionDetails.steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`text-xs flex items-start gap-2 ${
                      transactionDetails.currentStep >= index + 1 
                        ? 'text-gray-800' 
                        : 'text-gray-400'
                    }`}
                  >
                    <div className={`mt-0.5 h-3 w-3 rounded-full flex items-center justify-center ${
                      transactionDetails.currentStep === index + 1 
                        ? 'bg-primary animate-pulse' 
                        : transactionDetails.currentStep > index + 1 
                          ? 'bg-green-500' 
                          : 'bg-gray-200'
                    }`}>
                      {transactionDetails.currentStep > index + 1 && (
                        <Check className="h-2 w-2 text-white" />
                      )}
                    </div>
                    <div>{step}</div>
                  </div>
                ))}
              </div>
              
              {visualizationMode === 'advanced' && transactionDetails.technicalDetails && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="text-xs font-medium text-gray-500">Technical Details:</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {transactionDetails.technicalDetails.map((detail, index) => (
                      <TechTooltip key={index} content="Technical detail used in the cross-chain protocol">
                        <Badge variant="outline" className="text-xs bg-gray-100">
                          {detail}
                        </Badge>
                      </TechTooltip>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Transaction metrics */}
              {metrics && transactionDetails.currentStep > 0 && (
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Activity className="h-3 w-3" />
                      <span>Time to Finality</span>
                    </div>
                    <div className="font-medium">{metrics.timeToFinality}</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Database className="h-3 w-3" />
                      <span>Est. Fee</span>
                    </div>
                    <div className="font-medium">{metrics.estimatedFee}</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="flex items-center gap-1 text-gray-500">
                      {getSecurityIcon(metrics.securityLevel)}
                      <span>Security</span>
                    </div>
                    <div className="font-medium">{metrics.securityLevel}</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="flex items-center gap-1 text-gray-500">
                      {getCarbonIcon(metrics.carbonImpact)}
                      <span>Carbon Impact</span>
                    </div>
                    <div className="font-medium">{metrics.carbonImpact}</div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* PeoChain capabilities */}
          {!transactionDetails && !animating && (
            <div className="mt-4 p-3 bg-blue-50/80 rounded-lg border border-primary/10">
              <h4 className="text-sm font-semibold text-primary">PeoChain Layer-0 Protocol</h4>
              <p className="text-xs text-gray-600 mt-1">
                A next-generation blockchain interoperability solution enabling seamless cross-chain communication
              </p>
              <div className="mt-2">
                <div className="text-xs font-medium text-gray-700">Key Capabilities:</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {peoChain.capabilities.map((cap, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-primary/5 border-primary/20">
                      {cap}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-6 bg-white/50 rounded-lg p-4 border border-primary/10">
        <h4 className="text-sm font-medium mb-2">How to use this demo:</h4>
        <ol className="text-sm space-y-1 list-decimal pl-4">
          <li>Select a transaction type from the options above</li>
          <li>Click on a source blockchain (Ethereum, Polkadot, etc.)</li>
          <li>Click on a destination blockchain to see the transaction flow through PeoChain</li>
          <li>Toggle between Standard and Technical views for different detail levels</li>
        </ol>
        <p className="text-sm mt-2">
          PeoChain serves as a next-generation interoperability layer that facilitates seamless interaction between different blockchain ecosystems,
          enabling unified liquidity, cross-chain applications, and quantum-resistant security for the Web3 future.
        </p>
      </div>
    </div>
  );
}