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
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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
  
  // Skip to content link for accessibility
  const skipToContent = () => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavClick = (callback: (() => void) | undefined) => {
    setIsOpen(false);
    if (callback) {
      callback();
    }
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
        // Set focus for accessibility
        element.focus();
      }
    } else {
      // Navigate to home page with section hash
      setLocation(`/#${section}`);
    }
  };
  
  // Safely handle technology click, defaulting to navigating to the technology section
  const handleTechnologyClick = () => {
    if (onTechnologyClick) {
      onTechnologyClick();
    } else {
      navigateToHomeSection('technology');
    }
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 w-full py-3 md:py-4 px-4 md:px-8 flex justify-between items-center z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/90 backdrop-blur-lg shadow-md" 
          : "bg-transparent"
      )}
      role="banner"
    >
      {/* Skip to content link - hidden visually but available for screen readers */}
      <a 
        href="#main-content" 
        onClick={(e) => { e.preventDefault(); skipToContent(); }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to content
      </a>
      
      <div className="flex items-center">
        <a 
          href="/" 
          className="flex items-center"
          aria-label="PEOChain Home"
        >
          <img 
            src="/images/logos/peochain-logo.png" 
            alt="PEOCHAIN Logo" 
            className="h-8 md:h-10"
            onError={(e) => {
              // Fallback if image doesn't exist yet
              e.currentTarget.src = "https://via.placeholder.com/160x40?text=PEOCHAIN";
            }}
          />
        </a>
      </div>
      
      {/* Desktop Navigation */}
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
                          handleTechnologyClick();
                        }}
                      >
                        <div className="mb-2 mt-4 flex items-center">
                          <Shield className="h-6 w-6 text-primary mr-2" aria-hidden="true" />
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
                          <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
                        </div>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          handleTechnologyClick();
                        }}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center">
                          <Zap className="h-4 w-4 text-primary mr-2" aria-hidden="true" />
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
                          handleTechnologyClick();
                        }}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center">
                          <Network className="h-4 w-4 text-primary mr-2" aria-hidden="true" />
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
                          handleTechnologyClick();
                        }}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 text-primary mr-2" aria-hidden="true" />
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
                          <Layers className="h-4 w-4 text-primary mr-2" aria-hidden="true" />
                          <div className="text-sm font-medium leading-none">Core Features</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Explore the key features that make PeoChain revolutionary
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToHomeSection('benefits');
                        }}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-primary mr-2" aria-hidden="true" />
                          <div className="text-sm font-medium leading-none">Benefits</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Discover how PeoChain benefits users, developers, and businesses
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToWhitepaper();
                        }}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center">
                          <Code className="h-4 w-4 text-primary mr-2" aria-hidden="true" />
                          <div className="text-sm font-medium leading-none">Technical Whitepaper</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Read our detailed technical whitepaper for in-depth information
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Button 
                variant="link" 
                className="text-foreground hover:text-primary text-base font-medium px-4"
                onClick={onWaitlistClick}
              >
                Join Waitlist
              </Button>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Button 
                variant="link" 
                className="text-foreground hover:text-primary text-base font-medium px-4"
                onClick={onFaqClick ? onFaqClick : () => navigateToHomeSection('faq')}
              >
                FAQ
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      {/* Mobile Navigation */}
      <div className="lg:hidden flex items-center">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-foreground hover:bg-primary/10"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] sm:w-[350px] pr-0">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <a href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <img 
                    src="/images/logos/peochain-logo.png" 
                    alt="PEOCHAIN Logo" 
                    className="h-8"
                    onError={(e) => {
                      // Fallback if image doesn't exist yet
                      e.currentTarget.src = "https://via.placeholder.com/160x40?text=PEOCHAIN";
                    }}
                  />
                </a>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(false)}
                  className="text-foreground hover:bg-primary/10"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
              
              <nav className="space-y-6 pr-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">Technology</h3>
                  <ul className="space-y-2">
                    <li>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-base font-normal"
                        onClick={() => handleMobileNavClick(onTechnologyClick || (() => navigateToHomeSection('technology')))}
                      >
                        <Shield className="h-4 w-4 mr-2 text-primary" aria-hidden="true" />
                        Overview
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-base font-normal"
                        onClick={() => handleMobileNavClick(onTechnologyClick || (() => navigateToHomeSection('technology')))}
                      >
                        <Zap className="h-4 w-4 mr-2 text-primary" aria-hidden="true" />
                        Parallel Processing
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-base font-normal"
                        onClick={() => handleMobileNavClick(onTechnologyClick || (() => navigateToHomeSection('technology')))}
                      >
                        <Network className="h-4 w-4 mr-2 text-primary" aria-hidden="true" />
                        Cross-Chain Integration
                      </Button>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 px-1">Features & Benefits</h3>
                  <ul className="space-y-2">
                    <li>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-base font-normal"
                        onClick={() => handleMobileNavClick(onFeatureClick)}
                      >
                        <Layers className="h-4 w-4 mr-2 text-primary" aria-hidden="true" />
                        Core Features
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-base font-normal"
                        onClick={() => handleMobileNavClick(onBenefitsClick)}
                      >
                        <DollarSign className="h-4 w-4 mr-2 text-primary" aria-hidden="true" />
                        Benefits
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-base font-normal"
                        onClick={() => handleMobileNavClick(navigateToWhitepaper)}
                      >
                        <Code className="h-4 w-4 mr-2 text-primary" aria-hidden="true" />
                        Technical Whitepaper
                      </Button>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => handleMobileNavClick(onWaitlistClick)}
                  >
                    Join Waitlist
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/20 text-foreground hover:bg-primary/5"
                    onClick={() => handleMobileNavClick(onFaqClick || (() => navigateToHomeSection('faq')))}
                  >
                    FAQ
                  </Button>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}