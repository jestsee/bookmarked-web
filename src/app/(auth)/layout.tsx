import { LayoutProps } from "@/types";

const AuthenticationLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      Authentication Layout
      <div>{children}</div>
    </div>
  );
};

export default AuthenticationLayout;
