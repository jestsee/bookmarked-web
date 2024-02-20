"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc-client/trpc";

const NotionStatus = () => {
  const { data, isPending } = trpc.getNotionStatus.useQuery();
  const connected = !!(data?.accessToken && data.databaseId);

  if (isPending) return <p>Loading...</p>;

  return (
    <div>
      <p>{connected && "Connected to Notion ✅"}</p>
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

export default NotionStatus;
