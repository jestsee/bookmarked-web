import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

import { createContext } from "../trpc.context";
import { appRouter } from "../trpc.router";

const handler = (request: NextRequest) => {
  console.log("loh masoknya yang ini");
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext,
  });
};

export { handler as GET, handler as POST };
