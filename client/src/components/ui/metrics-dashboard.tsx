import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Users, 
  Clock, 
  Shield, 
  Database, 
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  RotateCw,
  PauseCircle
} from 'lucide-react';

import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

// Animated number counter that smoothly counts to a target value
function AnimatedCounter({ value, duration = 1000, prefix = '', suffix = '', className = '' }: { 
  value: number, 
  duration?: number, 
  prefix?: string, 
  suffix?: string, 
  className?: string 
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const stepRef = React.useRef<number | null>(null);
  
  useEffect(() => {
    if (stepRef.current) {
      cancelAnimationFrame(stepRef.current);
    }
    
    const startTime = Date.now();
    const startValue = displayValue;
    const endValue = value;
    
    const animateValue = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        const currentValue = startValue + (endValue - startValue) * easedProgress;
        setDisplayValue(Math.round(currentValue));
        stepRef.current = requestAnimationFrame(animateValue);
      } else {
        setDisplayValue(endValue);
      }
    };
    
    stepRef.current = requestAnimationFrame(animateValue);
    
    return () => {
      if (stepRef.current) {
        cancelAnimationFrame(stepRef.current);
      }
    };
  }, [value, duration]);
  
  return (
    <div className={className}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </div>
  );
}

// Type definitions
interface MetricCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  change?: number;
  chartData?: number[];
  mainColor?: string;
  loading?: boolean;
}

interface MetricsDashboardProps {
  className?: string;
  simulationActive?: boolean;
  onToggleSimulation?: () => void;
}

// Metric card component
function MetricCard({
  title,
  value,
  prefix = '',
  suffix = '',
  icon,
  change = 0,
  chartData = [],
  mainColor = 'text-primary',
  loading = false
}: MetricCardProps) {
  const isPositive = change >= 0;
  
  // Check if on small screen
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="bg-card rounded-lg p-3 md:p-5 border border-primary/10 shadow-sm">
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <div className="flex items-center gap-1 md:gap-2 text-foreground/70">
          <span className={mainColor}>{icon}</span>
          <span className="text-xs md:text-sm font-medium">{title}</span>
        </div>
        
        {change !== 0 && (
          <div className={`text-[10px] md:text-xs flex items-center gap-0.5 md:gap-1 font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <ArrowUpRight size={isMobile ? 12 : 14} /> : <ArrowDownRight size={isMobile ? 12 : 14} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between">
        <AnimatedCounter 
          value={value} 
          prefix={prefix} 
          suffix={suffix} 
          className={`text-lg md:text-2xl font-bold ${mainColor}`} 
        />
        
        {chartData.length > 0 && (
          <div className="flex items-end h-6 md:h-8 gap-[1px] md:gap-[2px]">
            {chartData.map((dataPoint, i) => (
              <div 
                key={i}
                className={`w-[3px] rounded-sm ${mainColor.replace('text-', 'bg-')}/70`}
                style={{ 
                  height: `${dataPoint}%`,
                  opacity: 0.5 + ((i + 1) / chartData.length) * 0.5
                }}
              ></div>
            ))}
          </div>
        )}
      </div>
      
      {loading && (
        <div className="mt-2">
          <Progress value={45} className="h-1" />
        </div>
      )}
    </div>
  );
}

export function MetricsDashboard({ 
  className = '', 
  simulationActive = true,
  onToggleSimulation = () => {}
}: MetricsDashboardProps) {
  // State for metrics
  const [tps, setTps] = useState(1242);
  const [validators, setValidators] = useState(4896);
  const [blockTime, setBlockTime] = useState(2.1);
  const [totalStaked, setTotalStaked] = useState(8542167);
  const [avgFee, setAvgFee] = useState(0.0042);
  
  // Charts data (8 points, simulating historical data)
  const [tpsChart, setTpsChart] = useState(Array.from({ length: 8 }, () => randomBetween(50, 95)));
  const [validatorsChart, setValidatorsChart] = useState(Array.from({ length: 8 }, (_, i) => 50 + i * 5));
  const [blockTimeChart, setBlockTimeChart] = useState(Array.from({ length: 8 }, () => randomBetween(50, 95)));
  const [stakedChart, setStakedChart] = useState(Array.from({ length: 8 }, (_, i) => 60 + Math.sin(i) * 20));
  const [feeChart, setFeeChart] = useState(Array.from({ length: 8 }, () => randomBetween(40, 90)));
  
  // Optional loading states
  const [loading, setLoading] = useState(false);
  
  // Simulate real-time metrics updates
  useEffect(() => {
    if (!simulationActive) return;
    
    const updateInterval = setInterval(() => {
      // TPS fluctuates frequently
      const newTps = Math.max(1000, Math.min(1600, tps + randomBetween(-80, 80)));
      setTps(newTps);
      setTpsChart(prev => [...prev.slice(1), 50 + (newTps - 1000) / 6]);
      
      // Validators change occasionally
      if (Math.random() > 0.7) {
        const validatorChange = randomBetween(-5, 10);
        const newValidators = validators + validatorChange;
        setValidators(newValidators);
        setValidatorsChart(prev => [...prev.slice(1), 50 + (newValidators - 4800) / 20]);
      }
      
      // Block time stays relatively stable with small fluctuations
      const newBlockTime = Math.max(1.0, Math.min(3.0, blockTime + (Math.random() - 0.5) * 0.2));
      setBlockTime(parseFloat(newBlockTime.toFixed(1)));
      setBlockTimeChart(prev => [...prev.slice(1), 100 - (newBlockTime - 1) * 40]);
      
      // Total staked increases slowly over time
      const newStaked = totalStaked + randomBetween(-1000, 5000);
      setTotalStaked(newStaked);
      setStakedChart(prev => [...prev.slice(1), 50 + (newStaked - 8500000) / 20000]);
      
      // Average fee fluctuates based on network usage
      const newFee = Math.max(0.001, Math.min(0.01, avgFee + (Math.random() - 0.5) * 0.001));
      setAvgFee(parseFloat(newFee.toFixed(4)));
      setFeeChart(prev => [...prev.slice(1), 50 + (newFee - 0.001) * 10000]);
      
      // Occasionally simulate loading state
      if (Math.random() > 0.9) {
        setLoading(true);
        setTimeout(() => setLoading(false), 1500);
      }
    }, 2000);
    
    return () => clearInterval(updateInterval);
  }, [simulationActive, tps, validators, blockTime, totalStaked, avgFee]);
  
  // Check if on mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`${className}`}>
      <div className="flex flex-wrap justify-between items-center mb-4 md:mb-6 gap-y-2">
        <h3 className="text-lg md:text-xl font-semibold flex items-center gap-1 md:gap-2">
          <Activity className="text-primary" size={isMobile ? 18 : 24} />
          <span>Network Metrics</span>
        </h3>
        
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs h-7 md:h-8 px-2 md:px-3"
          onClick={onToggleSimulation}
        >
          {simulationActive ? (
            <PauseCircle size={isMobile ? 12 : 14} className="mr-1" />
          ) : (
            <RotateCw size={isMobile ? 12 : 14} className="mr-1" />
          )}
          {simulationActive ? 'Pause' : 'Simulate'}
        </Button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
        <MetricCard
          title="TPS"
          value={tps}
          icon={<BarChart3 size={isMobile ? 16 : 18} />}
          change={3.2}
          chartData={tpsChart}
          mainColor="text-primary"
          loading={loading}
        />
        
        <MetricCard
          title="Validators"
          value={validators}
          icon={<Users size={isMobile ? 16 : 18} />}
          change={0.8}
          chartData={validatorsChart}
          mainColor="text-primary"
          loading={loading}
        />
        
        <MetricCard
          title="Block Time"
          value={blockTime}
          suffix="s"
          icon={<Clock size={isMobile ? 16 : 18} />}
          change={-1.4}
          chartData={blockTimeChart}
          mainColor="text-primary"
          loading={loading}
        />
        
        <MetricCard
          title="Total Staked"
          value={totalStaked}
          prefix="$"
          icon={<Shield size={isMobile ? 16 : 18} />}
          change={2.7}
          chartData={stakedChart}
          mainColor="text-primary"
          loading={loading}
        />
        
        <MetricCard
          title="Avg. Fee"
          value={avgFee}
          prefix="$"
          icon={<Database size={isMobile ? 16 : 18} />}
          change={-2.1}
          chartData={feeChart}
          mainColor="text-primary"
          loading={loading}
        />
      </div>
      
      <div className="text-[10px] md:text-xs text-center text-foreground/60 mt-3 md:mt-4">
        * All metrics shown are simulated and for demonstration purposes only
      </div>
    </div>
  );
}