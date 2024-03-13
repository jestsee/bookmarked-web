import db from "@/database/client";
import { telegram } from "@/database/schema";

import { ConnectTelegramInput } from "./telegram.schema";

export const connectToTelegramHandler = async ({
  input: { telegramId },
  userId,
}: ConnectTelegramInput) => {
  await db.insert(telegram).values({
    telegramId,
    userId,
  });

  return { status: "success", userId };
};
