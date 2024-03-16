import { databaseErrors } from "./database";

export type ErrorMessages = {
  [key: string]: { [key: string]: string };
};

export type AtLeastTwoElements<T> = [T, T, ...T[]];

export type CustomDbError = keyof typeof databaseErrors;

export type CustomDbPropertyError =
  keyof (typeof databaseErrors)[CustomDbError];
