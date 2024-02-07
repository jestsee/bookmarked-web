import { publicProcedure, t } from "@/app/api/trpc/trpc.server";
import { createUserSchema } from "@/schema/user";

import { registerHandler } from "./auth.controller";

const authRouter = t.router({
  registerUser: publicProcedure
    .input(createUserSchema)
    .mutation(({ input }) => registerHandler({ input })),
});

export default authRouter;
