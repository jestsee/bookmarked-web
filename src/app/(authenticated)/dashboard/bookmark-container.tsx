"use client";

import { useState } from "react";

import BookmarkForm from "./bookmark-form";
import BookmarkItem from "./bookmark-item";
import { ProcessedBookmark } from "./type";

const BookmarkContainer = () => {
  const [processed, setProcessed] = useState<ProcessedBookmark[]>([]);

  const processBookmark = (item: ProcessedBookmark) => {
    setProcessed((processedBookmarks) => [...processedBookmarks, item]);
  };

  return (
    <div>
      <BookmarkForm {...{ processBookmark: processBookmark }} />
      {processed.map((item) => (
        <BookmarkItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default BookmarkContainer;
