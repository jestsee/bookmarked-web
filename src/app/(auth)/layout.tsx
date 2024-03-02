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
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full sm:w-[420px]">
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
    </div>
  );
};

export default AuthenticationLayout;
