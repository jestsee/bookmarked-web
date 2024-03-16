import { ErrorMessages } from "./type";

export const databaseErrors: ErrorMessages = {
  "duplicate key value violates unique constraint": {
    // TODO telegram keyword is hardcoded, need to update it if add more account provider later
    connectedAccount_accountId_accountProvider_pk:
      "This telegram account is already connected",
    user_email_unique: "Email already exist",
  },
};
