import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PerformanceComparisonSection() {
  // State to track which rows are expanded for mobile view
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (rowId: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [rowId]: !prev[rowId]
    }));
  };

  // Comparison data
  const comparisonData = [
    {
      id: "consensus",
      feature: "Consensus",
      peochain: "PoSyg™",
      ethereum: "Proof of Stake",
      solana: "Proof of History",
      avalanche: "Avalanche Consensus",
      tooltip: "Consensus mechanisms determine how blockchain networks validate transactions"
    },
    {
      id: "tps",
      feature: "Transactions per second (TPS)",
      peochain: "100,000",
      ethereum: "15-30",
      solana: "65,000",
      avalanche: "4,500",
      tooltip: "Maximum number of transactions that can be processed per second"
    },
    {
      id: "finality",
      feature: "Finality",
      peochain: "1 sec",
      ethereum: "12-15 min",
      solana: "400 ms",
      avalanche: "2-3 sec",
      tooltip: "Time taken for a transaction to be considered irreversible"
    },
    {
      id: "fees",
      feature: "Fees",
      peochain: "Ultra-low fixed",
      ethereum: "Variable Gas",
      solana: "Low fixed",
      avalanche: "Medium fixed",
      tooltip: "Transaction cost structure for users"
    },
    {
      id: "scalability",
      feature: "Scalability Solution",
      peochain: "Subnet Validators",
      ethereum: "L2 & Sharding",
      solana: "Parallel Processing",
      avalanche: "Subnets",
      tooltip: "Method used to increase transaction throughput beyond base capacity"
    },
    {
      id: "decentralization",
      feature: "Decentralization Level",
      peochain: "High (Dynamic)",
      ethereum: "Medium",
      solana: "Low-Medium",
      avalanche: "Medium",
      tooltip: "Degree of distribution of network control among participants"
    }
  ];

  return (
    <section id="comparison" className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="section-title">
          Performance & Comparison
        </h2>
        <p className="description max-w-2xl mx-auto text-lg">
          See how PeoChain compares to other leading blockchain platforms. Our innovative technology delivers superior performance across key metrics.
        </p>
      </div>

      {/* Desktop view - Full table */}
      <div className="hidden md:block">
        <div className="glass rounded-3xl p-6 md:p-10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary/10">
                <TableHead className="font-bold">Feature</TableHead>
                <TableHead className="font-bold">
                  <span className="flex items-center justify-center">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm mr-2">PeoChain</span>
                  </span>
                </TableHead>
                <TableHead>Ethereum</TableHead>
                <TableHead>Solana</TableHead>
                <TableHead>Avalanche</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {row.feature}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">{row.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-primary">{row.peochain}</TableCell>
                  <TableCell>{row.ethereum}</TableCell>
                  <TableCell>{row.solana}</TableCell>
                  <TableCell>{row.avalanche}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile view - Collapsible sections */}
      <div className="md:hidden">
        <div className="space-y-4">
          {comparisonData.map((row) => (
            <div key={row.id} className="glass rounded-xl overflow-hidden">
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => toggleRow(row.id)}
              >
                <div className="flex items-center">
                  {row.feature}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{row.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {expandedRows[row.id] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </Button>
              
              {expandedRows[row.id] && (
                <div className="p-4 pt-0 space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold bg-primary text-white px-2 py-1 rounded-full text-xs">PeoChain</span>
                    <span className="font-medium text-primary">{row.peochain}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold">Ethereum</span>
                    <span>{row.ethereum}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold">Solana</span>
                    <span>{row.solana}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Avalanche</span>
                    <span>{row.avalanche}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}