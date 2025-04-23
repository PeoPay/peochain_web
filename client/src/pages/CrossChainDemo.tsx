import { Suspense, lazy } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';

// Lazy loading the visualization component
const CrossChainVisualization = lazy(() => import('@/components/visualizations/cross-chain-visualization'));

export default function CrossChainDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-indigo-50/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Cross-Chain Technology Demo</h1>
        </div>
        
        <div className="prose max-w-none mb-8">
          <p className="text-lg text-gray-700">
            Explore how PeoChain facilitates seamless interoperability between different blockchain networks, enabling secure cross-chain transactions, data sharing, and smart contract execution.
          </p>
          <div className="flex items-center mt-4">
            <BookOpen className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm text-gray-500">
              This interactive demonstration showcases PeoChain's revolutionary Layer-0 protocol technology.
            </span>
          </div>
        </div>
      
        <div className="mb-12">
          <Suspense fallback={
            <div className="rounded-xl bg-white p-8 shadow-sm flex items-center justify-center h-[500px]">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-16 w-16 bg-blue-200 rounded-full mb-4"></div>
                <div className="h-4 w-48 bg-gray-200 rounded mb-3"></div>
                <div className="h-3 w-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          }>
            <CrossChainVisualization />
          </Suspense>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Quantum-Resistant Security</h3>
            <p className="text-gray-600 mb-4">
              PeoChain's protocol employs post-quantum cryptographic algorithms designed to withstand attacks from future quantum computers.
            </p>
            <ul className="text-sm text-gray-500 space-y-1 list-disc pl-5">
              <li>Lattice-based cryptography</li>
              <li>Hash-based signature schemes</li>
              <li>Symmetric key quantum resistance</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Carbon-Neutral Operation</h3>
            <p className="text-gray-600 mb-4">
              Our innovative consensus mechanism reduces energy consumption by 99.95% compared to traditional Proof of Work systems.
            </p>
            <ul className="text-sm text-gray-500 space-y-1 list-disc pl-5">
              <li>Green validator network</li>
              <li>Carbon offset program</li>
              <li>Energy-efficient block production</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Universal Compatibility</h3>
            <p className="text-gray-600 mb-4">
              PeoChain connects with any blockchain ecosystem, regardless of consensus mechanism or programming language.
            </p>
            <ul className="text-sm text-gray-500 space-y-1 list-disc pl-5">
              <li>Multi-VM support</li>
              <li>Protocol-agnostic architecture</li>
              <li>Legacy chain integration</li>
            </ul>
          </div>
        </div>
        
        <div className="text-center">
          <Link href="/whitepaper">
            <Button variant="outline" size="lg" className="mr-4">
              Read Whitepaper
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg">
              Join Waitlist
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}