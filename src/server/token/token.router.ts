import { publicProcedure, t } from "@/server/trpc/trpc.server";

import { tokenExchangeHandler } from "./token.controller";
import { tokenExchangePayload, tokenExchangeResponse } from "./token.schema";

export const tokenRouter = t.router({
  tokenExchange: publicProcedure
    .meta({ openapi: { method: "POST", path: "/token" } })
    .input(tokenExchangePayload)
    .output(tokenExchangeResponse)
    .mutation(({ input }) => tokenExchangeHandler(input)),
});
