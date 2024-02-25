import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import db from "@/database/client";

import credentialsProvider from "./credentials-provider";

const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  adapter: DrizzleAdapter(db) as NextAuthOptions["adapter"],
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    credentialsProvider,
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
