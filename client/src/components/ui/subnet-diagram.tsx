import React from 'react';

interface SubnetDiagramProps {
  className?: string;
}

export function SubnetDiagram({ className = '' }: SubnetDiagramProps) {
  const width = 500;
  const height = 320;
  
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
        
        {/* Main Title */}
        <text
          x={width / 2}
          y={25}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#276749"
        >
          Subnet Validator Architecture
        </text>
        
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
              
              {/* Subnet Label */}
              <text
                x={centerX}
                y={centerY - subnetRadius - 10}
                textAnchor="middle"
                fontSize="10"
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
              
              {/* Subnet Function */}
              <text
                x={centerX}
                y={centerY + subnetRadius + 15}
                textAnchor="middle"
                fontSize="8"
                fill="currentColor"
              >
                {
                  subnetIndex === 0 ? "Payment Processing" :
                  subnetIndex === 1 ? "Smart Contracts" :
                  subnetIndex === 2 ? "Cross-Chain Bridge" :
                  subnetIndex === 3 ? "Identity Services" :
                  "Stablecoin Reserve"
                }
              </text>
            </g>
          );
        })}
        
        {/* Descriptive Text */}
        <text
          x={width / 2}
          y={height - 15}
          textAnchor="middle"
          fontSize="10"
          fill="currentColor"
        >
          Independent validator subnetworks enable parallel processing and specialization
        </text>
      </svg>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-2 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#276749] mr-1"></div>
          <span>Core Network</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#38a169] mr-1"></div>
          <span>Subnet Leader</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#5a8364] mr-1"></div>
          <span>Subnet Validator</span>
        </div>
      </div>
    </div>
  );
}