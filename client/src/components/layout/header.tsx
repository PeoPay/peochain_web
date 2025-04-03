import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, X, ChevronRight, Code, Shield, Zap, Network, Layers, DollarSign } from "lucide-react";
import { useLocation } from "wouter";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onFeatureClick: () => void;
  onBenefitsClick: () => void;
  onTechnologyClick?: () => void;
  onWaitlistClick: () => void;
  onFaqClick?: () => void;
}

export default function Header({ onFeatureClick, onBenefitsClick, onTechnologyClick, onWaitlistClick, onFaqClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavClick = (callback: () => void) => {
    setIsOpen(false);
    callback();
  };
  
  const navigateToWhitepaper = () => {
    setIsOpen(false);
    setLocation('/whitepaper');
  };
  
  const navigateToHomeSection = (section: string) => {
    setIsOpen(false);
    // If already on home page, use scrollIntoView
    if (window.location.pathname === '/') {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home page with section hash
      setLocation(`/#${section}`);
    }
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 w-full py-3 md:py-4 px-4 md:px-8 flex justify-between items-center z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/80 backdrop-blur-lg shadow-md" 
          : "bg-transparent"
      )}
    >
      <div className="flex items-center">
        <a href="/" className="flex items-center">
          <img 
            src="/images/peochain-logo.png" 
            alt="PEOCHAIN Logo" 
            className="h-8 md:h-10"
          />
        </a>
      </div>
      
      <div className="hidden lg:flex items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "h-9 px-4 py-2 hover:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent",
                  "hover:text-primary text-base font-medium"
                )}
              >
                Technology
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/5 p-6 no-underline outline-none focus:shadow-md"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToHomeSection('technology');
                        }}
                      >
                        <div className="mb-2 mt-4 flex items-center">
                          <Shield className="h-6 w-6 text-primary mr-2" />
                          <div className="text-lg font-medium text-primary">
                            PeoChain Technology
                          </div>
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Explore our revolutionary blockchain infrastructure with 100,000+ TPS, 
                          subnet validators, and parallel transaction processing.
                        </p>
                        <div className="mt-4 flex items-center text-sm text-primary">
                          <span>Learn more</span>
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </div>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToHomeSection('technology');
                        }}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center">
                          <Zap className="h-4 w-4 text-primary mr-2" />
                          <div className="text-sm font-medium leading-none">Parallel Processing</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          High-throughput transaction processing with our subnet validation system
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToHomeSection('technology');
                        }}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center">
                          <Network className="h-4 w-4 text-primary mr-2" />
                          <div className="text-sm font-medium leading-none">Cross-Chain Integration</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Seamless interoperability with major blockchain networks and protocols
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToHomeSection('technology');
                        }}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 text-primary mr-2" />
                          <div className="text-sm font-medium leading-none">Security Architecture</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Advanced consensus mechanisms with quantum-resistant encryption
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "h-9 px-4 py-2 hover:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent",
                  "hover:text-primary text-base font-medium"
                )}
              >
                Features
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] grid-cols-1">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToHomeSection('features');
                        }}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center">
                          <Zap className="h-4 w-4 text-primary mr-2" />
                          <div className="text-sm font-medium leading-none">High-Performance Blockchain</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          100,000+ transactions per second with near-instant finality
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToHomeSection('features');
                        }}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center">
                          <Code className="h-4 w-4 text-primary mr-2" />
                          <div className="text-sm font-medium leading-none">Developer Friendly</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Unified API and comprehensive SDKs for simplified development
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToHomeSection('features');
                        }}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-primary mr-2" />
                          <div className="text-sm font-medium leading-none">DeFi Ecosystem</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Integrated financial services with cross-chain compatibility
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                onClick={(e) => {
                  e.preventDefault();
                  navigateToHomeSection('benefits');
                }}
                className={cn(navigationMenuTriggerStyle(), "hover:text-primary text-base font-medium")}
              >
                Benefits
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                onClick={(e) => {
                  e.preventDefault();
                  navigateToHomeSection('faq');
                }}
                className={cn(navigationMenuTriggerStyle(), "hover:text-primary text-base font-medium")}
              >
                FAQ
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                onClick={(e) => {
                  e.preventDefault();
                  navigateToWhitepaper();
                }}
                className={cn(navigationMenuTriggerStyle(), "hover:text-primary text-base font-medium")}
              >
                Whitepaper
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <Button 
          onClick={() => navigateToHomeSection('waitlist')}
          className="btn-gradient text-white font-medium py-2 px-6 rounded-full ml-4"
        >
          Join Waitlist
        </Button>
      </div>
      
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="text-foreground text-2xl">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-background/95 backdrop-blur-lg w-full sm:max-w-md p-0 border-l border-primary/10">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-primary/10">
              <div className="flex items-center">
                <img 
                  src="/images/peochain-logo.png" 
                  alt="PEOCHAIN Logo" 
                  className="h-8"
                />
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-auto py-4 px-6">
              <nav className="flex flex-col space-y-1 w-full">
                <div className="py-4 border-b border-primary/10">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-primary mr-2" />
                    <span className="text-primary font-medium">Technology</span>
                  </div>
                  <div className="pl-7 flex flex-col space-y-3 mt-3">
                    <button 
                      onClick={() => navigateToHomeSection('technology')}
                      className="flex items-center text-foreground hover:text-primary transition-colors text-sm"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Parallel Processing
                    </button>
                    <button 
                      onClick={() => navigateToHomeSection('technology')}
                      className="flex items-center text-foreground hover:text-primary transition-colors text-sm"
                    >
                      <Network className="h-4 w-4 mr-2" />
                      Cross-Chain Integration
                    </button>
                    <button 
                      onClick={() => navigateToHomeSection('technology')}
                      className="flex items-center text-foreground hover:text-primary transition-colors text-sm"
                    >
                      <Layers className="h-4 w-4 mr-2" />
                      Subnet Validators
                    </button>
                  </div>
                </div>
                
                <div className="py-4 border-b border-primary/10">
                  <div className="flex items-center mb-2">
                    <Code className="h-5 w-5 text-primary mr-2" />
                    <span className="text-primary font-medium">Features</span>
                  </div>
                  <div className="pl-7 flex flex-col space-y-3 mt-3">
                    <button 
                      onClick={() => navigateToHomeSection('features')}
                      className="flex items-center text-foreground hover:text-primary transition-colors text-sm"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      High Performance
                    </button>
                    <button 
                      onClick={() => navigateToHomeSection('features')}
                      className="flex items-center text-foreground hover:text-primary transition-colors text-sm"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Developer Tools
                    </button>
                    <button 
                      onClick={() => navigateToHomeSection('features')}
                      className="flex items-center text-foreground hover:text-primary transition-colors text-sm"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      DeFi Ecosystem
                    </button>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigateToHomeSection('benefits')}
                  className="py-4 border-b border-primary/10 text-foreground hover:text-primary transition-colors font-medium text-left flex items-center"
                >
                  <ChevronRight className="h-4 w-4 text-primary mr-2" />
                  Benefits
                </button>
                
                <button 
                  onClick={() => navigateToHomeSection('faq')}
                  className="py-4 border-b border-primary/10 text-foreground hover:text-primary transition-colors font-medium text-left flex items-center"
                >
                  <ChevronRight className="h-4 w-4 text-primary mr-2" />
                  FAQ
                </button>
                
                <button 
                  onClick={navigateToWhitepaper}
                  className="py-4 border-b border-primary/10 text-foreground hover:text-primary transition-colors font-medium text-left flex items-center"
                >
                  <ChevronRight className="h-4 w-4 text-primary mr-2" />
                  Whitepaper
                </button>
              </nav>
            </div>
            
            <div className="p-6 border-t border-primary/10">
              <Button 
                onClick={() => navigateToHomeSection('waitlist')}
                className="btn-gradient text-white font-medium py-6 px-8 rounded-full w-full"
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}