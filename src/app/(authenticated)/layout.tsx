import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { LayoutProps } from "@/types/component";

import Navbar from "./navbar";

const AuthenticatedLayout = async ({ children }: LayoutProps) => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  return (
    // TODO set max width so the navbar won't offside to the right when user using ultrawide monitor
    <main className="flex h-screen max-w-4xl items-center justify-center">
      <Navbar user={session.user} />
      <div>{children}</div>
    </main>
  );
};

export default AuthenticatedLayout;
