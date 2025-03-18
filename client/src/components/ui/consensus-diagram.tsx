import React from 'react';

interface NodeProps {
  x: number;
  y: number;
  radius: number;
  color: string;
  pulseColor?: string;
  label?: string;
  role?: string;
  isActive?: boolean;
}

const Node: React.FC<NodeProps> = ({ 
  x, 
  y, 
  radius, 
  color, 
  pulseColor = "rgba(90, 131, 100, 0.3)", 
  label, 
  role,
  isActive = false
}) => {
  return (
    <g className="validator-node">
      {isActive && (
        <>
          <circle
            cx={x}
            cy={y}
            r={radius * 1.8}
            fill={pulseColor}
            className="animate-pulse"
          />
          <circle
            cx={x}
            cy={y}
            r={radius * 1.4}
            fill={pulseColor}
            opacity={0.6}
            className="animate-pulse"
          />
        </>
      )}
      <circle
        cx={x}
        cy={y}
        r={radius}
        fill={color}
        stroke="#ffffff"
        strokeWidth={1}
      />
      {label && (
        <text
          x={x}
          y={y + radius + 15}
          textAnchor="middle"
          fill="currentColor"
          fontSize="10"
          fontWeight="bold"
        >
          {label}
        </text>
      )}
      {role && (
        <text
          x={x}
          y={y + radius + 28}
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          opacity={0.8}
        >
          {role}
        </text>
      )}
    </g>
  );
};

interface LinkProps {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  color?: string;
  dashed?: boolean;
  animated?: boolean;
  direction?: 'none' | 'forward' | 'backward' | 'both';
}

const Link: React.FC<LinkProps> = ({ 
  sourceX, 
  sourceY, 
  targetX, 
  targetY, 
  color = "#5a8364", 
  dashed = false,
  animated = false,
  direction = 'none'
}) => {
  // Calculate path for the arrow
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const angle = Math.atan2(dy, dx);
  
  // Normalize vector
  const length = Math.sqrt(dx * dx + dy * dy);
  const normalizedX = dx / length;
  const normalizedY = dy / length;
  
  // Pull back the arrow from target point
  const pullBack = 15; // Arrow head size
  const adjustedTargetX = targetX - (normalizedX * pullBack);
  const adjustedTargetY = targetY - (normalizedY * pullBack);
  
  // Calculate arrowhead points
  const arrowLength = 10;
  const arrowWidth = 6;
  
  // Calculate arrowhead points
  const arrowPoints = (x: number, y: number, angle: number) => {
    return {
      tip: { x, y },
      left: {
        x: x - arrowLength * Math.cos(angle - Math.PI/6),
        y: y - arrowLength * Math.sin(angle - Math.PI/6)
      },
      right: {
        x: x - arrowLength * Math.cos(angle + Math.PI/6),
        y: y - arrowLength * Math.sin(angle + Math.PI/6)
      }
    };
  };
  
  // Get arrowhead for target
  const targetArrow = arrowPoints(targetX, targetY, angle);
  
  // Get arrowhead for source (reversed direction)
  const sourceArrow = arrowPoints(sourceX, sourceY, angle + Math.PI);
  
  return (
    <>
      <path
        d={`M${sourceX},${sourceY} L${adjustedTargetX},${adjustedTargetY}`}
        stroke={color}
        strokeWidth={1.5}
        fill="none"
        strokeDasharray={dashed ? "4 3" : "none"}
        className={animated ? "animate-dash" : ""}
      />
      
      {(direction === 'forward' || direction === 'both') && (
        <polygon 
          points={`${targetArrow.tip.x},${targetArrow.tip.y} ${targetArrow.left.x},${targetArrow.left.y} ${targetArrow.right.x},${targetArrow.right.y}`}
          fill={color}
        />
      )}
      
      {(direction === 'backward' || direction === 'both') && (
        <polygon 
          points={`${sourceArrow.tip.x},${sourceArrow.tip.y} ${sourceArrow.left.x},${sourceArrow.left.y} ${sourceArrow.right.x},${sourceArrow.right.y}`}
          fill={color}
        />
      )}
    </>
  );
};

interface ConsensusDiagramProps {
  className?: string;
  mode?: 'posyg' | 'dcs';
}

export function ConsensusDiagram({ className = '', mode = 'posyg' }: ConsensusDiagramProps) {
  const width = 500;
  const height = 320;
  
  // Diagram elements will depend on the mode
  const renderPoSygDiagram = () => {
    const centerX = width / 2;
    const centerY = height / 2 - 20;
    const radius = 100;
    const nodeRadius = 15;
    
    // Calculate positions for nodes in a circle
    const nodeCount = 8;
    const nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i * 2 * Math.PI) / nodeCount;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      let color = "#5a8364";  // Default color
      let role = "Validator";
      let isActive = false;
      
      // Differentiate special nodes
      if (i === 0) {
        color = "#38a169";
        role = "Leader";
        isActive = true;
      } else if (i === 3) {
        color = "#68d391";
        role = "Verifier";
        isActive = true;
      } else if (i === 6) {
        color = "#276749";
        role = "Synergy Node";
        isActive = true;
      }
      
      nodes.push({ x, y, color, label: `Node ${i+1}`, role, isActive });
    }
    
    // Create links between nodes
    const links: LinkProps[] = [];
    
    // Create circle connections
    for (let i = 0; i < nodeCount; i++) {
      const next = (i + 1) % nodeCount;
      links.push({
        sourceX: nodes[i].x,
        sourceY: nodes[i].y,
        targetX: nodes[next].x,
        targetY: nodes[next].y,
        dashed: true
      });
    }
    
    // Add some specific active connections to show synergy
    links.push({
      sourceX: nodes[0].x,
      sourceY: nodes[0].y,
      targetX: nodes[3].x,
      targetY: nodes[3].y,
      color: "#276749",
      animated: true,
      direction: 'both'
    });
    
    links.push({
      sourceX: nodes[0].x,
      sourceY: nodes[0].y,
      targetX: nodes[6].x,
      targetY: nodes[6].y,
      color: "#276749",
      animated: true,
      direction: 'both'
    });
    
    links.push({
      sourceX: nodes[3].x,
      sourceY: nodes[3].y,
      targetX: nodes[6].x,
      targetY: nodes[6].y,
      color: "#276749",
      animated: true,
      direction: 'both'
    });
    
    return (
      <>
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="consensus-diagram">
          <defs>
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#5a8364" stopOpacity="0.2" />
            </radialGradient>
          </defs>
          
          {/* Background elements */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 30}
            fill="url(#nodeGradient)"
          />
          
          {/* Draw links first so they appear behind nodes */}
          {links.map((link, index) => (
            <Link key={index} {...link} />
          ))}
          
          {/* Draw all nodes */}
          {nodes.map((node, index) => (
            <Node 
              key={index} 
              x={node.x} 
              y={node.y} 
              radius={nodeRadius} 
              color={node.color} 
              label={node.label} 
              role={node.role}
              isActive={node.isActive}
            />
          ))}
          
          {/* Consensus Title */}
          <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            fill="#276749"
            fontSize="14"
            fontWeight="bold"
          >
            Proof of Synergy
          </text>
          
          {/* Consensus Description */}
          <text
            x={centerX}
            y={height - 15}
            textAnchor="middle"
            fill="currentColor"
            fontSize="11"
          >
            Validators collaborate through synergistic relationships for optimized consensus
          </text>
        </svg>
        
        {/* Legend */}
        <div className="flex justify-center gap-6 mt-2 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#38a169] mr-1"></div>
            <span>Leader</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#68d391] mr-1"></div>
            <span>Verifier</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#276749] mr-1"></div>
            <span>Synergy Node</span>
          </div>
        </div>
      </>
    );
  };
  
  const renderDCSDiagram = () => {
    const centerX = width / 2;
    const centerY = height / 2 - 20;
    
    // Define scoring factors
    const factors = [
      { name: 'Availability', score: 95, color: '#38a169' },
      { name: 'Security', score: 98, color: '#276749' },
      { name: 'Performance', score: 92, color: '#68d391' },
      { name: 'Participation', score: 88, color: '#48bb78' },
      { name: 'Reliability', score: 90, color: '#2f855a' }
    ];
    
    // Calculate bar width and spacing
    const totalBars = factors.length;
    const barWidth = 50;
    const spacing = 15;
    const totalWidth = (barWidth + spacing) * totalBars - spacing;
    const startX = centerX - totalWidth / 2;
    
    return (
      <>
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="consensus-diagram">
          {/* Title */}
          <text
            x={centerX}
            y={30}
            textAnchor="middle"
            fill="#276749"
            fontSize="14"
            fontWeight="bold"
          >
            Dynamic Contribution Scoring (DCS)
          </text>
          
          {/* Base Score Line */}
          <line
            x1={startX}
            y1={centerY + 100}
            x2={startX + totalWidth}
            y2={centerY + 100}
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="2 2"
          />
          
          {/* Score label */}
          <text
            x={startX - 5}
            y={centerY + 100}
            textAnchor="end"
            fill="currentColor"
            fontSize="10"
          >
            0
          </text>
          
          <text
            x={startX - 5}
            y={centerY}
            textAnchor="end"
            fill="currentColor"
            fontSize="10"
          >
            100
          </text>
          
          {/* Draw bars for each factor */}
          {factors.map((factor, index) => {
            const x = startX + index * (barWidth + spacing);
            const barHeight = (factor.score / 100) * 100;
            const y = centerY + 100 - barHeight;
            
            return (
              <g key={index}>
                {/* Factor Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={factor.color}
                  opacity={0.8}
                  rx={4}
                  className={index === 0 ? "animate-pulse" : ""}
                />
                
                {/* Score Label */}
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  fill={factor.color}
                  fontSize="12"
                  fontWeight="bold"
                >
                  {factor.score}
                </text>
                
                {/* Factor Name */}
                <text
                  x={x + barWidth / 2}
                  y={centerY + 115}
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="10"
                >
                  {factor.name}
                </text>
              </g>
            );
          })}
          
          {/* Combined Score */}
          <g>
            <circle
              cx={centerX}
              cy={centerY - 50}
              r={30}
              fill="#276749"
              opacity={0.1}
            />
            <circle
              cx={centerX}
              cy={centerY - 50}
              r={25}
              fill="#276749"
              opacity={0.2}
            />
            <text
              x={centerX}
              y={centerY - 50}
              textAnchor="middle"
              fill="#276749"
              fontSize="18"
              fontWeight="bold"
            >
              93
            </text>
            <text
              x={centerX}
              y={centerY - 30}
              textAnchor="middle"
              fill="#276749"
              fontSize="10"
            >
              Synergy Score
            </text>
          </g>
          
          {/* Description */}
          <text
            x={centerX}
            y={height - 15}
            textAnchor="middle"
            fill="currentColor"
            fontSize="11"
          >
            Dynamic scoring ensures fair rewards based on multiple performance metrics
          </text>
        </svg>
      </>
    );
  };
  
  return (
    <div className={`w-full ${className}`}>
      {mode === 'posyg' ? renderPoSygDiagram() : renderDCSDiagram()}
    </div>
  );
}