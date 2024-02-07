import { initTRPC, TRPCError } from "@trpc/server";
import SuperJSON from "superjson";

import { Context } from "./trpc.context";

export const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

const isAuthenticated = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }
  return next();
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
