import { BookmarkOutput } from "@/server/notion/notion.schema";

export interface ProcessedBookmark extends BookmarkOutput {}

export enum STATUS {
  SCRAPING = "scraping",
  SCRAPED = "scraped",
  BOOKMARKED = "bookmarked",
}

export type BookmarkStatusData = {
  id: string;
  length: number;
  name: string;
  text: string;
  url: string;
  username: string;
};

export type BookmarkStatus =
  | ({
      status: STATUS.SCRAPING;
    } & BookmarkStatusData)
  | {
      status: STATUS.SCRAPED;
      id: string;
      message: string;
    }
  | {
      status: STATUS.BOOKMARKED;
      id: string;
      message: string;
      notionPageUrl: string;
    };

export type EventData = BookmarkStatusData & {
  status: STATUS;
  message?: string;
  notionPageUrl?: string;
};
