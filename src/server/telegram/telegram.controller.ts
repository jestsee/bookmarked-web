import { TRPCError } from "@trpc/server";
import { cookies } from "next/headers";

import db from "@/database/client";
import { connectedAccount, tokenExchange } from "@/database/schema";

import { ConnectTelegramInput } from "./telegram.schema";

export const connectToTelegramHandler = async ({
  input: { telegramId },
  userId,
}: ConnectTelegramInput) => {
  /**
   * TODO add try catch to handle duplicate PK
   * if the userId from db == current user id then proceed the authentication process
   * else, the authentication failed because that social account already registered
   * and the user should login with correspond account
   */
  await db.insert(connectedAccount).values({
    accountId: telegramId,
    accountProvider: "telegram",
    userId,
  });

  const temporaryToken = crypto.randomUUID();
  const tokenStore = cookies().get("next-auth.session-token");

  if (!tokenStore?.value) {
    throw new TRPCError({ message: "Token not found", code: "NOT_FOUND" });
  }

  await db.insert(tokenExchange).values({
    accessToken: tokenStore?.value,
    temporaryToken,
    userId,
  });

  return { status: "success", token: temporaryToken };
};
