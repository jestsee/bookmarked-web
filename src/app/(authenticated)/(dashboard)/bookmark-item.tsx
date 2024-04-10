"use client";

import Link from "next/link";
import { toast } from "sonner";

import { OpenInNew } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc-client/trpc";

import BookmarkItemLoading from "./bookmark-item-loading";
import BookmarkStatusBadge from "./bookmark-status";
import useBookmarkEvent from "./useBookmarkEvent";

interface Props {
  id: string;
  addConnection: () => void;
  removeConnection: () => void;
}

const BookmarkItem = ({ id, addConnection, removeConnection }: Props) => {
  const { openConnection, errorMessage, eventData } = useBookmarkEvent(id, {
    onOpen: addConnection,
    onClose: removeConnection,
  });

  const { mutateAsync } = trpc.retryBookmark.useMutation({
    onSuccess() {
      openConnection();
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

  if (errorMessage && !eventData) {
    toast.error(errorMessage);
    return;
  }

  if (!eventData) return <BookmarkItemLoading />;

  return (
    <div className="flex w-full items-center gap-3 rounded-lg border-2 border-primary-foreground px-4 py-3">
      <Button
        asChild
        variant="link"
        className="relative flex-col p-0 hover:after:absolute hover:after:bottom-1.5 hover:after:h-[1.15px] hover:after:w-5 hover:after:rounded-sm hover:after:bg-emerald-400 hover:after:content-['']"
      >
        <Link href={eventData.url} rel="noopener noreferrer" target="_blank">
          <OpenInNew className="h-6 w-6 text-emerald-400" />
        </Link>
      </Button>
      <div className="w-full overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="-mb-0.5 flex flex-col gap-x-2 gap-y-0.5 max-sm:mb-0.5 sm:flex-row sm:items-center">
            <p className="text-sm font-semibold">{eventData.name}</p>
            <p className="text-xs text-slate-400">@{eventData.username}</p>
          </div>
          <BookmarkStatusBadge
            data={eventData}
            error={!!errorMessage}
            onRetry={handleRetry}
            className="mb-1 py-[2px] text-[11px]"
          />
        </div>
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {eventData.text}
        </p>
        {errorMessage && (
          <p className="mt-1 text-xs text-rose-700">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default BookmarkItem;
