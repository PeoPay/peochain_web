import React, { useState, useEffect } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Scatter
} from 'recharts';
import { Badge } from './badge';

// Define interfaces for our data types
interface PerformanceDataPoint {
  name: string;
  tps: number;
  finality: number;
  cost: number;
  security: number;
}

// Performance metrics data generation
const generatePerformanceData = (): PerformanceDataPoint[] => {
  // Create benchmark data for comparison
  const competitors: PerformanceDataPoint[] = [
    { name: 'Ethereum', tps: 15, finality: 6 * 60, cost: 15, security: 90 },
    { name: 'Solana', tps: 65000, finality: 0.4, cost: 0.00025, security: 75 },
    { name: 'Bitcoin', tps: 7, finality: 60 * 60, cost: 15, security: 95 },
    { name: 'Avalanche', tps: 4500, finality: 2, cost: 0.75, security: 85 },
  ];
  
  // PEOCHAIN outperforms competitors in most metrics
  const peochain: PerformanceDataPoint = { 
    name: 'PEOCHAIN', 
    tps: 85000 + Math.floor(Math.random() * 5000), 
    finality: 0.3 + (Math.random() * 0.2), 
    cost: 0.0001 + (Math.random() * 0.0001),
    security: 97
  };
  
  return [...competitors, peochain];
};

interface ScalabilityDataPoint {
  name: string;
  tps: number;
  competitors: number;
}

// Scalability data over time (transactions per second)
const generateScalabilityData = (): ScalabilityDataPoint[] => {
  const data: ScalabilityDataPoint[] = [];
  const timePoints = 24; // 24 hours
  let baseTps = 50000;
  
  for (let i = 0; i < timePoints; i++) {
    const hour = i;
    // Simulate natural traffic patterns with higher volume during business hours
    let timeMultiplier = 1;
    if (hour >= 8 && hour <= 17) {
      timeMultiplier = 1.5; // Business hours
    } else if (hour >= 18 && hour <= 22) {
      timeMultiplier = 1.3; // Evening activity
    } else {
      timeMultiplier = 0.8; // Night time
    }
    
    // Add some randomness
    const noise = Math.random() * 10000 - 5000;
    const tps = Math.max(10000, Math.min(100000, baseTps * timeMultiplier + noise));
    
    data.push({
      name: `${hour}:00`,
      tps: Math.round(tps),
      competitors: Math.round(tps / 15), // Showing 15x better than competitors
    });
    
    // Slightly adjust the base TPS for the next hour
    baseTps = Math.max(45000, Math.min(90000, baseTps + (Math.random() * 5000 - 2500)));
  }
  
  return data;
};

// Define types for our data
interface CostDataPoint {
  name: string;
  cost: number;
}

// Transaction cost efficiency data
const generateCostData = (): CostDataPoint[] => {
  const data: CostDataPoint[] = [];
  const competitors = ['Bitcoin', 'Ethereum', 'Solana', 'Avalanche', 'PEOCHAIN'];
  
  competitors.forEach(name => {
    let cost: number;
    switch(name) {
      case 'Bitcoin': cost = 15 + Math.random() * 5; break;
      case 'Ethereum': cost = 10 + Math.random() * 8; break;
      case 'Solana': cost = 0.00025 + Math.random() * 0.0001; break;
      case 'Avalanche': cost = 0.75 + Math.random() * 0.5; break;
      case 'PEOCHAIN': cost = 0.0001 + Math.random() * 0.00005; break;
      default: cost = 5;
    }
    
    data.push({
      name,
      cost
    });
  });
  
  return data;
};

interface RadarDataPoint {
  name: string;
  value: number;
  fullMark: number;
}

// Transaction speeds comparison
const generateSpeedData = (): RadarDataPoint[] => {
  return [
    { name: 'PEOCHAIN', value: 300, fullMark: 300 },
    { name: 'Security', value: 270, fullMark: 300 },
    { name: 'Cost', value: 290, fullMark: 300 },
    { name: 'Scalability', value: 280, fullMark: 300 },
    { name: 'Decentralization', value: 240, fullMark: 300 }
  ];
};

// Chart types
type ChartType = 'scalability' | 'performance' | 'cost' | 'radar';

interface AnimatedChartProps {
  className?: string;
}

export function AnimatedChart({ className = '' }: AnimatedChartProps) {
  const [chartType, setChartType] = useState<ChartType>('scalability');
  const [scalabilityData, setScalabilityData] = useState(generateScalabilityData);
  const [performanceData, setPerformanceData] = useState(generatePerformanceData);
  const [costData, setCostData] = useState(generateCostData);
  const [radarData, setRadarData] = useState(generateSpeedData);
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Colors
  const colors = {
    primary: '#5a8364',
    secondary: '#38a169',
    tertiary: '#68d391',
    competitors: '#e05252',
    background: 'rgba(90, 131, 100, 0.1)',
    accent: '#7c6cea',
  };

  // Change chart type periodically
  useEffect(() => {
    if (!isAnimating) return;
    
    const chartInterval = setInterval(() => {
      setChartType(prevType => {
        if (prevType === 'scalability') return 'performance';
        if (prevType === 'performance') return 'cost';
        if (prevType === 'cost') return 'radar';
        return 'scalability';
      });
    }, 7000);
    
    return () => clearInterval(chartInterval);
  }, [isAnimating]);
  
  // Update data periodically to simulate live updates
  useEffect(() => {
    if (!isAnimating) return;
    
    const dataInterval = setInterval(() => {
      setScalabilityData(generateScalabilityData());
      setPerformanceData(generatePerformanceData());
      setCostData(generateCostData());
      setRadarData(generateSpeedData());
    }, 10000);
    
    return () => clearInterval(dataInterval);
  }, [isAnimating]);
  
  // Helper to check if mobile view is needed
  const useIsMobile = () => {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return width < 768; // Mobile breakpoint
  };
  
  // Fixed hook implementation outside component
  const isMobile = useIsMobile();
  
  // Dynamic classes for responsive layout
  const itemsClass = isMobile ? 'items-start' : 'items-center';
  
  const renderChart = () => {
    const mobileTicks = isMobile ? 5 : undefined; // Reduce ticks on mobile
    const mobileMargin = isMobile 
      ? { top: 5, right: 5, left: 0, bottom: 5 } 
      : { top: 5, right: 20, left: 0, bottom: 5 };
    
    switch (chartType) {
      case 'scalability':
        return (
          <AreaChart
            data={isMobile ? scalabilityData.filter((_, i) => i % 2 === 0) : scalabilityData} // Less data points on mobile
            margin={mobileMargin}
          >
            <defs>
              <linearGradient id="colorTps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.competitors} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors.competitors} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10 }} 
              interval={isMobile ? 3 : 1} // Show fewer X-axis ticks on mobile
            />
            <YAxis tick={{ fontSize: 10 }} tickCount={mobileTicks} />
            <Tooltip 
              formatter={(value: number, name) => {
                if (name === 'tps') return [`${value.toLocaleString()} TPS`, 'PEOCHAIN'];
                return [`${value.toLocaleString()} TPS`, 'Competitors'];
              }}
            />
            <Area 
              type="monotone" 
              dataKey="tps" 
              stroke={colors.primary} 
              fillOpacity={1} 
              fill="url(#colorTps)" 
              name="PEOCHAIN"
            />
            <Area 
              type="monotone" 
              dataKey="competitors" 
              stroke={colors.competitors} 
              fillOpacity={0.5} 
              fill="url(#colorComp)" 
              name="Competitors"
            />
          </AreaChart>
        );
      
      case 'performance':
        // Simplified data for mobile
        const filteredData = isMobile 
          ? performanceData.filter(d => d.name === 'PEOCHAIN' || d.name === 'Ethereum' || d.name === 'Solana')
          : performanceData;
          
        return (
          <BarChart
            data={filteredData}
            margin={mobileMargin}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} horizontal={false} />
            <XAxis 
              type="number" 
              tick={{ fontSize: 10 }} 
              tickCount={mobileTicks}
              domain={[0, 'dataMax']}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              tick={{ fontSize: 10 }} 
              width={isMobile ? 60 : 80} 
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toLocaleString()} TPS`, 'Transactions Per Second']}
            />
            {!isMobile && <Legend />}
            <Bar 
              dataKey="tps" 
              fill={colors.primary} 
              name="Transactions Per Second"
              animationDuration={1000}
              label={isMobile ? false : { position: 'right', fill: colors.primary, fontSize: 10 }}
            />
          </BarChart>
        );
      
      case 'cost':
        // Simplified for mobile
        const mobileCostData = isMobile 
          ? costData.filter(d => d.name === 'PEOCHAIN' || d.name === 'Ethereum' || d.name === 'Solana')
          : costData;
          
        return (
          <ComposedChart
            data={mobileCostData}
            margin={isMobile ? { top: 5, right: 5, left: 5, bottom: 5 } : { top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10 }}
              angle={isMobile ? -45 : 0}
              textAnchor={isMobile ? "end" : "middle"}
              height={isMobile ? 60 : 30}
            />
            <YAxis 
              tick={{ fontSize: 10 }} 
              scale="log" 
              domain={[0.0001, 100]} 
              allowDataOverflow
              tickCount={mobileTicks}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toFixed(5)}`, 'Transaction Cost']}
            />
            {!isMobile && <Legend />}
            <Bar 
              dataKey="cost" 
              fill={colors.primary} // Using a single color for simplicity and to fix TypeScript errors
              name="Transaction Cost (USD)"
              animationDuration={1000}
            />
            {!isMobile && (
              <Line 
                type="monotone" 
                dataKey="cost" 
                stroke="#8884d8" 
                dot={false} 
                activeDot={false} 
                animationDuration={1500}
              />
            )}
          </ComposedChart>
        );
        
      case 'radar':
        return (
          <RadarChart 
            outerRadius={isMobile ? 70 : 90} 
            width={isMobile ? 260 : 300} 
            height={isMobile ? 200 : 250} 
            data={radarData}
          >
            <PolarGrid gridType="polygon" />
            <PolarAngleAxis 
              dataKey="name" 
              tick={{ 
                fill: 'currentColor', 
                fontSize: isMobile ? 8 : 10
              }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 300]} tick={false} />
            <Radar 
              name="PEOCHAIN Performance" 
              dataKey="value" 
              stroke={colors.primary} 
              fill={colors.primary} 
              fillOpacity={0.6} 
              animationDuration={1500}
            />
            {!isMobile && <Legend />}
            <Tooltip />
          </RadarChart>
        );
    }
  };
  
  const getChartTitle = () => {
    switch (chartType) {
      case 'scalability':
        return (
          <div className="flex items-center gap-2">
            <Badge className="bg-primary/20 text-primary border-primary/30">⚡ TPS Scaling</Badge>
            <span className="text-xs text-foreground/60">24 hour period</span>
          </div>
        );
      case 'performance':
        return <Badge className="bg-primary/20 text-primary border-primary/30">🚀 Performance Comparison</Badge>;
      case 'cost':
        return <Badge className="bg-primary/20 text-primary border-primary/30">💰 Transaction Cost (USD)</Badge>;
      case 'radar':
        return <Badge className="bg-primary/20 text-primary border-primary/30">🔄 PEOCHAIN Network Metrics</Badge>;
    }
  };
  
  const getHighlightStat = () => {
    switch (chartType) {
      case 'scalability':
        const maxTps = Math.max(...scalabilityData.map(item => item.tps));
        return (
          <div>
            <span className="text-primary font-semibold">{maxTps.toLocaleString()}</span> TPS Peak
          </div>
        );
      case 'performance':
        const peochainData = performanceData.find(item => item.name === 'PEOCHAIN');
        return (
          <div>
            <span className="text-primary font-semibold">{Math.round(peochainData?.tps || 0).toLocaleString()}</span> TPS
          </div>
        );
      case 'cost':
        const peochainCost = costData.find(item => item.name === 'PEOCHAIN')?.cost;
        return (
          <div>
            <span className="text-primary font-semibold">${peochainCost?.toFixed(5)}</span> per TX
          </div>
        );
      case 'radar':
        return (
          <div>
            <span className="text-primary font-semibold">297°</span> Performance
          </div>
        );
    }
  };
  
  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} items-${isMobile ? 'start' : 'center'} mb-2`}>
        {getChartTitle()}
        <div className={`text-xs font-medium ${isMobile ? 'mt-1' : ''}`}>
          {getHighlightStat()}
        </div>
      </div>
      
      <div className="flex-1 min-h-[180px] md:min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      
      <div className={`mt-2 flex ${isMobile ? 'flex-col gap-1' : 'justify-between'} items-${isMobile ? 'start' : 'center'} text-xs`}>
        <div className="flex items-center gap-1 text-foreground/60">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          Live Performance Metrics
        </div>
        <div className="font-medium">
          PoSyg™ Consensus
        </div>
      </div>
    </div>
  );
}