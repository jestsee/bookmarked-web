"use client";

import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

const SignOut = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => signOut(),
  });

  return (
    <Button loading={isPending} onClick={() => mutate()}>
      Sign Out
    </Button>
  );
};

export default SignOut;
