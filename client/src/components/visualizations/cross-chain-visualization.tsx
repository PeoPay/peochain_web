import React, { useState } from 'react';
import { SiEthereum, SiPolkadot, SiCoinbase, SiBitcoin } from "react-icons/si";
import { Send, Award, Repeat, Globe, Zap, Shield, FolderClosed, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TechTooltip } from '@/components/ui/tech-tooltip';

// Define the types of cross-chain transactions we can demonstrate
type TransactionType = 'asset' | 'data' | 'smart-contract';
type ChainType = 'ethereum' | 'polkadot' | 'cosmos' | 'bitcoin';

interface ChainInfo {
  id: ChainType;
  name: string;
  icon: React.ReactNode;
  color: string;
  position: { x: number; y: number };
}

export default function CrossChainVisualization() {
  const [activeDemo, setActiveDemo] = useState<TransactionType>('asset');
  const [animating, setAnimating] = useState(false);
  const [selectedSource, setSelectedSource] = useState<ChainType | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<ChainType | null>(null);
  const [completedPaths, setCompletedPaths] = useState<string[]>([]);
  const [activePath, setActivePath] = useState<string | null>(null);
  
  // Define the blockchain networks to display
  const chains: ChainInfo[] = [
    { 
      id: 'ethereum', 
      name: 'Ethereum', 
      icon: <SiEthereum className="h-8 w-8" />, 
      color: '#627EEA', 
      position: { x: 20, y: 30 }
    },
    { 
      id: 'polkadot', 
      name: 'Polkadot', 
      icon: <SiPolkadot className="h-8 w-8" />, 
      color: '#E6007A', 
      position: { x: 80, y: 30 }
    },
    { 
      id: 'cosmos', 
      name: 'Cosmos', 
      icon: <Globe className="h-8 w-8" />, 
      color: '#2E3148', 
      position: { x: 20, y: 70 }
    },
    { 
      id: 'bitcoin', 
      name: 'Bitcoin', 
      icon: <SiBitcoin className="h-8 w-8" />, 
      color: '#F7931A', 
      position: { x: 80, y: 70 }
    }
  ];
  
  // PeoChain is positioned in the center
  const peoChain = {
    name: 'PeoChain',
    position: { x: 50, y: 50 },
    color: '#4a6fa5'
  };
  
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
  } | null>(null);
  
  // Simulate transaction animation
  const simulateTransaction = async (source: ChainType, target: ChainType) => {
    const pathId = `${source}-${target}-${activeDemo}`;
    setActivePath(pathId);
    setAnimating(true);
    
    // Get transaction details
    const details = getTransactionDetails(source, target);
    setTransactionDetails({
      ...details,
      currentStep: 0
    });
    
    // Step 1: Source blockchain initiation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTransactionDetails(prev => prev ? { ...prev, currentStep: 1 } : null);
    
    // Step 2: PeoChain processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTransactionDetails(prev => prev ? { ...prev, currentStep: 2 } : null);
    
    // Step 3: Destination blockchain confirmation
    await new Promise(resolve => setTimeout(resolve, 1500));
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
    }, 3000);
  };
  
  // Reset the demonstration
  const resetDemo = () => {
    setSelectedSource(null);
    setSelectedTarget(null);
    setActivePath(null);
    setCompletedPaths([]);
    setAnimating(false);
    setTransactionDetails(null);
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
    
    switch (activeDemo) {
      case 'asset':
        return {
          title: `Asset Transfer: ${sourceChain.name} → ${targetChain.name}`,
          description: `Transferring tokenized assets from ${sourceChain.name} to ${targetChain.name} via PeoChain's secure bridge protocol.`,
          steps: [
            "1. Asset locked in source chain smart contract",
            "2. PeoChain validators verify transaction",
            "3. Equivalent assets minted on destination chain"
          ]
        };
      case 'data':
        return {
          title: `Data Exchange: ${sourceChain.name} → ${targetChain.name}`,
          description: `Securely transmitting verified state data from ${sourceChain.name} to ${targetChain.name} with cryptographic proof.`,
          steps: [
            "1. Data cryptographically committed on source chain",
            "2. PeoChain validates data integrity across subnets",
            "3. State update confirmed on destination chain"
          ]
        };
      case 'smart-contract':
        return {
          title: `Cross-Chain Contract: ${sourceChain.name} → ${targetChain.name}`,
          description: `Executing a smart contract that spans ${sourceChain.name} and ${targetChain.name} chains simultaneously.`,
          steps: [
            "1. Contract execution triggered on source chain",
            "2. PeoChain propagates function calls across networks",
            "3. Synchronized execution completed on all chains"
          ]
        };
      default:
        return {
          title: `Transaction: ${sourceChain.name} → ${targetChain.name}`,
          description: "Processing cross-chain transaction...",
          steps: []
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
      return `Transferring from ${chains.find(c => c.id === selectedSource)?.name} to ${chains.find(c => c.id === selectedTarget)?.name}...`;
    } else if (selectedSource) {
      return `Select a destination blockchain to receive from ${chains.find(c => c.id === selectedSource)?.name}`;
    } else {
      return 'Select a source blockchain to begin';
    }
  };
  
  return (
    <div className="cross-chain-visualization">
      <div className="mb-6 text-center">
        <h3 className="font-semibold text-xl mb-2 text-primary">Cross-Chain Integration</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Experience how PeoChain connects with major blockchain networks to enable seamless cross-chain operations.
        </p>
      </div>
      
      {/* Demo type selection */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-primary/10 rounded-full p-1">
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
      
      {/* Visualization area */}
      <div className="relative bg-white/80 backdrop-blur rounded-xl p-6 aspect-[3/2] w-full mb-4">
        {/* Instructions */}
        <div className="absolute top-2 left-0 right-0 text-center text-sm font-medium">
          {getInstructions()}
        </div>
        
        {/* Demo info */}
        <div className="absolute top-2 right-2">
          <TechTooltip
            content={getTooltipContent(activeDemo)}
            expanded={true}
            icon={true}
          >
            <span className="text-sm text-primary font-medium">How it works</span>
          </TechTooltip>
        </div>

        {/* Render PeoChain Hub in the center */}
        <div 
          className="absolute bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg z-10"
          style={{
            left: `${peoChain.position.x}%`,
            top: `${peoChain.position.y}%`,
            width: '120px',
            height: '120px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="text-center">
            <div className="bg-primary rounded-full w-12 h-12 mx-auto mb-1 flex items-center justify-center">
              <Shield className="text-white h-6 w-6" />
            </div>
            <div className="font-bold text-primary">PeoChain</div>
            <div className="text-xs text-primary/70">Cross-Chain Hub</div>
          </div>
        </div>
        
        {/* Connection lines from PeoChain to each blockchain */}
        {chains.map((chain) => {
          // Calculate the path from PeoChain to the blockchain
          const dx = peoChain.position.x - chain.position.x;
          const dy = peoChain.position.y - chain.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Adjust start and end points to account for the node sizes
          const peoRadius = 60; // Half of PeoChain hub size
          const chainRadius = 40; // Half of blockchain node size
          
          const ratio1 = peoRadius / distance;
          const ratio2 = (distance - chainRadius) / distance;
          
          const x1 = peoChain.position.x - dx * ratio1;
          const y1 = peoChain.position.y - dy * ratio1;
          
          const x2 = peoChain.position.x - dx * ratio2;
          const y2 = peoChain.position.y - dy * ratio2;
          
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
              </defs>
              <path
                d={path}
                stroke={isCompletedPath ? "#22C55E" : (isActivePath ? peoChain.color : "#CCCCCC")}
                strokeWidth={isActivePath || isCompletedPath ? "3" : "2"}
                strokeDasharray={isActivePath ? "5,5" : "none"}
                fill="none"
                markerEnd={`url(#arrowhead-${chain.id})`}
                className={isActivePath ? "animate-pulse" : ""}
              />
              
              {/* Animated transaction if this path is active */}
              {activePath === `${selectedSource}-${chain.id}-${activeDemo}` && (
                <g className="transaction-particle">
                  <circle
                    cx={peoChain.position.x}
                    cy={peoChain.position.y}
                    r="8"
                    fill={peoChain.color}
                    className="animate-ping"
                  />
                  <foreignObject
                    x={x1 + (x2 - x1) * 0.5 - 10}
                    y={y1 + (y2 - y1) * 0.5 - 10}
                    width="20"
                    height="20"
                    className="animate-pulse"
                  >
                    <div className="h-full w-full flex items-center justify-center bg-primary rounded-full">
                      {getTransactionIcon()}
                    </div>
                  </foreignObject>
                </g>
              )}
            </svg>
          );
        })}
        
        {/* Render blockchain nodes */}
        {chains.map((chain) => (
          <div
            key={chain.id}
            className={`absolute bg-white border-2 rounded-full flex flex-col items-center justify-center shadow-md cursor-pointer transition-all duration-200 ${
              selectedSource === chain.id || selectedTarget === chain.id 
                ? `border-4 shadow-lg` 
                : `border-2 hover:shadow-lg`
            }`}
            style={{
              left: `${chain.position.x}%`,
              top: `${chain.position.y}%`,
              width: '80px',
              height: '80px',
              transform: 'translate(-50%, -50%)',
              borderColor: selectedSource === chain.id || selectedTarget === chain.id 
                ? chain.color 
                : '#e5e7eb',
              boxShadow: selectedSource === chain.id || selectedTarget === chain.id 
                ? `0 0 0 4px ${chain.color}33` 
                : '',
              zIndex: 10
            }}
            onClick={() => handleChainClick(chain.id)}
          >
            <div className="text-center">
              <div style={{ color: chain.color }} className="mb-1">
                {chain.icon}
              </div>
              <div className="text-xs font-medium">{chain.name}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Transaction details panel - shown during and after animation */}
      {transactionDetails && (
        <div className="bg-white/90 backdrop-blur rounded-lg p-4 mb-4 border border-primary/20 shadow-md">
          <h4 className="font-semibold text-primary text-base mb-2">{transactionDetails.title}</h4>
          <p className="text-sm mb-3">{transactionDetails.description}</p>
          
          <div className="space-y-2">
            {transactionDetails.steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex items-start p-2 rounded-md transition-all duration-300 ${
                  index === transactionDetails.currentStep ? 'bg-primary/10 text-primary font-medium' : 
                  index < transactionDetails.currentStep ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                <div className={`flex-shrink-0 h-5 w-5 mr-2 rounded-full flex items-center justify-center text-xs ${
                  index < transactionDetails.currentStep ? 'bg-green-100 text-green-600' : 
                  index === transactionDetails.currentStep ? 'bg-primary/20 text-primary' : 
                  'bg-gray-100 text-gray-400'
                }`}>
                  {index < transactionDetails.currentStep ? '✓' : (index + 1)}
                </div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="text-center">
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
      <div className="mt-6 bg-white/50 rounded-lg p-4">
        <h4 className="text-sm font-medium mb-2">How to use this demo:</h4>
        <ol className="text-sm space-y-1 list-decimal pl-4">
          <li>Select a transaction type from the options above</li>
          <li>Click on a source blockchain (Ethereum, Polkadot, etc.)</li>
          <li>Click on a destination blockchain to see the transaction flow through PeoChain</li>
        </ol>
        <p className="text-sm mt-2">
          PeoChain acts as a central hub that facilitates seamless interaction between different blockchain ecosystems,
          enabling unified liquidity, cross-chain applications, and interoperable smart contracts.
        </p>
      </div>
    </div>
  );
}