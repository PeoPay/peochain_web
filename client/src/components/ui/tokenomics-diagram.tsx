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
}: TokenomicsDiagramProps): React.ReactNode {
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
          <ResponsiveContainer width="95%" height="100%">
            <PieChart
              margin={{
                top: 15,
                right: isMobile ? 15 : 45,
                bottom: isMobile ? 30 : 30,
                left: isMobile ? 15 : 45,
              }}
            >
              <Pie
                data={distributionData}
                cx="50%"
                cy={dimensions.cy}
                innerRadius={dimensions.innerRadius}
                outerRadius={dimensions.outerRadius}
                paddingAngle={6} // Increased for better segment separation
                dataKey="value"
                label={false} // Completely disable labels to prevent any overlapping
                labelLine={false} // Disable label lines
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
    // Simplify data for better readability
    const simplifyData = () => {
      const width = window.innerWidth;
      
      // Very aggressive filtering for small screens
      if (width <= 480) {
        // Just show first, middle points and last
        const result = [
          valueData[0],
          valueData[4],
          valueData[valueData.length - 1]
        ];
        return result;
      } else if (width <= 640) {
        // Show fewer points on mobile (just 4 strategic points)
        const result = [
          valueData[0], 
          valueData[3],
          valueData[6],
          valueData[valueData.length - 1]
        ];
        return result;
      } else if (width <= 768) {
        // Show only odd indices on tablets (approximately half the points)
        return valueData.filter((_, i) => i % 2 === 0 || i === valueData.length - 1);
      }
      // Show more points on larger screens
      return valueData;
    };

    const filteredData = simplifyData();

    return (
      <div className="w-full h-full">
        <h3 className="text-lg font-semibold text-center mb-3 text-primary">
          Token Value Projection
        </h3>
        <div className="w-full flex flex-col">
          {/* Line chart for main visualization */}
          <div className="w-full mx-auto" style={{ height: isMobile ? "400px" : "440px", maxWidth: "900px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={filteredData}
                margin={{
                  top: 20,
                  right: isMobile ? 45 : 85,
                  left: isMobile ? 35 : 65,
                  bottom: isMobile ? 80 : 50,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(90, 131, 100, 0.15)" />
                <XAxis
                  dataKey="quarter"
                  tick={{
                    fontSize: isMobile ? 10 : 12,
                    fontWeight: 500,
                  }}
                  angle={isMobile ? -60 : 0} // Increased angle for better separation
                  textAnchor={isMobile ? "end" : "middle"}
                  height={isMobile ? 70 : 40} // Increased height for labels
                  tickMargin={isMobile ? 15 : 8} // Increased margin between axis and labels
                  padding={{ left: 20, right: 20 }} // Increased padding
                  stroke="#666"
                  interval={0} // Show all filtered points
                />
                <YAxis
                  yAxisId="left"
                  tick={{
                    fontSize: isMobile ? 11 : 12,
                    fontWeight: 500,
                  }}
                  tickCount={4} // Further reduced tick count
                  domain={[0, 0.8]}
                  tickFormatter={(value) => `$${value.toFixed(1)}`}
                  width={isMobile ? 40 : 50}
                  stroke="#276749"
                  label={{
                    value: "Price",
                    angle: -90,
                    position: "insideLeft",
                    offset: isMobile ? -5 : 0,
                    style: {
                      textAnchor: "middle",
                      fill: "#276749",
                      fontSize: isMobile ? 11 : 12,
                      fontWeight: 500,
                    },
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{
                    fontSize: isMobile ? 11 : 12,
                    fontWeight: 500,
                  }}
                  tickCount={4} // Further reduced tick count
                  domain={[0, 150]}
                  tickFormatter={(value) => `${value}M`}
                  width={isMobile ? 40 : 50}
                  stroke="#5a8364"
                />
                <Tooltip
                  formatter={(value: number, name) => {
                    if (name === "price")
                      return [`$${value.toFixed(2)}`, "Token Price"];
                    return [`$${value}M`, "Volume"];
                  }}
                  contentStyle={{
                    fontSize: isMobile ? "11px" : "12px",
                    fontWeight: 500,
                    borderRadius: "6px",
                    border: "1px solid #276749",
                    backgroundColor: "rgba(255, 255, 255, 0.98)",
                    padding: "8px 12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
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
                    paddingTop: 10,
                    paddingBottom: 5,
                    fontWeight: 500,
                    fontSize: isMobile ? "11px" : "12px",
                  }}
                  iconSize={isMobile ? 10 : 12}
                  iconType="circle"
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="price"
                  stroke="#276749"
                  strokeWidth={3}
                  activeDot={{
                    r: 7,
                    fill: "#276749",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                  name="Token Price"
                  dot={{
                    strokeWidth: 2,
                    r: 4,
                    fill: "#fff",
                    stroke: "#276749",
                  }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="volume"
                  stroke="#5a8364"
                  strokeWidth={3}
                  activeDot={{
                    r: 7,
                    fill: "#5a8364",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                  name="Trading Volume"
                  dot={{
                    strokeWidth: 2,
                    r: 4,
                    fill: "#fff",
                    stroke: "#5a8364",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Mobile-specific summary table for better readability */}
          {isMobile && (
            <div className="mt-2 px-2">
              <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-2 pb-1 text-xs">
                <div className="flex flex-col">
                  <span className="font-medium text-xs text-gray-600">Launch Price:</span>
                  <span className="font-semibold text-sm">${valueData[0].price.toFixed(2)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-xs text-gray-600">Projected Price (EOY):</span>
                  <span className="font-semibold text-sm">${valueData[valueData.length-1].price.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMetricsChart = () => {
    // Enhanced formatter that applies different formatting based on screen size
    const enhancedFormatter = (value: number) => {
      if (isMobile) {
        // Even more concise labels for mobile to prevent truncation
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
          return `${(value / 1000000).toFixed(0)}M`;
        } else if (value >= 1000) {
          return `${(value / 1000).toFixed(0)}K`;
        }
      }
      return value.toString();
    };

    // Create shortened names for mobile if needed
    const getShortenedNames = () => {
      if (window.innerWidth <= 480) {
        return metricsData.map(item => ({
          ...item,
          displayName: item.name
            .replace("Supply", "Sup.")
            .replace("Development", "Dev.")
            .replace("Allocation", "Alloc.")
            .replace("Annual", "Ann.")
        }));
      }
      return metricsData;
    };

    const displayData = getShortenedNames();

    return (
      <div className="w-full h-full">
        <h3 className="text-lg font-semibold text-center mb-3 text-primary">
          Key Token Metrics
        </h3>
        
        {/* Using tables for better metric display instead of problematic bar charts on mobile */}
        {isMobile ? (
          <div className="w-full px-2">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-3 py-2.5 text-left font-semibold text-gray-700 border-b">Metric</th>
                    <th className="px-3 py-2.5 text-right font-semibold text-gray-700 border-b">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {metricsData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-3 py-3 text-gray-800 font-medium border-b border-gray-100">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                          {item.name}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right text-gray-800 font-semibold border-b border-gray-100">
                        {formatNumber(item.value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Visual representation with simplified bars */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2 text-gray-700 text-center">Distribution Visualization</h4>
              {metricsData.map((item, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium">{item.name}</span>
                    <span className="text-xs font-semibold">{enhancedFormatter(item.value)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ 
                        width: `${(item.value / 1000000000) * 100}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Desktop view with improved bar chart
          <div className="w-full mx-auto" style={{ height: "480px", maxWidth: "850px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={displayData}
                layout="vertical"
                margin={{
                  top: 25,
                  right: 200, // Maximum right margin for labels
                  left: 260, // Maximum left margin for names
                  bottom: 45,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(90, 131, 100, 0.15)" />
                <XAxis
                  type="number"
                  tickFormatter={enhancedFormatter}
                  tick={{
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                  tickCount={4}
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
                      fontSize: 13,
                      fontWeight: 500,
                    },
                  }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={230} // Much wider to accommodate full labels
                  tick={{
                    fontSize: 12,
                    fontWeight: 500,
                    width: 225, // Significantly increased width for text content
                    fill: "#333",
                  }}
                  tickMargin={25} // Further increased margin between axis and names
                />
                <Tooltip
                  formatter={(value: number) => [formatNumber(value), "Tokens"]}
                  contentStyle={{
                    fontSize: "12px",
                    fontWeight: 500,
                    borderRadius: "6px",
                    border: "1px solid #276749",
                    backgroundColor: "rgba(255, 255, 255, 0.98)",
                    padding: "10px 14px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                  }}
                  labelStyle={{
                    fontWeight: 600,
                    marginBottom: "6px",
                    color: "#333"
                  }}
                  itemStyle={{
                    padding: "4px 0",
                    color: "#444"
                  }}
                />
                <Bar
                  dataKey="value"
                  name="Token Amount"
                  barSize={24} // Slightly smaller for better proportions
                  maxBarSize={24} // Ensure consistent size regardless of scale
                  label={{
                    position: "right",
                    formatter: enhancedFormatter,
                    fill: "#333",
                    fontSize: 12,
                    fontWeight: 600,
                    offset: 25, // More space between bar end and label
                  }}
                >
                  {displayData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      stroke="#fff"
                      strokeWidth={1}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
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
