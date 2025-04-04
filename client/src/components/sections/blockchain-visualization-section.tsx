import React from 'react';
import BlockchainVisualization from '../visualizations/blockchain-visualization';

export default function BlockchainVisualizationSection() {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="section-title">
          Revolutionary Blockchain Technology
        </h2>
        <p className="description max-w-2xl mx-auto text-lg">
          Experience how PeoChain's innovative PoSyg consensus and Dynamic Contribution Scoring redefine blockchain performance.
        </p>
        
        <div className="mt-12 max-w-4xl mx-auto bg-white/80 backdrop-blur rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">Legacy Blockchains</h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-1" />
                  <span>High energy consumption with PoW</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-1" />
                  <span>Limited scalability (7-15 TPS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-1" />
                  <span>Centralization risks</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">PeoChain Solutions</h3>
              <ul className="space-y-3 text-left">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1" />
                  <span>Energy-efficient PoSyg consensus</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1" />
                  <span>100,000+ TPS with subnet scaling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1" />
                  <span>Fair DCS validator rewards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass rounded-3xl p-6 md:p-10">
        <BlockchainVisualization />
      </div>
    </section>
  );
}