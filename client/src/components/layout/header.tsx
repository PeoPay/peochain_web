import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Book, BarChart, Network, Gauge, Users } from "lucide-react";
import { useLocation } from "wouter";

interface HeaderProps {
  onFeatureClick: () => void;
  onBenefitsClick: () => void;
  onTechnologyClick?: () => void;
  onWaitlistClick: () => void;
  onFaqClick?: () => void;
}

export default function Header({ onFeatureClick, onBenefitsClick, onTechnologyClick, onWaitlistClick, onFaqClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

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
    <header className={`w-full py-4 px-4 md:px-8 flex justify-between items-center fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      {/* Skip to content link for keyboard users */}
      <a href="#main-content" className="skip-to-content focus-ring">
        Skip to main content
      </a>
      <div className="flex items-center">
        <a href="/" className="flex items-center">
          <img 
            src="/images/peochain-logo.png" 
            alt="PEOCHAIN Logo" 
            className="h-8 md:h-10"
          />
        </a>
      </div>
      
      <div className="hidden md:flex items-center space-x-8">
        <nav className="flex items-center space-x-5 mr-6">
          <button 
            onClick={() => navigateToHomeSection('features')}
            className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1.5"
          >
            <BarChart className="h-4 w-4" />
            Features
          </button>
          <button 
            onClick={() => navigateToHomeSection('technology')}
            className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1.5"
          >
            <Network className="h-4 w-4" />
            Technology
          </button>
          <button 
            onClick={() => navigateToHomeSection('technology-architecture')}
            className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1.5"
          >
            <Gauge className="h-4 w-4" />
            Architecture
          </button>
          <button 
            onClick={() => navigateToHomeSection('technology-metrics')}
            className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1.5"
          >
            <BarChart className="h-4 w-4" />
            Metrics
          </button>
          <button 
            onClick={navigateToWhitepaper}
            className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1.5"
          >
            <Book className="h-4 w-4" />
            Whitepaper
          </button>
        </nav>
        <Button 
          onClick={() => navigateToHomeSection('waitlist')}
          className="btn-gradient text-white font-medium py-2 px-6 rounded-lg"
        >
          Join Waitlist
        </Button>
      </div>
      
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="text-foreground text-2xl">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-background">
          <div className="flex flex-col space-y-8 mt-12">
            <nav className="flex flex-col space-y-6 w-full">
              <button 
                onClick={() => navigateToHomeSection('features')}
                className="text-foreground hover:text-primary transition-colors font-medium text-xl text-left flex items-center gap-2"
              >
                <BarChart className="h-5 w-5" />
                Features
              </button>
              <button 
                onClick={() => navigateToHomeSection('technology')}
                className="text-foreground hover:text-primary transition-colors font-medium text-xl text-left flex items-center gap-2"
              >
                <Network className="h-5 w-5" />
                Technology
              </button>
              <button 
                onClick={() => navigateToHomeSection('technology-architecture')}
                className="text-foreground hover:text-primary transition-colors font-medium text-xl text-left flex items-center gap-2"
              >
                <Gauge className="h-5 w-5" />
                Architecture
              </button>
              <button 
                onClick={() => navigateToHomeSection('technology-metrics')}
                className="text-foreground hover:text-primary transition-colors font-medium text-xl text-left flex items-center gap-2"
              >
                <BarChart className="h-5 w-5" />
                Metrics
              </button>
              <button 
                onClick={navigateToWhitepaper}
                className="text-foreground hover:text-primary transition-colors font-medium text-xl text-left flex items-center gap-2"
              >
                <Book className="h-5 w-5" />
                Whitepaper
              </button>
            </nav>
            <Button 
              onClick={() => navigateToHomeSection('waitlist')}
              className="btn-gradient text-white font-medium py-2 px-8 rounded-lg text-xl w-full mt-4"
            >
              Join Waitlist
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}