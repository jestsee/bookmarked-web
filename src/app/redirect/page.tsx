"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { ExclamationCircle } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc-client/trpc";

const _renderErrorAlert = (message?: string): ReactNode => {
  return (
    <>
      <Alert variant="destructive">
        <ExclamationCircle />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {message ?? "Failed to connect to Notion"}
        </AlertDescription>
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
  const router = useRouter();
  const { mutate, error } = trpc.connectToNotion.useMutation({
    onSuccess() {
      router.push("/dashboard");
    },
  });

  useEffect(() => {
    mutate({ code });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return _renderErrorAlert(error.message);

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
