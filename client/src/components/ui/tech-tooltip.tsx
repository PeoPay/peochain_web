import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface TechTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  expanded?: boolean; // Added expanded prop with optional flag
}

export function TechTooltip({ children, content, expanded = false }: TechTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help border-b border-dotted border-foreground/30">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}