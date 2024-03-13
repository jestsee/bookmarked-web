import { z } from "zod";

import { t } from "../trpc/trpc.server";

export const appRouter = t.router({
  sayHello: t.procedure
    .meta({ /* 👉 */ openapi: { method: "GET", path: "/say-hello" } })
    .input(z.object({ name: z.string() }))
    .output(z.object({ greeting: z.string() }))
    .query(() => {
      return { greeting: `Hello gan!` };
    }),
});
