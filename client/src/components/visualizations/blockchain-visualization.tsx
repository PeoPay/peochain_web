import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TechTooltip } from '@/components/ui/tech-tooltip';

interface Transaction {
  id: string;
  subnet: number;
  position: number;
  progress: number;
  confirmed: boolean;
}

export default function BlockchainVisualization() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [traditionalTransactions, setTraditionalTransactions] = useState<Transaction[]>([]);
  const [speed, setSpeed] = useState(1); // Animation speed multiplier
  const animationRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  
  // Initialize with some transactions
  useEffect(() => {
    resetVisualization();
  }, []);
  
  const resetVisualization = () => {
    // Stop any existing animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // Reset state
    setIsPlaying(false);
    
    // Create initial transactions for PeoChain (multiple subnets)
    const initialTransactions: Transaction[] = [];
    
    // 4 subnets with 3 transactions each at different starting positions
    for (let subnet = 0; subnet < 4; subnet++) {
      for (let i = 0; i < 3; i++) {
        initialTransactions.push({
          id: `peo-${subnet}-${i}`,
          subnet,
          position: i * 20, // Spread out the initial positions
          progress: 0,
          confirmed: false
        });
      }
    }
    
    // Create initial transactions for traditional blockchain (single chain)
    const initialTraditionalTxs: Transaction[] = [];
    
    // 12 transactions on a single chain
    for (let i = 0; i < 12; i++) {
      initialTraditionalTxs.push({
        id: `trad-${i}`,
        subnet: 0, // All on the same chain
        position: i * 5, // Closer together but in a queue
        progress: 0,
        confirmed: false
      });
    }
    
    setTransactions(initialTransactions);
    setTraditionalTransactions(initialTraditionalTxs);
  };
  
  // Animation loop
  const animate = (timestamp: number) => {
    if (!lastTimestampRef.current) {
      lastTimestampRef.current = timestamp;
    }
    
    const deltaTime = timestamp - lastTimestampRef.current;
    lastTimestampRef.current = timestamp;
    
    // Update PeoChain transactions (parallel processing)
    setTransactions(prevTx => {
      return prevTx.map(tx => {
        // If already confirmed, don't change
        if (tx.confirmed) return tx;
        
        // Move transaction forward
        let newProgress = tx.progress + (deltaTime * 0.05 * speed);
        let newConfirmed = false;
        
        // Confirm when reaching 100%
        if (newProgress >= 100) {
          newProgress = 100;
          newConfirmed = true;
        }
        
        return {
          ...tx,
          progress: newProgress,
          confirmed: newConfirmed
        };
      });
    });
    
    // Update traditional blockchain transactions (sequential processing)
    setTraditionalTransactions(prevTx => {
      return prevTx.map((tx, index, array) => {
        // If already confirmed, don't change
        if (tx.confirmed) return tx;
        
        // Only process the first unconfirmed transaction
        const isFirstUnconfirmed = array.findIndex(t => !t.confirmed) === index;
        
        if (isFirstUnconfirmed) {
          // Move transaction forward but much slower than PeoChain
          let newProgress = tx.progress + (deltaTime * 0.015 * speed);
          let newConfirmed = false;
          
          // Confirm when reaching 100%
          if (newProgress >= 100) {
            newProgress = 100;
            newConfirmed = true;
          }
          
          return {
            ...tx,
            progress: newProgress,
            confirmed: newConfirmed
          };
        }
        
        // Return unchanged if not the first unconfirmed transaction
        return tx;
      });
    });
    
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };
  
  // Start/stop animation
  useEffect(() => {
    if (isPlaying) {
      lastTimestampRef.current = null;
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);
  
  // Check if all transactions are confirmed
  const allConfirmed = transactions.every(tx => tx.confirmed) && 
                      traditionalTransactions.every(tx => tx.confirmed);
  
  // Auto-stop when all confirmed
  useEffect(() => {
    if (allConfirmed && isPlaying) {
      setIsPlaying(false);
    }
  }, [allConfirmed, isPlaying]);
  
  return (
    <div className="blockchain-visualization rounded-xl overflow-hidden bg-white/80 backdrop-blur p-6 w-full">
      <div className="mb-6 text-center">
        <h3 className="font-semibold text-xl mb-2 text-primary">Transaction Processing Comparison</h3>
        <p className="text-sm text-muted-foreground mb-4">
          See how PeoChain processes transactions in parallel across multiple subnet validator networks compared to traditional blockchains.
        </p>
        
        <div className="flex justify-center space-x-3 mb-4">
          <Button 
            variant={isPlaying ? "outline" : "default"}
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={allConfirmed}
            className="w-28"
          >
            {isPlaying ? <><Pause className="h-4 w-4 mr-2" /> Pause</> : <><Play className="h-4 w-4 mr-2" /> Start</>}
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            onClick={resetVisualization}
            className="w-28"
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Reset
          </Button>
        </div>
        
        <div className="flex justify-center items-center space-x-2 text-sm">
          <span>Speed:</span>
          <select 
            value={speed} 
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="px-2 py-1 rounded border border-primary/20 bg-white/50"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={3}>3x</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PeoChain Visualization */}
        <div>
          <div className="text-center mb-3">
            <h4 className="font-medium text-foreground">
              <TechTooltip 
                content={
                  <div>
                    <h5 className="font-semibold mb-1">PeoChain's Parallel Processing</h5>
                    <p className="text-sm">Transactions are processed simultaneously across multiple subnet validator networks, dramatically increasing throughput.</p>
                  </div>
                }
                icon={true}
              >
                PeoChain (Parallel Processing)
              </TechTooltip>
            </h4>
          </div>
          
          <div className="relative h-64 bg-primary/5 rounded-lg p-3 overflow-hidden">
            {/* Subnet labels */}
            <div className="absolute left-0 top-0 bottom-0 w-20 flex flex-col justify-between px-2 py-4 border-r border-primary/10">
              <div className="text-xs font-medium text-primary/80">Subnet 1</div>
              <div className="text-xs font-medium text-primary/80">Subnet 2</div>
              <div className="text-xs font-medium text-primary/80">Subnet 3</div>
              <div className="text-xs font-medium text-primary/80">Subnet 4</div>
            </div>
            
            {/* Transaction visualization area */}
            <div className="ml-20 h-full relative">
              {/* Subnet lanes */}
              {[0, 1, 2, 3].map((subnet) => (
                <div 
                  key={subnet}
                  className="absolute w-full border-b border-primary/10 flex items-center"
                  style={{
                    top: `${subnet * 25}%`,
                    height: '25%'
                  }}
                />
              ))}
              
              {/* Transactions */}
              {transactions.map((tx) => (
                <div 
                  key={tx.id}
                  className={`absolute transition-transform duration-100 -translate-y-1/2 ${
                    tx.confirmed ? 'bg-green-500' : 'bg-primary'
                  }`}
                  style={{
                    top: `${tx.subnet * 25 + 12.5}%`,
                    left: `${tx.progress}%`,
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    boxShadow: tx.confirmed ? '0 0 8px rgba(34, 197, 94, 0.6)' : '0 0 8px rgba(90, 131, 100, 0.3)'
                  }}
                />
              ))}
              
              {/* Finish line */}
              <div className="absolute right-0 top-0 bottom-0 w-px bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            </div>
          </div>
        </div>
        
        {/* Traditional Blockchain Visualization */}
        <div>
          <div className="text-center mb-3">
            <h4 className="font-medium text-foreground">
              <TechTooltip 
                content={
                  <div>
                    <h5 className="font-semibold mb-1">Traditional Sequential Processing</h5>
                    <p className="text-sm">Transactions must be processed one at a time in a single chain, causing bottlenecks and slow throughput.</p>
                  </div>
                }
                icon={true}
              >
                Traditional Blockchain (Sequential)
              </TechTooltip>
            </h4>
          </div>
          
          <div className="relative h-64 bg-gray-100 rounded-lg p-3 overflow-hidden">
            {/* Chain label */}
            <div className="absolute left-0 top-0 bottom-0 w-20 flex justify-center items-center px-2 py-4 border-r border-gray-300">
              <div className="text-xs font-medium text-gray-600">Single Chain</div>
            </div>
            
            {/* Transaction visualization area */}
            <div className="ml-20 h-full relative">
              {/* Chain lane */}
              <div className="absolute w-full h-px bg-gray-300 top-1/2 transform -translate-y-1/2" />
              
              {/* Transactions */}
              {traditionalTransactions.map((tx) => (
                <div 
                  key={tx.id}
                  className={`absolute transition-transform duration-100 -translate-y-1/2 ${
                    tx.confirmed ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                  style={{
                    top: '50%',
                    left: `${tx.progress}%`,
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    boxShadow: tx.confirmed ? '0 0 8px rgba(34, 197, 94, 0.6)' : '0 0 8px rgba(128, 128, 128, 0.3)'
                  }}
                />
              ))}
              
              {/* Finish line */}
              <div className="absolute right-0 top-0 bottom-0 w-px bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats comparison */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-primary/10 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-primary mb-1">
            {Math.min(100, Math.round(transactions.reduce((acc, tx) => acc + tx.progress, 0) / transactions.length))}%
          </div>
          <div className="text-sm text-primary/80">PeoChain Progress</div>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-gray-700 mb-1">
            {Math.min(100, Math.round(traditionalTransactions.reduce((acc, tx) => acc + tx.progress, 0) / traditionalTransactions.length))}%
          </div>
          <div className="text-sm text-gray-600">Traditional Progress</div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p className="font-medium">Why This Matters</p>
        <p>PeoChain's architecture enables transaction execution across multiple subnet validator networks simultaneously,
        resulting in significantly higher throughput (100,000+ TPS) compared to traditional sequential blockchain processing.</p>
      </div>
    </div>
  );
}