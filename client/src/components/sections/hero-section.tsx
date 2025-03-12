import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface HeroSectionProps {
  onExploreClick: () => void;
  onJoinClick: () => void;
}

export default function HeroSection({ onExploreClick, onJoinClick }: HeroSectionProps) {
  return (
    <section className="px-4 md:px-8 py-12 md:py-24 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl leading-tight mb-6 text-foreground">
            The Future of <span className="text-primary">Decentralized Lending</span> is Almost Here
          </h1>
          <p className="text-lg md:text-xl mb-8 text-foreground/80 max-w-xl">
            PEOCHAIN Lending reimagines financial inclusion through decentralized protocols, making borderless finance accessible to everyone.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button 
              onClick={onJoinClick}
              className="btn-gradient text-white font-semibold py-3 px-8 rounded-full text-center w-full sm:w-auto"
            >
              Join the Waitlist
            </Button>
            <Button 
              onClick={onExploreClick}
              variant="ghost" 
              className="text-foreground font-medium flex items-center justify-center gap-2 py-3 w-full sm:w-auto"
            >
              Explore Features <i className="ri-arrow-right-line"></i>
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="glass p-6 md:p-8 rounded-3xl relative z-10">
            <AspectRatio ratio={4/3}>
              <img 
                src="https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&q=80&w=800&h=600" 
                alt="Decentralized Finance Visualization" 
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
            </AspectRatio>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <div className="bg-green-500 h-3 w-3 rounded-full animate-pulse"></div>
                <span className="text-foreground font-medium">Live Protocol</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/70">
                <i className="ri-shield-check-line"></i>
                <span>Security Audited</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </section>
  );
}
