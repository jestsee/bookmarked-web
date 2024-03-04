"use client";

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
      // TODO type and url still hardcoded, should get proper payload as the initialData
      initialData: { status: "on_progress", type, url },
    },
  );

  return (
    <div>
      <p>Status: {data.status}</p>
      <p>Type: {data.type}</p>
      <p>Url: {data.url}</p>
    </div>
  );
};

export default BookmarkItem;
