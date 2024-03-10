"use client";

import { useState } from "react";

import BookmarkForm from "./bookmark-form";
import BookmarkItem from "./bookmark-item";
import { ProcessedBookmark } from "./type";

const BookmarkContainer = () => {
  const [processed, setProcessed] = useState<ProcessedBookmark[]>([
    {
      id: "2",
      type: "thread",
      url: "https://ui.shadcn.com/docs/components/toggle-group#default",
    },
  ]);

  const processBookmark = (item: ProcessedBookmark) => {
    setProcessed((processedBookmarks) => [...processedBookmarks, item]);
  };

  return (
    <div className="space-y-12">
      <BookmarkForm {...{ processBookmark }} />
      {processed.length > 0 && (
        <div className="space-y-3">
          <p>Status</p>
          {processed.reverse().map((item) => (
            <BookmarkItem key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkContainer;
