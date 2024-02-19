"use client";

import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { ExclamationCircle } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc-client/trpc";

const _renderErrorAlert = (): ReactNode => {
  return (
    <>
      <Alert variant="destructive">
        <ExclamationCircle />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to connect to Notion</AlertDescription>
      </Alert>
      <Button asChild>
        <Link href={process.env.NEXT_PUBLIC_NOTION_AUTHORIZATION_URL}>
          Try again
        </Link>
      </Button>
    </>
  );
};

const _proceedRedirect = ({ code }: { code: string }): ReactNode => {
  const { mutate, error } = trpc.connectToNotion.useMutation({
    onSuccess() {
      redirect("/dashboard");
    },
  });

  useEffect(() => {
    mutate({ code });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <p>{JSON.stringify(error)}</p>;

  return (
    <p>You will be redirect automatically if this process is successful</p>
  );
};

const Redirect = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (error) return _renderErrorAlert();

  const code = searchParams.get("code");

  if (!code) return <p>The code does not exist</p>;

  return _proceedRedirect({ code });
};

export default Redirect;
