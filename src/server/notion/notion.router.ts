import { protectedProcedure, t } from "@/app/api/trpc/trpc.server";

import { connectToNotionHandler } from "./notion.controller";
import { createAccessTokenPayload } from "./notion.schema";

const notionRouter = t.router({
  connectToNotion: protectedProcedure
    .input(createAccessTokenPayload)
    .mutation(({ input, ctx }) =>
      connectToNotionHandler({ input, userId: ctx.user?.id! }),
    ),
});

export default notionRouter;
