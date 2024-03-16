import { TRPCError } from "@trpc/server";
import { NextApiRequest, NextApiResponse } from "next";
import { DefaultUser } from "next-auth";
import { getToken } from "next-auth/jwt";
import { createOpenApiNextHandler } from "trpc-openapi";

import { appRouter } from "@/server/trpc/trpc.router";

type CreeateOpenAPIContext = {
  user: (DefaultUser & { id: string }) | null;
};

const publicRoutes = ["/token"];

const createOpenAPIContext = async (
  req: NextApiRequest,
): Promise<CreeateOpenAPIContext> => {
  const isAccessingPublicRoute = publicRoutes.some((suffix) =>
    req.url?.includes(suffix),
  );
  if (isAccessingPublicRoute) return { user: null };

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
    createContext: () => createOpenAPIContext(req),
    router: appRouter,
    onError: null,
    responseMeta: null,
  })(req, res);
};

export default handler;
