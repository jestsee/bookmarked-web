import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, suffixIcon, prefixIcon, ...props }, ref) => {
    const iconClass = (iconClassName?: string) =>
      cn("absolute bottom-0 top-0", iconClassName);

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        <Slot tabIndex={-1} className={iconClass("left-4")}>
          {prefixIcon}
        </Slot>
        <Slot tabIndex={-1} className={iconClass("right-4")}>
          {suffixIcon}
        </Slot>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
