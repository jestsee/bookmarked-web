import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// alternative: using getToken; cons: need to pass req:NextRequest
// references: https://create.t3.gg/en/usage/next-auth, https://next-auth.js.org/configuration/nextjs#getserversession
const deserializeUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return { user: null };

  return { user: session?.user };
};

export const createContext = async () => deserializeUser();

export type Context = Awaited<ReturnType<typeof createContext>>;
