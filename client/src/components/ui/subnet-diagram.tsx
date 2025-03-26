import React from 'react';

interface SubnetDiagramProps {
  className?: string;
}

export function SubnetDiagram({ className = '' }: SubnetDiagramProps) {
  // Adjust size based on responsive design needs
  const [diagramSize, setDiagramSize] = React.useState({ width: 500, height: 480 });
  
  // Responsive diagram adjustments - increased heights to accommodate elements
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setDiagramSize({ width: 320, height: 400 }); // Small mobile - reduced height to prevent cutoff
      } else if (window.innerWidth <= 640) {
        setDiagramSize({ width: 380, height: 420 }); // Mobile - optimized for better text display
      } else if (window.innerWidth <= 768) {
        setDiagramSize({ width: 450, height: 440 }); // Tablet - better proportions
      } else {
        setDiagramSize({ width: 500, height: 480 }); // Desktop
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
    <div className={`w-full ${className}`} aria-label="Subnet Architecture Diagram">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="subnet-diagram" role="img" aria-labelledby="subnet-diagram-title subnet-diagram-desc">
        {/* Accessible title and description */}
        <title id="subnet-diagram-title">PeoChain Subnet Architecture</title>
        <desc id="subnet-diagram-desc">
          A visual representation of PeoChain's subnet architecture showing the core network connected to 
          multiple specialized subnets including Payment Processing, Smart Contracts, Cross-Chain Bridge, 
          Identity Services, and Stablecoin Reserve. Each subnet contains validator nodes that work together 
          to process transactions in parallel.
        </desc>
        
        <defs>
          <radialGradient id="subnetGradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#6d9e79" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#5b8466" stopOpacity="0.08" />
          </radialGradient>
          
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4a6a52" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6d9e79" stopOpacity="0.8" />
          </linearGradient>
          
          <marker 
            id="arrowhead" 
            markerWidth="10" 
            markerHeight="7" 
            refX="10" 
            refY="3.5" 
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#4a6a52" />
          </marker>
        </defs>
        
        {/* Main Title - removed to prevent duplication */}
        
        {/* Central Blockchain Core */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={40}
          fill="#38503f"
          opacity={0.7}
          aria-label="PeoChain Core Network"
        />
        <text
          x={width / 2}
          y={height / 2}
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="white"
          aria-hidden="true"
        >
          PeoChain
        </text>
        <text
          x={width / 2}
          y={height / 2 + 15}
          textAnchor="middle"
          fontSize="9"
          fill="white"
          aria-hidden="true"
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
            <g 
              key={`subnet-${subnetIndex}`} 
              role="group" 
              aria-label={`Subnet ${subnetIndex + 1}: ${
                subnetIndex === 0 ? "Payment Processing" :
                subnetIndex === 1 ? "Smart Contracts" :
                subnetIndex === 2 ? "Cross-Chain Bridge" :
                subnetIndex === 3 ? "Identity Services" :
                "Stablecoin Reserve"
              }`}
            >
              {/* Connection to Core */}
              <path
                d={`M${connectionStartX},${connectionStartY} L${connectionEndX},${connectionEndY}`}
                stroke="url(#connectionGradient)"
                strokeWidth={1.5}
                strokeDasharray={subnetIndex % 2 === 0 ? "4 2" : "none"}
                markerEnd="url(#arrowhead)"
                opacity={0.7}
                className={subnetIndex === 1 ? "animate-pulse" : ""}
                aria-label={`Connection from Core network to Subnet ${subnetIndex + 1}`}
              />
              
              {/* Subnet Background */}
              <circle
                cx={centerX}
                cy={centerY}
                r={subnetRadius + 5}
                fill="url(#subnetGradient)"
                stroke="#4a6a52"
                strokeWidth={0.5}
                strokeDasharray="2 1"
                aria-label={`Subnet ${subnetIndex + 1} boundary`}
              />
              
              {/* Subnet Label - improved spacing and sizing */}
              <text
                x={centerX}
                y={centerY - subnetRadius - 12}
                textAnchor="middle"
                fontSize={isMobile ? 9 : 10}
                fontWeight="bold"
                fill="#4a6a52"
                aria-hidden="true"
              >
                Subnet {subnetIndex + 1}
              </text>
              
              {/* Draw Nodes */}
              {Array.from({ length: nodeCount }).map((_, nodeIndex) => {
                const nodeAngle = (nodeIndex * 2 * Math.PI) / nodeCount;
                const nodeX = centerX + nodeDistance * Math.cos(nodeAngle);
                const nodeY = centerY + nodeDistance * Math.sin(nodeAngle);
                const isLeader = nodeIndex === 0;
                
                return (
                  <circle
                    key={`node-${subnetIndex}-${nodeIndex}`}
                    cx={nodeX}
                    cy={nodeY}
                    r={nodeRadius}
                    fill={isLeader ? "#6d9e79" : "#5b8466"}
                    stroke="white"
                    strokeWidth={0.5}
                    opacity={isLeader ? 1 : 0.8}
                    aria-label={`${isLeader ? "Leader" : "Validator"} node ${nodeIndex + 1} in Subnet ${subnetIndex + 1}`}
                  />
                );
              })}
              
              {/* Subnet Function - improved spacing and readability */}
              <text
                x={centerX}
                y={centerY + subnetRadius + 15}
                textAnchor="middle"
                fontSize={isMobile ? 7 : 8}
                fill="#4a6a52"
                fontWeight={isMobile ? "normal" : "medium"}
                aria-hidden="true"
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
          aria-hidden="true"
        >
          {isMobile ? 
            "Subnets enable parallel processing" : 
            "Independent validator subnetworks enable parallel processing and specialization"
          }
        </text>
      </svg>
      
      {/* Legend - completely redesigned for better clarity and separation */}
      <div 
        role="region" 
        aria-label="Diagram Legend" 
        className="mt-4 mb-6"
      >
        <div className="sr-only">
          Legend for the subnet diagram: Core Network is shown in dark green, Subnet Leaders in medium green, and Subnet Validators in light green.
        </div>
        {isMobile ? (
          /* Stacked layout for mobile */
          <div className="grid grid-cols-1 gap-y-2 text-xs">
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#38503f] mr-2" aria-hidden="true"></div>
              <span>Core Network</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#6d9e79] mr-2" aria-hidden="true"></div>
              <span>Subnet Leader</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#5b8466] mr-2" aria-hidden="true"></div>
              <span>Subnet Validator</span>
            </div>
          </div>
        ) : (
          /* Horizontal layout with ample spacing for larger screens */
          <div className="flex justify-center gap-x-6 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#38503f] mr-2" aria-hidden="true"></div>
              <span>Core Network</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#6d9e79] mr-2" aria-hidden="true"></div>
              <span>Subnet Leader</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#5b8466] mr-2" aria-hidden="true"></div>
              <span>Subnet Validator</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Additional accessibility description */}
      <div className="sr-only">
        <p>This diagram illustrates the PeoChain subnet architecture. The central core connects to 5 specialized subnets: Payment Processing, Smart Contracts, Cross-Chain Bridge, Identity Services, and Stablecoin Reserve. Each subnet contains validator nodes, with one leader node shown in a darker color. The connections between the core and subnets demonstrate how transactions flow through the network, enabling parallel processing and specialized functions for each subnet.</p>
      </div>
    </div>
  );
}