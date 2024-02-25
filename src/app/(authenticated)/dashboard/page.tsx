import { createAsyncCaller } from "@/app/api/trpc/trpc.router";

import BookmarkContainer from "./bookmark-container";

const Dashboard = async () => {
  const caller = await createAsyncCaller();
  const data = await caller.getNotionData();

  const isConnectedToNotion = !!(data?.accessToken && data.databaseId);

  return (
    <div>
      <h3>dashboard</h3>
      <BookmarkContainer {...{ isConnectedToNotion }} />
    </div>
  );
};

export default Dashboard;
