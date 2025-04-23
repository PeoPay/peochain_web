import React from 'react';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AIChat from "@/components/ai/ai-chat";
import { Bot, Lightbulb, BookOpen } from "lucide-react";

const AIAssistant: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-screen-xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            PeoChain AI Assistant
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your interactive guide to blockchain technology and cryptocurrency
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <AIChat 
              className="shadow-lg" 
              title="Blockchain Learning Assistant" 
              description="Ask me anything about blockchain technology, cryptocurrencies, or PeoChain's educational platform."
            />
          </div>
          
          <div className="space-y-6">
            <div className="bg-muted rounded-lg p-6">
              <h2 className="text-xl font-semibold flex items-center mb-3">
                <Bot className="mr-2 h-5 w-5" />
                About This Assistant
              </h2>
              <p className="text-muted-foreground mb-4">
                I'm here to help you learn about blockchain technology in simple, easy-to-understand terms. Whether you're a beginner or an expert, I can provide information and explanations tailored to your needs.
              </p>
              <hr className="my-4" />
              <h3 className="font-semibold mb-2">Try asking about:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Lightbulb className="h-4 w-4 mr-2 mt-1 text-primary" />
                  Blockchain fundamentals and how they work
                </li>
                <li className="flex items-start">
                  <Lightbulb className="h-4 w-4 mr-2 mt-1 text-primary" />
                  Cryptocurrencies and tokens
                </li>
                <li className="flex items-start">
                  <Lightbulb className="h-4 w-4 mr-2 mt-1 text-primary" />
                  NFTs and digital ownership
                </li>
                <li className="flex items-start">
                  <Lightbulb className="h-4 w-4 mr-2 mt-1 text-primary" />
                  Decentralized finance (DeFi)
                </li>
                <li className="flex items-start">
                  <Lightbulb className="h-4 w-4 mr-2 mt-1 text-primary" />
                  The PeoChain platform and educational resources
                </li>
              </ul>
            </div>
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h2 className="text-xl font-semibold flex items-center mb-3">
                <BookOpen className="mr-2 h-5 w-5" />
                Learning Resources
              </h2>
              <p className="text-muted-foreground mb-4">
                Explore our curated resources to deepen your blockchain knowledge:
              </p>
              <ul className="space-y-3">
                <li>
                  <a href="/whitepaper" className="text-primary hover:underline font-medium">
                    PeoChain Whitepaper
                  </a>
                  <p className="text-sm text-muted-foreground">
                    Our vision for blockchain education
                  </p>
                </li>
                <li>
                  <a href="/cross-chain-demo" className="text-primary hover:underline font-medium">
                    Interactive Cross-Chain Demo
                  </a>
                  <p className="text-sm text-muted-foreground">
                    Visualize how cross-chain transactions work
                  </p>
                </li>
                <li>
                  <a href="#waitlist" className="text-primary hover:underline font-medium">
                    Join Our Waitlist
                  </a>
                  <p className="text-sm text-muted-foreground">
                    Get early access to PeoChain's educational platform
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIAssistant;