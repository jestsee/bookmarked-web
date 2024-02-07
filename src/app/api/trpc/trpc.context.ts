import { inferAsyncReturnType } from "@trpc/server";

import { deserializeUser } from "../../server/auth.middleware";

export const createContext = async () => deserializeUser();

export type Context = inferAsyncReturnType<typeof createContext>;
