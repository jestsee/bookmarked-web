import Link from "next/link";
import React from "react";

import { SimpleAlert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface Props {
  message?: string;
}

const CustomError = ({ message }: Props) => {
  return (
    <>
      <SimpleAlert
        variant="destructive"
        message={message ?? "Failed to connect to Notion"}
      />
      <Button asChild>
        <Link href={process.env.NEXT_PUBLIC_NOTION_AUTHORIZATION_URL}>
          Try again
        </Link>
      </Button>
    </>
  );
};

export default CustomError;
