import { inferAsyncReturnType } from "@trpc/server";
import { NextRequest } from "next/server";

import { deserializeUser } from "../../../server/auth/auth.middleware";

export const createContext = async (request: NextRequest) =>
  deserializeUser(request);

export type Context = inferAsyncReturnType<typeof createContext>;
