import Link from "next/link";
import React from "react";

import { SimpleAlert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface Props {
  message?: string;
}

const CustomError = ({ message }: Props) => {
  return (
    <div className="space-y-6">
      <SimpleAlert
        variant="destructive"
        message={message ?? "Failed to connect to Notion"}
      />
      <Button asChild>
        <Link href="/connect-to-notion">Try again</Link>
      </Button>
    </div>
  );
};

export default CustomError;
