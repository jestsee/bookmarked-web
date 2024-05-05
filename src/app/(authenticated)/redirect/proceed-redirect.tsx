"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { trpc } from "@/trpc-client/trpc";

import CustomError from "./custom-error";

interface Props {
  code: string;
  state?: string;
}

const ProceedRedirect = ({ code, state }: Props) => {
  const router = useRouter();
  const { mutate, error } = trpc.connectToNotion.useMutation({
    onSuccess() {
      if (state) {
        return router.push(state);
      }

      router.push("/");
    },
  });

  useEffect(() => {
    mutate({ code });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <CustomError message={error.message} />;

  return (
    <p>You will be redirect automatically if this process is successful</p>
  );
};

export default ProceedRedirect;
