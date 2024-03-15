import { NextApiRequest, NextApiResponse } from "next";
import { generateOpenApiDocument } from "trpc-openapi";

import { appRouter } from "@/server/test-router";

const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "tRPC OpenAPI",
  version: "1.0.0",
  baseUrl: "http://localhost:3000/api", // TODO
});

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send(openApiDocument);
};

export default handler;
