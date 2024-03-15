import { publicProcedure, t } from "@/server/trpc/trpc.server";

import { tokenExchangeHandler } from "./token.controller";
import { tokenExchangePayload, tokenExchangeResponse } from "./token.schema";

export const tokenRouter = t.router({
  tokenExchange: publicProcedure
    .input(tokenExchangePayload)
    .output(tokenExchangeResponse)
    .query(({ input }) => tokenExchangeHandler(input)),
});
