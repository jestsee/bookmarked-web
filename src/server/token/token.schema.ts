import { z } from "zod";

export const tokenExchangePayload = z.object({
  token: z.string(),
});

export const tokenExchangeResponse = z.object({
  accessToken: z.string(),
});

export type TokenExchangePayload = z.TypeOf<typeof tokenExchangePayload>;
export type TokenExchangeResponse = z.TypeOf<typeof tokenExchangeResponse>;
