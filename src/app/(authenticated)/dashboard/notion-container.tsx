"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc-client/trpc";

import BookmarkForm from "./bookmark-form";

const NotionContainer = () => {
  const { data, isPending } = trpc.getNotionData.useQuery();
  const connected = !!(data?.accessToken && data.databaseId);

  if (isPending) return <p>Loading...</p>;

  return (
    <div>
      {connected && (
        <div>
          <p>Connected to Notion ✅</p>
          <BookmarkForm />
        </div>
      )}
      {!connected && (
        <Button asChild>
          <Link href={process.env.NEXT_PUBLIC_NOTION_AUTHORIZATION_URL}>
            Connect to Notion
          </Link>
        </Button>
      )}
    </div>
  );
};

export default NotionContainer;
