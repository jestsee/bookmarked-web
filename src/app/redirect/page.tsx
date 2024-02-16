"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { ExclamationCircle } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const _renderErrorAlert = () => {
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

const Redirect = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) return;
  }, [error]);

  if (error) return _renderErrorAlert();

  /**
   * 1. sign up/ sign in dulu (next auth?)
   * 2. connect do notion -> pake useEffect langsung simpan code nya di db (hit API nest js)
   * 3. ...
   */

  return (
    <>
      <p>{code}</p>
      <div>Redirect</div>
    </>
  );
};

export default Redirect;
