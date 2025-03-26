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
  
  // Check if on mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div 
      className={`p-4 md:p-6 rounded-lg border border-primary/10 ${className}`}
      role="region" 
      aria-label="Adaptive Block Production Visualization"
    >
      {/* Hidden descriptive text for screen readers */}
      <div className="sr-only">
        <p>This interactive diagram demonstrates PeoChain's adaptive block production mechanism. 
        The visualization shows how the blockchain dynamically adjusts block size and production rate 
        based on network load. When network traffic increases, block size expands and block time decreases 
        to handle more transactions. During lower traffic periods, the system optimizes for security with larger 
        validation windows. The current simulation shows transaction flow from the transaction queue into blocks, 
        which are then added to the blockchain.</p>
      </div>
      
      <div className="flex flex-wrap justify-between items-center mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-semibold flex items-center gap-1 md:gap-2" id="adaptive-block-title">
          <Gauge className="text-primary" size={isMobile ? 18 : 24} aria-hidden="true" />
          <span>Adaptive Block Production</span>
        </h3>
        <button 
          onClick={() => setAnimationActive(!animationActive)}
          className="px-2 py-1 text-xs rounded-md border border-primary/30 text-primary mt-2 sm:mt-0 focus-ring"
          aria-label={`${animationActive ? 'Pause' : 'Start'} the simulation`}
          aria-pressed={animationActive}
        >
          {animationActive ? 'Pause' : 'Simulate'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {/* Left column - metrics display */}
        <div className="space-y-4 md:space-y-6" aria-labelledby="metrics-heading">
          <h4 id="metrics-heading" className="sr-only">Real-time Blockchain Metrics</h4>
          
          {/* Network load gauge */}
          <div className="mb-3 md:mb-4">
            <div className="flex justify-between text-xs md:text-sm text-foreground/70 mb-1">
              <span id="network-load-label">Network Load</span>
              <span aria-labelledby="network-load-label">{Math.round(networkLoad)}%</span>
            </div>
            <div 
              className="h-2 md:h-3 bg-muted rounded-full overflow-hidden" 
              role="progressbar" 
              aria-valuenow={Math.round(networkLoad)} 
              aria-valuemin={0} 
              aria-valuemax={100}
              aria-labelledby="network-load-label"
            >
              <div 
                className={`h-full ${getLoadColor()} transition-all duration-500`}
                style={{ width: `${networkLoad}%` }}
              ></div>
            </div>
          </div>
          
          {/* Block metrics */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="p-3 md:p-4 rounded-lg bg-muted/50 text-center">
              <div id="block-size-label" className="text-xs text-foreground/60 mb-1">Block Size</div>
              <div 
                className="text-xl md:text-2xl font-semibold text-primary flex justify-center items-center gap-1"
                aria-labelledby="block-size-label"
              >
                {blockSize}
                <span className="text-xs font-normal text-foreground/70 ml-1">KB</span>
              </div>
              <div className="text-[10px] md:text-xs text-foreground/60 flex justify-center items-center mt-1" aria-live="polite">
                {networkLoad > 50 ? <ChevronUp size={12} className="text-primary-light" aria-hidden="true" /> : <ChevronDown size={12} className="text-primary-lighter" aria-hidden="true" />}
                <span className="hidden xs:inline">{networkLoad > 50 ? 'Expanding' : 'Optimizing'}</span>
              </div>
            </div>
            
            <div className="p-3 md:p-4 rounded-lg bg-muted/50 text-center">
              <div id="block-time-label" className="text-xs text-foreground/60 mb-1">Block Time</div>
              <div 
                className="text-xl md:text-2xl font-semibold text-primary flex justify-center items-center gap-1"
                aria-labelledby="block-time-label"
              >
                {blockTime.toFixed(1)}
                <span className="text-xs font-normal text-foreground/70 ml-1">sec</span>
              </div>
              <div className="text-[10px] md:text-xs text-foreground/60 flex justify-center items-center mt-1" aria-live="polite">
                {networkLoad > 50 ? <ChevronDown size={12} className="text-primary-light" aria-hidden="true" /> : <ChevronUp size={12} className="text-primary-lighter" aria-hidden="true" />}
                <span className="hidden xs:inline">{networkLoad > 50 ? 'Accelerating' : 'Stabilizing'}</span>
              </div>
            </div>
          </div>
          
          {/* TPS counter */}
          <div className="text-center p-3 md:p-4 rounded-lg bg-primary/5 border border-primary/10">
            <div id="tps-label" className="text-xs md:text-sm text-foreground/70 mb-1">Transaction Throughput</div>
            <div 
              className="text-2xl md:text-3xl font-bold text-primary flex justify-center items-center"
              aria-labelledby="tps-label"
              aria-live="polite"
            >
              {tps}
              <span className="text-xs md:text-sm font-normal text-foreground/70 ml-1 md:ml-2">TPS</span>
            </div>
          </div>
        </div>
        
        {/* Right column - visual representation */}
        <div 
          className="flex items-center justify-center relative mt-2 md:mt-0"
          aria-labelledby="visualization-heading"
        >
          <h4 id="visualization-heading" className="sr-only">Blockchain Transaction Flow Visualization</h4>
          
          <div className="relative flex flex-col items-center">
            {/* Transaction queue representation */}
            <div 
              className="mb-4 md:mb-6 w-full h-10 md:h-12 bg-muted/30 rounded-lg border border-primary/10 overflow-hidden relative"
              aria-label="Transaction Queue"
              role="img"
            >
              <div className="absolute inset-0 flex items-center px-2 md:px-3 justify-between">
                <Server size={isMobile ? 14 : 16} className="text-foreground/60" aria-hidden="true" />
                <div className="text-[10px] md:text-xs text-foreground/60">Transaction Queue</div>
                <Server size={isMobile ? 14 : 16} className="text-foreground/60" aria-hidden="true" />
              </div>
              
              {/* Animated dots representing transactions */}
              <div 
                className="flex items-center h-full px-6 md:px-10"
                aria-label={`Queue filling at ${Math.round(networkLoad)}% capacity`}
              >
                {Array.from({ length: isMobile ? 8 : 12 }).map((_, i) => (
                  <div 
                    key={i}
                    className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-primary/60 mx-0.5 md:mx-1 animate-pulse"
                    style={{ 
                      animationDelay: `${i * 0.2}s`,
                      opacity: (networkLoad / 100) > (i / (isMobile ? 8 : 12)) ? 1 : 0.2
                    }}
                    aria-hidden="true"
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Arrow pointing down */}
            <ArrowRight 
              size={isMobile ? 16 : 20} 
              className="text-primary/60 rotate-90 mb-1 md:mb-2" 
              aria-hidden="true"
              aria-label="Transactions flow down into blocks"
            />
            
            {/* Block processing */}
            <div 
              id="block-indicator"
              className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center"
              role="img"
              aria-label={`Current block being processed: Block ${Math.floor(blockSize / 10)}`}
            >
              <div className="absolute inset-0 rounded-lg border-2 border-primary animate-pulse" aria-hidden="true"></div>
              <div className="bg-primary/10 w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center text-primary font-medium text-sm md:text-base">
                Block
                <br />
                {Math.floor(blockSize / 10)}
              </div>
            </div>
            
            {/* Arrow pointing down */}
            <ArrowRight 
              size={isMobile ? 16 : 20} 
              className="text-primary/60 rotate-90 mt-1 md:mt-2" 
              aria-hidden="true"
              aria-label="Blocks flow down into the blockchain"
            />
            
            {/* Blockchain representation */}
            <div 
              className="mt-4 md:mt-6 flex items-center"
              role="img"
              aria-label="Blockchain history showing previous blocks"
            >
              {Array.from({ length: isMobile ? 4 : 5 }).map((_, i) => (
                <div 
                  key={i}
                  className="w-8 h-8 md:w-10 md:h-10 rounded border border-primary/40 flex items-center justify-center mx-0.5 md:mx-1 bg-muted text-[10px] md:text-xs"
                  style={{
                    opacity: 1 - (i * 0.2),
                    transform: `scale(${1 - (i * 0.05)})`,
                  }}
                  aria-label={`Previous block ${Math.floor(blockSize / 10) - i}`}
                >
                  {Math.floor(blockSize / 10) - i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div 
        className="mt-4 md:mt-6 text-xs md:text-sm text-foreground/60 text-center"
        aria-live="polite"
        role="status"
      >
        <p>
          {networkLoad < 30 
            ? isMobile ? "Low load: Security optimized." : "Low network load: Optimizing for security with larger validation windows." 
            : networkLoad < 70 
              ? isMobile ? "Moderate load: Balanced performance." : "Moderate network load: Balanced block production for optimal performance." 
              : isMobile ? "High load: Accelerated blocks." : "High network load: Accelerating block production and increasing block size."
          }
        </p>
      </div>
      
      {/* Add keyboard focus styles for better accessibility */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .focus-ring:focus-visible {
          outline: 2px solid #38503f;
          outline-offset: 2px;
        }
        
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