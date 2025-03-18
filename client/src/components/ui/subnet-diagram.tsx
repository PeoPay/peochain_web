import React from 'react';

interface SubnetDiagramProps {
  className?: string;
}

export function SubnetDiagram({ className = '' }: SubnetDiagramProps) {
  // Adjust size based on responsive design needs
  const [diagramSize, setDiagramSize] = React.useState({ width: 500, height: 380 });
  
  // Responsive diagram adjustments
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setDiagramSize({ width: 340, height: 380 }); // Small mobile
      } else if (window.innerWidth <= 640) {
        setDiagramSize({ width: 420, height: 400 }); // Mobile
      } else if (window.innerWidth <= 768) {
        setDiagramSize({ width: 480, height: 420 }); // Tablet
      } else {
        setDiagramSize({ width: 500, height: 440 }); // Desktop
      }
    };
    
    // Set initial size
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const width = diagramSize.width;
  const height = diagramSize.height;
  const isMobile = width < 400;
  
  return (
    <div className={`w-full ${className}`}>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="subnet-diagram">
        <defs>
          <radialGradient id="subnetGradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#38a169" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#5a8364" stopOpacity="0.05" />
          </radialGradient>
          
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38a169" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#68d391" stopOpacity="0.8" />
          </linearGradient>
          
          <marker 
            id="arrowhead" 
            markerWidth="10" 
            markerHeight="7" 
            refX="10" 
            refY="3.5" 
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#38a169" />
          </marker>
        </defs>
        
        {/* Main Title - removed to prevent duplication */}
        
        {/* Central Blockchain Core */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={40}
          fill="#276749"
          opacity={0.6}
        />
        <text
          x={width / 2}
          y={height / 2}
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="white"
        >
          PeoChain
        </text>
        <text
          x={width / 2}
          y={height / 2 + 15}
          textAnchor="middle"
          fontSize="9"
          fill="white"
        >
          Core
        </text>
        
        {/* Draw Subnets */}
        {[0, 1, 2, 3, 4].map((subnetIndex) => {
          const angle = (subnetIndex * 2 * Math.PI) / 5;
          const distance = 110;
          const centerX = width / 2 + distance * Math.cos(angle);
          const centerY = height / 2 + distance * Math.sin(angle);
          const subnetRadius = 30;
          
          // Nodes in each subnet
          const nodeCount = 4;
          const nodeRadius = 6;
          const nodeDistance = 16;
          
          // Connection line to core
          const connectionStartX = centerX - subnetRadius * Math.cos(angle);
          const connectionStartY = centerY - subnetRadius * Math.sin(angle);
          const connectionEndX = width / 2 + 40 * Math.cos(angle);
          const connectionEndY = height / 2 + 40 * Math.sin(angle);
          
          return (
            <g key={`subnet-${subnetIndex}`}>
              {/* Connection to Core */}
              <path
                d={`M${connectionStartX},${connectionStartY} L${connectionEndX},${connectionEndY}`}
                stroke="url(#connectionGradient)"
                strokeWidth={1.5}
                strokeDasharray={subnetIndex % 2 === 0 ? "4 2" : "none"}
                markerEnd="url(#arrowhead)"
                opacity={0.7}
                className={subnetIndex === 1 ? "animate-pulse" : ""}
              />
              
              {/* Subnet Background */}
              <circle
                cx={centerX}
                cy={centerY}
                r={subnetRadius + 5}
                fill="url(#subnetGradient)"
                stroke="#5a8364"
                strokeWidth={0.5}
                strokeDasharray="2 1"
              />
              
              {/* Subnet Label - improved spacing and sizing */}
              <text
                x={centerX}
                y={centerY - subnetRadius - 12}
                textAnchor="middle"
                fontSize={isMobile ? 9 : 10}
                fontWeight="bold"
                fill="#5a8364"
              >
                Subnet {subnetIndex + 1}
              </text>
              
              {/* Draw Nodes */}
              {Array.from({ length: nodeCount }).map((_, nodeIndex) => {
                const nodeAngle = (nodeIndex * 2 * Math.PI) / nodeCount;
                const nodeX = centerX + nodeDistance * Math.cos(nodeAngle);
                const nodeY = centerY + nodeDistance * Math.sin(nodeAngle);
                
                return (
                  <circle
                    key={`node-${subnetIndex}-${nodeIndex}`}
                    cx={nodeX}
                    cy={nodeY}
                    r={nodeRadius}
                    fill={nodeIndex === 0 ? "#38a169" : "#5a8364"}
                    stroke="white"
                    strokeWidth={0.5}
                    opacity={nodeIndex === 0 ? 1 : 0.8}
                  />
                );
              })}
              
              {/* Subnet Function - improved spacing and readability */}
              <text
                x={centerX}
                y={centerY + subnetRadius + 15}
                textAnchor="middle"
                fontSize={isMobile ? 7 : 8}
                fill="#276749"
                fontWeight={isMobile ? "normal" : "medium"}
              >
                {
                  subnetIndex === 0 ? (isMobile ? "Payments" : "Payment Processing") :
                  subnetIndex === 1 ? (isMobile ? "Contracts" : "Smart Contracts") :
                  subnetIndex === 2 ? (isMobile ? "Bridge" : "Cross-Chain Bridge") :
                  subnetIndex === 3 ? (isMobile ? "Identity" : "Identity Services") :
                  (isMobile ? "Stablecoin" : "Stablecoin Reserve")
                }
              </text>
            </g>
          );
        })}
        
        {/* Descriptive Text - improved positioning and readability */}
        <text
          x={width / 2}
          y={height - 30}
          textAnchor="middle"
          fontSize={isMobile ? 8 : 10}
          fill="currentColor"
        >
          {isMobile ? 
            "Subnets enable parallel processing" : 
            "Independent validator subnetworks enable parallel processing and specialization"
          }
        </text>
      </svg>
      
      {/* Legend - improved for mobile responsiveness */}
      <div className={`flex flex-wrap justify-center gap-x-3 gap-y-1 mt-4 mb-6 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#276749] mr-1"></div>
          <span>Core Network</span>
        </div>
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#38a169] mr-1"></div>
          <span>Subnet Leader</span>
        </div>
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#5a8364] mr-1"></div>
          <span>Subnet Validator</span>
        </div>
      </div>
    </div>
  );
}