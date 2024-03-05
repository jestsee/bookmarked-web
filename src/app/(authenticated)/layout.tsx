import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { LayoutProps } from "@/types/component";

import UserInfo from "./components/user-info";

const AuthenticatedLayout = async ({ children }: LayoutProps) => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  return (
    <main className="relative">
      <UserInfo user={session.user} />
      <div className="pt-32">{children}</div>
    </main>
  );
};

export default AuthenticatedLayout;
