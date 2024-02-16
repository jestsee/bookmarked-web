import { Layout } from "@/types";

import Navbar from "./_navbar";

const AuthenticatedLayout = ({ children }: Layout) => {
  return (
    <main>
      <Navbar />
      <div>{children}</div>
    </main>
  );
};

export default AuthenticatedLayout;
