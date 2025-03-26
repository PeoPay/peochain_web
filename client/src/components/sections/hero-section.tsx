import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight, ShieldCheck, Code, Cpu, Network } from "lucide-react";
import { AnimatedChart } from "@/components/ui/animated-chart";

interface HeroSectionProps {
  onExploreClick: () => void;
  onJoinClick: () => void;
}

export default function HeroSection({ onExploreClick, onJoinClick }: HeroSectionProps) {
  return (
    <section className="px-4 md:px-8 py-24 pt-32 md:py-36 md:pt-40 max-w-7xl mx-auto gradient-background">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-16 lg:mb-0 lg:pr-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold mb-6 text-sm">
            Next-Generation Blockchain Infrastructure
          </span>
          <h1 className="text-foreground mb-8">
            <span className="text-primary">PEOCHAIN</span>
            <br />Blockchain <span className="text-primary-light">Engineering</span> Excellence
          </h1>
          <p className="text-lg md:text-xl mb-8 text-foreground/80 max-w-xl leading-relaxed">
            Engineered for the technically demanding, our platform delivers breakthrough solutions for blockchain's most complex challenges: <span className="technical-term">adaptive scaling</span>, <span className="technical-term">quantum security</span>, and <span className="technical-term">distributed consensus</span>.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">Multi-Subnet Architecture</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Network className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">Adaptive Validation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <span className="font-medium">Secure Commit Protocol</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Button 
              onClick={onExploreClick}
              variant="outline" 
              className="text-primary border-primary/40 font-medium flex items-center justify-center gap-2 py-3 px-6 w-full sm:w-auto hover:bg-primary/5 rounded-lg order-2 sm:order-1"
            >
              Technical Deep-Dive <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button 
              onClick={onJoinClick}
              className="btn-gradient text-white font-semibold py-3 px-8 rounded-lg text-center w-full sm:w-auto order-1 sm:order-2"
            >
              Join Developer Waitlist
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="glass p-6 md:p-8 rounded-lg relative z-10 border border-primary/20">
            <div className="bg-primary/5 rounded-lg p-2 mb-4 inline-flex items-center gap-2">
              <div className="bg-primary h-2 w-2 rounded-full animate-pulse"></div>
              <span className="text-primary text-sm font-medium">Live Network Performance</span>
            </div>
            <AspectRatio ratio={4/3}>
              <div className="w-full h-full flex items-center justify-center rounded-lg shadow-sm p-6 bg-white/60">
                <AnimatedChart className="w-full h-full" />
              </div>
            </AspectRatio>
            <div className="flex items-center justify-between mt-6 text-sm">
              <div className="flex items-center gap-3 bg-white/70 py-1.5 px-3 rounded-full">
                <div className="bg-primary h-2 w-2 rounded-full animate-pulse"></div>
                <span className="text-foreground font-medium">Testnet V2 Active</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/70 bg-white/70 py-1.5 px-3 rounded-full">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Audit-Verified Security</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -top-10 -left-10 w-80 h-80 bg-primary-light/5 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </section>
  );
}
