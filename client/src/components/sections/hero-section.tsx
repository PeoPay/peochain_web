import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight, ShieldCheck, Users, FileText, PlayCircle } from "lucide-react";
import { AnimatedChart } from "@/components/ui/animated-chart";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

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
            Redefining Blockchain Synergy with <span className="text-primary">Proof of Synergy (PoSyg)</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-foreground/80 max-w-xl">
            Scalable, 
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-primary font-medium px-1 border-b border-dotted border-primary">
                  quantum-resistant
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm max-w-xs">Post-quantum cryptography that protects against attacks from quantum computers</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>, and 
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-primary font-medium px-1 border-b border-dotted border-primary">
                  interoperable
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm max-w-xs">Seamlessly connects with other blockchains for asset transfers and data sharing</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>—built for the future.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <Link href="/whitepaper">
              <Button 
                className="btn-gradient text-white font-semibold py-3 px-8 rounded-full text-center w-full sm:w-auto flex items-center gap-2"
              >
                <FileText className="w-4 h-4" /> Explore Whitepaper
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="text-foreground font-medium flex items-center justify-center gap-2 py-3 w-full sm:w-auto border-2"
            >
              <PlayCircle className="w-4 h-4" /> Try Demo
            </Button>
          </div>
          
          <div className="flex items-center flex-wrap gap-3 mt-4">
            <Badge variant="outline" className="flex items-center gap-1.5 py-1.5 px-3 border-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Audited by CertiK</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1.5 py-1.5 px-3 border-2">
              <Users className="w-4 h-4 text-primary" />
              <span><span className="font-medium">10,500+</span> developers worldwide</span>
            </Badge>
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
                <span className="text-foreground font-medium">Live Testnet</span>
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
