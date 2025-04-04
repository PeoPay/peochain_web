import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Clock, Code, Database, Globe, Network, Layers, LockKeyhole, BadgeCheck } from 'lucide-react';

interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  date: string;
  milestones: {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'upcoming';
    icon: React.ReactNode;
  }[];
}

export default function RoadmapSection() {
  const [selectedPhase, setSelectedPhase] = useState<string>('phase2');

  const roadmapData: RoadmapPhase[] = [
    {
      id: 'phase1',
      title: 'Phase 1: Foundation & Early Development',
      description: 'Establishing core technology and network infrastructure',
      status: 'completed',
      date: 'Q1-Q3 2024',
      milestones: [
        {
          id: 'p1m1',
          title: 'Core Protocol Development',
          description: 'Development of the fundamental PeoChain protocol and consensus mechanism',
          status: 'completed',
          icon: <Code />
        },
        {
          id: 'p1m2',
          title: 'Testnet Alpha Launch',
          description: 'First private testnet with limited functionality for initial validation',
          status: 'completed',
          icon: <Network />
        },
        {
          id: 'p1m3',
          title: 'Strategic Partnerships',
          description: 'Establishing key technical and business partnerships',
          status: 'completed',
          icon: <BadgeCheck />
        },
        {
          id: 'p1m4',
          title: 'Seed Investment Round',
          description: 'Securing initial funding for continued development',
          status: 'completed',
          icon: <Database />
        }
      ]
    },
    {
      id: 'phase2',
      title: 'Phase 2: Scaling & Expansion',
      description: 'Building out the ecosystem and enhancing network capabilities',
      status: 'current',
      date: 'Q4 2024 - Q2 2025',
      milestones: [
        {
          id: 'p2m1',
          title: 'Subnet Validator Implementation',
          description: 'Deployment of the subnet validator architecture for parallel processing',
          status: 'completed',
          icon: <Layers />
        },
        {
          id: 'p2m2',
          title: 'Testnet Beta Launch',
          description: 'Public testnet with full feature set and improved stability',
          status: 'current',
          icon: <Network />
        },
        {
          id: 'p2m3',
          title: 'Security Audits',
          description: 'Comprehensive third-party security auditing of all protocol components',
          status: 'current',
          icon: <LockKeyhole />
        },
        {
          id: 'p2m4',
          title: 'Mainnet Launch',
          description: 'Official launch of PeoChain mainnet with core functionality',
          status: 'upcoming',
          icon: <Globe />
        }
      ]
    },
    {
      id: 'phase3',
      title: 'Phase 3: Global Adoption & Advanced Features',
      description: 'Expanding ecosystem and enhancing user applications',
      status: 'upcoming',
      date: 'Q3 2025 - Q4 2026',
      milestones: [
        {
          id: 'p3m1',
          title: 'Enterprise Solutions',
          description: 'Specialized solutions for enterprise blockchain adoption',
          status: 'upcoming',
          icon: <Database />
        },
        {
          id: 'p3m2',
          title: 'Global Developer Ecosystem',
          description: 'Expanding developer tools, SDKs, and community support',
          status: 'upcoming',
          icon: <Code />
        },
        {
          id: 'p3m3',
          title: 'Advanced DeFi Protocols',
          description: 'Sophisticated financial applications leveraging cross-chain capabilities',
          status: 'upcoming',
          icon: <Layers />
        },
        {
          id: 'p3m4',
          title: 'Regional Adoption Initiatives',
          description: 'Targeted programs for regional blockchain adoption',
          status: 'upcoming',
          icon: <Globe />
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'current':
        return <Clock className="h-5 w-5 text-yellow-500 animate-pulse" />;
      case 'upcoming':
        return <Circle className="h-5 w-5 text-gray-400" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const selectedPhaseData = roadmapData.find(phase => phase.id === selectedPhase) || roadmapData[0];

  return (
    <section id="roadmap" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="section-title">
          PeoChain Roadmap
        </h2>
        <p className="description max-w-2xl mx-auto text-lg">
          Our strategic path to revolutionizing blockchain technology and adoption worldwide.
        </p>
      </div>

      {/* Phase selection tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {roadmapData.map((phase) => (
          <button
            key={phase.id}
            onClick={() => setSelectedPhase(phase.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all 
              ${selectedPhase === phase.id 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-primary/10 text-foreground hover:bg-primary/20'}
            `}
          >
            {getStatusIcon(phase.status)}
            <span>{phase.title.split(':')[0]}</span>
          </button>
        ))}
      </div>

      {/* Selected phase details */}
      <div className="glass rounded-3xl p-6 md:p-10">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-foreground">
              {selectedPhaseData.title}
            </h3>
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
              {selectedPhaseData.date}
            </span>
          </div>
          <p className="text-foreground/80">
            {selectedPhaseData.description}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-3.5 top-0 bottom-0 w-px bg-primary/20 md:left-1/2 md:-ml-0.5"></div>

          {/* Milestones */}
          <div className="space-y-10">
            {selectedPhaseData.milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-4">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`
                      flex items-center justify-center w-8 h-8 rounded-full z-10
                      ${milestone.status === 'completed' ? 'bg-green-100' : 
                        milestone.status === 'current' ? 'bg-yellow-100' : 'bg-gray-100'}
                    `}
                  >
                    <span className={`
                      ${milestone.status === 'completed' ? 'text-green-500' : 
                        milestone.status === 'current' ? 'text-yellow-500' : 'text-gray-400'}
                    `}>
                      {milestone.icon}
                    </span>
                  </motion.div>
                </div>

                {/* Content layout - alternating for desktop */}
                <div className={`
                  ml-12 md:w-5/12 ${index % 2 === 0 ? 'md:ml-0 md:mr-auto' : 'md:ml-auto md:mr-0'}
                `}>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white/70 backdrop-blur rounded-xl p-5 shadow-sm"
                  >
                    <div className="flex items-center mb-2">
                      {getStatusIcon(milestone.status)}
                      <h4 className="font-semibold ml-2">{milestone.title}</h4>
                    </div>
                    <p className="text-foreground/70 text-sm">
                      {milestone.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}