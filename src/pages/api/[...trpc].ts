import { NextApiRequest, NextApiResponse } from "next";
import { createOpenApiNextHandler } from "trpc-openapi";

import { createContext } from "@/app/api/trpc/trpc.context";
import { appRouter } from "@/server/test-router";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return createOpenApiNextHandler({
    router: appRouter,
    createContext,
    onError: null,
    responseMeta: null,
  })(req, res);
};

export default handler;
