import { protectedProcedure, t } from "@/server/trpc/trpc.server";

import { connectToTelegramHandler } from "./telegram.controller";
import { connectToTelegramPayload } from "./telegram.schema";

const telegramRouter = t.router({
  connectToTelegram: protectedProcedure
    .input(connectToTelegramPayload)
    .mutation(({ input, ctx }) =>
      connectToTelegramHandler({ input, userId: ctx.user?.id! }),
    ),
});

export default telegramRouter;
