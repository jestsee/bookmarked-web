import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { serverErrorSchema } from "@/types/server";

export const validateResponse = async <T extends z.ZodRawShape>(
  response: Response,
  schema: z.ZodObject<T>,
): Promise<z.TypeOf<typeof schema>> => {
  const data = await response.json();

  if (!response.ok) {
    const parsedError = serverErrorSchema.parse(data);
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: Array.isArray(parsedError.message)
        ? parsedError.message[0]
        : parsedError.message ?? "Something went wrong",
    });
  }

  return schema.parse(data);
};
