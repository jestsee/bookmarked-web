import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import db from "@/database/client";

import credentialsProvider from "./credentials-provider";

export const authOptions: NextAuthOptions = {
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
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
