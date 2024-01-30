import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import db from "@/database/client";

const handler = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GithubProvider({clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET})
  ],
})

export { handler as GET, handler as POST };

