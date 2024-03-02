import { getProviders } from "next-auth/react";
import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LayoutProps } from "@/types";

import AuthProviderButton from "./components/auth-provider-button";

interface Props extends LayoutProps {
  header: ReactNode;
}

const AuthenticationLayout = async ({ children, header }: Props) => {
  const providers = await getProviders();

  return (
    <Card className="absolute left-1/2 top-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2">
      <CardHeader className="text-center">{header}</CardHeader>
      <CardContent>{children}</CardContent>
      <Separator className="mb-2 gap-3">
        <p className="text-sm uppercase">or</p>
      </Separator>
      <CardFooter className="space-x-3">
        {Object.values(providers ?? []).map((provider) => {
          return (
            provider.id !== "credentials" && (
              <AuthProviderButton key={provider.id} {...{ provider }} />
            )
          );
        })}
      </CardFooter>
    </Card>
  );
};

export default AuthenticationLayout;
