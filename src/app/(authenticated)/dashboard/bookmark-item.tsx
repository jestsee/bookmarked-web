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
        if (
          state.data?.status === "completed" ||
          state.data?.status === "failed"
        )
          return false;
        return 1000;
      },
      initialData: { status: "on_progress" },
    },
  );

  return <div>{data.status}</div>;
};

export default BookmarkItem;
