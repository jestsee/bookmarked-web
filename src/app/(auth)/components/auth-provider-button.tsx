"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

import { AuthIcons } from "./auth-icons";

interface Props {
  provider: ClientSafeProvider;
}

const AuthProviderButton = ({ provider }: Props) => {
  const Icon = AuthIcons[provider.id] ?? `Sign in with ${provider.name}`;
  return (
    <Button
      variant="outline"
      className="w-full py-5"
      key={provider.name}
      onClick={() => signIn(provider.id)}
    >
      <Icon className="h-6 w-6" />
    </Button>
  );
};

export default AuthProviderButton;
