import { cva } from "class-variance-authority";
import Link from "next/link";

import { OpenInNew, Retry } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { EventData } from "./type";

const statusVariants = cva("rounded-md capitalize py-1", {
  variants: {
    status: {
      scraping: "animate-pulse",
      scraped:
        "animate-pulse bg-emerald-600/30 text-emerald-500 hover:bg-emerald-600/20",
      bookmarked: "bg-emerald-600/30 text-emerald-500 hover:bg-emerald-600/20",
      error: "bg-rose-600/20 text-rose-400 cursor-pointer hover:bg-rose-600/20",
    },
  },
  defaultVariants: {
    status: "scraping",
  },
});

interface Props {
  className?: string;
  onRetry: () => void;
  data: EventData;
  error?: boolean;
}

const BookmarkStatusBadge = ({ className, data, error, onRetry }: Props) => {
  const status = error ? "error" : data.status;
  const statusText: Record<typeof status, React.ReactNode> = {
    scraping: `${data.length} tweets scraped`,
    scraped: "Saving to Notion...",
    bookmarked: (
      <Link
        href={data.notionPageUrl!}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="flex items-center gap-2">
          <OpenInNew className="h-3 w-3" /> Open in Notion
        </span>
      </Link>
    ),
    error: (
      <span className="flex items-center gap-2">
        <Retry className="h-3 w-3" /> Retry
      </span>
    ),
  };

  return (
    <Badge
      onClick={error ? onRetry : undefined}
      className={cn(statusVariants({ status }), className)}
      variant="secondary"
    >
      {statusText[status]}
    </Badge>
  );
};

export default BookmarkStatusBadge;
