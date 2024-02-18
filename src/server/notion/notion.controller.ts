import db from "@/database/client";
import { notion } from "@/database/schema";
import { Input } from "@/types/server";

import {
  CreateAccessTokenPayload,
  createAccessTokenResponse,
  databaseIdResponse,
} from "./notion.schema";

export const connectToNotionHandler = async ({
  input,
  userId,
}: Input<CreateAccessTokenPayload> & { userId: string }) => {
  // get access token
  const accessTokenResponse = await fetch(
    `${process.env.BOOKMARKED_API_URL}/notion/generate-access-token`,
    { method: "POST", body: JSON.stringify(input) },
  );
  const accessTokenData = await accessTokenResponse.json();
  const accessTokenValid = createAccessTokenResponse.safeParse(accessTokenData);

  if (!accessTokenValid.success) {
    // TODO handle error
    return console.error(accessTokenValid.error);
  }

  // get databaseId
  const databaseResponse = await fetch(
    `${process.env.BOOKMARKED_API_URL}/notion/database`,
    {
      method: "GET",
      headers: { "access-token": accessTokenValid.data.access_token },
    },
  );
  const databaseData = await databaseResponse.json();
  const databaseValid = databaseIdResponse.safeParse(databaseData);

  if (!databaseValid.success) {
    return console.error(databaseValid.error);
  }

  // save token & notion database id
  await db.insert(notion).values({
    userId,
    accessToken: accessTokenValid.data.access_token,
    databaseId: databaseValid.data.id,
  });

  return { status: "success" };
};
