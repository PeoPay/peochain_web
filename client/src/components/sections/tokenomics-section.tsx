import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Coins, ShieldCheck, Users, Scale, Repeat } from "lucide-react";

interface TokenDistribution {
  name: string;
  value: number;
  color: string;
  icon: React.ReactNode;
  description: string;
}

export default function TokenomicsSection() {
  const tokenDistribution: TokenDistribution[] = [
    { 
      name: 'Active Validators', 
      value: 30, 
      color: '#4f46e5', 
      icon: <ShieldCheck className="h-5 w-5" />,
      description: 'Rewards for network validators securing the blockchain through our PoSyg consensus mechanism.'
    },
    { 
      name: 'Ecosystem Growth', 
      value: 25, 
      color: '#06b6d4', 
      icon: <TrendingUp className="h-5 w-5" />,
      description: 'Dedicated funds for developer grants, ecosystem development, and strategic partnerships.'
    },
    { 
      name: 'Team Commitment', 
      value: 15, 
      color: '#8b5cf6', 
      icon: <Users className="h-5 w-5" />,
      description: 'Allocation for founding team and future team members with multi-year vesting schedules.'
    },
    { 
      name: 'Stabilization Fund', 
      value: 15, 
      color: '#10b981', 
      icon: <Scale className="h-5 w-5" />,
      description: 'Reserved for market operations to reduce volatility and maintain economic stability.'
    },
    { 
      name: 'Liquidity', 
      value: 10, 
      color: '#f59e0b', 
      icon: <Repeat className="h-5 w-5" />,
      description: 'Liquidity provisioning across decentralized exchanges and trading platforms.'
    },
    { 
      name: 'Community Adoption', 
      value: 5, 
      color: '#ef4444', 
      icon: <Coins className="h-5 w-5" />,
      description: 'Airdrops, user rewards, and community incentives to drive adoption and usage.'
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
            <p className="font-medium">{data.name}</p>
          </div>
          <p className="text-lg font-bold">{data.value}%</p>
        </div>
      );
    }
    return null;
  };

  const stabilityMechanisms = [
    {
      title: "Token Buybacks",
      description: "PeoChain automatically allocates a percentage of network fees to repurchase tokens during market volatility, creating a price floor and reducing circulating supply."
    },
    {
      title: "Staking Incentives",
      description: "Progressive staking rewards encourage long-term token holding, reducing market volatility and ensuring validator stability across market cycles."
    },
    {
      title: "Algorithmic Adjustments",
      description: "Dynamic fee structure and rewards that self-adjust based on network usage and market conditions to maintain economic equilibrium."
    },
    {
      title: "Economic Reserves",
      description: "Dedicated stabilization fund managed by decentralized governance to intervene during extreme market events and protect ecosystem health."
    }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <section id="tokenomics" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="section-title">
          Economic Sustainability
        </h2>
        <p className="description max-w-2xl mx-auto text-lg">
          PeoChain's tokenomics are designed for long-term economic stability and sustainable growth.
        </p>
      </div>

      <div className="glass rounded-3xl p-6 md:p-10">
        <Tabs defaultValue="distribution">
          <TabsList className="mb-8 grid w-full grid-cols-2">
            <TabsTrigger value="distribution">Token Distribution</TabsTrigger>
            <TabsTrigger value="stability">Stability Mechanisms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="distribution">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <h3 className="text-xl font-bold mb-4">Balanced Token Distribution</h3>
                <p className="text-foreground/70 mb-6">
                  PeoChain's token allocation is strategically balanced to ensure network security, sustainable growth, and resistance to economic manipulation.
                </p>
                
                <div className="space-y-4">
                  {tokenDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <div className="font-medium">{item.name}</div>
                      <div className="ml-auto font-bold">{item.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-2 h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tokenDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {tokenDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {tokenDistribution.map((item) => (
                <Card key={item.name} className="bg-white/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full" style={{ backgroundColor: `${item.color}20` }}>
                        <div className="text-foreground">
                          {item.icon}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm font-bold">{item.value}%</div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/70">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="stability">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Economic Stability Mechanisms</h3>
              <p className="text-foreground/70">
                PeoChain implements multiple mechanisms to ensure price stability, reduce volatility, and create a sustainable economic environment for users and developers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stabilityMechanisms.map((mechanism, index) => (
                <Card key={index} className="bg-white/50">
                  <CardContent className="pt-6">
                    <h4 className="font-bold text-lg mb-2">{mechanism.title}</h4>
                    <p className="text-foreground/70">{mechanism.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-primary/5 rounded-xl p-6 mt-8">
              <h4 className="font-semibold mb-3">Economic Stability in Practice</h4>
              <p>
                PeoChain's economic model has been extensively simulated under various market conditions, including bull markets, bear markets, and black swan events. Our multi-layered approach to economic stability ensures that the network remains resilient and functional even during extreme market conditions, protecting user assets and maintaining network operations.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}