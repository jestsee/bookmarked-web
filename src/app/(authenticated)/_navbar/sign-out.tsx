"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const SignOut = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => signOut({ redirect: false }),
    onSuccess: () => {
      toast.success("Successfully signed out");
      router.push("/sign-in");
    },
  });

  return (
    <Button loading={isPending} onClick={() => mutate()}>
      Sign Out
    </Button>
  );
};

export default SignOut;
