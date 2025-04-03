import React from 'react';
import CrossChainVisualization from '../visualizations/cross-chain-visualization';

export default function TechStackDemoSection() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="section-title">
          Interoperable Tech Stack
        </h2>
        <p className="description max-w-2xl mx-auto text-lg">
          PeoChain seamlessly connects with all major blockchain networks, enabling fluid asset transfers, data exchange, and cross-chain smart contracts.
        </p>
      </div>
      
      <div className="glass rounded-3xl p-6 md:p-10">
        <CrossChainVisualization />
      </div>
    </section>
  );
}