"use client";

import { trpc } from "@/trpc-client/trpc";

interface Props {
  id: string;
}

const BookmarkItem = ({ id }: Props) => {
  const { data } = trpc.getBookmarkStatus.useQuery(
    { id },
    {
      refetchInterval({ state }) {
        const stop = !!state.error || state.data?.status !== "on_progress";
        return stop ? false : 4000;
      },
      // TODO type and url still hardcoded, should get proper payload as the initialData
      initialData: { status: "on_progress", type: "tweet", url: "" },
    },
  );

  return <div>{data.status}</div>;
};

export default BookmarkItem;
