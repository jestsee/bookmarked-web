"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import BookmarkForm from "./bookmark-form";
import BookmarkItem from "./bookmark-item";
import { ProcessedBookmark } from "./type";
import useConnectionCount from "./useConnectionCount";

const BookmarkContainer = () => {
  const [processed, setProcessed] = useState<ProcessedBookmark[]>([]);
  const { isReachedMaxConnection, ...rest } = useConnectionCount();

  const processBookmark = (item: ProcessedBookmark) => {
    setProcessed((processedBookmarks) => [item, ...processedBookmarks]);
  };

  return (
    <div className="space-y-12">
      <BookmarkForm {...{ processBookmark, isReachedMaxConnection }} />
      {processed.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p>Status</p>
            <Button
              variant="link"
              className="text-emerald-400"
              onClick={() => setProcessed([])}
            >
              Clear all
            </Button>
          </div>
          {processed.map((item) => (
            <BookmarkItem key={item.id} id={item.id} {...rest} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkContainer;
