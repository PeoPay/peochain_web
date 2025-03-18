import React from 'react';

interface MobileIntegrationDiagramProps {
  className?: string;
}

export function MobileIntegrationDiagram({ className = '' }: MobileIntegrationDiagramProps) {
  // Responsive diagram sizing
  const [diagramSize, setDiagramSize] = React.useState({ width: 500, height: 350 });
  
  // Responsive diagram adjustments
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setDiagramSize({ width: 340, height: 380 }); // Small mobile
      } else if (window.innerWidth <= 640) {
        setDiagramSize({ width: 420, height: 380 }); // Mobile
      } else if (window.innerWidth <= 768) {
        setDiagramSize({ width: 470, height: 380 }); // Tablet
      } else {
        setDiagramSize({ width: 500, height: 360 }); // Desktop
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
    <div className={`w-full ${className}`} style={{ minHeight: `${height}px` }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="mobile-integration-diagram">
        <defs>
          <linearGradient id="mobileGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38a169" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#68d391" stopOpacity="0.8" />
          </linearGradient>
          
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.2" />
          </filter>
          
          <marker 
            id="dataFlowArrow" 
            markerWidth="10" 
            markerHeight="7" 
            refX="10" 
            refY="3.5" 
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="url(#mobileGradient)" />
          </marker>
        </defs>
        
        {/* Title */}
        <text
          x={width / 2}
          y={25}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#276749"
        >
          PeoChain Mobile Integration Architecture
        </text>
        
        {/* Central PeoChain Platform */}
        <rect
          x={width / 2 - 75}
          y={height / 2 - 20}
          width={150}
          height={40}
          rx={6}
          fill="#276749"
          opacity={0.8}
          filter="url(#shadow)"
        />
        <text
          x={width / 2}
          y={height / 2 + 5}
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="white"
        >
          PeoChain Platform
        </text>
        
        {/* Mobile Providers */}
        {[
          { name: 'M-Pesa', y: 60, icon: '📱', country: 'Kenya' },
          { name: 'GCash', y: 120, icon: '💳', country: 'Philippines' },
          { name: 'MTN Money', y: 180, icon: '💰', country: 'Nigeria' },
          { name: 'Wave', y: 240, icon: '🌊', country: 'West Africa' }
        ].map((provider, index) => {
          // Calculate positions based on mobile or desktop
          const boxX = isMobile ? 30 : 50;
          const boxWidth = isMobile ? 85 : 100;
          const textX = isMobile ? 70 : 100;
          
          return (
            <g key={`provider-${index}`}>
              {/* Provider box */}
              <rect
                x={boxX}
                y={provider.y - 15}
                width={boxWidth}
                height={30}
                rx={4}
                fill="#5a8364"
                opacity={0.8}
                filter="url(#shadow)"
              />
              <text
                x={boxX + (boxWidth/2)}
                y={provider.y + 5}
                textAnchor="middle"
                fontSize={isMobile ? 8 : 10}
                fontWeight="bold"
                fill="white"
              >
                {provider.icon} {provider.name}
              </text>
              
              {/* Region label */}
              <text
                x={boxX + (boxWidth/2)}
                y={provider.y + 20}
                textAnchor="middle"
                fontSize={isMobile ? 7 : 8}
                fill="currentColor"
              >
                {provider.country}
              </text>
              
              {/* Connection to platform */}
              <path
                d={`M${boxX + boxWidth},${provider.y} C${width/2 - 75},${provider.y} ${width/2 - 75},${height/2} ${width/2 - 75},${height/2}`}
                stroke="url(#mobileGradient)"
                strokeWidth={isMobile ? 1 : 1.5}
                fill="none"
                markerEnd="url(#dataFlowArrow)"
                opacity={0.7}
                className={index === 0 ? "animate-pulse" : ""}
              />
              
              {/* Label for path - offset to avoid overlapping with connectors */}
              <text
                x={(boxX + boxWidth + width/2 - 75) / 2}
                y={index % 2 === 0 ? provider.y - 10 : provider.y + 15}
                textAnchor="middle"
                fontSize={isMobile ? 7 : 8}
                fill="#276749"
              >
                {index % 2 === 0 ? "Deposit" : "Withdraw"}
              </text>
            </g>
          );
        })}
        
        {/* End User Applications */}
        {[
          { name: 'DeFi Apps', y: 60, icon: '🔄', type: 'Lending & Yield' },
          { name: 'Payments', y: 120, icon: '💸', type: 'Cross-border' },
          { name: 'Wallet', y: 180, icon: '👛', type: 'Self-custody' },
          { name: 'Marketplaces', y: 240, icon: '🛒', type: 'P2P Trading' }
        ].map((app, index) => (
          <g key={`app-${index}`}>
            {/* App box */}
            <rect
              x={width - 150}
              y={app.y - 15}
              width={100}
              height={30}
              rx={4}
              fill="#5a8364"
              opacity={0.8}
              filter="url(#shadow)"
            />
            <text
              x={width - 100}
              y={app.y + 5}
              textAnchor="middle"
              fontSize="10"
              fontWeight="bold"
              fill="white"
            >
              {app.icon} {app.name}
            </text>
            
            {/* App type label */}
            <text
              x={width - 100}
              y={app.y + 20}
              textAnchor="middle"
              fontSize="8"
              fill="currentColor"
            >
              {app.type}
            </text>
            
            {/* Connection from platform */}
            <path
              d={`M${width/2 + 75},${height/2} C${width/2 + 100},${height/2} ${width/2 + 100},${app.y} ${width - 150},${app.y}`}
              stroke="url(#mobileGradient)"
              strokeWidth={1.5}
              fill="none"
              markerEnd="url(#dataFlowArrow)"
              opacity={0.7}
              className={index === 1 ? "animate-pulse" : ""}
            />
            
            {/* Label for path */}
            <text
              x={width/2 + 100}
              y={index % 2 === 0 ? app.y - 10 : app.y + 15}
              textAnchor="middle"
              fontSize="8"
              fill="#276749"
            >
              {index % 2 === 0 ? "Integration" : "API Access"}
            </text>
          </g>
        ))}
        
        {/* Blockchain Layer */}
        <rect
          x={width / 2 - 130}
          y={height / 2 + 40}
          width={260}
          height={25}
          rx={4}
          fill="#38a169"
          opacity={0.6}
        />
        <text
          x={width / 2}
          y={height / 2 + 55}
          textAnchor="middle"
          fontSize="10"
          fontWeight="bold"
          fill="white"
        >
          Blockchain Layer - 100,000 TPS / 1s Finality
        </text>
        
        {/* Descriptive Footer */}
        <text
          x={width / 2}
          y={height - 15}
          textAnchor="middle"
          fontSize="10"
          fill="currentColor"
        >
          Seamless integration with established mobile payment networks enables financial inclusion
        </text>
      </svg>
    </div>
  );
}