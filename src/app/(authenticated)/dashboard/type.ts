import { BookmarkPayload } from "@/server/notion/notion.schema";

export interface ProcessedBookmark extends BookmarkPayload {
  id: string;
}
