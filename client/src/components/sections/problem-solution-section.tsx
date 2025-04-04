import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { ChevronDown, ChevronUp, DollarSign, Zap, Smartphone, Shield } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ProblemSolution {
  id: string;
  icon: React.ReactNode;
  problem: string;
  solution: string;
  solutionDetails: string;
  highlight: string;
}

export default function ProblemSolutionSection() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const problemSolutions: ProblemSolution[] = [
    {
      id: "costs",
      icon: <DollarSign className="h-6 w-6" />,
      problem: "High Transaction Costs",
      solution: "Ultra-low transaction fees",
      solutionDetails: "PeoChain's innovative consensus mechanism and optimized network architecture drastically reduce the resources needed to process transactions.",
      highlight: "USD 0.004 per transaction"
    },
    {
      id: "scalability",
      icon: <Zap className="h-6 w-6" />,
      problem: "Scalability & Performance Issues",
      solution: "High throughput with fast finality",
      solutionDetails: "Our subnet validator architecture enables parallel transaction processing that scales horizontally as network demand increases.",
      highlight: "100,000 TPS with 1-second finality"
    },
    {
      id: "ux",
      icon: <Smartphone className="h-6 w-6" />,
      problem: "Complex User Experiences",
      solution: "User-Centric Mobile Integration",
      solutionDetails: "PeoChain seamlessly bridges with established mobile payment platforms, enabling a familiar and accessible interface for mainstream users.",
      highlight: "Integration with M-Pesa, GCash & more"
    },
    {
      id: "stability",
      icon: <Shield className="h-6 w-6" />,
      problem: "Economic Instability & Volatility",
      solution: "Localized Stablecoins & Stability Mechanisms",
      solutionDetails: "Our economic model employs advanced volatility-reduction techniques and regional stablecoins pegged to local currencies for everyday transactions.",
      highlight: "Reliable economic environment"
    }
  ];

  return (
    <section id="solutions" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="section-title">
          Blockchain Problems, Solved
        </h2>
        <p className="description max-w-2xl mx-auto text-lg">
          PeoChain addresses the fundamental limitations of traditional blockchain platforms through innovative technological solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {problemSolutions.map((item) => (
          <Card 
            key={item.id} 
            className={`glass overflow-hidden transition-all duration-300 ${expandedCard === item.id ? 'shadow-lg' : 'shadow'}`}
          >
            <div 
              className="p-6 cursor-pointer flex items-center justify-between"
              onClick={() => toggleCard(item.id)}
            >
              <div className="flex items-center">
                <div className="bg-primary/20 p-3 rounded-full text-primary mr-4">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Problem: {item.problem}</h3>
                  <p className="text-sm text-foreground/70">Click to see PeoChain's solution</p>
                </div>
              </div>
              {expandedCard === item.id ? (
                <ChevronUp className="h-5 w-5 text-primary" />
              ) : (
                <ChevronDown className="h-5 w-5 text-primary" />
              )}
            </div>
            
            <AnimatePresence>
              {expandedCard === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="pt-0 pb-6 border-t">
                    <div className="flex items-start">
                      <div>
                        <h4 className="font-bold text-primary text-md mb-2">Solution: {item.solution}</h4>
                        <p className="mb-3 text-foreground/80">{item.solutionDetails}</p>
                        <div className="bg-primary/10 p-3 rounded-lg inline-block">
                          <span className="font-semibold text-primary">{item.highlight}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    </section>
  );
}