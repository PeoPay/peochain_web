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
    <section className="px-4 md:px-8 py-12 md:py-24 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl leading-tight mb-6 text-foreground">
            Unlock <span className="text-primary">Financial Freedom</span> with PEOCHAIN – Join the Revolution Today!
          </h1>
          <p className="text-lg md:text-xl mb-6 text-foreground/80 max-w-xl">
            Lend, borrow, and earn like never before—powered by secure blockchain technology and built for YOU. Be among the first to experience decentralized finance redefined.
          </p>
          <p className="text-lg md:text-xl mb-8 text-foreground/80 max-w-xl">
            PEOCHAIN isn't just a DeFi platform. It's a movement built on innovation, inclusivity, and robust security—designed for everyone from experienced professionals to blockchain newcomers.
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
              Explore Features <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="glass p-6 md:p-8 rounded-3xl relative z-10">
            <AspectRatio ratio={4/3}>
              <div className="w-full h-full flex items-center justify-center bg-primary/5 rounded-2xl shadow-lg p-4">
                <AnimatedChart className="w-full h-full" />
              </div>
            </AspectRatio>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <div className="bg-green-500 h-3 w-3 rounded-full animate-pulse"></div>
                <span className="text-foreground font-medium">Coming Soon</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/70">
                <ShieldCheck className="w-4 h-4" />
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
