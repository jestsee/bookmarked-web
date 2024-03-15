import { createUserSchema } from "@/server/auth/auth.schema";
import { publicProcedure, t } from "@/server/trpc/trpc.server";

import { registerHandler } from "./auth.controller";

const authRouter = t.router({
  registerUser: publicProcedure
    .input(createUserSchema)
    .mutation(({ input }) => registerHandler({ input })),
});

export default authRouter;
