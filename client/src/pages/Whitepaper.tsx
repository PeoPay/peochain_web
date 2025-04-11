import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Share2,
  Bookmark,
  Save
} from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useLocation } from "wouter";
import { AnimatedChart } from "@/components/ui/animated-chart";
import { ConsensusDiagram } from "@/components/ui/consensus-diagram";
import { SubnetDiagram } from "@/components/ui/subnet-diagram";
import { TechTooltip } from "@/components/ui/tech-tooltip";
import { TableOfContents } from "@/components/ui/table-of-contents";
import { WhitepaperProgressBar } from "@/components/ui/whitepaper-progress-bar";

interface Window {
  gtag?: (event: string, action: string, options: any) => void;
}

declare global {
  interface Window {
    gtag?: (event: string, action: string, options: any) => void;
  }
}

export default function Whitepaper() {
  const [, navigate] = useLocation();
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    consensusMechanism: false,
    dcs: false,
    architecture: false,
    tokenomics: false
  });
  const [activeSection, setActiveSection] = useState<string>("intro");
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(false);

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
  
  // Track scrolling for reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(progress);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll("section[id]");
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < 100 && sectionTop > -100) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };
  
  // Download PDF with analytics tracking
  const downloadWhitepaper = () => {
    // Track download event
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "download", {
        event_category: "whitepaper",
        event_label: "full_whitepaper_pdf"
      });
    }
    
    // Trigger download
    window.open("/PEOCHAIN_White_Paper.pdf", "_blank");
  };
  
  // Share whitepaper
  const shareWhitepaper = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "PeoChain Whitepaper",
          text: "Check out the PeoChain whitepaper - a decentralized financial ecosystem for global inclusion",
          url: window.location.href
        });
      } catch (error) {
        console.log("Sharing failed", error);
      }
    } else {
      // Fallback - copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
      // toast.success("URL copied to clipboard!");
    }
  };
  
  const sections = [
    { id: "intro", label: "Introduction" },
    { id: "problems", label: "Problems Addressed" },
    { id: "solutions", label: "Solutions" },
    { id: "core-tech", label: "Core Technologies" },
    { id: "technical", label: "Technical Highlights" },
    { id: "economic-model", label: "Economic Model" },
    { id: "financial", label: "Financial Projections" },
    { id: "roadmap", label: "Roadmap" },
    { id: "leadership", label: "Leadership Team" }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? "dark-gradient-background" : "gradient-background"}`}>
      <Header 
        onFeatureClick={() => navigateToHome('features')}
        onBenefitsClick={() => navigateToHome('benefits')}
        onTechnologyClick={() => navigateToHome('technology')}
        onWaitlistClick={() => navigateToHome('waitlist')}
        onFaqClick={() => navigateToHome('faq')}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      {/* Fixed Reading Progress Bar */}
      <WhitepaperProgressBar progress={readingProgress} />

      <main className="container max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents - Fixed on Desktop */}
          <div className="hidden lg:block sticky top-24 h-fit w-64 flex-shrink-0">
            <TableOfContents 
              sections={sections} 
              activeSection={activeSection}
              onClick={(id) => {
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              }}
            />
            
            <div className="mt-6 space-y-2">
              <Button 
                onClick={downloadWhitepaper}
                className="w-full btn-gradient text-white font-medium py-2 rounded-lg"
              >
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
              
              <Button 
                onClick={shareWhitepaper}
                className="w-full bg-secondary/80 text-secondary-foreground font-medium py-2 rounded-lg"
              >
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
              
              <Button 
                onClick={() => window.print()}
                className="w-full bg-secondary/30 text-secondary-foreground font-medium py-2 rounded-lg"
              >
                <Save className="mr-2 h-4 w-4" /> Save/Print
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">PEOCHAIN Whitepaper</h1>
            
            {/* Mobile Version of Download/Share Buttons */}
            <div className="flex flex-wrap gap-2 lg:hidden mb-6 justify-center">
              <Button 
                onClick={downloadWhitepaper}
                className="btn-gradient text-white font-medium py-2 rounded-lg"
              >
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
              
              <Button 
                onClick={shareWhitepaper}
                className="bg-secondary/80 text-secondary-foreground font-medium py-2 rounded-lg"
              >
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
            
            {/* 1. Introductory Statement */}
            <section id="intro" className="scroll-mt-24">
              <Card className="glass rounded-3xl border-0 shadow-sm mb-8">
                <CardContent className="p-8 md:p-12">
                  <p className="text-xl text-center text-foreground/80 mb-8 max-w-3xl mx-auto">
                    "PeoChain is pioneering a decentralized financial revolution,
                    empowering underbanked populations globally through cutting-edge
                    blockchain innovation. By combining the novel Proof of Synergy (PoSyg)
                    consensus mechanism with Dynamic Contribution Scoring (DCS), PeoChain
                    achieves unparalleled scalability, security, and accessibility. Our
                    blockchain platform supports ultra-low fees, instant transactions,
                    seamless mobile integrations, and economic stability
                    mechanisms—redefining what's possible in global decentralized finance
                    (DeFi)."
                  </p>
                
                  <div className="space-y-10">
                    {/* 2. Key Problems Solved */}
                    <section id="problems" className="scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-6">Key Problems Solved by PeoChain</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-primary/5 hover:bg-primary/10 transition-colors p-6 rounded-xl">
                          <h3 className="font-bold text-xl mb-3">High Transaction Costs</h3>
                          <p className="text-foreground/70">
                            Current blockchain and traditional financial systems impose high fees, significantly restricting access for underserved and underbanked communities.
                          </p>
                        </div>
                        
                        <div className="bg-primary/5 hover:bg-primary/10 transition-colors p-6 rounded-xl">
                          <h3 className="font-bold text-xl mb-3">Scalability and Performance Issues</h3>
                          <p className="text-foreground/70">
                            Most existing blockchain networks struggle to handle peak transaction volumes efficiently, causing delays, network congestion, and reduced usability.
                          </p>
                        </div>
                        
                        <div className="bg-primary/5 hover:bg-primary/10 transition-colors p-6 rounded-xl">
                          <h3 className="font-bold text-xl mb-3">Complex User Experiences</h3>
                          <p className="text-foreground/70">
                            Technical barriers, complicated interfaces, and insufficient educational resources limit blockchain adoption, especially among populations with limited technological literacy.
                          </p>
                        </div>
                        
                        <div className="bg-primary/5 hover:bg-primary/10 transition-colors p-6 rounded-xl">
                          <h3 className="font-bold text-xl mb-3">Economic Instability and Volatility</h3>
                          <p className="text-foreground/70">
                            Crypto volatility undermines trust and discourages everyday use, particularly in emerging economies where stability and predictability are essential.
                          </p>
                        </div>
                      </div>
                    </section>

                    <Separator />

                    {/* 3. PeoChain Solutions */}
                    <section id="solutions" className="scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-6">How PeoChain Solves These Problems</h2>
                      
                      <div className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-4 items-start group hover:bg-primary/5 p-4 rounded-xl transition-colors">
                          <div className="bg-primary/20 p-3 rounded-full text-primary group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl">Ultra-Low Transaction Fees</h3>
                            <p className="text-foreground/70">PeoChain dramatically reduces costs with fees as low as <span className="font-semibold">USD 0.004 per transaction</span>, ensuring affordability and global accessibility.</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-4 items-start group hover:bg-primary/5 p-4 rounded-xl transition-colors">
                          <div className="bg-primary/20 p-3 rounded-full text-primary group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl">High Scalability and Instant Transactions</h3>
                            <p className="text-foreground/70">Leveraging advanced blockchain infrastructure, PeoChain processes up to <span className="font-semibold">100,000 transactions per second (TPS)</span> with <span className="font-semibold">1-second finality</span>, maintaining reliability even during peak usage.</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-4 items-start group hover:bg-primary/5 p-4 rounded-xl transition-colors">
                          <div className="bg-primary/20 p-3 rounded-full text-primary group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl">User-Centric Mobile Integration</h3>
                            <p className="text-foreground/70">PeoChain simplifies blockchain adoption by seamlessly integrating with established mobile payment platforms like <span className="font-semibold">M-Pesa</span> and <span className="font-semibold">GCash</span>, facilitating effortless crypto-to-mobile money conversions.</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-4 items-start group hover:bg-primary/5 p-4 rounded-xl transition-colors">
                          <div className="bg-primary/20 p-3 rounded-full text-primary group-hover:scale-110 transition-transform">
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

                    {/* 4. Core Technologies */}
                    <section id="core-tech" className="scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-6">Innovative Core Technologies</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl whitepaper-section">
                          <h3 className="font-bold text-xl mb-3">
                            <TechTooltip
                              expanded={true}
                              content={
                                <div>
                                  <h4 className="font-semibold text-primary mb-1">
                                    Proof of Synergy (PoSyg)
                                  </h4>
                                  <p className="text-sm">
                                    A novel consensus mechanism that combines the
                                    benefits of proof-of-stake with validator
                                    reputation scoring, achieving high performance
                                    without sacrificing decentralization.
                                  </p>
                                  <ul className="text-xs mt-2 space-y-1 list-disc pl-4">
                                    <li>
                                      Validators are selected based on stake and
                                      contribution quality
                                    </li>
                                    <li>Energy-efficient validation process</li>
                                    <li>Dynamic penalties for malicious behavior</li>
                                    <li>Resistant to centralization pressures</li>
                                  </ul>
                                </div>
                              }
                            >
                              Proof of Synergy (PoSyg)
                            </TechTooltip>
                          </h3>
                          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                            <li>
                              Combines security, decentralization, and economic
                              incentives in a single consensus mechanism
                            </li>
                            <li>
                              Dynamically rewards honest validators while penalizing
                              malicious actors
                            </li>
                            <li>
                              Achieves high performance without compromising on
                              decentralization
                            </li>
                            <li>
                              Energy efficient with minimal environmental impact
                            </li>
                          </ul>

                          <div
                            className="flex items-center justify-center mt-4 text-primary cursor-pointer hover:text-primary/80 text-sm font-medium"
                            onClick={() => toggleSection("consensusMechanism")}
                          >
                            {expandedSections.consensusMechanism ? (
                              <>
                                Show Less <ChevronUp className="ml-1 h-4 w-4" />
                              </>
                            ) : (
                              <>
                                View Consensus Mechanism Visualization{" "}
                                <ChevronDown className="ml-1 h-4 w-4" />
                              </>
                            )}
                          </div>

                          {expandedSections.consensusMechanism && (
                            <div className="mt-4 p-4 bg-primary/5 rounded-xl">
                              <h3 className="text-lg font-semibold mb-4 text-center">
                                Proof of Synergy (PoSyg) Consensus
                              </h3>
                              <div className="w-full flex justify-center responsive-diagram h-[350px] sm:h-[400px]">
                                <ConsensusDiagram mode="posyg" />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl whitepaper-section">
                          <h3 className="font-bold text-xl mb-3">
                            Dynamic Contribution Scoring (DCS)
                          </h3>
                          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                            <li>
                              Transparent, mathematical evaluation of validator
                              behavior and network contributions
                            </li>
                            <li>
                              Rewards proportional to both stake and network value-add
                            </li>
                            <li>
                              Reduces centralization risks by limiting outsized
                              influence of large stakeholders
                            </li>
                            <li>
                              Creates sustainable validator ecosystem with aligned
                              incentives
                            </li>
                          </ul>

                          <div
                            className="flex items-center justify-center mt-4 text-primary cursor-pointer hover:text-primary/80 text-sm font-medium"
                            onClick={() => toggleSection("dcs")}
                          >
                            {expandedSections.dcs ? (
                              <>
                                Show Less <ChevronUp className="ml-1 h-4 w-4" />
                              </>
                            ) : (
                              <>
                                View DCS Visualization{" "}
                                <ChevronDown className="ml-1 h-4 w-4" />
                              </>
                            )}
                          </div>

                          {expandedSections.dcs && (
                            <div className="mt-4 p-4 bg-primary/5 rounded-xl">
                              <h3 className="text-lg font-semibold mb-4 text-center">
                                Dynamic Contribution Scoring
                              </h3>
                              <div className="responsive-chart h-[300px]">
                                <AnimatedChart type="dcs" darkMode={darkMode} />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </section>
                    
                    <Separator />

                    {/* 5. Technical Architecture */}
                    <section id="technical" className="scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-6">Technical Architecture</h2>
                      
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl whitepaper-section mb-6">
                        <h3 className="font-bold text-xl mb-3">Subnet-based Processing</h3>
                        <p className="text-foreground/70 mb-4">
                          PeoChain employs a sophisticated subnet architecture that enables:
                        </p>
                        
                        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                          <li>Parallel transaction processing across specialized validator groups</li>
                          <li>Optimized processing for different transaction types</li>
                          <li>Dynamic resource allocation based on network demand</li>
                          <li>Geographic optimization for regional transaction clusters</li>
                        </ul>
                        
                        <div
                          className="flex items-center justify-center mt-4 text-primary cursor-pointer hover:text-primary/80 text-sm font-medium"
                          onClick={() => toggleSection("architecture")}
                        >
                          {expandedSections.architecture ? (
                            <>Show Less <ChevronUp className="ml-1 h-4 w-4" /></>
                          ) : (
                            <>View Subnet Architecture <ChevronDown className="ml-1 h-4 w-4" /></>
                          )}
                        </div>
                        
                        {expandedSections.architecture && (
                          <div className="mt-4 p-4 bg-primary/5 rounded-xl">
                            <h3 className="text-lg font-semibold mb-4 text-center">Subnet Architecture</h3>
                            <div className="w-full flex justify-center responsive-diagram h-[300px]">
                              <SubnetDiagram darkMode={darkMode} />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-primary/5 hover:bg-primary/10 transition-colors p-6 rounded-xl">
                          <h3 className="font-bold text-xl mb-3">Cross-Chain Interoperability</h3>
                          <p className="text-foreground/70">
                            PeoChain's native cross-chain protocol enables seamless asset transfers and 
                            communication with all major blockchain networks, including Ethereum, Solana, 
                            Polygon, and Bitcoin.
                          </p>
                        </div>
                        
                        <div className="bg-primary/5 hover:bg-primary/10 transition-colors p-6 rounded-xl">
                          <h3 className="font-bold text-xl mb-3">Quantum Resistance</h3>
                          <p className="text-foreground/70">
                            Future-proofed security through post-quantum cryptographic algorithms that protect 
                            against emerging threats from quantum computing advances.
                          </p>
                        </div>
                      </div>
                    </section>
                    
                    <Separator />
                    
                    {/* 6. Economic Model */}
                    <section id="economic-model" className="scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-6">PeoChain Economic Model</h2>
                      
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl whitepaper-section mb-6">
                        <h3 className="font-bold text-xl mb-3">Tokenomics Overview</h3>
                        <p className="text-foreground/70 mb-4">
                          The PeoChain economy is built around the PEOCHAIN token, which serves as the primary 
                          utility and governance token within the ecosystem.
                        </p>
                        
                        <div
                          className="flex items-center justify-center mt-4 text-primary cursor-pointer hover:text-primary/80 text-sm font-medium"
                          onClick={() => toggleSection("tokenomics")}
                        >
                          {expandedSections.tokenomics ? (
                            <>Show Less <ChevronUp className="ml-1 h-4 w-4" /></>
                          ) : (
                            <>View Tokenomics Chart <ChevronDown className="ml-1 h-4 w-4" /></>
                          )}
                        </div>
                        
                        {expandedSections.tokenomics && (
                          <div className="mt-4 p-4 bg-primary/5 rounded-xl">
                            <h3 className="text-lg font-semibold mb-4 text-center">PEOCHAIN Token Distribution</h3>
                            <div className="responsive-chart h-[300px]">
                              <AnimatedChart type="tokenomics" darkMode={darkMode} />
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4 text-sm">
                              <div className="flex flex-col items-center">
                                <span className="font-bold">1B</span>
                                <span className="text-foreground/70">Total Supply</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <span className="font-bold">40%</span>
                                <span className="text-foreground/70">Community Allocation</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <span className="font-bold">15%</span>
                                <span className="text-foreground/70">Development Fund</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <span className="font-bold">20%</span>
                                <span className="text-foreground/70">Ecosystem Growth</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <span className="font-bold">15%</span>
                                <span className="text-foreground/70">Team & Advisors</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <span className="font-bold">10%</span>
                                <span className="text-foreground/70">Strategic Reserve</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </section>
                    
                    <Separator />
                    
                    {/* 7. Financial Projections */}
                    <section id="financial" className="scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-6">Financial Projections</h2>
                      
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl whitepaper-section mb-6">
                        <h3 className="font-bold text-xl mb-3">Market Opportunity</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-white/30 p-4 rounded-lg text-center">
                            <span className="block text-2xl font-bold text-primary">1.7B</span>
                            <span className="text-sm text-foreground/70">Unbanked adults globally</span>
                          </div>
                          <div className="bg-white/30 p-4 rounded-lg text-center">
                            <span className="block text-2xl font-bold text-primary">$180B</span>
                            <span className="text-sm text-foreground/70">Annual remittance fees</span>
                          </div>
                          <div className="bg-white/30 p-4 rounded-lg text-center">
                            <span className="block text-2xl font-bold text-primary">$3.5T</span>
                            <span className="text-sm text-foreground/70">Projected DeFi market by 2028</span>
                          </div>
                        </div>
                      </div>
                    </section>
                    
                    <Separator />
                    
                    {/* 8. Roadmap */}
                    <section id="roadmap" className="scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-6">Development Roadmap</h2>
                      
                      <div className="space-y-6">
                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl whitepaper-section">
                          <h3 className="font-bold text-xl mb-4">Phase 1: Foundation (Q3 2023 - Q1 2024)</h3>
                          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                            <li>Core protocol development</li>
                            <li>PoSyg consensus implementation</li>
                            <li>Testnet launch</li>
                            <li>Developer documentation</li>
                          </ul>
                          <div className="mt-2 bg-primary/20 h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full" style={{width: "100%"}}></div>
                          </div>
                          <div className="text-right mt-1 text-xs text-foreground/60">Completed</div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl whitepaper-section">
                          <h3 className="font-bold text-xl mb-4">Phase 2: Expansion (Q2 2024 - Q4 2024)</h3>
                          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                            <li>Mainnet launch</li>
                            <li>Mobile SDK release</li>
                            <li>Cross-chain bridges</li>
                          </ul>
                          <div className="mt-2 bg-primary/20 h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full" style={{width: "65%"}}></div>
                          </div>
                          <div className="text-right mt-1 text-xs text-foreground/60">In progress - 65%</div>
                        </div>
                      </div>
                    </section>
                    
                    <Separator />
                    
                    {/* 9. Leadership Team */}
                    <section id="leadership" className="scroll-mt-24">
                      <h2 className="text-2xl font-bold mb-6">Leadership Team</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl whitepaper-section">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-primary text-xl font-bold">JA</span>
                            </div>
                            <div>
                              <h3 className="font-bold text-xl">Dr. Julia Alvarez</h3>
                              <p className="text-foreground/70">CEO & Co-Founder</p>
                            </div>
                          </div>
                          <p className="text-foreground/80">
                            Former fintech executive with 15+ years experience in financial inclusion projects 
                            across emerging markets. PhD in Distributed Systems from MIT.
                          </p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl whitepaper-section">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-primary text-xl font-bold">MK</span>
                            </div>
                            <div>
                              <h3 className="font-bold text-xl">Marcus Kim</h3>
                              <p className="text-foreground/70">CTO & Co-Founder</p>
                            </div>
                          </div>
                          <p className="text-foreground/80">
                            Blockchain protocol developer with contributions to multiple Layer 1 projects. 
                            Cryptography specialist with background in secure systems design.
                          </p>
                        </div>
                      </div>
                    </section>
                    
                    {/* 10. Call to Action */}
                    <section className="text-center mt-12">
                      <h2 className="text-2xl font-bold mb-4">
                        Join the PeoChain Revolution
                      </h2>
                      <p className="text-foreground/80 mb-8 max-w-2xl mx-auto">
                        Join PeoChain today in reshaping financial accessibility
                        through decentralized innovation. Together, we're building a
                        more inclusive global economy.
                      </p>

                      {/* 11. Download Button */}
                      <Button 
                        onClick={downloadWhitepaper}
                        className="btn-gradient text-white font-medium py-2 px-8 rounded-full"
                      >
                        <Download className="mr-2 h-4 w-4" /> Download Full Whitepaper
                      </Button>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}