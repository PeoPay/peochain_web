import React from "react";
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
  Line,
} from "recharts";

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
  mode?: "distribution" | "value" | "metrics";
}

export function TokenomicsDiagram({
  className = "",
  mode = "distribution",
}: TokenomicsDiagramProps) {
  // Updated Token Distribution Data with accurate data
  const distributionData: TokenDistributionData[] = [
    { name: "Public Allocation", value: 30, color: "#38a169" },
    { name: "Ecosystem Fund", value: 25, color: "#5a8364" },
    { name: "Team & Advisors", value: 15, color: "#276749" },
    { name: "Reserve Fund", value: 15, color: "#68d391" },
    { name: "Liquidity Provision", value: 10, color: "#2f855a" },
    { name: "Community Rewards", value: 5, color: "#9ae6b4" },
  ];

  // Updated Token Value Projections with final token value data
  const valueData: TokenValueData[] = [
    { quarter: "Q3 2024", price: 0.05, volume: 12 },
    { quarter: "Q4 2024", price: 0.09, volume: 20 },
    { quarter: "Q1 2025", price: 0.14, volume: 30 },
    { quarter: "Q2 2025", price: 0.21, volume: 45 },
    { quarter: "Q3 2025", price: 0.28, volume: 60 },
    { quarter: "Q4 2025", price: 0.35, volume: 75 },
    { quarter: "Q1 2026", price: 0.44, volume: 90 },
    { quarter: "Q2 2026", price: 0.52, volume: 105 },
    { quarter: "Q3 2026", price: 0.61, volume: 120 },
    { quarter: "Q4 2026", price: 0.7, volume: 135 },
  ];

  // Updated Token Metrics with finalized data and clear labels
  const metricsData: TokenMetricData[] = [
    { name: "Total Supply", value: 1000000000, color: "#38a169" },
    { name: "Circulating Supply (Y1)", value: 300000000, color: "#5a8364" },
    { name: "Staking Rewards (Annual)", value: 90000000, color: "#276749" },
    { name: "Governance Allocation", value: 70000000, color: "#68d391" },
    { name: "Ecosystem Development", value: 200000000, color: "#2f855a" },
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
    const [width, setWidth] = React.useState(
      typeof window !== "undefined" ? window.innerWidth : 0,
    );

    React.useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width < 768; // Mobile breakpoint
  };

  const isMobile = useIsMobile();

  const renderDistributionChart = () => {
    // Determine the optimal chart dimensions based on screen size
    const determineChartDimensions = () => {
      const width = window.innerWidth;
      
      if (width <= 480) { // Small mobile
        return {
          height: "340px",
          innerRadius: 45,
          outerRadius: 75,
          cy: "42%"
        };
      } else if (width <= 640) { // Mobile
        return {
          height: "360px",
          innerRadius: 55,
          outerRadius: 85,
          cy: "43%"
        };
      } else if (width <= 768) { // Tablet
        return {
          height: "400px",
          innerRadius: 65,
          outerRadius: 100,
          cy: "44%"
        };
      } else { // Desktop
        return {
          height: "420px",
          innerRadius: 75,
          outerRadius: 115,
          cy: "45%"
        };
      }
    };
    
    const dimensions = determineChartDimensions();
    
    return (
      <div className="w-full h-full">
        <h3 className="text-lg font-semibold text-center mb-3 text-primary">
          Token Distribution
        </h3>
        <div
          className="w-full"
          style={{ height: dimensions.height }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart
              margin={{
                top: 10,
                right: isMobile ? 15 : 35,
                bottom: isMobile ? 30 : 20,
                left: isMobile ? 15 : 35,
              }}
            >
              <Pie
                data={distributionData}
                cx="50%"
                cy={dimensions.cy}
                innerRadius={dimensions.innerRadius}
                outerRadius={dimensions.outerRadius}
                paddingAngle={5} // Increased for better segment separation
                dataKey="value"
                label={false} // Keep labels disabled to prevent overlapping
                labelLine={false} // Keep label lines disabled
                animationDuration={800}
                animationBegin={100}
              >
                {distributionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth={1.5}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value}%`, "Allocation"]}
                contentStyle={{
                  fontSize: isMobile ? "12px" : "13px",
                  fontWeight: 500,
                  borderRadius: "6px",
                  border: "1px solid #276749",
                  backgroundColor: "rgba(255, 255, 255, 0.98)",
                  padding: "8px 12px",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
                }}
                labelStyle={{
                  fontWeight: 600,
                  marginBottom: "6px",
                  color: "#333"
                }}
                itemStyle={{
                  padding: "3px 0"
                }}
              />
              <Legend
                layout={isMobile ? "horizontal" : "vertical"}
                align={isMobile ? "center" : "right"}
                verticalAlign={isMobile ? "bottom" : "middle"}
                wrapperStyle={{
                  paddingLeft: isMobile ? 0 : 25,
                  paddingTop: isMobile ? 12 : 0,
                  fontSize: isMobile ? "10px" : "12px",
                  fontWeight: 500,
                  lineHeight: "1.6em",
                  maxWidth: isMobile ? "100%" : "40%"
                }}
                iconSize={isMobile ? 8 : 10}
                iconType="circle"
                formatter={(value, entry, index) => {
                  // Enhanced legend with percentage
                  const item = distributionData[index];
                  return <span style={{ color: "#333" }}>{`${value}: ${item.value}%`}</span>;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Mobile-specific grid layout for better readability */}
        {isMobile && (
          <div className="grid grid-cols-2 gap-3 text-xs mt-3 px-3 pb-2">
            {distributionData.map((item, index) => (
              <div key={index} className="flex items-center border-b border-gray-100 pb-1.5">
                <div
                  className="w-3 h-3 rounded-full mr-1.5 flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-xs font-semibold truncate">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderValueChart = () => {
    // More aggressive filtering for mobile to prevent overlapping
    const filteredData = (() => {
      if (window.innerWidth <= 480) {
        // Show only every 3rd point for very small screens
        return valueData.filter(
          (_, i) => i % 3 === 0 || i === valueData.length - 1,
        );
      } else if (window.innerWidth <= 768) {
        // Show only every 2nd point for tablets/small screens
        return valueData.filter(
          (_, i) => i % 2 === 0 || i === valueData.length - 1,
        );
      }
      return valueData; // Show all points on larger screens
    })();

    return (
      <div className="w-full h-full">
        <h3 className="text-lg font-semibold text-center mb-2 text-primary">
          Token Value Projection
        </h3>
        <div
          className="w-full"
          style={{ height: isMobile ? "350px" : "400px" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={filteredData}
              margin={{
                top: 20,
                right: isMobile ? 75 : 85,
                left: isMobile ? 40 : 50,
                bottom: isMobile ? 100 : 70,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(90, 131, 100, 0.2)"
              />
              <XAxis
                dataKey="quarter"
                tick={{
                  fontSize: isMobile ? 9 : 11,
                  fontWeight: 500,
                  width: isMobile ? 30 : 60,
                }}
                angle={isMobile ? -45 : 0}
                textAnchor={isMobile ? "end" : "middle"}
                height={isMobile ? 90 : 60}
                tickMargin={isMobile ? 15 : 10}
                padding={{ left: 10, right: 10 }}
                stroke="#666"
                interval={0} // Force showing all ticks that were filtered
              />
              <YAxis
                yAxisId="left"
                tick={{
                  fontSize: isMobile ? 10 : 11,
                  fontWeight: 500,
                }}
                tickCount={5} // Reduced tick count
                domain={[0, 0.8]}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
                width={isMobile ? 50 : 60}
                stroke="#276749"
                label={{
                  value: "Price ($)",
                  angle: -90,
                  position: "insideLeft",
                  offset: isMobile ? -15 : -10,
                  style: {
                    textAnchor: "middle",
                    fill: "#276749",
                    fontSize: isMobile ? 10 : 12,
                    fontWeight: 500,
                  },
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{
                  fontSize: isMobile ? 10 : 11,
                  fontWeight: 500,
                }}
                tickCount={5} // Reduced tick count
                domain={[0, "dataMax + 20"]}
                tickFormatter={(value) => `${value}M`}
                width={isMobile ? 50 : 60}
                stroke="#5a8364"
                label={{
                  value: "Volume ($M)",
                  angle: 90,
                  position: "insideRight",
                  offset: isMobile ? 10 : 5,
                  style: {
                    textAnchor: "middle",
                    fill: "#5a8364",
                    fontSize: isMobile ? 10 : 12,
                    fontWeight: 500,
                  },
                }}
              />
              <Tooltip
                formatter={(value: number, name) => {
                  if (name === "price")
                    return [`$${value.toFixed(2)}`, "Token Price"];
                  return [`$${value}M`, "Trading Volume"];
                }}
                contentStyle={{
                  fontSize: isMobile ? "11px" : "12px",
                  fontWeight: 500,
                  borderRadius: "6px",
                  border: "1px solid #276749",
                  backgroundColor: "rgba(255, 255, 255, 0.98)",
                  padding: "8px 12px",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
                }}
                labelStyle={{
                  fontWeight: 600,
                  marginBottom: "6px",
                  color: "#333"
                }}
                itemStyle={{
                  padding: "3px 0",
                  color: "#444"
                }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: 15,
                  paddingBottom: 10,
                  fontWeight: 500,
                  fontSize: isMobile ? "10px" : "12px",
                }}
                iconSize={isMobile ? 8 : 10}
                iconType="circle"
                layout={isMobile ? "horizontal" : "horizontal"}
                align="center"
                verticalAlign="bottom"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="price"
                stroke="#276749"
                strokeWidth={2.5}
                activeDot={{
                  r: 6,
                  fill: "#276749",
                  stroke: "#fff",
                  strokeWidth: 1.5,
                }}
                name="Token Price"
                dot={{
                  strokeWidth: 1.5,
                  r: 3,
                  fill: "#fff",
                  stroke: "#276749",
                }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="volume"
                stroke="#5a8364"
                strokeWidth={2.5}
                activeDot={{
                  r: 6,
                  fill: "#5a8364",
                  stroke: "#fff",
                  strokeWidth: 1.5,
                }}
                name="Trading Volume"
                dot={{
                  strokeWidth: 1.5,
                  r: 3,
                  fill: "#fff",
                  stroke: "#5a8364",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderMetricsChart = () => {
    // Enhanced formatter that applies different formatting based on screen size
    const enhancedFormatter = (value: number) => {
      if (isMobile) {
        // More concise labels for mobile
        if (value >= 1000000000) {
          return `${(value / 1000000000).toFixed(1)}B`;
        } else if (value >= 1000000) {
          return `${(value / 1000000).toFixed(0)}M`;
        } else if (value >= 1000) {
          return `${(value / 1000).toFixed(0)}K`;
        }
      } else {
        // Standard formatting for desktop
        if (value >= 1000000000) {
          return `${(value / 1000000000).toFixed(1)}B`;
        } else if (value >= 1000000) {
          return `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
          return `${(value / 1000).toFixed(1)}K`;
        }
      }
      return value.toString();
    };

    return (
      <div className="w-full h-full">
        <h3 className="text-lg font-semibold text-center mb-2 text-primary">
          Key Token Metrics
        </h3>
        <div
          className="w-full"
          style={{ height: isMobile ? "380px" : "440px" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={metricsData}
              layout="vertical"
              margin={{
                top: 20,
                right: isMobile ? 100 : 120, // Increased right margin for labels
                left: isMobile ? 140 : 175, // Adjusted left margin for names
                bottom: 40,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(90, 131, 100, 0.2)"
              />
              <XAxis
                type="number"
                tickFormatter={enhancedFormatter}
                tick={{
                  fontSize: isMobile ? 10 : 11,
                  fontWeight: 500,
                }}
                tickCount={isMobile ? 3 : 4} // Fewer ticks on mobile
                domain={[0, "dataMax + 100000000"]}
                padding={{ left: 0, right: 20 }}
                stroke="#666"
                label={{
                  value: "Token Amount",
                  position: "insideBottom",
                  offset: -15,
                  style: {
                    textAnchor: "middle",
                    fill: "#276749",
                    fontSize: isMobile ? 10 : 12,
                    fontWeight: 500,
                  },
                }}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={isMobile ? 135 : 170}
                tick={{
                  fontSize: isMobile ? 10 : 11,
                  fontWeight: 500,
                  width: isMobile ? 130 : 165,
                  fill: "#333",
                }}
                tickMargin={10}
              />
              <Tooltip
                formatter={(value: number) => [formatNumber(value), "Tokens"]}
                contentStyle={{
                  fontSize: isMobile ? "11px" : "12px",
                  fontWeight: 500,
                  borderRadius: "6px",
                  border: "1px solid #276749",
                  backgroundColor: "rgba(255, 255, 255, 0.98)",
                  padding: "8px 12px",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
                }}
                labelStyle={{
                  fontWeight: 600,
                  marginBottom: "6px",
                  color: "#333"
                }}
                itemStyle={{
                  padding: "3px 0",
                  color: "#444"
                }}
              />
              <Bar
                dataKey="value"
                name="Token Amount"
                barSize={isMobile ? 16 : 24}
                label={{
                  position: "right",
                  formatter: enhancedFormatter,
                  fill: "#333",
                  fontSize: isMobile ? 10 : 11,
                  fontWeight: 600,
                  offset: 15,
                }}
              >
                {metricsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Add a table view for mobile as backup to ensure readability */}
        {isMobile && (
          <div className="mt-2 px-4 text-xs">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {metricsData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-200 pb-1"
                >
                  <span className="font-medium">{item.name}:</span>
                  <span className="font-semibold">
                    {formatNumber(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderComponent = () => {
    switch (mode) {
      case "distribution":
        return renderDistributionChart();
      case "value":
        return renderValueChart();
      case "metrics":
        return renderMetricsChart();
      default:
        return renderDistributionChart();
    }
  };

  // Adjust sizes based on screen width and chart type for optimal readability
  const [chartHeight, setChartHeight] = React.useState(480);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // Mode-specific height adjustments
      switch (mode) {
        case "metrics":
          // Metrics needs more height for the bars and possible table view
          if (width <= 480) {
            setChartHeight(480); // Small mobile - extra space for table
          } else if (width <= 640) {
            setChartHeight(500); // Mobile - extra space for bars
          } else if (width <= 768) {
            setChartHeight(520); // Tablet
          } else if (width <= 1024) {
            setChartHeight(550); // Small desktop
          } else {
            setChartHeight(580); // Large desktop
          }
          break;

        case "value":
          // Value projection needs more vertical space for the time axis
          if (width <= 480) {
            setChartHeight(450); // Small mobile
          } else if (width <= 640) {
            setChartHeight(480); // Mobile
          } else if (width <= 768) {
            setChartHeight(500); // Tablet
          } else if (width <= 1024) {
            setChartHeight(520); // Small desktop
          } else {
            setChartHeight(540); // Large desktop
          }
          break;

        case "distribution":
        default:
          // Distribution chart is more compact
          if (width <= 480) {
            setChartHeight(400); // Small mobile
          } else if (width <= 640) {
            setChartHeight(430); // Mobile
          } else if (width <= 768) {
            setChartHeight(460); // Tablet
          } else if (width <= 1024) {
            setChartHeight(480); // Small desktop
          } else {
            setChartHeight(500); // Large desktop
          }
          break;
      }
    };

    // Set initial size
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, [mode]);

  return (
    <div className={`w-full tokenomics-diagram ${className}`}>
      <div className="chart-container" style={{ height: chartHeight }}>
        {renderComponent()}
      </div>
    </div>
  );
}
