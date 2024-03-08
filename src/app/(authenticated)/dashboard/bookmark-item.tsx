"use client";

import Link from "next/link";

import { Loading, OpenInNew } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc-client/trpc";

import { ProcessedBookmark } from "./type";

interface Props extends ProcessedBookmark {}

const BookmarkItem = ({ id, type, url }: Props) => {
  const { data } = trpc.getBookmarkStatus.useQuery(
    { id },
    {
      refetchInterval({ state }) {
        const stop = !!state.error || state.data?.status !== "on_progress";
        return stop ? false : 2000;
      },
      initialData: { status: "on_progress", type, url },
    },
  );

  return (
    <div className="flex w-full items-center rounded-lg border-2 border-primary-foreground">
      <div className="px-4 py-2">
        <p>Type: {data.type}</p>
      </div>
      <div className="ml-auto p-1">
        <Button asChild variant="link">
          <Link href={data.url} rel="noopener noreferrer" target="_blank">
            <OpenInNew className="h-5 w-5 text-emerald-400" />
          </Link>
        </Button>
      </div>
      {/* <p>Status: {data.status}</p> */}
    </div>
  );
};

export default BookmarkItem;
