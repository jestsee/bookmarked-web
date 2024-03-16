import {
  DefaultErrorShape,
  ErrorFormatter,
} from "@trpc/server/unstable-core-do-not-import";

import { Context } from "../trpc.context";
import databaseErrors from "./database";
import { AtLeastTwoElements } from "./type";

const splitError = (rawMessage: string) => {
  const regexPattern = /"([^"]+)"/;
  const parts = rawMessage.split(regexPattern);
  return parts.map((part) => part.trim());
};

const isAtLeastTwoElementsInArray = <T>(
  array: T[],
): array is AtLeastTwoElements<T> => array.length >= 2;

const errorFormatter: ErrorFormatter<Context, DefaultErrorShape> = ({
  shape,
  error: { message: errorMessage },
}) => {
  const result = splitError(errorMessage);
  if (!isAtLeastTwoElementsInArray(result)) return shape;

  const [dbErrorKey, errorMessageKey] = result;
  const message = (databaseErrors[dbErrorKey] ?? {})[errorMessageKey];

  return { ...shape, ...(message && { message }) };
};

export default errorFormatter;
