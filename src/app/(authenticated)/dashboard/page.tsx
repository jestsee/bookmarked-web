import Link from "next/link";

import { createAsyncCaller } from "@/app/api/trpc/trpc.router";
import { Button } from "@/components/ui/button";

import BookmarkContainer from "./bookmark-container";

const Dashboard = async () => {
  const caller = await createAsyncCaller();
  const data = await caller.getNotionData();

  const isConnectedToNotion = !!(data?.accessToken && data.databaseId);

  if (!isConnectedToNotion)
    return (
      <Button asChild>
        <Link href={process.env.NEXT_PUBLIC_NOTION_AUTHORIZATION_URL}>
          Connect to Notion
        </Link>
      </Button>
    );

  return (
    <div>
      <h3>dashboard</h3>
      <BookmarkContainer />
    </div>
  );
};

export default Dashboard;
