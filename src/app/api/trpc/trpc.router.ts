import authRouter from "@/server/auth/auth.router";
import notionRouter from "@/server/notion/notion.router";
import telegramRouter from "@/server/telegram/telegram.router";

import { createContext } from "./trpc.context";
import { t } from "./trpc.server";

export const appRouter = t.mergeRouters(
  authRouter,
  notionRouter,
  telegramRouter,
);

export const createCaller = t.createCallerFactory(appRouter);

// for server components
export const createAsyncCaller = async () => {
  const context = await createContext();
  return createCaller(context);
};

export type AppRouter = typeof appRouter;
