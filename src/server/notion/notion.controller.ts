import { TRPCError } from "@trpc/server";
import { eq, getTableColumns } from "drizzle-orm";

import db from "@/database/client";
import { notion } from "@/database/schema";
import { validateResponse } from "@/lib/validation";

import {
  BookmarkOutput,
  bookmarkResponse,
  BookmarkTweetPayload,
  ConnectToNotionPayload,
  createAccessTokenResponse,
  GetBookmarkStatusPayload,
  getBookmarkStatusResponse,
  getDatabaseIdResponse,
  RetryBookmarkPayload,
  retryBookmarkStatusResponse,
} from "./notion.schema";
import { getTweetAuthor } from "./notion.utils";

const HEADERS = { "Content-Type": "application/json" };

export const connectToNotionHandler = async ({
  input,
  userId,
}: ConnectToNotionPayload) => {
  const accessTokenResponse = await fetch(
    `${process.env.BOOKMARKED_API_URL}/notion/generate-access-token`,
    {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(input),
    },
  );
  const accessTokenData = await validateResponse(
    accessTokenResponse,
    createAccessTokenResponse,
  );

  const databaseResponse = await fetch(
    `${process.env.BOOKMARKED_API_URL}/notion/database`,
    {
      method: "GET",
      headers: {
        ...HEADERS,
        "access-token": accessTokenData.access_token,
      },
    },
  );
  const databaseData = await validateResponse(
    databaseResponse,
    getDatabaseIdResponse,
  );

  await db.insert(notion).values({
    userId,
    accessToken: accessTokenData.access_token,
    databaseId: databaseData.id,
  });

  return { status: "success" };
};

export const getNotionDataHandler = async (userId: string) => {
  const { userId: notionUserId, ...restColumns } = getTableColumns(notion);

  const [notionData] = await db
    .select(restColumns)
    .from(notion)
    .where(eq(notionUserId, userId))
    .limit(1);

  return notionData;
};

export const bookmarkTweetHandler = async ({
  input: { url, type = "thread", ...rest },
  userId,
}: BookmarkTweetPayload): Promise<BookmarkOutput> => {
  const data = await getNotionDataHandler(userId);

  if (!data?.accessToken || !data.databaseId) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Not yet connected to Notion",
    });
  }

  const { accessToken, databaseId } = data;
  const body = { databaseId, url, type, ...rest };

  const response = await fetch(
    `${process.env.BOOKMARKED_API_URL}/notion/bookmark-tweet`,
    {
      method: "POST",
      headers: {
        ...HEADERS,
        "access-token": accessToken,
      },
      body: JSON.stringify(body),
    },
  );
  const { id } = await validateResponse(response, bookmarkResponse);

  const author = getTweetAuthor(url);

  return { id, author, url, type };
};

export const getBookmarkStatusHandler = async ({
  id,
}: GetBookmarkStatusPayload) => {
  const response = await fetch(
    `${process.env.BOOKMARKED_API_URL}/notion/bookmark-tweet/${id}/status`,
    { method: "GET", headers: HEADERS },
  );
  const responseData = await validateResponse(
    response,
    getBookmarkStatusResponse,
  );

  return responseData;
};

export const retryBookmarkHandler = async ({ id }: RetryBookmarkPayload) => {
  const response = await fetch(
    `${process.env.BOOKMARKED_API_URL}/notion/bookmark-tweet/${id}/retry`,
    { method: "PATCH", headers: HEADERS },
  );
  const responseData = await validateResponse(
    response,
    retryBookmarkStatusResponse,
  );

  return responseData;
};
