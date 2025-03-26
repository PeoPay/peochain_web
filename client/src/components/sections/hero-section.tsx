import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { AnimatedChart } from "@/components/ui/animated-chart";

interface HeroSectionProps {
  onExploreClick: () => void;
  onJoinClick: () => void;
}

export default function HeroSection({ onExploreClick, onJoinClick }: HeroSectionProps) {
  return (
    <section className="px-4 md:px-8 py-24 md:py-36 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-16 lg:mb-0 lg:pr-20">
          <h1 className="text-foreground">
            <span className="text-primary">PEOCHAIN</span>
            <br />Next-Gen Blockchain Technology
          </h1>
          <p className="text-lg md:text-xl mb-12 text-foreground/80 max-w-xl">
            Advanced technology solving blockchain's biggest challenges—<span className="technical-term">scalability</span>, <span className="technical-term">security</span>, and true <span className="technical-term">decentralization</span>.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <Button 
              onClick={onJoinClick}
              className="btn-gradient text-white font-semibold py-3 px-10 rounded-lg text-center w-full sm:w-auto"
            >
              Join the Waitlist
            </Button>
            <Button 
              onClick={onExploreClick}
              variant="outline" 
              className="text-primary border-primary/40 font-medium flex items-center justify-center gap-2 py-3 px-6 w-full sm:w-auto hover:bg-primary/5 rounded-lg"
            >
              Explore Tech <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="glass p-8 md:p-10 rounded-lg relative z-10 border border-primary/20">
            <AspectRatio ratio={4/3}>
              <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg shadow-md p-6">
                <AnimatedChart className="w-full h-full" />
              </div>
            </AspectRatio>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary h-3 w-3 rounded-full animate-pulse"></div>
                <span className="text-foreground font-medium">Coming Soon</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/70">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Security Audited</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -top-10 -left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </section>
  );
}
