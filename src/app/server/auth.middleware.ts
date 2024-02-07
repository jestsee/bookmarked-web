import { TRPCError } from "@trpc/server";
import { getTableColumns } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import db from "@/database/client";
import { users } from "@/database/schema";

export const deserializeUser = async () => {
  const cookieStore = cookies();
  try {
    let token;
    const tokenStored = cookieStore.get("token");

    if (tokenStored) {
      token = tokenStored.value;
    }

    const notAuthenticated = { user: null };
    if (!token) return notAuthenticated;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return notAuthenticated;

    const { emailVerified, password, ...rest } = getTableColumns(users);
    const [user] = await db.select(rest).from(users).limit(1);

    return { user };
  } catch (error: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message ?? "Something went wrong",
    });
  }
};
// TODO create middleware for error handler
