import { cn } from "@/lib/utils";
import React from "react";

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: "section" | "div" | "article";
  id?: string;
  containerClassName?: string;
  innerClassName?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

/**
 * A consistent container for page sections with standardized spacing and responsive behavior
 */
export function SectionContainer({
  children,
  as: Component = "section",
  className,
  containerClassName,
  innerClassName,
  id,
  fullWidth = false,
  noPadding = false,
  ...props
}: SectionContainerProps) {
  return (
    <Component
      id={id}
      className={cn(
        "relative w-full",
        !noPadding && "px-4 md:px-8 py-16 md:py-24",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "mx-auto w-full",
          !fullWidth && "max-w-7xl",
          containerClassName
        )}
      >
        <div className={cn("w-full", innerClassName)}>{children}</div>
      </div>
    </Component>
  );
}
