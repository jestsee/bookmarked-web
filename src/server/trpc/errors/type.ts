export type ErrorMessages = {
  [key: string]: { [key: string]: string };
};

export type AtLeastTwoElements<T> = [T, T, ...T[]];
