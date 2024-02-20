import { object, string, TypeOf } from "zod";

import { Input } from "@/types/server";

export const createAccessTokenPayload = object({
  code: string({ required_error: "Code is required" }).min(
    1,
    "Code is required",
  ),
});

export const createAccessTokenResponse = object({
  access_token: string(),
});

export const getDatabaseIdResponse = object({
  id: string(),
});

export const bookmarkPayload = object({
  url: string().url(),
});

export const bookmarkResponse = object({
  message: string(),
});

export type User = {
  userId: string;
};

export type CreateAccessTokenPayload = TypeOf<typeof createAccessTokenPayload>;

export type CreateAccessTokenResponse = TypeOf<
  typeof createAccessTokenResponse
>;

export type DatabaseIdResponse = TypeOf<typeof getDatabaseIdResponse>;

export type ConnectToNotionPayload = Input<CreateAccessTokenPayload> & User;

export type BookmarkPayload = TypeOf<typeof bookmarkPayload>;

export type BookmarkTweetPayload = Input<BookmarkPayload> & User;

export type BookmarkResponse = TypeOf<typeof bookmarkResponse>;
