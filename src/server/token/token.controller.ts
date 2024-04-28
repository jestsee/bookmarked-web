// import { TRPCError } from "@trpc/server";
// import { eq, getTableColumns } from "drizzle-orm";

// import db from "@/database/client";
// import { tokenExchange } from "@/database/schema";

// import { TokenExchangePayload } from "./token.schema";

// export const tokenExchangeHandler = async ({ token }: TokenExchangePayload) => {
//   // get token
//   const { accessToken, expiresAt, invoked } = getTableColumns(tokenExchange);
//   const [result] = await db
//     .select({ accessToken, expiresAt, invoked })
//     .from(tokenExchange)
//     .where(eq(tokenExchange.temporaryToken, token));

//   if (!result) {
//     throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token" });
//   }

//   // check whether token has invoked
//   if (result.invoked) {
//     throw new TRPCError({
//       code: "UNAUTHORIZED",
//       message: "Token has already invoked",
//     });
//   }

//   // check if token already expired
//   if (result.expiresAt.getTime() < new Date().getTime()) {
//     throw new TRPCError({
//       code: "UNAUTHORIZED",
//       message: "The access token has expired. Please log in again.",
//     });
//   }

//   await db
//     .update(tokenExchange)
//     .set({ invoked: true })
//     .where(eq(tokenExchange.temporaryToken, token));

//   return { accessToken: result.accessToken };
// };
