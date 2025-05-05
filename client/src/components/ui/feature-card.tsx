import { cn } from "@/lib/utils";
import React from "react";

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "outline";
  iconPosition?: "top" | "left";
  action?: React.ReactNode;
}

/**
 * A consistent card component for displaying features with an icon, title, and description
 */
export function FeatureCard({
  title,
  description,
  icon,
  variant = "default",
  iconPosition = "top",
  action,
  className,
  ...props
}: FeatureCardProps) {
  const variantStyles = {
    default: "bg-card text-card-foreground border border-border shadow-sm",
    primary: "bg-primary/5 border border-primary/20 text-foreground shadow-sm",
    secondary: "bg-secondary/5 border border-secondary/20 text-foreground shadow-sm",
    outline: "bg-background/50 backdrop-blur-sm border border-border text-foreground",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-6 transition-all duration-200 hover:shadow-md",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className={cn("flex", iconPosition === "top" ? "flex-col" : "flex-row")}>
        {icon && (
          <div 
            className={cn(
              "flex-shrink-0",
              iconPosition === "top" 
                ? "rounded-full bg-primary/10 p-3 w-fit mb-4" 
                : "rounded-full bg-primary/10 p-2 w-fit mr-4"
            )}
          >
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-foreground/80 leading-relaxed mb-4">{description}</p>
          {action && <div className="mt-2">{action}</div>}
        </div>
      </div>
    </div>
  );
}
