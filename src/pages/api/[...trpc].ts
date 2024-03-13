import { TRPCError } from "@trpc/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { createOpenApiNextHandler } from "trpc-openapi";

import { appRouter } from "@/server/test-router";

const createContext = async (req: NextApiRequest) => {
  const token = await getToken({ req });

  if (!token || !token.sub) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in first",
    });
  }

  const { picture: image, sub: id, ...rest } = token;
  return { user: { ...rest, image, id } };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return createOpenApiNextHandler({
    createContext: () => createContext(req),
    router: appRouter,
    onError: null,
    responseMeta: null,
  })(req, res);
};

export default handler;
