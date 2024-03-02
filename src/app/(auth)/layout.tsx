import Link from "next/link";
import { getProviders } from "next-auth/react";
import { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LayoutProps } from "@/types";

import AuthProviderButton from "./auth-provider-button";

interface Props extends LayoutProps {
  header: ReactNode;
  footer: ReactNode;
}

const AuthenticationLayout = async ({ children, header, footer }: Props) => {
  const providers = await getProviders();

  return (
    <div className="absolute left-1/2 top-1/2 w-[420px] -translate-x-1/2 -translate-y-1/2">
      <Card>
        <CardHeader className="text-center">
          {header}
          <CardTitle className="mb-1 mt-4 font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Don&apos;t have an account yet?&nbsp;
            <Link
              className="font-semibold underline-offset-2 hover:underline"
              href="/sign-up"
            >
              Sign up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <Separator className="mb-2 gap-3">
          <p className="text-sm uppercase">or</p>
        </Separator>
        <CardFooter className="space-x-3">
          {Object.values(providers ?? []).map((provider) => {
            return (
              provider.id !== "credentials" && (
                <AuthProviderButton {...{ provider }} />
              )
            );
          })}
        </CardFooter>
        {footer}
      </Card>
    </div>
  );
};

export default AuthenticationLayout;
