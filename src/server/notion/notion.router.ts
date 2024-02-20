import { protectedProcedure, t } from "@/app/api/trpc/trpc.server";

import {
  bookmarkTweetHandler,
  connectToNotionHandler,
  getNotionDataHandler,
} from "./notion.controller";
import { bookmarkPayload, createAccessTokenPayload } from "./notion.schema";

const notionRouter = t.router({
  connectToNotion: protectedProcedure
    .input(createAccessTokenPayload)
    .mutation(({ input, ctx }) =>
      connectToNotionHandler({ input, userId: ctx.user?.id! }),
    ),
  getNotionData: protectedProcedure.query(({ ctx }) =>
    getNotionDataHandler(ctx.user?.id!),
  ),
  bookmarkTweet: protectedProcedure
    .input(bookmarkPayload)
    .mutation(({ input, ctx }) =>
      bookmarkTweetHandler({ input, userId: ctx.user?.id! }),
    ),
});

export default notionRouter;
