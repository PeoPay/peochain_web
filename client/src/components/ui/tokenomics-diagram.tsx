import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';

interface TokenDistributionData {
  name: string;
  value: number;
  color: string;
}

interface TokenValueData {
  quarter: string;
  price: number;
  volume: number;
}

interface TokenMetricData {
  name: string;
  value: number;
  color: string;
}

interface TokenomicsDiagramProps {
  className?: string;
  mode?: 'distribution' | 'value' | 'metrics';
}

export function TokenomicsDiagram({ className = '', mode = 'distribution' }: TokenomicsDiagramProps) {
  // Token Distribution Data
  const distributionData: TokenDistributionData[] = [
    { name: 'Active Validators', value: 30, color: '#38a169' },
    { name: 'Ecosystem Growth', value: 25, color: '#5a8364' },
    { name: 'Team Commitment', value: 15, color: '#276749' },
    { name: 'Stabilization Fund', value: 15, color: '#68d391' },
    { name: 'Liquidity', value: 10, color: '#2f855a' },
    { name: 'Community Adoption', value: 5, color: '#9ae6b4' }
  ];
  
  // Token Value Projections
  const valueData: TokenValueData[] = [
    { quarter: 'Q4 2024', price: 0.05, volume: 12 },
    { quarter: 'Q1 2025', price: 0.08, volume: 18 },
    { quarter: 'Q2 2025', price: 0.12, volume: 28 },
    { quarter: 'Q3 2025', price: 0.15, volume: 35 },
    { quarter: 'Q4 2025', price: 0.22, volume: 42 },
    { quarter: 'Q1 2026', price: 0.30, volume: 55 },
    { quarter: 'Q2 2026', price: 0.38, volume: 65 },
    { quarter: 'Q3 2026', price: 0.45, volume: 78 },
    { quarter: 'Q4 2026', price: 0.53, volume: 85 },
    { quarter: 'Q1 2027', price: 0.62, volume: 92 },
    { quarter: 'Q2 2027', price: 0.70, volume: 110 }
  ];
  
  // Token Metrics
  const metricsData: TokenMetricData[] = [
    { name: 'Total Supply', value: 1000000000, color: '#38a169' },
    { name: 'Circulating Supply (Year 1)', value: 350000000, color: '#5a8364' },
    { name: 'Staking Rewards (Annual)', value: 100000000, color: '#276749' },
    { name: 'Governance Allocation', value: 75000000, color: '#68d391' },
    { name: 'Ecosystem Development', value: 200000000, color: '#2f855a' }
  ];
  
  // Format large numbers
  const formatNumber = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };
  
  // Helper for determining if mobile view is needed
  const useIsMobile = () => {
    const [width, setWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
    React.useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return width < 768; // Mobile breakpoint
  };
  
  const isMobile = useIsMobile();
  
  const renderDistributionChart = () => {
    return (
      <div className="w-full h-full">
        <h3 className="text-lg font-semibold text-center mb-2 text-primary">Token Distribution</h3>
        <div className="w-full" style={{ height: isMobile ? '280px' : '320px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 10, right: 30, bottom: 20, left: 30 }}>
              <Pie
                data={distributionData}
                cx="50%"
                cy="45%"
                innerRadius={isMobile ? 35 : 55}
                outerRadius={isMobile ? 60 : 80}
                paddingAngle={3}
                dataKey="value"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: '#276749', strokeWidth: 0.5 }}
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Allocation']}
                contentStyle={{ fontSize: '12px' }}
              />
              {!isMobile && <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ right: 0, paddingLeft: 20 }} />}
            </PieChart>
          </ResponsiveContainer>
        </div>
        {isMobile && (
          <div className="grid grid-cols-2 gap-1 text-xs mt-2">
            {distributionData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: item.color }}></div>
                <span>{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  const renderValueChart = () => {
    // Filter for mobile to show fewer data points
    const mobileData = isMobile ? valueData.filter((_, i) => i % 2 === 0) : valueData;
    
    return (
      <div className="w-full h-full">
        <h3 className="text-lg font-semibold text-center mb-2 text-primary">Token Value Projection</h3>
        <div className="w-full" style={{ height: isMobile ? '300px' : '350px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={mobileData}
              margin={{ top: 10, right: 45, left: 25, bottom: isMobile ? 60 : 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(90, 131, 100, 0.2)" />
              <XAxis 
                dataKey="quarter" 
                tick={{ fontSize: 10 }}
                angle={isMobile ? -45 : 0}
                textAnchor={isMobile ? "end" : "middle"}
                height={isMobile ? 75 : 45}
                tickMargin={isMobile ? 12 : 8}
                padding={{ left: 5, right: 5 }}
              />
              <YAxis 
                yAxisId="left" 
                tick={{ fontSize: 10 }}
                tickCount={5}
                tickFormatter={(value) => `$${value.toFixed(1)}`}
                width={40}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tick={{ fontSize: 10 }}
                tickCount={5}
                tickFormatter={(value) => `${value}M`}
                width={40}
              />
              <Tooltip 
                formatter={(value: number, name) => {
                  if (name === 'price') return [`$${value.toFixed(2)}`, 'Token Price'];
                  return [`$${value}M`, 'Trading Volume'];
                }}
                contentStyle={{ fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ paddingTop: 10 }} />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="price" 
                stroke="#276749" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
                name="Token Price"
                dot={{ strokeWidth: 1, r: 3 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="volume" 
                stroke="#9ae6b4" 
                strokeWidth={2}
                dot={{ strokeWidth: 1, r: 3 }}
                name="Trading Volume ($M)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  const renderMetricsChart = () => {
    return (
      <div className="w-full h-full">
        <h3 className="text-lg font-semibold text-center mb-2 text-primary">Token Metrics</h3>
        <div className="w-full" style={{ height: isMobile ? '300px' : '350px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={metricsData}
              layout="vertical"
              margin={{ top: 15, right: 40, left: isMobile ? 135 : 170, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(90, 131, 100, 0.2)" />
              <XAxis 
                type="number" 
                tickFormatter={formatNumber}
                tick={{ fontSize: 10 }}
                tickCount={5}
                padding={{ left: 0, right: 10 }}
              />
              <YAxis 
                dataKey="name" 
                type="category"
                width={isMobile ? 130 : 165}
                tick={{ 
                  fontSize: isMobile ? 9 : 10,
                  width: isMobile ? 125 : 160
                }}
                tickMargin={8}
              />
              <Tooltip 
                formatter={(value: number) => [formatNumber(value), 'Tokens']}
                contentStyle={{ fontSize: '12px' }}
              />
              <Bar 
                dataKey="value" 
                name="Tokens"
                barSize={isMobile ? 12 : 20}
              >
                {metricsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  
  const renderComponent = () => {
    switch (mode) {
      case 'distribution':
        return renderDistributionChart();
      case 'value':
        return renderValueChart();
      case 'metrics':
        return renderMetricsChart();
      default:
        return renderDistributionChart();
    }
  };
  
  // Adjust sizes based on screen width - increased to prevent text overlap
  const [chartHeight, setChartHeight] = React.useState(450);
  
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setChartHeight(340); // Small mobile (increased)
      } else if (window.innerWidth <= 640) {
        setChartHeight(380); // Mobile (increased)
      } else if (window.innerWidth <= 768) {
        setChartHeight(400); // Tablet (increased)
      } else {
        setChartHeight(450); // Desktop (increased)
      }
    };
    
    // Set initial size
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`w-full tokenomics-diagram ${className}`}>
      <div className="chart-container" style={{ height: chartHeight }}>
        {renderComponent()}
      </div>
    </div>
  );
}