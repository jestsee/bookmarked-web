"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import BookmarkForm from "./bookmark-form";
import BookmarkItem from "./bookmark-item";

interface Props {
  isConnectedToNotion: boolean;
}

const BookmarkContainer = ({ isConnectedToNotion }: Props) => {
  const [processedBookmarkIds, setProcessedBookmarkIds] = useState<string[]>(
    [],
  );

  const addBookmarkId = (url: string) => {
    setProcessedBookmarkIds((urls) => [...urls, url]);
  };

  if (!isConnectedToNotion)
    return (
      <Button asChild>
        <Link href={process.env.NEXT_PUBLIC_NOTION_AUTHORIZATION_URL}>
          Connect to Notion
        </Link>
      </Button>
    );

  return (
    <div>
      <p>Connected to Notion ✅</p>
      <BookmarkForm {...{ addBookmarkId }} />
      {processedBookmarkIds.map((id) => (
        <BookmarkItem key={id} {...{ id }} />
      ))}
    </div>
  );
};

export default BookmarkContainer;
