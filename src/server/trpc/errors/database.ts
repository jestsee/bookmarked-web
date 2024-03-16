import { ErrorMessages } from "./type";

export const databaseErrors = {
  "duplicate key value violates unique constraint": {
    // TODO telegram keyword is hardcoded, need to update it if add more account provider later
    connectedAccount_accountId_accountProvider_pk:
      "This telegram account is already connected to other Bookmarked account",
    user_email_unique: "User with this email already exist",
  },
};

export default databaseErrors as ErrorMessages;
