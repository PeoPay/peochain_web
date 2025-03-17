import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function Whitepaper() {
  return (
    <div className="min-h-screen gradient-background">
      <Header 
        onFeatureClick={() => {}}
        onBenefitsClick={() => {}}
        onTechnologyClick={() => {}}
        onWaitlistClick={() => {}}
        onFaqClick={() => {}}
      />

      <main className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">PEOCHAIN Whitepaper</h1>
        
        {/* 1. Introductory Statement */}
        <p className="text-xl text-center text-foreground/80 mb-12 max-w-3xl mx-auto">
          "Empowering global financial inclusion with decentralized innovation. PeoChain delivers secure, scalable blockchain solutions designed for universal accessibility."
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
                      Traditional financial services impose steep fees that exclude millions from basic banking services and cross-border transactions.
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-3">Scalability Issues</h3>
                    <p className="text-foreground/70">
                      Current blockchain platforms struggle with processing speed and capacity limitations, preventing mass adoption.
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-3">Complex User Experiences</h3>
                    <p className="text-foreground/70">
                      Technical barriers and complicated interfaces limit blockchain accessibility for non-technical users.
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-3">Economic Instability</h3>
                    <p className="text-foreground/70">
                      Cryptocurrency volatility creates uncertainty and risk for everyday users, hindering practical financial applications.
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
                      <h3 className="font-bold text-xl">Ultra-Low Fees</h3>
                      <p className="text-foreground/70">Transactions cost as little as CHF 0.40, making financial services accessible to everyone, regardless of transaction size or economic status.</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="bg-primary/20 p-3 rounded-full text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">High Scalability</h3>
                      <p className="text-foreground/70">Our platform processes up to 100,000 transactions per second with 1-second finality, surpassing most payment networks and meeting global demand.</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="bg-primary/20 p-3 rounded-full text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Mobile-first Integrations</h3>
                      <p className="text-foreground/70">Seamless integrations with popular mobile payment systems like M-Pesa and GCash, making blockchain technology accessible through familiar interfaces.</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="bg-primary/20 p-3 rounded-full text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"/><line x1="16" x2="2" y1="8" y2="22"/><line x1="17.5" x2="9" y1="15" y2="15"/></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Economic Stability Measures</h3>
                      <p className="text-foreground/70">Localized stablecoins and advanced volatility management mechanisms protect users from market fluctuations, ensuring reliable value storage and transfer.</p>
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
                      Enables parallel transaction validation across specialized validator subnets, dramatically increasing throughput while maintaining security.
                    </p>
                  </div>
                  
                  <div className="border border-primary/20 p-5 rounded-xl">
                    <h3 className="font-bold text-lg mb-2">Zero-Knowledge Proofs</h3>
                    <p className="text-foreground/70 text-sm">
                      Implements zkSNARKs for privacy-preserving transactions, allowing users to verify transactions without revealing sensitive details.
                    </p>
                  </div>
                  
                  <div className="border border-primary/20 p-5 rounded-xl">
                    <h3 className="font-bold text-lg mb-2">Threshold Signature Scheme</h3>
                    <p className="text-foreground/70 text-sm">
                      Distributes cryptographic signing across multiple validators, ensuring fault tolerance and enhanced security against targeted attacks.
                    </p>
                  </div>
                  
                  <div className="border border-primary/20 p-5 rounded-xl">
                    <h3 className="font-bold text-lg mb-2">Adaptive Block Production</h3>
                    <p className="text-foreground/70 text-sm">
                      Real-time adjustment of block parameters based on network conditions, optimizing performance during high-demand periods.
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              {/* 6. Economic Model */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Economic Model (Tokenomics)</h2>
                
                <div className="bg-primary/5 p-6 rounded-xl mb-6">
                  <h3 className="font-bold text-xl mb-3">Token Distribution</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-3">
                      <div className="text-3xl font-bold text-primary mb-1">40%</div>
                      <div className="text-sm text-foreground/70">Validators</div>
                    </div>
                    <div className="p-3">
                      <div className="text-3xl font-bold text-primary mb-1">25%</div>
                      <div className="text-sm text-foreground/70">Stabilization Fund</div>
                    </div>
                    <div className="p-3">
                      <div className="text-3xl font-bold text-primary mb-1">20%</div>
                      <div className="text-sm text-foreground/70">Ecosystem Growth</div>
                    </div>
                    <div className="p-3">
                      <div className="text-3xl font-bold text-primary mb-1">15%</div>
                      <div className="text-sm text-foreground/70">Core Development</div>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-bold text-xl mb-3">Volatility Management Mechanisms</h3>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                  <li><span className="font-medium">Dynamic Token Issuance:</span> Algorithmically adjusted based on network usage and market conditions</li>
                  <li><span className="font-medium">Automated Buyback Programs:</span> Triggered during significant price volatility events</li>
                  <li><span className="font-medium">Collateralized Stablecoins:</span> Multiple currency-pegged tokens backed by diversified asset reserves</li>
                  <li><span className="font-medium">Liquidity Pools:</span> Incentivized multi-asset pools to ensure market depth and stability</li>
                </ul>
              </section>

              <Separator />

              {/* 7. Financial Projections */}
              <section>
                <h2 className="text-2xl font-bold mb-6">Financial Projections & Viability</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-primary/10">
                        <th className="border border-primary/20 p-3 text-left">Milestone</th>
                        <th className="border border-primary/20 p-3 text-left">Timeframe</th>
                        <th className="border border-primary/20 p-3 text-left">Projected Revenue</th>
                        <th className="border border-primary/20 p-3 text-left">ROI</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-primary/20 p-3">Initial Deployment</td>
                        <td className="border border-primary/20 p-3">Q3 2024</td>
                        <td className="border border-primary/20 p-3">CHF 2.5M</td>
                        <td className="border border-primary/20 p-3">1.2x</td>
                      </tr>
                      <tr className="bg-primary/5">
                        <td className="border border-primary/20 p-3">Regional Expansion</td>
                        <td className="border border-primary/20 p-3">Q2 2025</td>
                        <td className="border border-primary/20 p-3">CHF 12M</td>
                        <td className="border border-primary/20 p-3">2.4x</td>
                      </tr>
                      <tr>
                        <td className="border border-primary/20 p-3">Full Feature Rollout</td>
                        <td className="border border-primary/20 p-3">Q1 2026</td>
                        <td className="border border-primary/20 p-3">CHF 45M</td>
                        <td className="border border-primary/20 p-3">3.8x</td>
                      </tr>
                      <tr className="bg-primary/5">
                        <td className="border border-primary/20 p-3">Global Operation</td>
                        <td className="border border-primary/20 p-3">Q4 2026</td>
                        <td className="border border-primary/20 p-3">CHF 120M</td>
                        <td className="border border-primary/20 p-3">5.5x</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <p className="mt-4 text-foreground/60 text-sm italic">
                  Note: Projections based on conservative market penetration estimates and existing adoption patterns in targeted regions.
                </p>
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
                        <h3 className="font-bold text-xl mb-2">Phase 1 (2024-2025): Foundation</h3>
                        <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                          <li>Testnet launch and comprehensive security audits</li>
                          <li>Strategic pilot integrations with select payment providers</li>
                          <li>Private funding rounds and early partnership development</li>
                          <li>Core protocol finalization and technical documentation</li>
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
                        <h3 className="font-bold text-xl mb-2">Phase 2 (2025): Launch & Scale</h3>
                        <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                          <li>Mainnet launch with initial validator network</li>
                          <li>Advanced scaling features and subnet implementation</li>
                          <li>Initial interoperability with major blockchain networks</li>
                          <li>Regional deployment in Southeast Asia and Africa</li>
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
                        <h3 className="font-bold text-xl mb-2">Phase 3 (2026-2027): Global Expansion</h3>
                        <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                          <li>Worldwide expansion and localized deployment strategies</li>
                          <li>Advanced DeFi products and financial service integrations</li>
                          <li>Comprehensive interoperability across blockchain ecosystems</li>
                          <li>Enterprise-grade solutions and major institutional partnerships</li>
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
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                      DO
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
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                      DK
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
                <Button className="btn-gradient text-white font-medium py-2 px-8 rounded-full">
                  <Download className="mr-2 h-4 w-4" /> Download Full Whitepaper
                </Button>
              </section>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}