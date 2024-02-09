import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import db from "@/database/client";

import credentialsProvider from "./credentials-provider";

const handler = NextAuth({
  session: { strategy: "jwt" },
  adapter: DrizzleAdapter(db) as NextAuthOptions["adapter"],
  providers: [
    credentialsProvider,
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
});

export { handler as GET, handler as POST };
