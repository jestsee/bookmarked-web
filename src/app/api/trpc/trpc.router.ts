import authRouter from "@/server/auth.route";

import { createContext } from "./trpc.context";
import { t } from "./trpc.server";

// TODO remove this
const healthCheckerRouter = t.router({
  healthchecker: t.procedure.query(() => {
    return {
      status: "success",
      message: "Welcome to trpc with Next.js 14 and React Query",
    };
  }),
});

export const appRouter = t.mergeRouters(healthCheckerRouter, authRouter);

export const createCaller = t.createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
