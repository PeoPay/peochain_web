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
  Scatter,
  Cell,
  LabelList
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
              tick={{ 
                fontSize: isMobile ? 8 : 10,
                width: isMobile ? 35 : 80
              }}
              interval={isMobile ? 3 : 1} // Show fewer X-axis ticks on mobile
              tickFormatter={(value) => isMobile && value.length > 6 ? value.substring(0, 1) : value}
            />
            <YAxis tick={{ fontSize: 10 }} tickCount={mobileTicks} />
            <Tooltip 
              formatter={(value: number, name) => {
                if (name === 'tps') return [`${value.toLocaleString()} TPS`, 'PEOCHAIN'];
                return [`${value.toLocaleString()} TPS`, 'Competitors'];
              }}
              contentStyle={{ fontSize: isMobile ? '10px' : '12px', padding: isMobile ? '4px 8px' : '8px 10px' }}
              itemStyle={{ padding: isMobile ? '1px 0' : '2px 0' }}
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
        // Sort data for better visual presentation - put PEOCHAIN last so it stands out
        const sortedData = [...performanceData].sort((a, b) => {
          if (a.name === 'PEOCHAIN') return 1; // Always put PEOCHAIN last
          if (b.name === 'PEOCHAIN') return -1;
          return a.tps - b.tps; // Sort others by TPS
        });
        
        // Simplified data for mobile but always include PEOCHAIN
        const filteredData = isMobile 
          ? sortedData.filter(d => 
              d.name === 'PEOCHAIN' || 
              d.name === 'Ethereum' || 
              d.name === 'Solana'
            )
          : sortedData;
          
        // Determine max TPS for better scaling
        const maxTps = Math.max(...filteredData.map(d => d.tps)) * 1.1; // Add 10% padding
        
        return (
          <BarChart
            data={filteredData}
            margin={isMobile ? 
              { top: 10, right: 50, left: 85, bottom: 20 } : 
              { top: 10, right: 80, left: 100, bottom: 15 }
            }
            layout="vertical"
            barSize={isMobile ? 16 : 22}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} horizontal={false} />
            <XAxis 
              type="number" 
              tick={{ 
                fontSize: isMobile ? 10 : 12,
                fill: 'currentColor'
              }} 
              tickCount={isMobile ? 3 : 5}
              domain={[0, maxTps]}
              tickFormatter={(value) => {
                // Format large numbers with K/M suffixes
                if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                return value;
              }}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              tick={{ 
                fontSize: isMobile ? 11 : 13,
                width: isMobile ? 75 : 100,
                fill: 'currentColor',
                fontWeight: 500
              }}
              tickMargin={8}
              tickFormatter={(value) => {
                // Display full blockchain names without truncation
                return value;
              }}
              width={isMobile ? 80 : 95}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toLocaleString()} TPS`, 'Transactions Per Second']}
              contentStyle={{ 
                fontSize: isMobile ? '11px' : '12px', 
                padding: isMobile ? '5px 8px' : '8px 10px',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
              itemStyle={{ padding: isMobile ? '2px 0' : '3px 0' }}
              cursor={{ fill: 'rgba(0,0,0,0.05)' }}
            />
            <Legend verticalAlign="top" height={isMobile ? 20 : 30} />
            <Bar 
              dataKey="tps" 
              name="Transactions Per Second"
              animationDuration={1000}
            >
              {filteredData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.name === 'PEOCHAIN' ? colors.primary : colors.competitors} 
                />
              ))}
              <LabelList 
                dataKey="tps" 
                position="right" 
                style={{ 
                  fontSize: isMobile ? 9 : 11, 
                  fill: 'currentColor',
                  fontWeight: 500,
                }} 
                formatter={(value: number) => {
                  // Format with K/M for better readability
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                  return value;
                }}
              />
            </Bar>
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
            margin={isMobile ? 
              { top: 10, right: 10, left: 10, bottom: 60 } : 
              { top: 15, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis 
              dataKey="name" 
              tick={{ 
                fontSize: isMobile ? 10 : 12, 
                width: isMobile ? 50 : 80,
                fill: 'currentColor' 
              }}
              angle={isMobile ? -45 : 0}
              textAnchor={isMobile ? "end" : "middle"}
              height={isMobile ? 65 : 35}
              tickFormatter={(value) => {
                // Use full names for better readability
                return value;
              }}
              tickLine={{ stroke: 'rgba(0,0,0,0.1)' }}
            />
            <YAxis 
              tick={{ 
                fontSize: isMobile ? 10 : 12,
                fill: 'currentColor'
              }} 
              scale="log" 
              domain={[0.00001, 100]} 
              allowDataOverflow
              tickCount={isMobile ? 4 : 5}
              tickFormatter={(value) => `$${value.toFixed(value < 0.01 ? 5 : 2)}`}
              width={isMobile ? 55 : 65}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toFixed(5)}`, 'Transaction Cost']}
              contentStyle={{ 
                fontSize: isMobile ? '11px' : '13px', 
                padding: isMobile ? '6px 10px' : '8px 12px',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}
              itemStyle={{ 
                padding: isMobile ? '2px 0' : '3px 0',
                color: '#555'
              }}
              cursor={{ fill: 'rgba(0,0,0,0.03)' }}
            />
            <Legend 
              verticalAlign="top" 
              height={30} 
              wrapperStyle={{ 
                fontSize: isMobile ? 11 : 13,
                paddingTop: 5, 
                paddingBottom: 5,
                fontWeight: 500
              }}
              iconSize={10}
            />
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
        // Use responsive container instead of fixed dimensions for proper scaling
        return (
          <RadarChart 
            outerRadius="75%" 
            data={radarData}
            margin={isMobile ? 
              { top: 25, right: 25, bottom: 40, left: 25 } : 
              { top: 30, right: 30, bottom: 50, left: 30 }
            }
          >
            <PolarGrid gridType="polygon" />
            <PolarAngleAxis 
              dataKey="name" 
              tick={{ 
                fill: 'currentColor', 
                fontSize: isMobile ? 11 : 13,
                dy: isMobile ? 8 : 5,
                fontWeight: "500",
                letterSpacing: "0.2px"
              }}
              tickLine={false}
              stroke="#38a169"
              axisLine={{ strokeWidth: 1, stroke: "#38a169", opacity: 0.4 }}
              tickFormatter={(value) => {
                // Use consistent, readable labels
                if (value === "Transaction Speed") return "Speed";
                if (value === "Decentralization") return "Decentralization";
                if (value === "Security Level") return "Security";
                if (value === "Scalability") return "Scalability";
                if (value === "Energy Efficiency") return "Energy Efficiency";
                return value;
              }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 250]} 
              tick={{ fontSize: isMobile ? 9 : 11, fill: "currentColor", fontWeight: "400" }}
              tickCount={5}
              axisLine={false}
              stroke="#38a169"
              strokeOpacity={0.2}
              tickFormatter={(value) => value === 0 ? "" : value.toString()}
            />
            <Radar 
              name="PEOCHAIN Performance" 
              dataKey="value" 
              stroke={colors.primary} 
              fill={colors.primary} 
              fillOpacity={0.6} 
              isAnimationActive={true}
              animationDuration={1500}
              strokeWidth={2}
            />
            <Legend 
              wrapperStyle={{ 
                paddingTop: 20, 
                paddingBottom: 5,
                fontSize: isMobile ? 11 : 13,
                fontWeight: 500
              }} 
              align="center" 
              verticalAlign="bottom"
              iconSize={10}
              iconType="circle"
            />
            <Tooltip 
              contentStyle={{ 
                fontSize: isMobile ? '11px' : '13px', 
                padding: isMobile ? '6px 10px' : '8px 12px',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(0, 0, 0, 0.05)'
              }}
              formatter={(value, name, props) => {
                const metric = props.payload.name;
                return [`${value} points`, metric];
              }}
              labelFormatter={(label) => "Performance"}
              itemStyle={{ 
                padding: isMobile ? '2px 0' : '3px 0',
                color: '#666'
              }}
            />
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
        // Calculate average performance score across all metrics
        const avgPerformance = Math.round(
          radarData.reduce((acc, item) => acc + item.value, 0) / radarData.length
        );
        return (
          <div className="flex items-center">
            <span className="text-primary font-semibold">{avgPerformance}</span>
            <span className="ml-1">Performance Score</span>
          </div>
        );
    }
  };
  
  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} ${itemsClass} mb-2 max-w-full overflow-hidden`}>
        <div className="truncate max-w-full">
          {getChartTitle()}
        </div>
        <div className={`text-xs font-medium ${isMobile ? 'mt-1' : ''} truncate`}>
          {getHighlightStat()}
        </div>
      </div>
      
      <div className="flex-1 mx-auto w-full min-h-[260px] sm:min-h-[300px] md:min-h-[340px]">
        {chartType === 'radar' ? (
          // Special handling for radar chart to ensure it's properly sized and centered
          <div className="w-full h-full flex items-center justify-center">
            <ResponsiveContainer 
              width="100%" 
              height="100%" 
              minWidth={300}
              minHeight={300}
              debounce={50}
            >
              {renderChart()}
            </ResponsiveContainer>
          </div>
        ) : (
          // Standard responsive container for other chart types
          <ResponsiveContainer 
            width="100%" 
            height="100%" 
            debounce={50}
          >
            {renderChart()}
          </ResponsiveContainer>
        )}
      </div>
      
      <div className={`mt-2 flex ${isMobile ? 'flex-col gap-1' : 'justify-between'} ${itemsClass} text-xs max-w-full overflow-hidden`}>
        <div className="flex items-center gap-1 text-foreground/60 truncate">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse flex-shrink-0"></div>
          <span className="truncate">Live Metrics</span>
        </div>
        <div className="font-medium truncate">
          PoSyg™ Consensus
        </div>
      </div>
    </div>
  );
}