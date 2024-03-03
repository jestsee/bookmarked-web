import { z } from "zod";

import { Input } from "@/types/server";

export const createAccessTokenPayload = z.object({
  code: z
    .string({ required_error: "Code is required" })
    .min(1, "Code is required"),
});

export const createAccessTokenResponse = z.object({
  access_token: z.string(),
});

export const getDatabaseIdResponse = z.object({
  id: z.string(),
});

export const bookmarkPayload = z.object({
  url: z.string().url(),
  type: z.enum(["tweet", "thread"]).default("thread"),
});

export const bookmarkResponse = z.object({
  id: z.string(),
});

export const getBookmarkStatusPayload = bookmarkResponse;

export const getBookmarkStatusResponse = z.object({
  status: z.enum(["completed", "on_progress", "failed"]),
  type: z.enum(["tweet", "thread"]),
  url: z.string(),
  message: z.string().optional(),
});

export type User = {
  userId: string;
};

export type CreateAccessTokenPayload = z.TypeOf<
  typeof createAccessTokenPayload
>;

export type CreateAccessTokenResponse = z.TypeOf<
  typeof createAccessTokenResponse
>;

export type DatabaseIdResponse = z.TypeOf<typeof getDatabaseIdResponse>;

export type ConnectToNotionPayload = Input<CreateAccessTokenPayload> & User;

export type BookmarkPayload = z.TypeOf<typeof bookmarkPayload>;

export type BookmarkTweetPayload = Input<BookmarkPayload> & User;

export type BookmarkResponse = z.TypeOf<typeof bookmarkResponse>;

export type GetBookmarkStatusPayload = z.TypeOf<
  typeof getBookmarkStatusPayload
>;

export type GetBookmarkStatusResponse = z.TypeOf<
  typeof getBookmarkStatusResponse
>;
