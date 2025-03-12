import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface HeaderProps {
  onFeatureClick: () => void;
  onBenefitsClick: () => void;
  onWaitlistClick: () => void;
}

export default function Header({ onFeatureClick, onBenefitsClick, onWaitlistClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMobileNavClick = (callback: () => void) => {
    setIsOpen(false);
    callback();
  };
  
  return (
    <header className="w-full py-6 px-4 md:px-8 flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-foreground font-poppins font-bold text-2xl md:text-3xl">
          PEO<span className="text-primary">CHAIN</span>
        </div>
      </div>
      
      <div className="hidden md:flex items-center">
        <Button 
          onClick={onWaitlistClick}
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
          <div className="flex flex-col items-center space-y-8 mt-12">
            <Button 
              onClick={() => handleMobileNavClick(onWaitlistClick)}
              className="btn-gradient text-white font-medium py-2 px-8 rounded-full text-xl w-full"
            >
              Join Waitlist
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
