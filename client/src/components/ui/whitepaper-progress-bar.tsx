import React from "react";
import { Progress } from "@/components/ui/progress";

interface WhitepaperProgressBarProps {
  progress: number;
}

export function WhitepaperProgressBar({ progress }: WhitepaperProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 z-50 w-full">
      <Progress 
        value={progress} 
        className="h-1 rounded-none bg-transparent" 
        aria-label="Reading progress"
      />
    </div>
  );
}