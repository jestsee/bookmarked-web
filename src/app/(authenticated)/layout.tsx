import { LayoutProps } from "@/types/component";

import Navbar from "./_navbar";

const AuthenticatedLayout = ({ children }: LayoutProps) => {
  return (
    <main>
      <Navbar />
      <div>{children}</div>
    </main>
  );
};

export default AuthenticatedLayout;
