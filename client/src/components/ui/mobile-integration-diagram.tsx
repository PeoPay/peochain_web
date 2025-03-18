import React from 'react';

interface MobileIntegrationDiagramProps {
  className?: string;
}

export function MobileIntegrationDiagram({ className = '' }: MobileIntegrationDiagramProps) {
  // Responsive diagram sizing - increased initial height
  const [diagramSize, setDiagramSize] = React.useState({ width: 500, height: 400 });
  
  // Responsive diagram adjustments
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setDiagramSize({ width: 340, height: 420 }); // Small mobile (increased height)
      } else if (window.innerWidth <= 640) {
        setDiagramSize({ width: 420, height: 420 }); // Mobile (increased height)
      } else if (window.innerWidth <= 768) {
        setDiagramSize({ width: 470, height: 420 }); // Tablet (increased height)
      } else {
        setDiagramSize({ width: 500, height: 400 }); // Desktop (increased height)
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
        
        {/* Title removed as requested */}
        
        {/* Central PeoChain Platform - adjusted for better proportions */}
        <rect
          x={width / 2 - (isMobile ? 60 : 75)}
          y={height / 2 - 20}
          width={isMobile ? 120 : 150}
          height={40}
          rx={6}
          fill="#276749"
          opacity={0.8}
          filter="url(#shadow)"
        />
        
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
              {/* Provider icon only - no text */}
              <text
                x={boxX + (boxWidth/2)}
                y={provider.y + 5}
                textAnchor="middle"
                fontSize={isMobile ? 12 : 16}
                fontWeight="bold"
                fill="white"
              >
                {provider.icon}
              </text>
              
              {/* Connection to platform - curve adjusted to avoid text overlap */}
              <path
                d={`M${boxX + boxWidth},${provider.y} 
                   C${boxX + boxWidth + 40},${provider.y} 
                   ${width/2 - (isMobile ? 80 : 95)},${provider.y + (index % 2 === 0 ? -15 : 15)} 
                   ${width/2 - (isMobile ? 60 : 75)},${height/2}`}
                stroke="url(#mobileGradient)"
                strokeWidth={isMobile ? 1 : 1.5}
                fill="none"
                markerEnd="url(#dataFlowArrow)"
                opacity={0.7}
                className={index === 0 ? "animate-pulse" : ""}
              />
              
              {/* Connection labels removed as requested */}
            </g>
          );
        })}
        
        {/* End User Applications */}
        {[
          { name: 'DeFi Apps', y: 60, icon: '🔄', type: 'Lending & Yield' },
          { name: 'Payments', y: 120, icon: '💸', type: 'Cross-border' },
          { name: 'Wallet', y: 180, icon: '👛', type: 'Self-custody' },
          { name: 'Marketplaces', y: 240, icon: '🛒', type: 'P2P Trading' }
        ].map((app, index) => {
          // Calculate positions based on mobile or desktop
          const boxWidth = isMobile ? 85 : 100;
          const boxX = width - (isMobile ? 115 : 150);
          
          return (
            <g key={`app-${index}`}>
              {/* App box */}
              <rect
                x={boxX}
                y={app.y - 15}
                width={boxWidth}
                height={30}
                rx={4}
                fill="#5a8364"
                opacity={0.8}
                filter="url(#shadow)"
              />
              {/* App icon only - no text */}
              <text
                x={boxX + (boxWidth/2)}
                y={app.y + 5}
                textAnchor="middle"
                fontSize={isMobile ? 12 : 16}
                fontWeight="bold"
                fill="white"
              >
                {app.icon}
              </text>
              
              {/* Connection from platform - curve adjusted to avoid text overlap */}
              <path
                d={`M${width/2 + (isMobile ? 60 : 75)},${height/2} 
                   C${width/2 + (isMobile ? 90 : 115)},${height/2} 
                   ${boxX - 40},${app.y + (index % 2 === 0 ? -15 : 15)}
                   ${boxX},${app.y}`}
                stroke="url(#mobileGradient)"
                strokeWidth={isMobile ? 1 : 1.5}
                fill="none"
                markerEnd="url(#dataFlowArrow)"
                opacity={0.7}
                className={index === 1 ? "animate-pulse" : ""}
              />
              
              {/* Connection labels removed as requested */}
            </g>
          );
        })}
        
        {/* Blockchain Layer - adjusted for better visibility and to avoid overlap */}
        <g>
          {/* Create space between platform and blockchain layer */}
          <rect
            x={width / 2 - (isMobile ? 115 : 140)}
            y={height / 2 + 50}
            width={isMobile ? 230 : 280}
            height={30}
            rx={4}
            fill="#38a169"
            opacity={0.8}
            filter="url(#shadow)"
          />
          {/* Bold divider line to separate layers */}
          <line
            x1={width / 2 - (isMobile ? 100 : 120)}
            y1={height / 2 + 40}
            x2={width / 2 + (isMobile ? 100 : 120)}
            y2={height / 2 + 40}
            stroke="#276749"
            strokeWidth={isMobile ? 0.7 : 1}
            strokeDasharray="3,2"
            opacity={0.8}
          />
          {/* Blockchain labels removed as requested */}
        </g>
        
        {/* Footer text removed as requested */}
      </svg>
    </div>
  );
}