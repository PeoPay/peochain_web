import React, { useState, useEffect, useRef } from 'react';
import { SiEthereum, SiPolkadot, SiCoinbase, SiBitcoin } from "react-icons/si";
import { 
  Send, 
  Shield, 
  FolderClosed, 
  ArrowRightLeft,
  Globe, 
  Repeat, 
  Zap, 
  LockKeyhole,
  Code,
  ChevronRight, 
  ChevronLeft,
  Check,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TechTooltip } from '@/components/ui/tech-tooltip';
import { Progress } from '@/components/ui/progress';

// Define the types of cross-chain transactions we can demonstrate
type TransactionType = 'asset' | 'data' | 'smart-contract';
type ChainType = 'ethereum' | 'polkadot' | 'cosmos' | 'bitcoin';
type TransactionStatus = 'pending' | 'processing' | 'completed' | 'failed';

interface ChainInfo {
  id: ChainType;
  name: string;
  icon: React.ReactNode;
  color: string;
  angle?: number; // For radial positioning
  description: string;
  tps: number; // Transactions per second
}

interface TechAdvantage {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  comparison: {
    peochain: string;
    others: string;
  };
}

export default function EnhancedCrossChainVisualization() {
  // Core states for the visualization
  const [activeDemo, setActiveDemo] = useState<TransactionType>('asset');
  const [animating, setAnimating] = useState(false);
  const [selectedSource, setSelectedSource] = useState<ChainType | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<ChainType | null>(null);
  const [completedPaths, setCompletedPaths] = useState<string[]>([]);
  const [activePath, setActivePath] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showStepByStep, setShowStepByStep] = useState(false);
  const [transactionSpeed, setTransactionSpeed] = useState(1); // Normal speed multiplier
  const [hoverChain, setHoverChain] = useState<ChainType | null>(null);
  const [activeTechAdvantage, setActiveTechAdvantage] = useState<string | null>(null);
  const [totalProgress, setTotalProgress] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>('pending');
  
  // Refs
  const visualizationRef = useRef<HTMLDivElement>(null);
  
  // Define the blockchain networks to display in a radial layout
  const chains: ChainInfo[] = [
    { 
      id: 'ethereum', 
      name: 'Ethereum', 
      icon: <SiEthereum className="h-8 w-8" />, 
      color: '#627EEA',
      angle: 45, // Top right
      description: 'Smart contract platform with EVM compatibility',
      tps: 15
    },
    { 
      id: 'polkadot', 
      name: 'Polkadot', 
      icon: <SiPolkadot className="h-8 w-8" />, 
      color: '#E6007A',
      angle: 135, // Bottom right
      description: 'Multi-chain platform with parachain architecture',
      tps: 1000
    },
    { 
      id: 'cosmos', 
      name: 'Cosmos', 
      icon: <Globe className="h-8 w-8" />, 
      color: '#2E3148',
      angle: 225, // Bottom left
      description: 'Interoperable ecosystem of independent blockchains',
      tps: 10000
    },
    { 
      id: 'bitcoin', 
      name: 'Bitcoin', 
      icon: <SiBitcoin className="h-8 w-8" />, 
      color: '#F7931A',
      angle: 315, // Top left
      description: 'First and largest cryptocurrency network',
      tps: 7
    }
  ];
  
  // PeoChain is positioned in the center
  const peoChain = {
    name: 'PeoChain',
    radius: 70, // Center circle radius
    color: '#1c824a',
    tps: 100000
  };

  // Define technical advantages to showcase
  const techAdvantages: TechAdvantage[] = [
    {
      id: 'ultra-fast-finality',
      title: 'Ultra-Fast Finality',
      icon: <Zap className="h-6 w-6" />,
      description: 'PeoChain achieves transaction finality in under 2 seconds across any connected blockchain through parallel subnet processing.',
      comparison: {
        peochain: '<2 seconds finality',
        others: '10-60 minutes on most chains'
      }
    },
    {
      id: 'quantum-resistant',
      title: 'Quantum-Resistant Security',
      icon: <LockKeyhole className="h-6 w-6" />,
      description: 'Post-quantum cryptographic algorithms protect against future quantum computing attacks while maintaining compatibility with existing blockchain systems.',
      comparison: {
        peochain: 'Post-quantum encryption',
        others: 'Vulnerable to quantum attacks'
      }
    },
    {
      id: 'universal-api',
      title: 'Universal API Access',
      icon: <Code className="h-6 w-6" />,
      description: 'A single API interface provides seamless access to all connected blockchain networks, dramatically simplifying cross-chain development.',
      comparison: {
        peochain: 'One API for all chains',
        others: 'Separate integration for each chain'
      }
    }
  ];
  
  // Transaction demonstration types
  const demonstrations = [
    { 
      id: 'asset' as TransactionType, 
      name: 'Asset Transfer', 
      icon: <Send className="h-5 w-5" />, 
      description: 'Send tokens and assets between blockchains'
    },
    { 
      id: 'data' as TransactionType, 
      name: 'Data Exchange', 
      icon: <ArrowRightLeft className="h-5 w-5" />, 
      description: 'Securely share data and state between chains'
    },
    { 
      id: 'smart-contract' as TransactionType, 
      name: 'Cross-Chain Contracts', 
      icon: <FolderClosed className="h-5 w-5" />, 
      description: 'Execute smart contracts across multiple blockchains'
    }
  ];

  // Calculate positions based on radius and angle
  const getPositionFromAngle = (angle: number, radius: number, centerX = 50, centerY = 50) => {
    const angleInRadians = (angle * Math.PI) / 180;
    const x = centerX + radius * Math.cos(angleInRadians);
    const y = centerY + radius * Math.sin(angleInRadians);
    return { x, y };
  };
  
  // Get chain positions for the radial layout
  const getChainPosition = (chain: ChainInfo) => {
    const radius = 35; // Distance from center as percentage of container
    return getPositionFromAngle(chain.angle || 0, radius);
  };
  
  // Handle selecting a chain as source or target
  const handleChainClick = (chainId: ChainType) => {
    if (animating) return;
    
    if (!selectedSource) {
      setSelectedSource(chainId);
      setTransactionStatus('pending');
      setTotalProgress(25);
    } else if (selectedSource === chainId) {
      setSelectedSource(null);
      setTransactionStatus('pending');
      setTotalProgress(0);
    } else if (!selectedTarget) {
      setSelectedTarget(chainId);
      setTransactionStatus('processing');
      setTotalProgress(50);
      simulateTransaction(selectedSource, chainId);
    } else {
      setSelectedSource(chainId);
      setSelectedTarget(null);
      setTransactionStatus('pending');
      setTotalProgress(25);
    }
  };
  
  // State for transaction details
  const [transactionDetails, setTransactionDetails] = useState<{
    title: string;
    description: string;
    steps: string[];
    currentStep: number;
    estimatedTime: number;
    startTime?: number;
    endTime?: number;
  } | null>(null);
  
  // Update progress based on simulation steps
  useEffect(() => {
    if (transactionDetails && transactionDetails.currentStep > 0) {
      const stepProgress = transactionDetails.currentStep / transactionDetails.steps.length;
      setTotalProgress(50 + Math.round(stepProgress * 50));
      
      if (transactionDetails.currentStep >= transactionDetails.steps.length) {
        setTransactionStatus('completed');
      }
    }
  }, [transactionDetails?.currentStep]);
  
  // Simulate transaction animation with step-by-step option
  const simulateTransaction = async (source: ChainType, target: ChainType) => {
    const pathId = `${source}-${target}-${activeDemo}`;
    setActivePath(pathId);
    setAnimating(true);
    
    // Get transaction details
    const details = getTransactionDetails(source, target);
    setTransactionDetails({
      ...details,
      currentStep: 0,
      startTime: Date.now()
    });
    
    if (showStepByStep) {
      // In step-by-step mode, we wait for user interaction to progress
      setActiveStep(0);
    } else {
      // In automatic mode, we animate through all steps
      await animateSteps(details.steps.length);
    }
  };
  
  // Animate through transaction steps
  const animateSteps = async (totalSteps: number) => {
    // Step 1: Source blockchain initiation
    await new Promise(resolve => setTimeout(resolve, 1000 / transactionSpeed));
    setTransactionDetails(prev => prev ? { ...prev, currentStep: 1 } : null);
    
    // Step 2: PeoChain processing (might have multiple sub-steps)
    await new Promise(resolve => setTimeout(resolve, 1500 / transactionSpeed));
    setTransactionDetails(prev => prev ? { ...prev, currentStep: 2 } : null);
    
    // Step 3: Destination blockchain confirmation
    await new Promise(resolve => setTimeout(resolve, 1500 / transactionSpeed));
    setTransactionDetails(prev => prev ? { 
      ...prev, 
      currentStep: 3,
      endTime: Date.now() 
    } : null);
    
    // Mark path as completed
    setCompletedPaths(prev => [...prev, `${selectedSource}-${selectedTarget}-${activeDemo}`]);
    setActivePath(null);
    
    // Keep details visible but clear animation state
    setAnimating(false);
    
    // Don't reset automatically in step-by-step mode
    if (!showStepByStep) {
      // Reset selections after a delay
      setTimeout(() => {
        setSelectedSource(null);
        setSelectedTarget(null);
        setTransactionDetails(null);
        setTotalProgress(0);
      }, 5000 / transactionSpeed);
    }
  };
  
  // Manual step progression for step-by-step mode
  const goToNextStep = () => {
    if (!transactionDetails) return;
    
    const nextStep = transactionDetails.currentStep + 1;
    if (nextStep <= transactionDetails.steps.length) {
      setTransactionDetails({
        ...transactionDetails,
        currentStep: nextStep,
        ...(nextStep === transactionDetails.steps.length ? { endTime: Date.now() } : {})
      });
      
      // If we've reached the last step, complete the transaction
      if (nextStep === transactionDetails.steps.length) {
        setCompletedPaths([...completedPaths, `${selectedSource}-${selectedTarget}-${activeDemo}`]);
        setActivePath(null);
        setAnimating(false);
        setTransactionStatus('completed');
      }
    }
  };
  
  const goToPrevStep = () => {
    if (!transactionDetails || transactionDetails.currentStep <= 0) return;
    
    setTransactionDetails({
      ...transactionDetails,
      currentStep: transactionDetails.currentStep - 1
    });
    
    // If we're moving back from completed state
    if (transactionDetails.currentStep === transactionDetails.steps.length) {
      setActivePath(`${selectedSource}-${selectedTarget}-${activeDemo}`);
      setAnimating(true);
      setTransactionStatus('processing');
    }
  };
  
  // Reset the demonstration
  const resetDemo = () => {
    setSelectedSource(null);
    setSelectedTarget(null);
    setActivePath(null);
    setCompletedPaths([]);
    setAnimating(false);
    setTransactionDetails(null);
    setActiveStep(0);
    setTotalProgress(0);
    setTransactionStatus('pending');
    setActiveTechAdvantage(null);
  };
  
  // Get transaction icon based on type
  const getTransactionIcon = () => {
    switch (activeDemo) {
      case 'asset':
        return <Send className="h-4 w-4 text-white" />;
      case 'data':
        return <ArrowRightLeft className="h-4 w-4 text-white" />;
      case 'smart-contract':
        return <FolderClosed className="h-4 w-4 text-white" />;
      default:
        return <Send className="h-4 w-4 text-white" />;
    }
  };
  
  // Get transaction details for display
  const getTransactionDetails = (source: ChainType, target: ChainType) => {
    const sourceChain = chains.find(c => c.id === source)!;
    const targetChain = chains.find(c => c.id === target)!;
    
    const baseTime = (
      (sourceChain.tps < 100 ? 30 : sourceChain.tps < 1000 ? 10 : 2) + 
      (targetChain.tps < 100 ? 30 : targetChain.tps < 1000 ? 10 : 2)
    );
    
    const peoChainTime = 2; // Fixed 2 seconds for PeoChain
    const totalEstimatedTime = baseTime + peoChainTime;
    
    switch (activeDemo) {
      case 'asset':
        return {
          title: `Asset Transfer: ${sourceChain.name} → ${targetChain.name}`,
          description: `Transferring tokenized assets from ${sourceChain.name} to ${targetChain.name} via PeoChain's secure bridge protocol.`,
          steps: [
            "Asset locked in source chain smart contract",
            "PeoChain validators verify transaction",
            "Equivalent assets minted on destination chain",
            "Transaction finality confirmed across networks"
          ],
          estimatedTime: totalEstimatedTime
        };
      case 'data':
        return {
          title: `Data Exchange: ${sourceChain.name} → ${targetChain.name}`,
          description: `Securely transmitting verified state data from ${sourceChain.name} to ${targetChain.name} with cryptographic proof.`,
          steps: [
            "Data cryptographically committed on source chain",
            "PeoChain validates data integrity across subnets",
            "State update propagated to destination chain",
            "Cross-chain consistency verification complete"
          ],
          estimatedTime: totalEstimatedTime
        };
      case 'smart-contract':
        return {
          title: `Cross-Chain Contract: ${sourceChain.name} → ${targetChain.name}`,
          description: `Executing a smart contract that spans ${sourceChain.name} and ${targetChain.name} chains simultaneously.`,
          steps: [
            "Contract execution triggered on source chain",
            "PeoChain propagates function calls across networks",
            "Smart contract logic executed on destination chain",
            "Synchronized execution completed on all chains"
          ],
          estimatedTime: totalEstimatedTime * 1.5 // Smart contracts take longer
        };
      default:
        return {
          title: `Transaction: ${sourceChain.name} → ${targetChain.name}`,
          description: "Processing cross-chain transaction...",
          steps: [],
          estimatedTime: totalEstimatedTime
        };
    }
  };
  
  // Get appropriate tooltip content based on transaction type
  const getTooltipContent = (type: TransactionType) => {
    switch (type) {
      case 'asset':
        return (
          <div>
            <h5 className="font-semibold mb-1">Cross-Chain Asset Transfer</h5>
            <p className="text-sm">PeoChain enables seamless asset transfers between different blockchains, maintaining security and preventing double-spending.</p>
            <ul className="text-xs mt-2 space-y-1 list-disc pl-4">
              <li>Wrapped tokens for cross-chain compatibility</li>
              <li>Atomic swaps for trustless exchanges</li>
              <li>Unified liquidity pools across chains</li>
            </ul>
          </div>
        );
      case 'data':
        return (
          <div>
            <h5 className="font-semibold mb-1">Cross-Chain Data Exchange</h5>
            <p className="text-sm">Share data and state information between different blockchain networks while maintaining data integrity and security.</p>
            <ul className="text-xs mt-2 space-y-1 list-disc pl-4">
              <li>Oracle networks validate cross-chain data</li>
              <li>Zero-knowledge proofs ensure privacy</li>
              <li>Subnet validators verify data consistency</li>
            </ul>
          </div>
        );
      case 'smart-contract':
        return (
          <div>
            <h5 className="font-semibold mb-1">Cross-Chain Smart Contracts</h5>
            <p className="text-sm">Execute smart contracts that can interact with multiple blockchain environments simultaneously.</p>
            <ul className="text-xs mt-2 space-y-1 list-disc pl-4">
              <li>Cross-chain contract triggers and events</li>
              <li>Multi-chain financial applications</li>
              <li>Interoperable DApps ecosystem</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Generate instructions based on selected state
  const getInstructions = () => {
    if (selectedSource && selectedTarget) {
      const chain1 = chains.find(c => c.id === selectedSource)?.name;
      const chain2 = chains.find(c => c.id === selectedTarget)?.name;
      return `Transferring from ${chain1} to ${chain2}...`;
    } else if (selectedSource) {
      const chain = chains.find(c => c.id === selectedSource)?.name;
      return `Select a destination blockchain to receive from ${chain}`;
    } else {
      return 'Select a source blockchain to begin';
    }
  };

  // Get status indicator based on current transaction state
  const getStatusIndicator = () => {
    switch (transactionStatus) {
      case 'pending':
        return (
          <div className="flex items-center text-yellow-500">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">Waiting for transaction initiation</span>
          </div>
        );
      case 'processing':
        return (
          <div className="flex items-center text-blue-500 animate-pulse">
            <span className="h-2 w-2 bg-blue-500 rounded-full mr-1"></span>
            <span className="text-sm">Processing transaction</span>
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center text-green-500">
            <Check className="h-4 w-4 mr-1" />
            <span className="text-sm">Transaction completed successfully</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center text-red-500">
            <AlertTriangle className="h-4 w-4 mr-1" />
            <span className="text-sm">Transaction failed</span>
          </div>
        );
    }
  };
  
  // Display chain details when hovering over a chain node
  const ChainInfoTooltip = ({ chain }: { chain: ChainInfo }) => (
    <div className="p-3 max-w-[250px]">
      <h5 className="font-semibold mb-1 flex items-center">
        <span style={{ color: chain.color }} className="mr-2">{chain.icon}</span>
        {chain.name}
      </h5>
      <p className="text-sm mb-2">{chain.description}</p>
      <div className="text-xs text-gray-500 space-y-1">
        <div className="flex justify-between">
          <span>Transaction Speed:</span>
          <span className="font-medium">{chain.tps} TPS</span>
        </div>
      </div>
    </div>
  );

  // Toggle the technical advantage cards
  const toggleTechAdvantage = (id: string) => {
    setActiveTechAdvantage(activeTechAdvantage === id ? null : id);
  };

  // Calculate transaction time
  const getTransactionTime = () => {
    if (!transactionDetails || !transactionDetails.endTime || !transactionDetails.startTime) {
      return `Est. ${transactionDetails?.estimatedTime || '?'} seconds`;
    }
    
    const actualTime = (transactionDetails.endTime - transactionDetails.startTime) / 1000;
    return `Completed in ${actualTime.toFixed(1)} seconds`;
  };
  
  return (
    <div className="enhanced-cross-chain-visualization" ref={visualizationRef}>
      <div className="mb-6 text-center">
        <h3 className="font-semibold text-xl mb-2 text-primary">Cross-Chain Integration</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Experience how PeoChain connects with major blockchain networks to enable seamless cross-chain operations.
        </p>
      </div>
      
      {/* Demo type selection */}
      <div className="flex flex-wrap justify-center mb-6">
        <div className="inline-flex bg-primary/10 rounded-full p-1 mb-2">
          {demonstrations.map((demo) => (
            <Button
              key={demo.id}
              variant={activeDemo === demo.id ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                setActiveDemo(demo.id);
                resetDemo();
              }}
              className={`rounded-full px-4 ${activeDemo === demo.id ? "" : "bg-transparent hover:bg-primary/10"}`}
            >
              <div className="flex items-center">
                {demo.icon}
                <span className="ml-2">{demo.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Transaction status and progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          {getStatusIndicator()}
          <span className="text-xs text-gray-500">
            {transactionDetails ? getTransactionTime() : 'Select chains to begin'}
          </span>
        </div>
        <Progress value={totalProgress} />
      </div>
      
      {/* Visualization area */}
      <div className="relative glass rounded-xl p-6 aspect-[3/2] w-full mb-4 overflow-hidden">
        {/* Instructions */}
        <div className="absolute top-2 left-0 right-0 text-center text-sm font-medium">
          {getInstructions()}
        </div>
        
        {/* Demo info */}
        <div className="absolute top-2 right-2 z-20">
          <TechTooltip
            content={getTooltipContent(activeDemo)}
            expanded={true}
            icon={true}
          >
            <span className="text-sm text-primary font-medium">How it works</span>
          </TechTooltip>
        </div>
        
        {/* Step by step toggle */}
        <div className="absolute top-2 left-3 z-20 flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs px-2 h-7"
            onClick={() => setShowStepByStep(!showStepByStep)}
          >
            {showStepByStep ? 'Auto Play' : 'Step-by-Step'} 
            <span className={`ml-2 w-8 h-4 rounded-full transition-colors ${showStepByStep ? 'bg-primary' : 'bg-gray-300'} relative`}>
              <span
                className={`absolute top-0.5 left-0.5 bg-white w-3 h-3 rounded-full transition-transform ${
                  showStepByStep ? 'translate-x-4' : ''
                }`}
              />
            </span>
          </Button>
        </div>

        {/* Radial gradient background for the visualization */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent1-light to-accent2-light opacity-30 rounded-xl"></div>

        {/* Render PeoChain Hub in the center */}
        <div 
          className="absolute bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg z-10 transition-all duration-500"
          style={{
            left: '50%',
            top: '50%',
            width: `${peoChain.radius * 2}px`,
            height: `${peoChain.radius * 2}px`,
            transform: 'translate(-50%, -50%)',
            boxShadow: activePath ? '0 0 30px rgba(28, 130, 74, 0.4)' : ''
          }}
        >
          <div className="text-center">
            <div className={`bg-primary rounded-full w-16 h-16 mx-auto mb-2 flex items-center justify-center transition-all duration-300 ${activePath ? 'animate-pulse' : ''}`}>
              <Shield className="text-white h-8 w-8" />
            </div>
            <div className="font-bold text-primary text-lg">PeoChain</div>
            <div className="text-xs text-primary/70 mb-1">Cross-Chain Hub</div>
            <div className="text-xs bg-primary/20 rounded-full px-2 py-0.5 font-medium text-primary">
              100,000+ TPS
            </div>
          </div>
        </div>
        
        {/* Radial lines connecting PeoChain to each blockchain */}
        {chains.map((chain) => {
          const position = getChainPosition(chain);
          
          // Calculate the path from PeoChain to the blockchain
          const dx = 50 - position.x;
          const dy = 50 - position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Adjust start and end points to account for the node sizes
          const peoRadius = peoChain.radius / visualizationRef.current?.clientWidth! * 100 || 10;
          const chainRadius = 40 / visualizationRef.current?.clientWidth! * 100 || 5;
          
          const ratio1 = peoRadius / distance;
          const ratio2 = (distance - chainRadius) / distance;
          
          const x1 = 50 - dx * ratio1;
          const y1 = 50 - dy * ratio1;
          
          const x2 = 50 - dx * ratio2;
          const y2 = 50 - dy * ratio2;
          
          // Generate path string
          const path = `M ${x1} ${y1} L ${x2} ${y2}`;
          
          // Determine if this path is active in the current transaction
          const isActivePath = (selectedSource === chain.id && !selectedTarget) ||
                              (selectedTarget === chain.id && selectedSource) ||
                              activePath === `${selectedSource}-${chain.id}-${activeDemo}` ||
                              activePath === `${chain.id}-${selectedTarget}-${activeDemo}`;
                              
          // Check if this path has been completed
          const isCompletedPath = completedPaths.includes(`${selectedSource}-${chain.id}-${activeDemo}`) ||
                                 completedPaths.includes(`${chain.id}-${selectedTarget}-${activeDemo}`);
          
          return (
            <svg 
              key={`line-${chain.id}`}
              className="absolute top-0 left-0 w-full h-full"
              style={{ zIndex: 5 }}
            >
              <defs>
                <marker
                  id={`arrowhead-${chain.id}`}
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon 
                    points="0 0, 10 3.5, 0 7" 
                    fill={isActivePath ? peoChain.color : "#CCCCCC"} 
                  />
                </marker>
                {/* Define gradient for active paths */}
                <linearGradient id={`gradient-${chain.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={peoChain.color} />
                  <stop offset="100%" stopColor={chain.color} />
                </linearGradient>
              </defs>
              <path
                d={path}
                stroke={isCompletedPath ? "#22C55E" : (isActivePath ? `url(#gradient-${chain.id})` : "#CCCCCC")}
                strokeWidth={isActivePath || isCompletedPath ? "3" : "2"}
                strokeDasharray={isActivePath ? "5,5" : "none"}
                fill="none"
                markerEnd={`url(#arrowhead-${chain.id})`}
                className={isActivePath ? "animate-pulse" : ""}
              />
              
              {/* Animated transaction if this path is active */}
              {activePath === `${selectedSource}-${chain.id}-${activeDemo}` && (
                <>
                  <circle
                    cx={50}
                    cy={50}
                    r="8"
                    fill={peoChain.color}
                    className="animate-ping opacity-30"
                  />
                  <foreignObject
                    x={x1 + (x2 - x1) * 0.6 - 14}
                    y={y1 + (y2 - y1) * 0.6 - 14}
                    width="28"
                    height="28"
                    className="animate-pulse"
                  >
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-primary to-accent2 rounded-full">
                      {getTransactionIcon()}
                    </div>
                  </foreignObject>
                </>
              )}
            </svg>
          );
        })}
        
        {/* Render blockchain nodes in radial layout */}
        {chains.map((chain) => {
          const position = getChainPosition(chain);
          const isSelected = selectedSource === chain.id || selectedTarget === chain.id;
          const isHovered = hoverChain === chain.id;
          
          return (
            <div
              key={chain.id}
              className={`absolute bg-white border-2 rounded-full flex flex-col items-center justify-center shadow-md cursor-pointer transition-all duration-300 ${
                isSelected ? 'z-20' : 'z-10'
              } ${isHovered ? 'translate-y-[-8px]' : ''}`}
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                width: isSelected ? '100px' : '80px',
                height: isSelected ? '100px' : '80px',
                transform: 'translate(-50%, -50%)',
                borderColor: isSelected || isHovered ? chain.color : '#e5e7eb',
                boxShadow: isSelected ? `0 0 0 4px ${chain.color}33` : (isHovered ? `0 8px 16px ${chain.color}33` : '')
              }}
              onClick={() => handleChainClick(chain.id)}
              onMouseEnter={() => setHoverChain(chain.id)}
              onMouseLeave={() => setHoverChain(null)}
            >
              <TechTooltip content={<ChainInfoTooltip chain={chain} />} expanded={false}>
                <div className="text-center p-1">
                  <div style={{ color: chain.color }} className="mb-1">
                    {chain.icon}
                  </div>
                  <div className="text-xs font-medium">{chain.name}</div>
                  {isSelected && (
                    <div className="text-[10px] mt-1 text-gray-500">{chain.tps} TPS</div>
                  )}
                </div>
              </TechTooltip>
            </div>
          );
        })}
      </div>
      
      {/* Transaction details panel - shown during and after animation */}
      {transactionDetails && (
        <div className="glass p-4 mb-4 border border-primary/20 shadow-md rounded-xl">
          <h4 className="font-semibold text-primary text-base mb-2">{transactionDetails.title}</h4>
          <p className="text-sm mb-3">{transactionDetails.description}</p>
          
          <div className="space-y-2">
            {transactionDetails.steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex items-start p-2 rounded-md transition-all duration-500 ${
                  index === transactionDetails.currentStep ? 'bg-primary/10 text-primary font-medium' : 
                  index < transactionDetails.currentStep ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                <div className={`flex-shrink-0 h-6 w-6 mr-2 rounded-full flex items-center justify-center text-xs ${
                  index < transactionDetails.currentStep ? 'bg-green-100 text-green-600' : 
                  index === transactionDetails.currentStep ? 'bg-primary/20 text-primary' : 
                  'bg-gray-100 text-gray-400'
                }`}>
                  {index < transactionDetails.currentStep ? <Check className="h-3 w-3" /> : (index + 1)}
                </div>
                <span>{step}</span>
              </div>
            ))}
          </div>
          
          {/* Step-by-step navigation controls */}
          {showStepByStep && (
            <div className="mt-4 flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goToPrevStep}
                disabled={transactionDetails.currentStep <= 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <Button 
                variant="default" 
                size="sm" 
                onClick={goToNextStep}
                disabled={transactionDetails.currentStep >= transactionDetails.steps.length}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}

          {/* Transaction speed control for auto mode */}
          {!showStepByStep && (
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <span className="text-xs">Transaction Speed:</span>
                <select 
                  className="text-xs border rounded px-2 py-1"
                  value={transactionSpeed}
                  onChange={(e) => setTransactionSpeed(Number(e.target.value))}
                  disabled={animating}
                >
                  <option value="0.5">0.5x (Slow)</option>
                  <option value="1">1x (Normal)</option>
                  <option value="2">2x (Fast)</option>
                  <option value="5">5x (Very Fast)</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Technical Advantages */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">PeoChain Technical Advantages:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {techAdvantages.map(advantage => (
            <div 
              key={advantage.id}
              className={`glass p-3 rounded-lg border-l-4 cursor-pointer transition-all ${
                activeTechAdvantage === advantage.id ? 'border-l-primary' : 'border-l-gray-200'
              }`}
              onClick={() => toggleTechAdvantage(advantage.id)}
            >
              <div className="flex items-center">
                <div className="bg-primary/10 p-1 rounded-full mr-2">
                  <div className="text-primary">{advantage.icon}</div>
                </div>
                <h5 className="font-medium text-sm">{advantage.title}</h5>
              </div>
              
              {activeTechAdvantage === advantage.id && (
                <div className="pt-2 mt-2 border-t text-xs">
                  <p className="mb-2">{advantage.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-primary/5 p-2 rounded">
                      <div className="font-medium text-primary mb-1">PeoChain</div>
                      {advantage.comparison.peochain}
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <div className="font-medium text-gray-500 mb-1">Others</div>
                      {advantage.comparison.others}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={resetDemo}
          className="mx-auto"
        >
          <Repeat className="h-4 w-4 mr-2" />
          Reset Demonstration
        </Button>
      </div>
      
      {/* Legend */}
      <div className="mt-6 glass rounded-lg p-4">
        <h4 className="text-sm font-medium mb-2">How to use this demo:</h4>
        <ol className="text-sm space-y-1 list-decimal pl-4">
          <li>Select a transaction type from the options above</li>
          <li>Click on a source blockchain (Ethereum, Polkadot, etc.)</li>
          <li>Click on a destination blockchain to see the transaction flow through PeoChain</li>
          <li>Toggle between automatic and step-by-step mode to control the demonstration</li>
          <li>Click on the technical advantages to learn more about PeoChain's capabilities</li>
        </ol>
        <p className="text-sm mt-2">
          PeoChain acts as a central hub that facilitates seamless interaction between different blockchain ecosystems,
          enabling unified liquidity, cross-chain applications, and interoperable smart contracts.
        </p>
      </div>
    </div>
  );
}