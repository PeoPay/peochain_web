import React from 'react';
import BlockchainVisualization from '../visualizations/blockchain-visualization';

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
    </section>
  );
}