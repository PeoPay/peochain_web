import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useLocation } from "wouter";

export default function Whitepaper() {
  const [, navigate] = useLocation();

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
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-3">Proof of Synergy (PoSyg)</h3>
                    <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                      <li>Combines security, decentralization, and economic incentives in a single consensus mechanism</li>
                      <li>Dynamically rewards honest validators while penalizing malicious actors</li>
                      <li>Achieves high performance without compromising on decentralization</li>
                      <li>Energy efficient with minimal environmental impact</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-3">Dynamic Contribution Scoring (DCS)</h3>
                    <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                      <li>Transparent, mathematically rigorous incentive model</li>
                      <li>Evaluates network participation quality beyond simple stake amounts</li>
                      <li>Encourages long-term, sustainable network participation</li>
                      <li>Resistant to gaming or manipulation by wealthy stakeholders</li>
                    </ul>
                  </div>
                </div>
              </section>

              <Separator />

              {/* 5. Technical Highlights */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Technical Highlights</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="border border-primary/20 p-5 rounded-xl">
                    <h3 className="font-bold text-lg mb-2">Subnet Validator Network</h3>
                    <p className="text-foreground/70 text-sm">
                      Independent validator subnetworks enable parallel transaction processing, dramatically boosting network throughput and decentralization.
                    </p>
                  </div>
                  
                  <div className="border border-primary/20 p-5 rounded-xl">
                    <h3 className="font-bold text-lg mb-2">Zero-Knowledge Proofs (ZK-Proofs)</h3>
                    <p className="text-foreground/70 text-sm">
                      Advanced cryptographic protocols ensuring secure, confidential transactions while preserving public verifiability, enhancing both privacy and scalability.
                    </p>
                  </div>
                  
                  <div className="border border-primary/20 p-5 rounded-xl">
                    <h3 className="font-bold text-lg mb-2">Threshold Signature Scheme (TSS)</h3>
                    <p className="text-foreground/70 text-sm">
                      Collaborative validation method improving fault tolerance and security, eliminating single points of failure through decentralized signature generation.
                    </p>
                  </div>
                  
                  <div className="border border-primary/20 p-5 rounded-xl">
                    <h3 className="font-bold text-lg mb-2">Adaptive Block Production</h3>
                    <p className="text-foreground/70 text-sm">
                      Real-time adjustments in block validation difficulty and reward distribution, maintaining optimal network performance under varying conditions.
                    </p>
                  </div>
                  
                  <div className="border border-primary/20 p-5 rounded-xl">
                    <h3 className="font-bold text-lg mb-2">Cross-Chain Interoperability</h3>
                    <p className="text-foreground/70 text-sm">
                      Seamless integration with major blockchains (Ethereum, Solana, Polkadot, Cosmos), facilitating asset transfers, enhancing liquidity, and extending decentralized financial opportunities.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              {/* 6. Economic Model */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Economic Model (Tokenomics)</h2>
                
                <p className="text-foreground/80 mb-6">
                  PeoChain's tokenomics strategically support long-term economic sustainability and incentivize active participation:
                </p>
                
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
                
                <div className="space-y-6">
                  <div className="bg-primary/5 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-3">Dynamic Supply Management</h3>
                    <p className="text-foreground/80">
                      Employs strategic token buybacks and issuance adjustments to stabilize prices, manage volatility, and respond dynamically to market conditions, thus safeguarding economic health.
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-3">Participant-Centric Incentives</h3>
                    <p className="text-foreground/80">
                      Validators and users earn rewards proportional to their <span className="font-semibold">Synergy Scores</span>, incentivizing consistent participation, staking, governance involvement, and referrals, reinforced by periodic bonuses and gamified engagement mechanisms.
                    </p>
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

              {/* 8. Roadmap */}
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