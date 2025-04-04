import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Users, ChevronsUpDown, Network, Lock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

// Animation for nodes in the PoSyg visualization
const PoSygNode = ({ x, y, size, delay, color }: { x: number; y: number; size: number; delay: number; color: string }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [0, 1.2, 1],
        opacity: [0, 0.8, 1],
      }}
      transition={{
        duration: 1,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    />
  );
};

// Animation for connection lines in the PoSyg visualization
const PoSygConnection = ({ 
  startX, startY, endX, endY, delay, color 
}: { 
  startX: number; startY: number; endX: number; endY: number; delay: number; color: string 
}) => {
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  return (
    <motion.div
      className={`absolute ${color} h-0.5 origin-left`}
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        width: length * 0.7,
        transform: `rotate(${angle}deg)`,
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{
        scaleX: 1,
        opacity: [0, 1, 0.8],
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    />
  );
};

const PoSygVisualization = () => {
  // Define node positions
  const nodes = [
    { x: 50, y: 20, size: 80, delay: 0, color: 'bg-primary' },    // Central node
    { x: 25, y: 35, size: 40, delay: 0.2, color: 'bg-green-500' },  // Validator 1
    { x: 40, y: 60, size: 40, delay: 0.3, color: 'bg-blue-500' },   // Validator 2
    { x: 75, y: 40, size: 40, delay: 0.4, color: 'bg-purple-500' },  // Validator 3
    { x: 65, y: 65, size: 40, delay: 0.5, color: 'bg-orange-500' },  // Validator 4
  ];

  // Define connections between nodes
  const connections = [
    { startX: 50, startY: 20, endX: 25, endY: 35, delay: 0.6, color: 'bg-green-500' },
    { startX: 50, startY: 20, endX: 40, endY: 60, delay: 0.7, color: 'bg-blue-500' },
    { startX: 50, startY: 20, endX: 75, endY: 40, delay: 0.8, color: 'bg-purple-500' },
    { startX: 50, startY: 20, endX: 65, endY: 65, delay: 0.9, color: 'bg-orange-500' },
    { startX: 25, startY: 35, endX: 40, endY: 60, delay: 1.0, color: 'bg-teal-500' },
    { startX: 40, startY: 60, endX: 65, endY: 65, delay: 1.1, color: 'bg-teal-500' },
    { startX: 65, startY: 65, endX: 75, endY: 40, delay: 1.2, color: 'bg-teal-500' },
    { startX: 75, startY: 40, endX: 25, endY: 35, delay: 1.3, color: 'bg-teal-500' },
  ];

  return (
    <div className="w-full h-64 bg-muted/20 relative rounded-lg overflow-hidden">
      {/* Render nodes */}
      {nodes.map((node, index) => (
        <PoSygNode key={`node-${index}`} {...node} />
      ))}

      {/* Render connections */}
      {connections.map((connection, index) => (
        <PoSygConnection key={`connection-${index}`} {...connection} />
      ))}
    </div>
  );
};

// Animation for DCS visualization
const DCSVisualization = () => {
  const [step, setStep] = useState(0);
  
  const steps = [
    {
      title: "Initial Contribution",
      description: "Validators submit transactions and contribute to network security"
    },
    {
      title: "Performance Analysis",
      description: "System evaluates uptime, response time, and transaction validity"
    },
    {
      title: "Score Calculation",
      description: "Dynamic Contribution Score (DCS) calculated based on quality metrics"
    },
    {
      title: "Reward Distribution",
      description: "Rewards distributed proportionally based on contribution scores"
    }
  ];
  
  const nextStep = () => {
    setStep((prev) => (prev + 1) % steps.length);
  };
  
  const prevStep = () => {
    setStep((prev) => (prev - 1 + steps.length) % steps.length);
  };
  
  return (
    <div className="w-full">
      <div className="relative h-64 bg-muted/20 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${i % 2 === 0 ? 'bg-primary/20' : 'bg-secondary/20'}`}>
                    <Users className={`h-8 w-8 ${i % 2 === 0 ? 'text-primary' : 'text-secondary'}`} />
                  </div>
                  <span className="mt-2 text-sm font-medium">Validator {i}</span>
                </div>
              ))}
            </motion.div>
          )}
          
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { label: "Uptime", icon: <Clock className="h-5 w-5" />, value: "99.8%" },
                  { label: "Latency", icon: <Zap className="h-5 w-5" />, value: "120ms" },
                  { label: "Validity", icon: <CheckCircle className="h-5 w-5" />, value: "100%" },
                  { label: "Throughput", icon: <BarChart className="h-5 w-5" />, value: "540 TPS" }
                ].map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-background/80 p-3 rounded-lg flex items-center gap-2"
                  >
                    <div className="bg-primary/10 p-1.5 rounded-full text-primary">
                      {metric.icon}
                    </div>
                    <div>
                      <div className="text-xs text-foreground/70">{metric.label}</div>
                      <div className="font-semibold">{metric.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48 rounded-full border-8 border-muted flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full absolute"
                      >
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-primary/30"
                            style={{
                              top: '50%',
                              left: '50%',
                              transform: `rotate(${i * 30}deg) translateY(-20px) translateX(-50%)`,
                            }}
                          />
                        ))}
                      </motion.div>
                      <div className="z-10 bg-background/80 rounded-full w-36 h-36 flex flex-col items-center justify-center p-4">
                        <div className="text-xs text-foreground/70 mb-1">Contribution Score</div>
                        <div className="text-2xl font-bold text-primary">87</div>
                        <div className="text-xs text-foreground/70 mt-2">Top 12% of Validators</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center w-full px-8"
            >
              <div className="w-full space-y-3">
                {[
                  { name: "Validator 1", score: 87, reward: 32.4 },
                  { name: "Validator 2", score: 92, reward: 34.3 },
                  { name: "Validator 3", score: 76, reward: 28.3 },
                  { name: "Validator 4", score: 61, reward: 22.8 }
                ].map((validator, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-background/80 p-3 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${i % 2 === 0 ? 'bg-primary/20' : 'bg-secondary/20'}`}>
                        <Users className={`h-4 w-4 ${i % 2 === 0 ? 'text-primary' : 'text-secondary'}`} />
                      </div>
                      <span className="font-medium">{validator.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-foreground/70">Score:</span> {validator.score}
                      </div>
                      <div className="text-sm font-semibold text-primary">
                        {validator.reward} PEO
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center bg-muted/30 p-3 rounded-lg">
        <Button variant="outline" size="sm" onClick={prevStep}>
          Previous
        </Button>
        <div className="text-center">
          <h4 className="font-semibold">{steps[step].title}</h4>
          <p className="text-sm text-foreground/70">{steps[step].description}</p>
        </div>
        <Button variant="outline" size="sm" onClick={nextStep}>
          Next
        </Button>
      </div>
    </div>
  );
};

// Missing icon imports
import { Clock, CheckCircle, BarChart } from 'lucide-react';

export default function InteractiveTechHighlightsSection() {
  return (
    <section id="tech-highlights" className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Technical Highlights</h2>
          <p className="text-foreground/70 max-w-3xl mx-auto text-lg">
            Explore PeoChain's innovative technology through interactive visualizations that demonstrate our key technical advantages.
          </p>
        </div>

        <Tabs defaultValue="posyg" className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="posyg" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="mr-2 h-4 w-4" />
              Proof of Synergy (PoSyg)
            </TabsTrigger>
            <TabsTrigger value="dcs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ChevronsUpDown className="mr-2 h-4 w-4" />
              Dynamic Contribution Scoring (DCS)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posyg">
            <Card>
              <CardHeader>
                <CardTitle>Proof of Synergy (PoSyg)</CardTitle>
                <CardDescription>
                  PeoChain's novel consensus mechanism that balances security, scalability, and decentralization through cooperative validation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PoSygVisualization />
              </CardContent>
              <CardFooter className="flex-col items-start">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="posyg-details">
                    <AccordionTrigger>How PoSyg Works</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 text-sm">
                        <p>
                          Proof of Synergy (PoSyg) is PeoChain's revolutionary consensus mechanism that enables validators to work collaboratively rather than competitively.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted/30 p-3 rounded-lg">
                            <h4 className="font-semibold flex items-center gap-2 mb-2">
                              <Shield className="h-4 w-4 text-primary" />
                              Enhanced Security
                            </h4>
                            <p className="text-foreground/70">
                              PoSyg requires coordinated effort from multiple validators to validate transactions, making it resistant to collusion attacks.
                            </p>
                          </div>
                          <div className="bg-muted/30 p-3 rounded-lg">
                            <h4 className="font-semibold flex items-center gap-2 mb-2">
                              <Zap className="h-4 w-4 text-primary" />
                              Superior Scalability
                            </h4>
                            <p className="text-foreground/70">
                              By distributing validation workload across synergistic validator groups, PoSyg achieves parallel processing and higher throughput.
                            </p>
                          </div>
                          <div className="bg-muted/30 p-3 rounded-lg">
                            <h4 className="font-semibold flex items-center gap-2 mb-2">
                              <Users className="h-4 w-4 text-primary" />
                              True Decentralization
                            </h4>
                            <p className="text-foreground/70">
                              Lower hardware requirements and fair reward distribution enable broader participation in the network.
                            </p>
                          </div>
                          <div className="bg-muted/30 p-3 rounded-lg">
                            <h4 className="font-semibold flex items-center gap-2 mb-2">
                              <Lock className="h-4 w-4 text-primary" />
                              Quantum Resistance
                            </h4>
                            <p className="text-foreground/70">
                              PoSyg incorporates post-quantum cryptography to secure the network against future quantum computing threats.
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="dcs">
            <Card>
              <CardHeader>
                <CardTitle>Dynamic Contribution Scoring (DCS)</CardTitle>
                <CardDescription>
                  A fair and efficient way to evaluate validator contributions and distribute rewards based on meaningful metrics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DCSVisualization />
              </CardContent>
              <CardFooter className="flex-col items-start">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="dcs-details">
                    <AccordionTrigger>How DCS Works</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 text-sm">
                        <p>
                          Dynamic Contribution Scoring (DCS) is PeoChain's innovative approach to measuring and rewarding validator contributions based on meaningful performance metrics rather than simply stake size.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted/30 p-3 rounded-lg">
                            <h4 className="font-semibold flex items-center gap-2 mb-2">
                              <Shield className="h-4 w-4 text-primary" />
                              Performance Evaluation
                            </h4>
                            <p className="text-foreground/70">
                              DCS analyzes uptime, response time, transaction validation accuracy, and network participation to create a comprehensive score.
                            </p>
                          </div>
                          <div className="bg-muted/30 p-3 rounded-lg">
                            <h4 className="font-semibold flex items-center gap-2 mb-2">
                              <Zap className="h-4 w-4 text-primary" />
                              Merit-Based Rewards
                            </h4>
                            <p className="text-foreground/70">
                              Validators receive rewards proportional to their contribution scores, incentivizing quality performance over mere token holdings.
                            </p>
                          </div>
                          <div className="bg-muted/30 p-3 rounded-lg">
                            <h4 className="font-semibold flex items-center gap-2 mb-2">
                              <Users className="h-4 w-4 text-primary" />
                              Inclusivity
                            </h4>
                            <p className="text-foreground/70">
                              Even validators with modest stake can earn competitive rewards by maintaining excellent performance metrics.
                            </p>
                          </div>
                          <div className="bg-muted/30 p-3 rounded-lg">
                            <h4 className="font-semibold flex items-center gap-2 mb-2">
                              <Network className="h-4 w-4 text-primary" />
                              Continuous Optimization
                            </h4>
                            <p className="text-foreground/70">
                              The DCS algorithm continuously adapts to changing network conditions, ensuring fairness and optimizing for long-term network health.
                            </p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}