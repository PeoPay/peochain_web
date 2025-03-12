import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const handleWaitlistClick = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="px-4 md:px-8 py-12 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto">
        <div className="md:text-center">
          <div className="text-foreground font-poppins font-bold text-2xl mb-4">
            PEO<span className="text-primary">CHAIN</span>
          </div>
          <p className="text-foreground/70 mb-6 md:max-w-xl md:mx-auto">
            Where traditional banking barriers vanish, and financial empowerment begins! Lend, borrow, and earn like never before.
          </p>
          <div className="flex space-x-4 mb-8 md:justify-center">
            <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Twitter">
              <i className="ri-twitter-fill text-xl"></i>
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Discord">
              <i className="ri-discord-fill text-xl"></i>
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Telegram">
              <i className="ri-telegram-fill text-xl"></i>
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Medium">
              <i className="ri-medium-fill text-xl"></i>
            </a>
          </div>
          
          <div className="text-center mb-8">
            <Button 
              onClick={handleWaitlistClick}
              className="btn-gradient text-white font-medium py-3 px-8 rounded-full"
            >
              Join the Waitlist
            </Button>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-primary/5 text-center mb-8">
          <p className="text-foreground/80">
            The next billion users are counting on this. Be part of something bigger—PEOCHAIN Lending launches soon.
          </p>
        </div>
        
        <Separator className="my-6 bg-foreground/10" />
        
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <i className="ri-bank-line text-primary"></i>
              <span className="text-sm font-medium">Financial Regulation Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-global-line text-primary"></i>
              <span className="text-sm font-medium">International Standards</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-secure-payment-line text-primary"></i>
              <span className="text-sm font-medium">Secure Transaction Protocol</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <img src="https://cdn.cdnlogo.com/logos/s/8/ssl-secure.svg" alt="SSL Secure" className="h-10 opacity-60" />
            <img src="https://cdn.cdnlogo.com/logos/p/6/pci-dss-compliant.svg" alt="PCI DSS Compliant" className="h-10 opacity-60" />
            <img src="https://cdn.cdnlogo.com/logos/s/94/secure-checkout.svg" alt="Secure Checkout" className="h-10 opacity-60" />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-foreground/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PEOCHAIN. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">Compliance</a>
            <a href="#" className="text-foreground/60 hover:text-primary text-sm transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
