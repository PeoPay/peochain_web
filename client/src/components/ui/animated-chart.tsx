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
  Bar
} from 'recharts';
import { Badge } from './badge';

// Random data generation
const generateData = (points: number, min: number, max: number, trend: 'up' | 'down' | 'volatile') => {
  const data = [];
  let lastValue = Math.random() * (max - min) + min;

  for (let i = 0; i < points; i++) {
    // Generate next value based on trend
    let nextValue;
    if (trend === 'up') {
      nextValue = lastValue + Math.random() * 10 - 2; // Mostly up
    } else if (trend === 'down') {
      nextValue = lastValue + Math.random() * 10 - 8; // Mostly down
    } else {
      nextValue = lastValue + Math.random() * 20 - 10; // Volatile
    }
    
    // Keep within bounds
    nextValue = Math.max(min, Math.min(max, nextValue));
    
    data.push({
      name: `Day ${i+1}`,
      value: nextValue,
      volume: Math.floor(Math.random() * 10000),
    });
    
    lastValue = nextValue;
  }
  
  return data;
};

// Chart types
type ChartType = 'area' | 'line' | 'bar';

interface AnimatedChartProps {
  className?: string;
}

export function AnimatedChart({ className = '' }: AnimatedChartProps) {
  const [chartType, setChartType] = useState<ChartType>('area');
  const [data, setData] = useState(() => generateData(30, 50, 200, 'up'));
  const [marketTrend, setMarketTrend] = useState<'up' | 'down' | 'volatile'>('up');
  const [isAnimating, setIsAnimating] = useState(true);
  
  // Colors based on current trend
  const getColors = () => {
    if (marketTrend === 'up') {
      return {
        stroke: '#5a8364', // green
        fill: 'rgba(90, 131, 100, 0.2)',
        bar: '#5a8364'
      };
    } else if (marketTrend === 'down') {
      return {
        stroke: '#e05252', // red
        fill: 'rgba(224, 82, 82, 0.2)',
        bar: '#e05252'
      };
    } else {
      return {
        stroke: '#7c6cea', // purple
        fill: 'rgba(124, 108, 234, 0.2)',
        bar: '#7c6cea'
      };
    }
  };
  
  const colors = getColors();

  // Change chart type periodically
  useEffect(() => {
    if (!isAnimating) return;
    
    const chartInterval = setInterval(() => {
      setChartType(prevType => {
        if (prevType === 'area') return 'line';
        if (prevType === 'line') return 'bar';
        return 'area';
      });
    }, 5000);
    
    return () => clearInterval(chartInterval);
  }, [isAnimating]);
  
  // Change market trend periodically
  useEffect(() => {
    if (!isAnimating) return;
    
    const trendInterval = setInterval(() => {
      setMarketTrend(prev => {
        const trends: Array<'up' | 'down' | 'volatile'> = ['up', 'down', 'volatile'];
        const currentIndex = trends.indexOf(prev);
        return trends[(currentIndex + 1) % trends.length];
      });
      
      // Generate new data when trend changes
      setData(generateData(30, 50, 200, marketTrend));
    }, 7000);
    
    return () => clearInterval(trendInterval);
  }, [isAnimating, marketTrend]);
  
  const renderChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <AreaChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.stroke} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors.stroke} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(2)} PEOC`, 'Value']}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={colors.stroke} 
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        );
      
      case 'line':
        return (
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(2)} PEOC`, 'Value']}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={colors.stroke} 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        );
      
      case 'bar':
        return (
          <BarChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip 
              formatter={(value: number, name) => {
                if (name === 'value') return [`${value.toFixed(2)} PEOC`, 'Value'];
                return [`${value.toLocaleString()}`, 'Volume'];
              }}
            />
            <Bar dataKey="value" fill={colors.bar} />
            <Bar dataKey="volume" fill={colors.bar} opacity={0.4} />
          </BarChart>
        );
    }
  };
  
  const getTrendBadge = () => {
    if (marketTrend === 'up') {
      return <Badge className="bg-green-500/20 text-green-700 border-green-300">↑ BULLISH</Badge>;
    } else if (marketTrend === 'down') {
      return <Badge className="bg-red-500/20 text-red-700 border-red-300">↓ BEARISH</Badge>;
    } else {
      return <Badge className="bg-purple-500/20 text-purple-700 border-purple-300">↔ VOLATILE</Badge>;
    }
  };
  
  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
          <span className="font-medium text-sm">PEOC/USD</span>
        </div>
        {getTrendBadge()}
      </div>
      
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 flex justify-between items-center">
        <div className="text-xs text-foreground/60">Last updated: just now</div>
        <div className="text-sm font-semibold">
          {marketTrend === 'up' && '⬆️ '} 
          {marketTrend === 'down' && '⬇️ '} 
          {marketTrend === 'volatile' && '↕️ '}
          {data[data.length - 1].value.toFixed(2)} PEOC
        </div>
      </div>
    </div>
  );
}