import React, { forwardRef } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TechTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export const TechTooltip = forwardRef<HTMLDivElement, TechTooltipProps>(
  ({ children, content }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div ref={ref}>
              {children}
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p className="text-xs">{content}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

TechTooltip.displayName = "TechTooltip";