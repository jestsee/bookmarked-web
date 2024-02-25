import bcrypt from "bcryptjs";
import { eq, getTableColumns, sql } from "drizzle-orm";
import CredentialsProvider from "next-auth/providers/credentials";

import db from "@/database/client";
import { users } from "@/database/schema";

const credentialsProvider = CredentialsProvider({
  name: "Email",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials.password) return null;

    const { emailVerified, ...restColumns } = getTableColumns(users);

    const [user] = await db
      .select(restColumns)
      .from(users)
      .where(eq(users.email, credentials.email));

    if (!user) return null;

    const { password: hashedPassword, ...userWithoutPassword } = user;

    const isPasswordMatch = await bcrypt.compare(
      credentials.password,
      hashedPassword!,
    );

    if (!isPasswordMatch) return null;

    return userWithoutPassword;
  },
});

export default credentialsProvider;
