import { cva, VariantProps } from "class-variance-authority";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BookmarkStatus } from "@/server/notion/notion.schema";

const MAP_STATUS: Record<BookmarkStatus, string> = {
  completed: "Completed",
  failed: "Try again",
  on_progress: "On progress",
};

const statusVariants = cva("rounded-md capitalize py-1", {
  variants: {
    status: {
      on_progress: "animate-pulse",
      failed:
        "bg-rose-600/20 text-rose-400 cursor-pointer hover:bg-rose-600/20",
      completed: "bg-emerald-600/30 text-emerald-500 hover:bg-emerald-600/20",
    },
  },
  defaultVariants: {
    status: "on_progress",
  },
});

interface Props extends VariantProps<typeof statusVariants> {
  className?: string;
  onRetry: () => void;
}

const BookmarkStatusBadge = ({ className, status, onRetry }: Props) => {
  return (
    <Badge
      onClick={status === "failed" ? onRetry : undefined}
      className={cn(statusVariants({ status }), className)}
      variant="secondary"
    >
      {MAP_STATUS[status ?? "on_progress"]}
    </Badge>
  );
};

export default BookmarkStatusBadge;
