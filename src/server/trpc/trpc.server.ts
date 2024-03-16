import { initTRPC, TRPCError } from "@trpc/server";
import SuperJSON from "superjson";
import { OpenApiMeta } from "trpc-openapi";

import errorFormatter from "./errors";
import { Context } from "./trpc.context";

export const t = initTRPC.context<Context>().meta<OpenApiMeta>().create({
  transformer: SuperJSON,
  errorFormatter,
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
export const protectedProcedure = publicProcedure.use(isAuthenticated);
