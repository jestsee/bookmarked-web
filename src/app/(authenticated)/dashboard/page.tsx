import Link from "next/link";

import { createAsyncCaller } from "@/app/api/trpc/trpc.router";
import { SimpleAlert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import BookmarkContainer from "./bookmark-container";

const Dashboard = async () => {
  const caller = await createAsyncCaller();
  const data = await caller.getNotionData();

  const isConnectedToNotion = !!(data?.accessToken && data.databaseId);

  if (!isConnectedToNotion)
    return (
      <div className="space-y-4">
        <SimpleAlert
          variant="warn"
          title="You haven't connected to Notion"
          message="To use this service, please ensure you have a Notion account and connect it"
        />
        <Button asChild>
          <Link href={process.env.NEXT_PUBLIC_NOTION_AUTHORIZATION_URL}>
            Connect to Notion
          </Link>
        </Button>
      </div>
    );

  return (
    <div>
      <h3>dashboard</h3>
      <BookmarkContainer />
    </div>
  );
};

export default Dashboard;
