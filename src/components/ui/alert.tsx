import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "@/types/component";

import { CheckCircle, ExclamationCircle, ExclamationTriangle } from "../icons";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "bg-destructive/10 border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success:
          "bg-green-600/10 border-green-500/50 text-green-500 dark:border-green-500 [&>svg]:text-green-500",
        warn: "bg-amber-600/10 border-amber-500/50 text-amber-500 dark:border-amber-500 [&>svg]:text-amber-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

/**
 * Custom alert component
 */
interface Props {
  title?: string;
  message: string;
  prefixIcon?: React.ReactNode;
}

type Variant = Exclude<
  VariantProps<typeof alertVariants>["variant"],
  undefined | null
>;

const MAP_TITLE: Partial<Record<Variant, string>> = {
  destructive: "Error",
  success: "Success",
  warn: "Warning",
};

const MAP_ICON: Partial<Record<Variant, Icon>> = {
  destructive: ExclamationCircle,
  success: CheckCircle,
  warn: ExclamationTriangle,
};

const SimpleAlert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof alertVariants> &
    Props
>(({ message, title, prefixIcon, ...props }, ref) => {
  const variant = props.variant ?? "default";
  const Icon = MAP_ICON[variant];

  return (
    <Alert ref={ref} {...props}>
      {prefixIcon ?? (Icon && <Icon className="h-[1.25rem] w-[1.25rem]" />)}
      <AlertTitle>{title ?? MAP_TITLE[variant]}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
});
SimpleAlert.displayName = "SimpleAlert";

export { Alert, AlertDescription, AlertTitle, SimpleAlert };
