import { getTableColumns } from "drizzle-orm";
import jwt from "jsonwebtoken"; // TODO remove package
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import db from "@/database/client";
import { users } from "@/database/schema";

export const _deserializeUser = async () => {
  const cookieStore = cookies();
  let token;
  const tokenStored = cookieStore.get("next-auth.session-token");
  console.log("masuk kah", { tokenStored });

  if (tokenStored) {
    token = tokenStored.value;
  }

  const notAuthenticated = { user: null };
  if (!token) return notAuthenticated;

  const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
  console.log({ decoded });
  if (!decoded) return notAuthenticated;

  const { emailVerified, password, ...rest } = getTableColumns(users);
  const [user] = await db.select(rest).from(users).limit(1);

  return { user };
};

export const deserializeUser = async (request: NextRequest) => {
  const session = await getServerSession(request);

  console.log("masok", { session });
  if (!session || !session.user) {
    return { user: null };
  }

  // TODO user object need to have property id, notion accessToken and databaseId

  return { user: session.user };
};
