"use client";

import Link from "next/link";
import { toast } from "sonner";

import { OpenInNew } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc-client/trpc";

import BookmarkStatusBadge from "./bookmark-status";
import { ProcessedBookmark } from "./type";

interface Props extends ProcessedBookmark {}

const BookmarkItem = ({ id, type, url, author }: Props) => {
  const { data, refetch: refetchStatus } = trpc.getBookmarkStatus.useQuery(
    { id },
    {
      refetchInterval({ state }) {
        const stop = !!state.error || state.data?.status !== "on_progress";
        return stop ? false : 2000;
      },
      initialData: { status: "on_progress", type, url },
    },
  );

  const { mutateAsync } = trpc.retryBookmark.useMutation({
    onSuccess() {
      refetchStatus();
    },
  });
  const handleRetry = () => {
    toast.promise(mutateAsync({ id }), {
      loading: "Please wait...",
      error(error) {
        return error.message ?? "Something went wrong";
      },
    });
  };

  return (
    <div className="flex w-full items-center rounded-lg border-2 border-primary-foreground">
      <div className="flex items-center py-1">
        <Button
          asChild
          variant="link"
          className="relative flex-col hover:after:absolute hover:after:bottom-2 hover:after:h-[1.15px] hover:after:w-4 hover:after:rounded-sm hover:after:bg-emerald-400 hover:after:content-['']"
        >
          <Link href={url} rel="noopener noreferrer" target="_blank">
            <OpenInNew className="h-5 w-5 text-emerald-400" />
          </Link>
        </Button>
        <div className="py-1">
          <div className="flex items-center gap-2">
            <p className="text-sm capitalize">{type}</p>
            {/* TODO redirect to author's profile when clicked */}
            <p className="text-[11px] text-slate-400">by @{author}</p>
          </div>
          {data.message && (
            <p className="text-xs text-rose-700">{data.message}</p>
          )}
        </div>
      </div>
      <BookmarkStatusBadge
        className="ml-auto mr-4"
        status={data.status}
        onRetry={handleRetry}
      />
    </div>
  );
};

export default BookmarkItem;
