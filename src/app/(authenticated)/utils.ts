import { cache } from "react";

import { createAsyncCaller } from "../api/trpc/trpc.router";

export const getNotionStatus = cache(async () => {
  const caller = await createAsyncCaller();
  return caller.getNotionData();
});
