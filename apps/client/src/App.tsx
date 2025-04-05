import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gradient-background">
    <header className="border-b border-accent1/10 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent1">
                <rect width="40" height="40" rx="8" fill="currentColor" fillOpacity="0.1" />
                <path d="M20 8L30 14V26L20 32L10 26V14L20 8Z" stroke="currentColor" strokeWidth="2" />
                <path d="M20 15L25 18V24L20 27L15 24V18L20 15Z" fill="currentColor" />
              </svg>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">PeoChain</span>
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="font-medium text-foreground/80 hover:text-accent1 transition-colors">Home</a>
            <a href="/solutions" className="font-medium text-foreground/80 hover:text-accent1 transition-colors">Solutions</a>
            <a href="/technology" className="font-medium text-foreground/80 hover:text-accent1 transition-colors">Technology</a>
            <a href="/about" className="font-medium text-foreground/80 hover:text-accent1 transition-colors">About</a>
            <a href="/waitlist" className="bg-accent1 hover:bg-accent1/90 text-white font-medium px-4 py-2 rounded-md transition-colors">Join Waitlist</a>
          </nav>
          <div className="md:hidden">
            <button className="text-foreground p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
    <main>{children}</main>
    <footer className="bg-accent3/5 border-t border-accent1/10 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent1">
                <rect width="40" height="40" rx="8" fill="currentColor" fillOpacity="0.1" />
                <path d="M20 8L30 14V26L20 32L10 26V14L20 8Z" stroke="currentColor" strokeWidth="2" />
                <path d="M20 15L25 18V24L20 27L15 24V18L20 15Z" fill="currentColor" />
              </svg>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">PeoChain</span>
            </div>
            <p className="text-sm text-foreground/70 mb-4">
              Transforming the future of blockchain infrastructure with innovative solutions designed for real-world applications.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/60 hover:text-accent1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </a>
              <a href="#" className="text-foreground/60 hover:text-accent1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </a>
              <a href="#" className="text-foreground/60 hover:text-accent1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-foreground/70 hover:text-accent1">Enterprise Blockchain</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent1">Supply Chain</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent1">Decentralized Finance</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent1">NFT Infrastructure</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent1">Smart Contract Development</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-foreground/70 hover:text-accent1">Documentation</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent1">API Reference</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent1">Developer Tools</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent1">Blockchain Academy</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent1">Community Forum</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-foreground/70 hover:text-accent1">About Us</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent1">Careers</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent1">News & Press</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent1">Contact</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-accent1">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-accent1/10 mt-12 pt-8 text-center text-sm text-foreground/60">
          <p>© {new Date().getFullYear()} PeoChain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
);

// Hero Section Component
const HeroSection = () => (
  <section className="relative overflow-hidden py-20 sm:py-32">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent1/20 via-transparent to-transparent"></div>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 max-w-2xl">
          <div className="inline-block bg-accent1/10 text-accent1 rounded-full px-3 py-1 text-sm font-medium mb-6">
            Next-Generation Blockchain
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Redefining Blockchain <span className="bg-gradient-primary bg-clip-text text-transparent">Infrastructure</span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 mb-8 leading-relaxed">
            PeoChain is a cutting-edge decentralized platform that combines unprecedented speed, security, and scalability, making blockchain technology accessible for enterprise solutions and everyday applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/waitlist" className="bg-accent1 hover:bg-accent1/90 text-white font-semibold px-6 py-3 rounded-md transition-colors inline-flex items-center justify-center">
              Join Our Waitlist
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="/technology" className="border border-accent1/30 hover:border-accent1 text-foreground hover:text-accent1 font-semibold px-6 py-3 rounded-md transition-colors inline-flex items-center justify-center">
              Explore Technology
            </a>
          </div>
          
          <div className="flex items-center mt-10">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-accent1/20 border-2 border-background flex items-center justify-center text-xs font-medium text-accent1">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium">Join 6,000+ companies</p>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm text-foreground/70">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full"></div>
            <div className="relative bg-accent3/5 border border-accent1/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-accent3/20">
                <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g className="animate-gentle-pulse">
                    <circle cx="200" cy="200" r="150" stroke="#1c824a" strokeWidth="2" strokeDasharray="5 5" className="animate-dash" />
                    <path d="M200 50L350 150V300L200 400L50 300V150L200 50Z" stroke="#1c824a" strokeWidth="3" fill="none" />
                    <path d="M200 100L300 160V280L200 340L100 280V160L200 100Z" stroke="#1c824a" strokeWidth="2" fill="none" />
                    <path d="M200 150L250 180V240L200 270L150 240V180L200 150Z" fill="#1c824a" fillOpacity="0.2" />
                    
                    {/* Animated nodes */}
                    <circle cx="200" cy="50" r="10" fill="#1d613c" />
                    <circle cx="350" cy="150" r="10" fill="#1d613c" />
                    <circle cx="350" cy="300" r="10" fill="#1d613c" />
                    <circle cx="200" cy="400" r="10" fill="#1d613c" />
                    <circle cx="50" cy="300" r="10" fill="#1d613c" />
                    <circle cx="50" cy="150" r="10" fill="#1d613c" />
                    
                    {/* Data flow animation */}
                    <circle cx="200" cy="50" r="4" fill="#1c824a" className="animate-pulse" />
                    
                    {/* Connecting lines */}
                    <path d="M100 280L150 240M300 160L250 180M250 240L300 280M150 180L100 160" stroke="#1c824a" strokeOpacity="0.7" strokeWidth="1" />
                  </g>
                </svg>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-background/30 backdrop-blur-sm border border-accent1/10 rounded-lg p-4">
                  <div className="text-sm font-medium text-foreground/70 mb-1">Transactions</div>
                  <div className="text-2xl font-bold text-accent1">12,500+</div>
                  <div className="text-xs text-success mt-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    +24.8%
                  </div>
                </div>
                <div className="bg-background/30 backdrop-blur-sm border border-accent1/10 rounded-lg p-4">
                  <div className="text-sm font-medium text-foreground/70 mb-1">Speed</div>
                  <div className="text-2xl font-bold text-accent1">0.5s</div>
                  <div className="text-xs text-success mt-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    10x faster
                  </div>
                </div>
                <div className="bg-background/30 backdrop-blur-sm border border-accent1/10 rounded-lg p-4">
                  <div className="text-sm font-medium text-foreground/70 mb-1">Energy</div>
                  <div className="text-2xl font-bold text-accent1">-99%</div>
                  <div className="text-xs text-success mt-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    Eco-friendly
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Features Section Component
const FeaturesSection = () => (
  <section className="py-20 bg-accent3/5">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-block bg-accent1/10 text-accent1 rounded-full px-3 py-1 text-sm font-medium mb-4">
          Core Features
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Advanced Blockchain Technology</h2>
        <p className="text-lg text-foreground/70">
          Our cutting-edge infrastructure combines several technological innovations to deliver a blockchain solution that outperforms traditional systems.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Quantum-Resistant Security",
            description: "Future-proof security protocols designed to withstand quantum computing attacks while maintaining compliance with global standards.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            ),
          },
          {
            title: "Hyper-Fast Transaction Processing",
            description: "Proprietary consensus mechanism capable of processing over 100,000 transactions per second with sub-second finality.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ),
          },
          {
            title: "Advanced Smart Contracts",
            description: "Revolutionary smart contract framework with built-in templates, audit tools, and cross-chain compatibility.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            ),
          },
          {
            title: "Enterprise-grade Scalability",
            description: "Dynamic sharding technology that scales horizontally without compromising security or decentralization.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            ),
          },
          {
            title: "Cross-Chain Interoperability",
            description: "Seamless integration with major blockchain protocols through our advanced bridge technology and standardized connectors.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            ),
          },
          {
            title: "Sustainable Infrastructure",
            description: "Energy-efficient consensus mechanism that reduces carbon footprint by 99% compared to traditional proof-of-work systems.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ),
          },
        ].map((feature, index) => (
          <div key={index} className="bg-background border border-accent1/10 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-accent1/10 rounded-lg flex items-center justify-center text-accent1 mb-5">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-foreground/70">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Use Cases Section Component
const UseCasesSection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-block bg-accent1/10 text-accent1 rounded-full px-3 py-1 text-sm font-medium mb-4">
          Industry Solutions
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Transforming Industries</h2>
        <p className="text-lg text-foreground/70">
          PeoChain's flexible blockchain infrastructure is powering innovation across multiple sectors, providing tailored solutions for diverse business needs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: "Finance & Banking",
            description: "Revolutionizing payment systems, cross-border transactions, asset tokenization, and regulatory compliance with unmatched security and speed.",
            icon: "💹",
          },
          {
            title: "Supply Chain Management",
            description: "End-to-end visibility, authenticity verification, and automated settlements through smart contracts for global supply networks.",
            icon: "🔄",
          },
          {
            title: "Healthcare",
            description: "Secure patient data management, medical record interoperability, and pharmaceutical traceability with privacy-preserving protocols.",
            icon: "🏥",
          },
          {
            title: "Government & Public Sector",
            description: "Transparent voting systems, secure digital identity solutions, and efficient public service delivery through blockchain infrastructure.",
            icon: "🏛️",
          },
        ].map((useCase, index) => (
          <div key={index} className="bg-background border border-accent1/10 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-8">
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{useCase.title}</h3>
              <p className="text-foreground/70 mb-6">{useCase.description}</p>
              <a href="#" className="inline-flex items-center text-accent1 font-medium hover:text-accent2 transition-colors">
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// CTA Section Component
const CtaSection = () => (
  <section className="py-20 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent1/20 via-transparent to-transparent"></div>
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="bg-gradient-primary bg-opacity-5 border border-accent1/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Transform Your Business with Blockchain?</h2>
          <p className="text-white/80 text-lg mb-8">
            Join our waitlist today and be among the first to access PeoChain's revolutionary blockchain infrastructure. Our team will guide you through the integration process.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/waitlist" className="bg-white text-accent1 hover:bg-white/90 font-semibold px-6 py-3 rounded-md transition-colors inline-flex items-center justify-center">
              Join Waitlist
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="/contact" className="border border-white/30 hover:border-white text-white font-semibold px-6 py-3 rounded-md transition-colors inline-flex items-center justify-center">
              Schedule a Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function App() {
  return (
    <>
      <Layout>
        <HeroSection />
        <FeaturesSection />
        <UseCasesSection />
        <CtaSection />
      </Layout>
    </>
  );
}