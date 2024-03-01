import { LayoutProps } from "@/types";

const AuthenticationLayout = ({ children }: LayoutProps) => {
  return (
    <div className="absolute left-1/2 top-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2">
      {children}
    </div>
  );
};

export default AuthenticationLayout;
