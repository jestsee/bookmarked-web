import db from "@/database/client";
import { notion } from "@/database/schema";
import { validateResponse } from "@/lib/validation";
import { Input } from "@/types/server";

import {
  CreateAccessTokenPayload,
  createAccessTokenResponse,
  getDatabaseIdResponse,
} from "./notion.schema";

export const connectToNotionHandler = async ({
  input,
  userId,
}: Input<CreateAccessTokenPayload> & { userId: string }) => {
  // get access token
  const accessTokenResponse = await fetch(
    `${process.env.BOOKMARKED_API_URL}/notion/generate-access-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    },
  );

  const accessTokenData = await validateResponse(
    accessTokenResponse,
    createAccessTokenResponse,
  );

  // get databaseId
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

  // save token & notion database id
  await db.insert(notion).values({
    userId,
    accessToken: accessTokenData.access_token,
    databaseId: databaseData.id,
  });

  return { status: "success" };
};
