import { z } from "zod";

import { Input, User } from "@/types/server";

export const connectToTelegramPayload = z.object({
  telegramId: z
    .string({ required_error: "User's telegram id is required" })
    .min(1, "User's telegram id is required"),
});

export type ConnectTelegramPayload = z.TypeOf<typeof connectToTelegramPayload>;

export type ConnectTelegramInput = Input<ConnectTelegramPayload> & User;
