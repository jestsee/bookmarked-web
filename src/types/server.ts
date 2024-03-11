import { z } from "zod";

export type Input<T> = {
  input: T;
};

export const serverErrorSchema = z.object({
  message: z.union([z.string(), z.string().array()]),
  error: z.string().optional(),
  statusCode: z.number().optional(),
});

export type ServerError = z.TypeOf<typeof serverErrorSchema>;
