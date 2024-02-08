import authRouter from "@/server/auth.route";

import { createContext } from "./trpc.context";
import { t } from "./trpc.server";

export const appRouter = t.mergeRouters(authRouter);

export const createCaller = t.createCallerFactory(appRouter);

export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
