import React, { useState, useEffect, useRef } from 'react';
import { Gauge, ChevronUp, ChevronDown, Server, ArrowRight } from 'lucide-react';

interface AdaptiveBlockDiagramProps {
  className?: string;
}

export function AdaptiveBlockDiagram({ className = '' }: AdaptiveBlockDiagramProps) {
  const [networkLoad, setNetworkLoad] = useState(50); // 0-100 percentage
  const [blockSize, setBlockSize] = useState(60); // Block size in KB
  const [blockTime, setBlockTime] = useState(2); // Block time in seconds
  const [tps, setTps] = useState(200); // Transactions per second
  const [animationActive, setAnimationActive] = useState(true);
  
  // Animation frame reference for cleanup
  const animationRef = useRef<number | null>(null);
  // Timer for block production simulation
  const blockTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Random number within range with normal distribution
  const normalRandom = (min: number, max: number) => {
    // Box-Muller transform for normal distribution
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    
    // Convert to desired range
    num = num / 10.0 + 0.5; // Convert to 0-1 range (mostly)
    num = Math.max(0, Math.min(1, num)); // Clamp to 0-1
    return min + (max - min) * num;
  };
  
  // Simulate network load changes
  useEffect(() => {
    if (!animationActive) return;
    
    const simulateNetworkLoad = () => {
      // Smooth changes to network load with some randomness
      setNetworkLoad(prev => {
        // Direction tendency (up or down)
        const direction = Math.random() > 0.5 ? 1 : -1;
        // Change magnitude (0-5% per tick)
        const changeMagnitude = Math.random() * 5;
        
        // Calculate new value
        let newValue = prev + direction * changeMagnitude;
        // Ensure within bounds
        newValue = Math.max(10, Math.min(90, newValue));
        return newValue;
      });
      
      // Schedule next update
      animationRef.current = requestAnimationFrame(simulateNetworkLoad);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(simulateNetworkLoad);
    
    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animationActive]);
  
  // Update block parameters based on network load
  useEffect(() => {
    // Block size increases with load but has a minimum and maximum
    const newBlockSize = Math.round(30 + (networkLoad / 100) * 70); // 30-100 KB
    setBlockSize(newBlockSize);
    
    // Block time decreases slightly as load increases, but has a minimum
    const newBlockTime = Math.max(1, 3 - (networkLoad / 100) * 2); // 1-3 seconds
    setBlockTime(newBlockTime);
    
    // Calculate TPS from block size and time
    // Assume average transaction is ~250 bytes
    const txPerBlock = Math.floor((newBlockSize * 1024) / 250);
    const newTps = Math.round(txPerBlock / newBlockTime);
    setTps(newTps);
    
    // Simulate block production
    if (blockTimerRef.current) {
      clearTimeout(blockTimerRef.current);
    }
    
    const simulateBlockProduction = () => {
      // Trigger block production visual effect here
      const blockIndicator = document.getElementById('block-indicator');
      if (blockIndicator) {
        blockIndicator.classList.add('pulse-animation');
        setTimeout(() => {
          blockIndicator.classList.remove('pulse-animation');
        }, 500);
      }
      
      // Schedule next block
      blockTimerRef.current = setTimeout(simulateBlockProduction, newBlockTime * 1000);
    };
    
    // Start block production simulation
    blockTimerRef.current = setTimeout(simulateBlockProduction, newBlockTime * 1000);
    
    // Cleanup
    return () => {
      if (blockTimerRef.current) {
        clearTimeout(blockTimerRef.current);
      }
    };
  }, [networkLoad]);
  
  // Network load visual representation with earthy palette
  const getLoadColor = () => {
    if (networkLoad < 30) return 'bg-primary-lighter';
    if (networkLoad < 70) return 'bg-primary-light';
    return 'bg-primary';
  };
  
  return (
    <div className={`p-6 rounded-lg border border-primary/10 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Gauge className="text-primary" size={24} />
          <span>Adaptive Block Production</span>
        </h3>
        <button 
          onClick={() => setAnimationActive(!animationActive)}
          className="px-3 py-1 text-xs rounded-md border border-primary/30 text-primary"
        >
          {animationActive ? 'Pause' : 'Simulate'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - metrics display */}
        <div className="space-y-6">
          {/* Network load gauge */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-foreground/70 mb-1">
              <span>Network Load</span>
              <span>{Math.round(networkLoad)}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${getLoadColor()} transition-all duration-500`}
                style={{ width: `${networkLoad}%` }}
              ></div>
            </div>
          </div>
          
          {/* Block metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <div className="text-xs text-foreground/60 mb-1">Block Size</div>
              <div className="text-2xl font-semibold text-primary flex justify-center items-center gap-1">
                {blockSize}
                <span className="text-xs font-normal text-foreground/70 ml-1">KB</span>
              </div>
              <div className="text-xs text-foreground/60 flex justify-center items-center mt-1">
                {networkLoad > 50 ? <ChevronUp size={14} className="text-primary-light" /> : <ChevronDown size={14} className="text-primary-lighter" />}
                {networkLoad > 50 ? 'Expanding' : 'Optimizing'}
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/50 text-center">
              <div className="text-xs text-foreground/60 mb-1">Block Time</div>
              <div className="text-2xl font-semibold text-primary flex justify-center items-center gap-1">
                {blockTime.toFixed(1)}
                <span className="text-xs font-normal text-foreground/70 ml-1">sec</span>
              </div>
              <div className="text-xs text-foreground/60 flex justify-center items-center mt-1">
                {networkLoad > 50 ? <ChevronDown size={14} className="text-primary-light" /> : <ChevronUp size={14} className="text-primary-lighter" />}
                {networkLoad > 50 ? 'Accelerating' : 'Stabilizing'}
              </div>
            </div>
          </div>
          
          {/* TPS counter */}
          <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10">
            <div className="text-sm text-foreground/70 mb-1">Transaction Throughput</div>
            <div className="text-3xl font-bold text-primary flex justify-center items-center">
              {tps}
              <span className="text-sm font-normal text-foreground/70 ml-2">TPS</span>
            </div>
          </div>
        </div>
        
        {/* Right column - visual representation */}
        <div className="flex items-center justify-center relative">
          <div className="relative flex flex-col items-center">
            {/* Transaction queue representation */}
            <div className="mb-6 w-full h-12 bg-muted/30 rounded-lg border border-primary/10 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center px-3 justify-between">
                <Server size={16} className="text-foreground/60" />
                <div className="text-xs text-foreground/60">Transaction Queue</div>
                <Server size={16} className="text-foreground/60" />
              </div>
              
              {/* Animated dots representing transactions */}
              <div className="flex items-center h-full px-10">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div 
                    key={i}
                    className="h-2 w-2 rounded-full bg-primary/60 mx-1 animate-pulse"
                    style={{ 
                      animationDelay: `${i * 0.2}s`,
                      opacity: (networkLoad / 100) > (i / 12) ? 1 : 0.2
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Arrow pointing down */}
            <ArrowRight size={20} className="text-primary/60 rotate-90 mb-2" />
            
            {/* Block processing */}
            <div 
              id="block-indicator"
              className="relative w-24 h-24 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-lg border-2 border-primary animate-pulse"></div>
              <div className="bg-primary/10 w-20 h-20 rounded-lg flex items-center justify-center text-primary font-medium">
                Block
                <br />
                {Math.floor(blockSize / 10)}
              </div>
            </div>
            
            {/* Arrow pointing down */}
            <ArrowRight size={20} className="text-primary/60 rotate-90 mt-2" />
            
            {/* Blockchain representation */}
            <div className="mt-6 flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded border border-primary/40 flex items-center justify-center mx-1 bg-muted text-xs"
                  style={{
                    opacity: 1 - (i * 0.2),
                    transform: `scale(${1 - (i * 0.05)})`,
                  }}
                >
                  {Math.floor(blockSize / 10) - i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-foreground/60 text-center">
        <p>
          {networkLoad < 30 
            ? "Low network load: Optimizing for security with larger validation windows." 
            : networkLoad < 70 
              ? "Moderate network load: Balanced block production for optimal performance." 
              : "High network load: Accelerating block production and increasing block size."
          }
        </p>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
        .pulse-animation {
          animation: block-pulse 0.5s ease-out;
        }
        
        @keyframes block-pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(109, 158, 121, 0.7);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 0 10px rgba(109, 158, 121, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(109, 158, 121, 0);
          }
        }
        `
      }} />
    </div>
  );
}