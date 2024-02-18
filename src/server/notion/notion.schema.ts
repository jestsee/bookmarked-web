import { object, string, TypeOf } from "zod";

export const createAccessTokenPayload = object({
  code: string({ required_error: "Code is required" }).min(
    1,
    "Code is required",
  ),
});

export const createAccessTokenResponse = object({
  access_token: string(),
});

export const databaseIdResponse = object({
  id: string(),
});

export type CreateAccessTokenPayload = TypeOf<typeof createAccessTokenPayload>;
export type CreateAccessTokenResponse = TypeOf<
  typeof createAccessTokenResponse
>;
export type DatabaseIdResponse = TypeOf<typeof databaseIdResponse>;
