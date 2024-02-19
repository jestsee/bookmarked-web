import { z } from "zod";

export type Input<T> = {
  input: T;
};

export const serverErrorSchema = z.object({
  message: z.string().optional(),
  error: z.string().optional(),
  statusCode: z.number(),
});

export type ServerError = z.TypeOf<typeof serverErrorSchema>;
