import { ArrowRight, Zap, Shield, Network } from "lucide-react";
import { cn } from "@/lib/utils";

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

function BenefitItem({ icon, title, description, className }: BenefitItemProps) {
  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className="rounded-full bg-primary/10 p-3 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-foreground/80 leading-relaxed">{description}</p>
    </div>
  );
}

export default function WhyItMattersSection() {
  return (
    <section 
      className="px-4 md:px-8 py-16 md:py-24 max-w-7xl mx-auto" 
      id="why-it-matters"
      aria-labelledby="why-it-matters-title"
    >
      <div className="bg-primary/5 rounded-3xl p-8 md:p-12 overflow-hidden relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full -ml-24 -mb-24" aria-hidden="true" />
        
        <div className="max-w-4xl mx-auto relative">
          <h2 
            className="font-poppins font-bold text-3xl md:text-4xl text-foreground mb-6 text-center"
            id="why-it-matters-title"
          >
            Why It Matters
          </h2>
          
          <p className="text-foreground/90 text-xl md:text-2xl text-center leading-relaxed mb-12">
            PEOCHAIN isn't just an incremental improvement; it's a radical technological leap forward. By solving blockchain's core limitations, we unlock entirely new possibilities for decentralized applications, financial services, and large-scale adoption previously impossible.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <BenefitItem 
              icon={<Zap className="h-6 w-6 text-primary" aria-hidden="true" />}
              title="Scalability Redefined"
              description="Process 100,000+ transactions per second with near-instant finality, enabling enterprise-grade applications at global scale."
              className="animate-fadeIn"
            />
            <BenefitItem 
              icon={<Shield className="h-6 w-6 text-primary" aria-hidden="true" />}
              title="Uncompromising Security"
              description="Advanced consensus mechanisms with quantum-resistant encryption protect assets and data with unprecedented reliability."
              className="animate-fadeIn [animation-delay:200ms]"
            />
            <BenefitItem 
              icon={<Network className="h-6 w-6 text-primary" aria-hidden="true" />}
              title="True Interoperability"
              description="Seamless cross-chain integration with all major blockchain networks, creating a unified ecosystem for developers and users."
              className="animate-fadeIn [animation-delay:400ms]"
            />
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-primary/10 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="font-medium text-lg text-foreground mb-1">Ready to experience the future?</h3>
                <p className="text-foreground/80">Join our waitlist to be among the first to access PEOCHAIN.</p>
              </div>
              <a 
                href="#waitlist" 
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-lg transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const waitlist = document.getElementById('waitlist');
                  if (waitlist) {
                    waitlist.scrollIntoView({ behavior: 'smooth' });
                    waitlist.focus();
                  }
                }}
              >
                <span>Join the Waitlist</span>
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          
          <div className="flex justify-center">
            <a 
              href="/whitepaper" 
              className="flex items-center text-primary hover:text-primary/80 font-medium text-lg transition-colors"
            >
              <span>Read the Whitepaper</span>
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}