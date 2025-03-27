import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useLocation } from "wouter";
import { useState } from "react";
import { AnimatedChart } from "@/components/ui/animated-chart";
import { ConsensusDiagram } from "@/components/ui/consensus-diagram";
import { SubnetDiagram } from "@/components/ui/subnet-diagram";

export default function Whitepaper() {
  const [, navigate] = useLocation();
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    consensusMechanism: false,
    dcs: false,
    architecture: false
  });

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Navigate to home page sections
  const navigateToHome = (section: string) => {
    navigate(`/#${section}`);
  };

  return (
    <div className="min-h-screen gradient-background">
      <Header 
        onFeatureClick={() => navigateToHome('features')}
        onBenefitsClick={() => navigateToHome('benefits')}
        onTechnologyClick={() => navigateToHome('technology')}
        onWaitlistClick={() => navigateToHome('waitlist')}
        onFaqClick={() => navigateToHome('faq')}
      />

      <main className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">PEOCHAIN Whitepaper</h1>
        
        {/* 1. Introductory Statement */}
        <p className="text-xl text-center text-foreground/80 mb-12 max-w-3xl mx-auto">
          "PeoChain is pioneering a decentralized financial revolution, empowering underbanked populations globally through cutting-edge blockchain innovation. By combining the novel Proof of Synergy (PoSyg) consensus mechanism with Dynamic Contribution Scoring (DCS), PeoChain achieves unparalleled scalability, security, and accessibility. Our blockchain platform supports ultra-low fees, instant transactions, seamless mobile integrations, and economic stability mechanisms—redefining what's possible in global decentralized finance (DeFi)."
        </p>

        <Card className="glass rounded-3xl border-0 shadow-sm mb-8">
          <CardContent className="p-8 md:p-12">
            <div className="space-y-10">
              {/* 2. Key Problems Solved */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Key Problems Solved by PeoChain</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-primary/5 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-3">High Transaction Costs</h3>
                    <p className="text-foreground/70">
                      Current blockchain and traditional financial systems impose high fees, significantly restricting access for underserved and underbanked communities.
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-3">Scalability and Performance Issues</h3>
                    <p className="text-foreground/70">
                      Most existing blockchain networks struggle to handle peak transaction volumes efficiently, causing delays, network congestion, and reduced usability.
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-3">Complex User Experiences</h3>
                    <p className="text-foreground/70">
                      Technical barriers, complicated interfaces, and insufficient educational resources limit blockchain adoption, especially among populations with limited technological literacy.
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-3">Economic Instability and Volatility</h3>
                    <p className="text-foreground/70">
                      Crypto volatility undermines trust and discourages everyday use, particularly in emerging economies where stability and predictability are essential.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              {/* 3. PeoChain Solutions */}
              <section>
                <h2 className="text-2xl font-bold mb-6">How PeoChain Solves These Problems</h2>
                
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="bg-primary/20 p-3 rounded-full text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Ultra-Low Transaction Fees</h3>
                      <p className="text-foreground/70">PeoChain dramatically reduces costs with fees as low as <span className="font-semibold">USD 0.004 per transaction</span>, ensuring affordability and global accessibility.</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="bg-primary/20 p-3 rounded-full text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">High Scalability and Instant Transactions</h3>
                      <p className="text-foreground/70">Leveraging advanced blockchain infrastructure, PeoChain processes up to <span className="font-semibold">100,000 transactions per second (TPS)</span> with <span className="font-semibold">1-second finality</span>, maintaining reliability even during peak usage.</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="bg-primary/20 p-3 rounded-full text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">User-Centric Mobile Integration</h3>
                      <p className="text-foreground/70">PeoChain simplifies blockchain adoption by seamlessly integrating with established mobile payment platforms like <span className="font-semibold">M-Pesa</span> and <span className="font-semibold">GCash</span>, facilitating effortless crypto-to-mobile money conversions.</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="bg-primary/20 p-3 rounded-full text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"/><line x1="16" x2="2" y1="8" y2="22"/><line x1="17.5" x2="9" y1="15" y2="15"/></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Economic Stability Measures</h3>
                      <p className="text-foreground/70">By deploying localized stablecoins pegged to familiar fiat currencies and incorporating sophisticated volatility-mitigation mechanisms, PeoChain ensures economic stability and builds trust among global users.</p>
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              {/* 4. Innovative Core Technologies */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Innovative Core Technologies</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl whitepaper-section">
                    <h3 className="font-bold text-xl mb-3">Proof of Synergy (PoSyg)</h3>
                    <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                      <li>Combines security, decentralization, and economic incentives in a single consensus mechanism</li>
                      <li>Dynamically rewards honest validators while penalizing malicious actors</li>
                      <li>Achieves high performance without compromising on decentralization</li>
                      <li>Energy efficient with minimal environmental impact</li>
                    </ul>
                    
                    <div 
                      className="flex items-center justify-center mt-4 text-primary cursor-pointer hover:text-primary/80 text-sm font-medium"
                      onClick={() => toggleSection('consensusMechanism')}
                    >
                      {expandedSections.consensusMechanism ? (
                        <>Show Less <ChevronUp className="ml-1 h-4 w-4" /></>
                      ) : (
                        <>View Consensus Mechanism Visualization <ChevronDown className="ml-1 h-4 w-4" /></>
                      )}
                    </div>
                    
                    {expandedSections.consensusMechanism && (
                      <div className="mt-4 p-4 bg-primary/5 rounded-xl">
                        <h3 className="sub-section-title mb-4 text-center">Proof of Synergy (PoSyg) Consensus</h3>
                        <div className="w-full flex justify-center responsive-diagram h-[350px] sm:h-[400px]">
                          <ConsensusDiagram mode="posyg" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl whitepaper-section">
                    <h3 className="sub-section-title mb-3">Dynamic Contribution Scoring (DCS)</h3>
                    <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                      <li>Transparent, mathematically rigorous incentive model</li>
                      <li>Evaluates network participation quality beyond simple stake amounts</li>
                      <li>Encourages long-term, sustainable network participation</li>
                      <li>Resistant to gaming or manipulation by wealthy stakeholders</li>
                    </ul>
                    
                    <div 
                      className="flex items-center justify-center mt-4 text-primary cursor-pointer hover:text-primary/80 text-sm font-medium"
                      onClick={() => toggleSection('dcs')}
                    >
                      {expandedSections.dcs ? (
                        <>Show Less <ChevronUp className="ml-1 h-4 w-4" /></>
                      ) : (
                        <>View DCS Visualization <ChevronDown className="ml-1 h-4 w-4" /></>
                      )}
                    </div>
                    
                    {expandedSections.dcs && (
                      <div className="mt-4 p-4 bg-primary/5 rounded-xl">
                        <h3 className="sub-section-title mb-4 text-center">Dynamic Contribution Scoring</h3>
                        <div className="w-full flex justify-center responsive-diagram h-[350px] sm:h-[400px]">
                          <ConsensusDiagram mode="dcs" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-8 p-5 bg-primary/5 rounded-xl">
                  <h3 className="sub-section-title mb-4 text-center">Performance Comparison</h3>
                  <div className="h-[350px] responsive-chart">
                    <AnimatedChart />
                  </div>
                </div>
              </section>

              <Separator />

              {/* 5. Technical Highlights */}
              <section>
                <h2 className="section-title mb-6">Technical Highlights</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="border border-primary/20 p-5 rounded-xl whitepaper-section">
                    <h3 className="feature-title mb-2">Subnet Validator Network</h3>
                    <p className="description text-sm">
                      Independent validator subnetworks enable parallel transaction processing, dramatically boosting network throughput and decentralization.
                    </p>
                    
                    <div 
                      className="flex items-center justify-center mt-4 text-primary cursor-pointer hover:text-primary/80 text-xs font-medium"
                      onClick={() => toggleSection('architecture')}
                    >
                      {expandedSections.architecture ? (
                        <>Hide Architecture <ChevronUp className="ml-1 h-3 w-3" /></>
                      ) : (
                        <>View Architecture <ChevronDown className="ml-1 h-3 w-3" /></>
                      )}
                    </div>
                  </div>
                  
                  <div className="border border-primary/20 p-5 rounded-xl">
                    <h3 className="feature-title mb-2">Zero-Knowledge Proofs (ZK-Proofs)</h3>
                    <p className="description text-sm">
                      Advanced cryptographic protocols ensuring secure, confidential transactions while preserving public verifiability, enhancing both privacy and scalability.
                    </p>
                  </div>
                  
                  <div className="border border-primary/20 p-5 rounded-xl">
                    <h3 className="feature-title mb-2">Threshold Signature Scheme (TSS)</h3>
                    <p className="description text-sm">
                      Collaborative validation method improving fault tolerance and security, eliminating single points of failure through decentralized signature generation.
                    </p>
                  </div>
                  
                  <div className="border border-primary/20 p-5 rounded-xl">
                    <h3 className="feature-title mb-2">Adaptive Block Production</h3>
                    <p className="description text-sm">
                      Real-time adjustments in block validation difficulty and reward distribution, maintaining optimal network performance under varying conditions.
                    </p>
                  </div>
                  
                  <div className="border border-primary/20 p-5 rounded-xl">
                    <h3 className="feature-title mb-2">Cross-Chain Interoperability</h3>
                    <p className="description text-sm">
                      Seamless integration with major blockchains (Ethereum, Solana, Polkadot, Cosmos), facilitating asset transfers, enhancing liquidity, and extending decentralized financial opportunities.
                    </p>
                  </div>
                </div>
                
                {expandedSections.architecture && (
                  <div className="my-8 p-4 bg-primary/5 rounded-xl">
                    <h3 className="sub-section-title mb-4 text-center">Subnet Validator Architecture</h3>
                    <div className="w-full flex justify-center responsive-diagram h-[350px] sm:h-[400px]">
                      <SubnetDiagram />
                    </div>
                    
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div className="bg-white/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-primary text-center mb-3">Parallel Processing Advantages</h4>
                        <ul className="list-disc pl-6 mt-2 text-sm space-y-1">
                          <li>Horizontal scaling without compromising security</li>
                          <li>Specialized subnet roles for optimized performance</li>
                          <li>Improved fault tolerance and redundancy</li>
                          <li>Enhanced transaction throughput</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-primary text-center mb-3">Subnet Validator Selection</h4>
                        <ul className="list-disc pl-6 mt-2 text-sm space-y-1">
                          <li>Validators assigned to specialized subnets based on capacity and performance</li>
                          <li>Dynamic rotation ensures distributed responsibility</li>
                          <li>Subnet leaders selected by DCS algorithm</li>
                          <li>Synergy score influences subnet assignment</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="p-5 bg-primary/5 rounded-xl">
                  <h3 className="feature-title mb-3">Technical Architecture Comparison with Leading Blockchains</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-primary/10">
                          <th className="border border-primary/20 p-2 text-left">Feature</th>
                          <th className="border border-primary/20 p-2 text-left">PeoChain</th>
                          <th className="border border-primary/20 p-2 text-left">Ethereum</th>
                          <th className="border border-primary/20 p-2 text-left">Solana</th>
                          <th className="border border-primary/20 p-2 text-left">Avalanche</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr>
                          <td className="border border-primary/20 p-2 font-medium">Consensus</td>
                          <td className="border border-primary/20 p-2">Proof of Synergy</td>
                          <td className="border border-primary/20 p-2">Proof of Stake</td>
                          <td className="border border-primary/20 p-2">Proof of History</td>
                          <td className="border border-primary/20 p-2">Avalanche Consensus</td>
                        </tr>
                        <tr className="bg-primary/5">
                          <td className="border border-primary/20 p-2 font-medium">TPS</td>
                          <td className="border border-primary/20 p-2 font-semibold">100,000</td>
                          <td className="border border-primary/20 p-2">15-30</td>
                          <td className="border border-primary/20 p-2">65,000</td>
                          <td className="border border-primary/20 p-2">4,500</td>
                        </tr>
                        <tr>
                          <td className="border border-primary/20 p-2 font-medium">Finality</td>
                          <td className="border border-primary/20 p-2 font-semibold">1 second</td>
                          <td className="border border-primary/20 p-2">12-15 minutes</td>
                          <td className="border border-primary/20 p-2">400ms</td>
                          <td className="border border-primary/20 p-2">2-3 seconds</td>
                        </tr>
                        <tr className="bg-primary/5">
                          <td className="border border-primary/20 p-2 font-medium">Mobile Integration</td>
                          <td className="border border-primary/20 p-2 font-semibold">Native Integrations</td>
                          <td className="border border-primary/20 p-2">Complex, Limited</td>
                          <td className="border border-primary/20 p-2">Partial, External</td>
                          <td className="border border-primary/20 p-2">Limited, Emerging</td>
                        </tr>
                        <tr>
                          <td className="border border-primary/20 p-2 font-medium">Fee Structure</td>
                          <td className="border border-primary/20 p-2 font-semibold">Fixed Low Fees</td>
                          <td className="border border-primary/20 p-2">Variable Gas Fees</td>
                          <td className="border border-primary/20 p-2">Low Fixed</td>
                          <td className="border border-primary/20 p-2">Medium Fixed</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <Separator />



              {/* 7. Financial Projections */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Financial Model, Projections & Viability</h2>
                
                <p className="text-foreground/80 mb-6">
                  PeoChain employs a dual-structured funding approach:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-primary/5 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-3">ICO/IEO Funding</h3>
                    <p className="text-foreground/80">
                      Targets <span className="font-semibold">$3,250,000</span> (25% token supply) allocated towards blockchain development, marketing, community growth, and liquidity management.
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-3">Private Investment Round</h3>
                    <p className="text-foreground/80">
                      Seeks <span className="font-semibold">$5,000,000</span> (20% equity at $27,500,000 valuation) to bolster team capabilities, scaling infrastructure, comprehensive marketing, and compliance.
                    </p>
                  </div>
                </div>
                
                <h3 className="font-bold text-xl mb-3">Viability Measures</h3>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                  <li><span className="font-medium">Risk Management:</span> Robust approach through regulatory compliance, proactive audits, and security programs</li>
                  <li><span className="font-medium">Sustainable Growth:</span> Achieved through adaptive tokenomics, sustainable validator incentives, and a clearly defined use of funds</li>
                </ul>
              </section>

              <Separator />

              {/* 6. Economic Model */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Economic Model (Tokenomics)</h2>
                
                <p className="text-foreground/80 mb-6">
                  PeoChain's tokenomics strategically support long-term economic sustainability and incentivize active participation:
                </p>
                
                <div className="whitepaper-section">                  
                  <div className="bg-primary/5 p-6 rounded-xl mb-6">
                    <h3 className="font-bold text-xl mb-3">Balanced Token Distribution</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                      <div className="p-3">
                        <div className="text-3xl font-bold text-primary mb-1">30%</div>
                        <div className="text-sm text-foreground/70">Active Validators</div>
                      </div>
                      <div className="p-3">
                        <div className="text-3xl font-bold text-primary mb-1">25%</div>
                        <div className="text-sm text-foreground/70">Ecosystem Growth</div>
                      </div>
                      <div className="p-3">
                        <div className="text-3xl font-bold text-primary mb-1">15%</div>
                        <div className="text-sm text-foreground/70">Team Commitment</div>
                      </div>
                      <div className="p-3">
                        <div className="text-3xl font-bold text-primary mb-1">15%</div>
                        <div className="text-sm text-foreground/70">Stabilization Fund</div>
                      </div>
                      <div className="p-3">
                        <div className="text-3xl font-bold text-primary mb-1">10%</div>
                        <div className="text-sm text-foreground/70">Liquidity</div>
                      </div>
                      <div className="p-3">
                        <div className="text-3xl font-bold text-primary mb-1">5%</div>
                        <div className="text-sm text-foreground/70">Community Adoption</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-primary/5 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-3">Dynamic Supply Management</h3>
                    <p className="text-foreground/80">
                      Employs strategic token buybacks and issuance adjustments to stabilize prices, manage volatility, and respond dynamically to market conditions, thus safeguarding economic health.
                    </p>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-primary text-sm mb-2">Stability Mechanisms</h4>
                        <ul className="list-disc pl-5 text-xs space-y-1 text-foreground/80">
                          <li>Algorithmic supply adjustments based on market conditions</li>
                          <li>Strategic token buybacks from transaction fees</li>
                          <li>Validator staking incentives to reduce circulating supply</li>
                          <li>Scheduled token release schedules to prevent market flooding</li>
                        </ul>
                      </div>
                      
                      <div className="bg-white/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-primary text-sm mb-2">Economic Sustainability</h4>
                        <ul className="list-disc pl-5 text-xs space-y-1 text-foreground/80">
                          <li>Transaction fee distribution model ensures network maintenance</li>
                          <li>Ecosystem development fund for long-term growth initiatives</li>
                          <li>Governance-approved parameter adjustments</li>
                          <li>Emergency stabilization reserves for extreme market conditions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-primary/5 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-3">Participant-Centric Incentives</h3>
                    <p className="text-foreground/80">
                      Validators and users earn rewards proportional to their <span className="font-semibold">Synergy Scores</span>, incentivizing consistent participation, staking, governance involvement, and referrals, reinforced by periodic bonuses and gamified engagement mechanisms.
                    </p>
                    
                    <div className="mt-4 bg-white/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-primary text-sm mb-2">Synergy Score Calculation</h4>
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-primary/10">
                            <th className="border border-primary/20 p-2 text-left">Component</th>
                            <th className="border border-primary/20 p-2 text-left">Weight</th>
                            <th className="border border-primary/20 p-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-primary/20 p-2">Staking Duration</td>
                            <td className="border border-primary/20 p-2">30%</td>
                            <td className="border border-primary/20 p-2">Longer staking periods earn higher scores</td>
                          </tr>
                          <tr className="bg-primary/5">
                            <td className="border border-primary/20 p-2">Network Contribution</td>
                            <td className="border border-primary/20 p-2">25%</td>
                            <td className="border border-primary/20 p-2">Transaction validation quality and responsiveness</td>
                          </tr>
                          <tr>
                            <td className="border border-primary/20 p-2">Governance Participation</td>
                            <td className="border border-primary/20 p-2">20%</td>
                            <td className="border border-primary/20 p-2">Voting in governance proposals</td>
                          </tr>
                          <tr className="bg-primary/5">
                            <td className="border border-primary/20 p-2">Community Engagement</td>
                            <td className="border border-primary/20 p-2">15%</td>
                            <td className="border border-primary/20 p-2">Referrals and ecosystem expansion activities</td>
                          </tr>
                          <tr>
                            <td className="border border-primary/20 p-2">Stability Contribution</td>
                            <td className="border border-primary/20 p-2">10%</td>
                            <td className="border border-primary/20 p-2">Participation in stability-enhancing programs</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              {/* 9. Roadmap */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Roadmap to Global Adoption</h2>
                
                <div className="space-y-8">
                  <div className="relative">
                    <div className="absolute left-6 top-0 h-full w-0.5 bg-primary/20"></div>
                    <div className="flex items-start">
                      <div className="flex flex-shrink-0 items-center justify-center w-12 h-12 rounded-full bg-primary text-white z-10">
                        1
                      </div>
                      <div className="ml-6">
                        <h3 className="font-bold text-xl mb-2">Phase 1: Foundation and Early Development (Q4 2024 – Q1 2025)</h3>
                        <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                          <li>Launch PeoChain Testnet, initial crypto-to-mobile integrations with M-Pesa and GCash</li>
                          <li>Deployment on Polygon Amoy Testnet, initial staking, and DCS smart contracts</li>
                          <li>Secure private investment ($5M) and expand pilot programs in Kenya, Philippines, and Nigeria</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-6 top-0 h-full w-0.5 bg-primary/20"></div>
                    <div className="flex items-start">
                      <div className="flex flex-shrink-0 items-center justify-center w-12 h-12 rounded-full bg-primary text-white z-10">
                        2
                      </div>
                      <div className="ml-6">
                        <h3 className="font-bold text-xl mb-2">Phase 2: Scaling and Expansion (Q2 2025 – Q4 2025)</h3>
                        <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                          <li>Expand validator subnetworks, parallel transaction processing, and optimize mobile integrations (MTN Nigeria)</li>
                          <li>Official PeoChain Mainnet launch using PoSyg (100,000 TPS, 1-second finality)</li>
                          <li>Security audits by CertiK and Quantstamp; integration with Ethereum, Polkadot, Solana, Cosmos ecosystems</li>
                          <li>Reach 1 million active users through strategic marketing</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-start">
                      <div className="flex flex-shrink-0 items-center justify-center w-12 h-12 rounded-full bg-primary text-white z-10">
                        3
                      </div>
                      <div className="ml-6">
                        <h3 className="font-bold text-xl mb-2">Phase 3: Global Adoption and Advanced Features (2026 – 2027)</h3>
                        <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                          <li>Scale to 7.5 million active users across LATAM, South Asia, and broader African markets</li>
                          <li>Launch advanced DeFi products including yield farming, decentralized insurance, and NFT-based identity systems</li>
                          <li>Further expand cross-chain interoperability; strengthen global mobile money partnerships</li>
                          <li>Achieve 10 million active users, annual revenue exceeding $100 million, advanced regulatory frameworks for global sustainability</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <Separator />

              {/* 9. Leadership Team */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Leadership & Advisory Team</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col md:flex-row gap-4 items-start p-4 bg-primary/5 rounded-xl">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src="/images/team/dan-otieno.jpg" 
                        alt="Dan Otieno" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Dan Otieno</h3>
                      <p className="text-primary font-medium mb-2">CEO</p>
                      <p className="text-foreground/70 text-sm">
                        DeFi pioneer and financial inclusion strategist with 15+ years experience in emerging markets financial systems.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-start p-4 bg-primary/5 rounded-xl">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src="/images/team/daniil-krizhanovskyi.jpg" 
                        alt="Daniil Krizhanovskyi" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Daniil Krizhanovskyi</h3>
                      <p className="text-primary font-medium mb-2">CTO</p>
                      <p className="text-foreground/70 text-sm">
                        Blockchain security expert and cryptographic innovator, previously lead developer at multiple successful blockchain projects.
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="mt-6 text-foreground/70">
                  Supported by an international team of developers, economists, and financial inclusion experts, with advisors from major financial institutions and blockchain enterprises.
                </p>
              </section>

              <Separator />

              {/* 10. Call to Action */}
              <section className="text-center">
                <h2 className="text-2xl font-bold mb-4">Join the PeoChain Revolution</h2>
                <p className="text-foreground/80 mb-8 max-w-2xl mx-auto">
                  "Join PeoChain today in reshaping financial accessibility through decentralized innovation. Together, we're building a more inclusive global economy."
                </p>
                
                {/* 11. Download Button */}
                <a href="/PEOCHAIN_White_Paper.pdf" download>
                  <Button className="btn-gradient text-white font-medium py-2 px-8 rounded-full">
                    <Download className="mr-2 h-4 w-4" /> Download Full Whitepaper
                  </Button>
                </a>
              </section>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}