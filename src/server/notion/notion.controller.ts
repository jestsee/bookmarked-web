import { eq, getTableColumns } from "drizzle-orm";

import db from "@/database/client";
import { notion } from "@/database/schema";
import { validateResponse } from "@/lib/validation";

import {
  ConnectToNotionPayload,
  createAccessTokenResponse,
  getDatabaseIdResponse,
} from "./notion.schema";

export const connectToNotionHandler = async ({
  input,
  userId,
}: ConnectToNotionPayload) => {
  const accessTokenResponse = await fetch(
    `${process.env.BOOKMARKED_API_URL}/notion/generate-access-token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
        "Content-Type": "application/json",
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

export const notionStatusHandler = async (userId: string) => {
  const { userId: notionUserId, ...restColumns } = getTableColumns(notion);

  const [notionData] = await db
    .select(restColumns)
    .from(notion)
    .where(eq(notionUserId, userId))
    .limit(1);

  return notionData;
};
