import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
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
    <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center">
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
        <nav className="flex items-center space-x-6 mr-6">
          <button 
            onClick={() => navigateToHomeSection('features')}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Features
          </button>
          <button 
            onClick={() => navigateToHomeSection('benefits')}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Benefits
          </button>
          <button 
            onClick={() => navigateToHomeSection('technology')}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Technology
          </button>
          <button 
            onClick={() => navigateToHomeSection('faq')}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            FAQ
          </button>
          <button 
            onClick={navigateToWhitepaper}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Whitepaper
          </button>
        </nav>
        <Button 
          onClick={() => navigateToHomeSection('waitlist')}
          className="btn-gradient text-white font-medium py-2 px-6 rounded-full"
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
                className="text-foreground hover:text-primary transition-colors font-medium text-xl text-left"
              >
                Features
              </button>
              <button 
                onClick={() => navigateToHomeSection('benefits')}
                className="text-foreground hover:text-primary transition-colors font-medium text-xl text-left"
              >
                Benefits
              </button>
              <button 
                onClick={() => navigateToHomeSection('technology')}
                className="text-foreground hover:text-primary transition-colors font-medium text-xl text-left"
              >
                Technology
              </button>
              <button 
                onClick={() => navigateToHomeSection('faq')}
                className="text-foreground hover:text-primary transition-colors font-medium text-xl text-left"
              >
                FAQ
              </button>
              <button 
                onClick={navigateToWhitepaper}
                className="text-foreground hover:text-primary transition-colors font-medium text-xl text-left"
              >
                Whitepaper
              </button>
            </nav>
            <Button 
              onClick={() => navigateToHomeSection('waitlist')}
              className="btn-gradient text-white font-medium py-2 px-8 rounded-full text-xl w-full mt-4"
            >
              Join Waitlist
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}