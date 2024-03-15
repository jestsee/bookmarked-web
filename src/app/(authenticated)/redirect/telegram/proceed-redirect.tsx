"use client";

import { useEffect } from "react";

import { trpc } from "@/trpc-client/trpc";

import CustomError from "../custom-error";

interface Props {
  bot: string;
  telegramId: string;
}

// TODO refactor so only one ProceedRedirect component will be used
const ProceedRedirect = ({ bot, telegramId }: Props) => {
  const { mutate, error } = trpc.connectToTelegram.useMutation({
    onSuccess({ token }) {
      const redirectUrl = `https://t.me/${bot}?start=${token}`;
      window.location.href = redirectUrl;
    },
  });

  useEffect(() => {
    mutate({ telegramId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <CustomError message={error.message} />;

  return (
    <p>You will be redirect automatically if this process is successful</p>
  );
};

export default ProceedRedirect;
