"use client";

import { Slot } from "@radix-ui/react-slot";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
}

const SignOutWrapper = ({ children }: Props) => {
  return (
    <Slot
      onClick={() =>
        toast.promise(signOut(), { loading: "Signing you out..." })
      }
    >
      {children}
    </Slot>
  );
};

export default SignOutWrapper;
