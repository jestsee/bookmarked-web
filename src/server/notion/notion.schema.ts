import { z } from "zod";

import { Input, User } from "@/types/server";

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

export const bookmarkTypeEnum = z.enum(["tweet", "thread"]);

export const bookmarkPayload = z.object({
  url: z
    .string()
    .url({ message: "Must be a valid tweet URL" })
    .refine(
      (url) => {
        const validUrlRegex = /^(https?:\/\/)?(www\.)?(twitter|x)\.com\//;
        return validUrlRegex.test(url);
      },
      { message: "Must be a valid tweet URL" },
    ),
  type: bookmarkTypeEnum.default("thread"),
  callbackUrl: z.string().url().optional(),
});

export const bookmarkResponse = z.object({
  id: z.string(),
});

export const bookmarkOutput = bookmarkPayload
  .merge(bookmarkResponse)
  .merge(z.object({ author: z.string() }));

export const getBookmarkStatusPayload = bookmarkResponse;

export const bookmarkStatus = z.enum(["completed", "on_progress", "failed"]);

export const getBookmarkStatusResponse = z.object({
  status: bookmarkStatus,
  type: bookmarkTypeEnum,
  url: z.string(),
  message: z.string().optional(),
});

export const retryBookmarkPayload = getBookmarkStatusPayload;

export const retryBookmarkStatusResponse = z.object({
  message: z.union([z.string(), z.string().array()]),
  error: z.string().optional(),
  statusCode: z.number().optional(),
});

export type CreateAccessTokenPayload = z.TypeOf<
  typeof createAccessTokenPayload
>;

export type CreateAccessTokenResponse = z.TypeOf<
  typeof createAccessTokenResponse
>;

export type DatabaseIdResponse = z.TypeOf<typeof getDatabaseIdResponse>;

export type ConnectToNotionPayload = Input<CreateAccessTokenPayload> & User;

export type BookmarkType = z.TypeOf<typeof bookmarkTypeEnum>;

export type BookmarkPayload = z.TypeOf<typeof bookmarkPayload>;

export type BookmarkTweetPayload = Input<BookmarkPayload> & User;

export type BookmarkResponse = z.TypeOf<typeof bookmarkResponse>;

export type BookmarkOutput = z.TypeOf<typeof bookmarkOutput>;

export type BookmarkStatus = z.TypeOf<typeof bookmarkStatus>;

export type GetBookmarkStatusPayload = z.TypeOf<
  typeof getBookmarkStatusPayload
>;

export type GetBookmarkStatusResponse = z.TypeOf<
  typeof getBookmarkStatusResponse
>;

export type RetryBookmarkPayload = z.TypeOf<typeof retryBookmarkPayload>;
