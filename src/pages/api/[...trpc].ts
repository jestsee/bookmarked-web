import { TRPCError } from "@trpc/server";
import { NextApiRequest, NextApiResponse } from "next";
import { DefaultUser } from "next-auth";
import { getToken } from "next-auth/jwt";
import { createOpenApiNextHandler } from "trpc-openapi";

import { appRouter } from "@/server/test-router";

type CreeateOpenAPIContext = {
  user: DefaultUser & { id: string };
};

const createOpenAPIContext = async (
  req: NextApiRequest,
): Promise<CreeateOpenAPIContext> => {
  const token = await getToken({ req });
  console.log(token);

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
    createContext: () => createOpenAPIContext(req),
    router: appRouter,
    onError: null,
    responseMeta: null,
  })(req, res);
};

export default handler;
