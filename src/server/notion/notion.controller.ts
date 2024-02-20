import { TRPCError } from "@trpc/server";
import { eq, getTableColumns } from "drizzle-orm";

import db from "@/database/client";
import { notion } from "@/database/schema";
import { validateResponse } from "@/lib/validation";

import {
  bookmarkResponse,
  BookmarkTweetPayload,
  ConnectToNotionPayload,
  createAccessTokenResponse,
  getDatabaseIdResponse,
} from "./notion.schema";

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
  input: { url },
  userId,
}: BookmarkTweetPayload) => {
  const { accessToken, databaseId } = await getNotionDataHandler(userId);

  if (!accessToken || !databaseId) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Not yet connected to Notion",
    });
  }

  const body = { databaseId, url, type: "thread" }; // TODO hardcoded type

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
  const responseData = await validateResponse(response, bookmarkResponse);

  return { status: "success", ...responseData };
};
