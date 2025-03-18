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
  // Updated Token Distribution Data with accurate data
  const distributionData: TokenDistributionData[] = [
    { name: 'Public Allocation', value: 30, color: '#38a169' },
    { name: 'Ecosystem Fund', value: 25, color: '#5a8364' },
    { name: 'Team & Advisors', value: 15, color: '#276749' },
    { name: 'Reserve Fund', value: 15, color: '#68d391' },
    { name: 'Liquidity Provision', value: 10, color: '#2f855a' },
    { name: 'Community Rewards', value: 5, color: '#9ae6b4' }
  ];
  
  // Updated Token Value Projections with final token value data
  const valueData: TokenValueData[] = [
    { quarter: 'Q3 2024', price: 0.05, volume: 12 },
    { quarter: 'Q4 2024', price: 0.09, volume: 20 },
    { quarter: 'Q1 2025', price: 0.14, volume: 30 },
    { quarter: 'Q2 2025', price: 0.21, volume: 45 },
    { quarter: 'Q3 2025', price: 0.28, volume: 60 },
    { quarter: 'Q4 2025', price: 0.35, volume: 75 },
    { quarter: 'Q1 2026', price: 0.44, volume: 90 },
    { quarter: 'Q2 2026', price: 0.52, volume: 105 },
    { quarter: 'Q3 2026', price: 0.61, volume: 120 },
    { quarter: 'Q4 2026', price: 0.70, volume: 135 }
  ];
  
  // Updated Token Metrics with finalized data and clear labels
  const metricsData: TokenMetricData[] = [
    { name: 'Total Supply', value: 1000000000, color: '#38a169' },
    { name: 'Circulating Supply (Y1)', value: 300000000, color: '#5a8364' },
    { name: 'Staking Rewards (Annual)', value: 90000000, color: '#276749' },
    { name: 'Governance Allocation', value: 70000000, color: '#68d391' },
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
        <h3 className="text-lg font-semibold text-center mb-3 text-primary">Token Distribution</h3>
        <div className="w-full" style={{ height: isMobile ? '330px' : '380px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart 
              margin={{ 
                top: 10, 
                right: isMobile ? 10 : 30, 
                bottom: 20, 
                left: isMobile ? 10 : 30 
              }}
            >
              <Pie
                data={distributionData}
                cx="50%"
                cy="45%"
                innerRadius={isMobile ? 50 : 70}
                outerRadius={isMobile ? 80 : 110}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => 
                  isMobile 
                    ? `${(percent * 100).toFixed(0)}%` 
                    : `${name}: ${(percent * 100).toFixed(0)}%`
                }
                labelLine={{ 
                  stroke: '#276749', 
                  strokeWidth: 1,
                  strokeOpacity: 0.8
                }}
              >
                {distributionData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="#fff"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Allocation']}
                contentStyle={{ 
                  fontSize: '13px',
                  fontWeight: 500,
                  borderRadius: '4px',
                  border: '1px solid #276749',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)'
                }}
                labelStyle={{
                  fontWeight: 600,
                  marginBottom: '5px'
                }}
              />
              {!isMobile && (
                <Legend 
                  layout="vertical" 
                  align="right" 
                  verticalAlign="middle" 
                  wrapperStyle={{ 
                    right: 0, 
                    paddingLeft: 20,
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: '1.5em'
                  }}
                  iconSize={10}
                  iconType="circle"
                />
              )}
            </PieChart>
          </ResponsiveContainer>
        </div>
        {isMobile && (
          <div className="grid grid-cols-2 gap-2 text-xs mt-3 px-2">
            {distributionData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-1.5 flex-shrink-0" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm font-medium truncate">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  const renderValueChart = () => {
    // Filter for mobile to show fewer data points - show only every 2nd point on mobile
    const mobileData = isMobile ? valueData.filter((_, i) => i % 2 === 0) : valueData;
    
    return (
      <div className="w-full h-full">
        <h3 className="text-lg font-semibold text-center mb-2 text-primary">Token Value Projection</h3>
        <div className="w-full" style={{ height: isMobile ? '330px' : '380px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={mobileData}
              margin={{ 
                top: 20, 
                right: isMobile ? 60 : 70, 
                left: isMobile ? 35 : 45, 
                bottom: isMobile ? 85 : 60 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(90, 131, 100, 0.2)" />
              <XAxis 
                dataKey="quarter" 
                tick={{ 
                  fontSize: isMobile ? 10 : 12,
                  fontWeight: 500 
                }}
                angle={isMobile ? -45 : 0}
                textAnchor={isMobile ? "end" : "middle"}
                height={isMobile ? 80 : 50}
                tickMargin={isMobile ? 15 : 10}
                padding={{ left: 10, right: 10 }}
                stroke="#666"
              />
              <YAxis 
                yAxisId="left" 
                tick={{ 
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 500 
                }}
                tickCount={6}
                domain={[0, 0.8]}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                width={isMobile ? 45 : 55}
                stroke="#276749"
                label={{ 
                  value: 'Price ($)', 
                  angle: -90, 
                  position: 'insideLeft',
                  offset: -5,
                  style: { 
                    textAnchor: 'middle',
                    fill: '#276749',
                    fontSize: isMobile ? 11 : 13,
                    fontWeight: 500
                  }
                }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tick={{ 
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 500 
                }}
                tickCount={6}
                domain={[0, 'dataMax + 20']}
                tickFormatter={(value) => `${value}M`}
                width={isMobile ? 45 : 55}
                stroke="#5a8364"
                label={{ 
                  value: 'Volume ($M)', 
                  angle: 90, 
                  position: 'insideRight',
                  offset: 5,
                  style: { 
                    textAnchor: 'middle',
                    fill: '#5a8364',
                    fontSize: isMobile ? 11 : 13,
                    fontWeight: 500
                  }
                }}
              />
              <Tooltip 
                formatter={(value: number, name) => {
                  if (name === 'price') return [`$${value.toFixed(2)}`, 'Token Price'];
                  return [`$${value}M`, 'Trading Volume'];
                }}
                contentStyle={{ 
                  fontSize: '13px',
                  fontWeight: 500,
                  borderRadius: '4px',
                  border: '1px solid #276749',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)'
                }}
                labelStyle={{
                  fontWeight: 600,
                  marginBottom: '5px'
                }}
              />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: 15,
                  paddingBottom: 10,
                  fontWeight: 500,
                  fontSize: '12px'
                }} 
                iconSize={10}
                iconType="circle"
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="price" 
                stroke="#276749" 
                strokeWidth={3}
                activeDot={{ r: 7, fill: '#276749', stroke: '#fff', strokeWidth: 2 }}
                name="Token Price"
                dot={{ 
                  strokeWidth: 2, 
                  r: 4, 
                  fill: '#fff', 
                  stroke: '#276749' 
                }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="volume" 
                stroke="#5a8364" 
                strokeWidth={3}
                activeDot={{ r: 7, fill: '#5a8364', stroke: '#fff', strokeWidth: 2 }}
                name="Trading Volume"
                dot={{ 
                  strokeWidth: 2, 
                  r: 4, 
                  fill: '#fff', 
                  stroke: '#5a8364' 
                }}
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
        <h3 className="text-lg font-semibold text-center mb-2 text-primary">Key Token Metrics</h3>
        <div className="w-full" style={{ height: isMobile ? '330px' : '380px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={metricsData}
              layout="vertical"
              margin={{ 
                top: 20, 
                right: isMobile ? 75 : 95, 
                left: isMobile ? 135 : 170, 
                bottom: 30 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(90, 131, 100, 0.2)" />
              <XAxis 
                type="number" 
                tickFormatter={formatNumber}
                tick={{ 
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 500 
                }}
                tickCount={5}
                domain={[0, 'dataMax + 100000000']}
                padding={{ left: 0, right: 10 }}
                stroke="#666"
                label={{ 
                  value: 'Token Amount', 
                  position: 'insideBottom',
                  offset: -10,
                  style: { 
                    textAnchor: 'middle',
                    fill: '#276749',
                    fontSize: isMobile ? 11 : 13,
                    fontWeight: 500
                  }
                }}
              />
              <YAxis 
                dataKey="name" 
                type="category"
                width={isMobile ? 130 : 165}
                tick={{ 
                  fontSize: isMobile ? 10.5 : 12,
                  fontWeight: 500,
                  width: isMobile ? 125 : 160,
                  fill: '#333'
                }}
                tickMargin={10}
              />
              <Tooltip 
                formatter={(value: number) => [formatNumber(value), 'Tokens']}
                contentStyle={{ 
                  fontSize: '13px',
                  fontWeight: 500,
                  borderRadius: '4px',
                  border: '1px solid #276749',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)'
                }}
                labelStyle={{
                  fontWeight: 600,
                  marginBottom: '5px'
                }}
              />
              <Bar 
                dataKey="value" 
                name="Token Amount"
                barSize={isMobile ? 18 : 26}
                label={{
                  position: 'right',
                  formatter: formatNumber,
                  fill: '#333',
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 600,
                  offset: 8
                }}
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
  
  // Adjust sizes based on screen width - with improved sizing for better readability
  const [chartHeight, setChartHeight] = React.useState(480);
  
  React.useEffect(() => {
    const handleResize = () => {
      // Adjusting chart heights specifically for metrics mode to accommodate longer labels
      if (mode === 'metrics') {
        if (window.innerWidth <= 480) {
          setChartHeight(420); // Small mobile - increased for metrics
        } else if (window.innerWidth <= 640) {
          setChartHeight(450); // Mobile - increased for metrics
        } else if (window.innerWidth <= 768) {
          setChartHeight(480); // Tablet - increased for metrics
        } else if (window.innerWidth <= 1024) {
          setChartHeight(500); // Small desktop - increased for metrics
        } else {
          setChartHeight(530); // Large desktop - increased for metrics
        }
      } else {
        // Standard heights for other chart types
        if (window.innerWidth <= 480) {
          setChartHeight(380); // Small mobile 
        } else if (window.innerWidth <= 640) {
          setChartHeight(420); // Mobile
        } else if (window.innerWidth <= 768) {
          setChartHeight(450); // Tablet
        } else if (window.innerWidth <= 1024) {
          setChartHeight(480); // Small desktop
        } else {
          setChartHeight(500); // Large desktop
        }
      }
    };
    
    // Set initial size
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, [mode]);

  return (
    <div className={`w-full tokenomics-diagram ${className}`}>
      <div className="chart-container" style={{ height: chartHeight }}>
        {renderComponent()}
      </div>
    </div>
  );
}