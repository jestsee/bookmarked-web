"use client";

import Link from "next/link";
import { useEffect } from "react";

import { SimpleAlert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc-client/trpc";

interface Props {
  bot: string;
  telegramId: string;
}

const ProceedRedirect = ({ bot, telegramId }: Props) => {
  const { mutate, error } = trpc.connectToTelegram.useMutation({
    onSuccess({ status }) {
      const redirectUrl = `https://t.me/${bot}?start=${status}`;
      window.location.href = redirectUrl;
    },
  });

  useEffect(() => {
    mutate({ telegramId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error)
    return (
      <div className="space-y-6">
        <SimpleAlert
          variant="destructive"
          message={error.message ?? "Failed to connect to Notion"}
        />
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    );

  return (
    <p>You will be redirect automatically if this process is successful</p>
  );
};

export default ProceedRedirect;
