import { LayoutProps } from "@/types/component";

import Navbar from "./navbar";

const AuthenticatedLayout = ({ children }: LayoutProps) => {
  return (
    <main className="flex h-screen items-center justify-center">
      <Navbar />
      <div>{children}</div>
    </main>
  );
};

export default AuthenticatedLayout;
