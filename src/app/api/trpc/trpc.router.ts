import authRouter from "@/server/auth/auth.router";
import notionRouter from "@/server/notion/notion.router";

import { t } from "./trpc.server";

export const appRouter = t.mergeRouters(authRouter, notionRouter);

export const createCaller = t.createCallerFactory(appRouter);

// TODO what for?
// export const createAsyncCaller = async () => {
//   const context = await createContext();
//   return createCaller(context);
// };

export type AppRouter = typeof appRouter;
