import { Layout } from "@/types";

import Navbar from "./_navbar";

const AuthenticatedLayout = ({ children }: Layout) => {
  return (
    <div>
      <Navbar />
      <p>AuthenticatedLayout</p>
      <div>{children}</div>
    </div>
  );
};

export default AuthenticatedLayout;
