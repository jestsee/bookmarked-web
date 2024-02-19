import { getTableColumns } from "drizzle-orm";
import jwt from "jsonwebtoken"; // TODO remove this package?
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

import db from "@/database/client";
import { users } from "@/database/schema";

export const _deserializeUser = async () => {
  const cookieStore = cookies();
  let token;
  const tokenStored = cookieStore.get("next-auth.session-token");

  if (tokenStored) {
    token = tokenStored.value;
  }

  const notAuthenticated = { user: null };
  if (!token) return notAuthenticated;

  const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
  if (!decoded) return notAuthenticated;

  const { emailVerified, password, ...rest } = getTableColumns(users);
  const [user] = await db.select(rest).from(users).limit(1);

  return { user };
};

// TODO user object need to have property id, notion accessToken and databaseId

export const deserializeUser = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token || !token.sub) {
    return { user: null };
  }

  const { picture: image, sub: id, ...rest } = token;
  return { user: { ...rest, image, id } };
};
