import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { InfoIcon } from "lucide-react";

interface TechTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  expanded?: boolean;
  icon?: boolean;
}

export function TechTooltip({ 
  children, 
  content, 
  expanded = false, 
  icon = false 
}: TechTooltipProps) {
  // Use HoverCard for expanded content, Tooltip for simple content
  if (expanded) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <span className="group cursor-help inline-flex items-center">
            {children}
            {icon && <InfoIcon className="h-3 w-3 ml-1 text-primary/60 group-hover:text-primary transition-colors" />}
          </span>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 p-4 bg-white/95 backdrop-blur-sm border border-primary/20">
          <div className="space-y-2">
            {content}
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className="group cursor-help inline-flex items-center">
            {children}
            {icon && <InfoIcon className="h-3 w-3 ml-1 text-primary/60 group-hover:text-primary transition-colors" />}
          </span>
        </TooltipTrigger>
        <TooltipContent className="bg-white/95 backdrop-blur-sm border border-primary/20 p-2 max-w-xs">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}