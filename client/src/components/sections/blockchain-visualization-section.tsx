import React from 'react';
import { Link } from 'wouter';
import BlockchainVisualization from '../visualizations/blockchain-visualization';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export default function BlockchainVisualizationSection() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="section-title">
          See PeoChain in Action
        </h2>
        <p className="description max-w-2xl mx-auto text-lg">
          Experience the revolutionary speed of PeoChain's parallel processing architecture with our interactive visualization.
        </p>
      </div>
      
      <div className="glass rounded-3xl p-6 md:p-10">
        <BlockchainVisualization />
      </div>
      
      <div className="mt-8 text-center">
        <Link href="/cross-chain-demo">
          <Button className="group" size="lg">
            <ExternalLink className="mr-2 h-4 w-4 group-hover:animate-pulse" />
            Explore Cross-Chain Interoperability Demo
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground mt-3">
          Dive deeper into how PeoChain connects different blockchain networks with our interactive cross-chain visualization
        </p>
      </div>
    </section>
  );
}