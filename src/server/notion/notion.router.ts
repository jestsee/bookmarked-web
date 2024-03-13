import { protectedProcedure, t } from "@/app/api/trpc/trpc.server";

import {
  bookmarkTweetHandler,
  connectToNotionHandler,
  getBookmarkStatusHandler,
  getNotionDataHandler,
  retryBookmarkHandler,
} from "./notion.controller";
import {
  bookmarkPayload,
  createAccessTokenPayload,
  getBookmarkStatusPayload,
  retryBookmarkPayload,
} from "./notion.schema";

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
    .meta({ openapi: { method: "POST", path: "/bookmark-tweet" } })
    .input(bookmarkPayload)
    .mutation(({ input, ctx }) =>
      bookmarkTweetHandler({ input, userId: ctx.user?.id! }),
    ),
  getBookmarkStatus: protectedProcedure
    .input(getBookmarkStatusPayload)
    .query(({ input }) => getBookmarkStatusHandler(input)),
  retryBookmark: protectedProcedure
    .input(retryBookmarkPayload)
    .mutation(({ input }) => retryBookmarkHandler(input)),
});

export default notionRouter;
