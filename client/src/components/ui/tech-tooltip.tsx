import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TechTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  expanded?: boolean;
}

export function TechTooltip({ children, content, expanded = false }: TechTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help border-dotted border-b border-primary">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className={expanded ? "max-w-sm" : "max-w-xs"}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}