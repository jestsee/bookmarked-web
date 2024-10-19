import { NeonDbError } from "@neondatabase/serverless";
import { TRPCError } from "@trpc/server";
import { and, eq, getTableColumns } from "drizzle-orm";
import { cookies } from "next/headers";

import db from "@/database/client";
import { connectedAccount } from "@/database/schema";

import { CustomDbError, CustomDbPropertyError } from "../trpc/errors/type";
import { ConnectTelegramInput } from "./telegram.schema";

export const connectToTelegramHandler = async ({
  input: { telegramId },
  userId,
}: ConnectTelegramInput) => {
  try {
    await db.insert(connectedAccount).values({
      accountId: telegramId,
      accountProvider: "telegram",
      userId,
    });
  } catch (error) {
    const dbError: CustomDbError =
      "duplicate key value violates unique constraint";
    const dbPropertyError: CustomDbPropertyError =
      "connectedAccount_accountId_accountProvider_pk";

    if (
      !(
        error instanceof NeonDbError &&
        error.message.includes(dbError) &&
        error.message.includes(dbPropertyError)
      )
    ) {
      // if the error is not a duplicate key error, throw it
      throw error;
    }

    // handle the case where the account is already connected
    const connectedAccountColumns = getTableColumns(connectedAccount);
    const [result] = await db
      .select({ userIdResult: connectedAccountColumns.userId })
      .from(connectedAccount)
      .where(
        and(
          eq(connectedAccount.accountId, telegramId),
          eq(connectedAccount.accountProvider, "telegram"),
        ),
      );

    // if the account is connected to another user, throw an error
    if (result?.userIdResult !== userId) throw error;
  }

  const tokenStore = cookies().get(process.env.SESSION_TOKEN_NAME);

  if (!tokenStore?.value) {
    throw new TRPCError({ message: "Token not found", code: "NOT_FOUND" });
  }

  // insert stored token to the connectedAccount table
  await db
    .update(connectedAccount)
    .set({ session: tokenStore.value })
    .where(
      and(
        eq(connectedAccount.accountId, telegramId),
        eq(connectedAccount.accountProvider, "telegram"),
      ),
    );

  return {
    status: "Successfully authenticated",
    accessToken: tokenStore.value,
  };
};
