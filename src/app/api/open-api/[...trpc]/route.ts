import { NextApiRequest, NextApiResponse } from "next";
import { createOpenApiNextHandler } from "trpc-openapi";

import { createContext } from "../../trpc/trpc.context";
import { appRouter } from "../test-router";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("masok sini gann");
  return createOpenApiNextHandler({
    router: appRouter,
    createContext,
    responseMeta: null,
    onError: null,
  })(req, res);
};

export { handler as GET, handler as POST };
