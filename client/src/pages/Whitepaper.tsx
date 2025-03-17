import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
        <p className="text-xl text-center text-foreground/70 mb-12">
          The Future of Decentralized Finance for the Underbanked
        </p>

        <Card className="glass rounded-3xl border-0 shadow-sm mb-8">
          <CardContent className="p-8 md:p-12">
            <div className="space-y-8">
              {/* Executive Summary */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Executive Summary</h2>
                <p className="text-foreground/80 mb-4">
                  PEOCHAIN is a revolutionary blockchain platform designed to address the critical needs of the underbanked population worldwide. By leveraging cutting-edge blockchain technology, PEOCHAIN offers a secure, accessible, and efficient financial ecosystem that empowers individuals excluded from traditional banking systems to participate in the global economy.
                </p>
                <p className="text-foreground/80">
                  Our mission is to create financial inclusion through decentralized technology, providing essential services like cross-border payments, microloans, and savings products with minimal fees and maximum security.
                </p>
              </section>

              <Separator />

              {/* Problem Statement */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Problem Statement</h2>
                <p className="text-foreground/80 mb-4">
                  Nearly 1.7 billion adults globally remain unbanked, lacking access to basic financial services. Traditional banking infrastructure has failed to serve these populations due to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                  <li>High fees for basic financial services</li>
                  <li>Inaccessible physical banking locations</li>
                  <li>Stringent documentation requirements</li>
                  <li>Lack of financial literacy and education</li>
                  <li>Inefficient cross-border money transfer systems</li>
                </ul>
              </section>

              <Separator />

              {/* Technology */}
              <section>
                <h2 className="text-2xl font-bold mb-4">PEOCHAIN Technology</h2>
                <p className="text-foreground/80 mb-4">
                  PEOCHAIN's architecture is built on three foundational pillars:
                </p>

                <h3 className="font-bold text-xl mt-6 mb-3">1. Consensus Mechanism</h3>
                <p className="text-foreground/80 mb-4">
                  PEOCHAIN utilizes a custom-designed Delegated Proof of Stake (DPoS) consensus mechanism, optimized for high transaction throughput and minimal energy consumption. This approach enables:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80 mb-4">
                  <li>Processing over 10,000 transactions per second</li>
                  <li>Transaction finality in under 2 seconds</li>
                  <li>Significantly reduced energy usage compared to Proof of Work chains</li>
                  <li>Democratic blockchain governance through stake-weighted voting</li>
                </ul>

                <h3 className="font-bold text-xl mt-6 mb-3">2. Layer-2 Scaling Solutions</h3>
                <p className="text-foreground/80 mb-4">
                  Our protocol implements advanced Layer-2 scaling technologies that maintain security while dramatically improving performance:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80 mb-4">
                  <li>State channels for instant microtransactions</li>
                  <li>Zero-knowledge rollups for privacy-preserving operations</li>
                  <li>Cross-chain interoperability bridges</li>
                </ul>

                <h3 className="font-bold text-xl mt-6 mb-3">3. Self-Sovereign Identity</h3>
                <p className="text-foreground/80 mb-4">
                  PEOCHAIN's identity system allows users to control their own data while meeting necessary compliance requirements:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                  <li>Decentralized identifiers (DIDs) compatible with W3C standards</li>
                  <li>Selective disclosure of personal information</li>
                  <li>Reputation scoring based on financial activity</li>
                  <li>KYC/AML compliance without centralized data storage</li>
                </ul>
              </section>

              <Separator />

              {/* PEOCHAIN Ecosystem */}
              <section>
                <h2 className="text-2xl font-bold mb-4">PEOCHAIN Ecosystem</h2>
                
                <h3 className="font-bold text-xl mt-6 mb-3">Core Financial Services</h3>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80 mb-6">
                  <li><span className="font-medium">PEO Wallet:</span> A non-custodial mobile wallet accessible via basic smartphones, supporting offline transactions through SMS fallback</li>
                  <li><span className="font-medium">PEO Pay:</span> Near-instant, low-fee payment network for merchants and peer-to-peer transfers</li>
                  <li><span className="font-medium">PEO Lend:</span> Decentralized lending protocol offering microloans without traditional credit requirements</li>
                  <li><span className="font-medium">PEO Save:</span> Yield-generating savings products with inflation protection</li>
                </ul>
                
                <h3 className="font-bold text-xl mt-6 mb-3">Token Economy</h3>
                <p className="text-foreground/80 mb-4">
                  The PEOCHAIN ecosystem is powered by two token types:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80 mb-4">
                  <li><span className="font-medium">PEO:</span> The governance and utility token used for staking, voting, and fee payments</li>
                  <li><span className="font-medium">pUSD:</span> A fully collateralized stablecoin pegged to the US dollar, facilitating stable value transfer</li>
                </ul>
                
                <h3 className="font-bold text-xl mt-6 mb-3">Governance Model</h3>
                <p className="text-foreground/80 mb-4">
                  PEOCHAIN employs a three-tiered governance structure:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-foreground/80">
                  <li><span className="font-medium">Protocol Level:</span> Core blockchain parameters and upgrades, governed by PEO token holders</li>
                  <li><span className="font-medium">Service Level:</span> Individual application-specific decisions and parameters</li>
                  <li><span className="font-medium">Community Level:</span> Treasury fund allocation for ecosystem development and community initiatives</li>
                </ol>
              </section>

              <Separator />

              {/* Roadmap */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Roadmap</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg">Phase 1: Foundation (Q2 2023 - Q4 2023)</h3>
                    <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                      <li>Core protocol development and testnet launch</li>
                      <li>Security audits and bug bounty programs</li>
                      <li>Initial partnerships with financial inclusion organizations</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg">Phase 2: Expansion (Q1 2024 - Q3 2024)</h3>
                    <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                      <li>Mainnet launch and PEO token generation event</li>
                      <li>Mobile wallet release with basic functionality</li>
                      <li>First regional pilot programs in Southeast Asia and Africa</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg">Phase 3: Growth (Q4 2024 - Q2 2025)</h3>
                    <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                      <li>Full suite of financial services deployment</li>
                      <li>Merchant network expansion</li>
                      <li>Cross-chain interoperability implementation</li>
                      <li>Decentralized governance launch</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg">Phase 4: Maturity (Q3 2025 onwards)</h3>
                    <ul className="list-disc pl-6 space-y-1 text-foreground/80">
                      <li>Global expansion across underserved markets</li>
                      <li>Advanced financial products introduction</li>
                      <li>Integration with traditional financial systems</li>
                      <li>Transition to fully community-governed ecosystem</li>
                    </ul>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Team */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Team and Partners</h2>
                <p className="text-foreground/80 mb-4">
                  PEOCHAIN is led by a diverse team of experts with backgrounds in blockchain technology, financial inclusion, and international development. Our founding team combines experience from leading financial institutions, blockchain projects, and global development organizations.
                </p>
                <p className="text-foreground/80">
                  We have established strategic partnerships with financial inclusion NGOs, telecommunication providers in emerging markets, and blockchain infrastructure companies to accelerate adoption and real-world impact.
                </p>
              </section>

              <Separator />

              {/* Conclusion */}
              <section>
                <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                <p className="text-foreground/80 mb-4">
                  PEOCHAIN represents a paradigm shift in providing financial services to the underbanked. By leveraging blockchain technology, we can bypass the limitations of traditional financial infrastructure and create a more inclusive, efficient, and equitable global economy.
                </p>
                <p className="text-foreground/80">
                  We invite developers, financial inclusion advocates, and potential users to join us in building this vision of accessible finance for all. Together, we can bridge the financial divide and empower the next billion users to participate fully in the global economy.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}