import type { AdapterAccount } from "@auth/core/adapters";
import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").unique().notNull(),
  password: text("password"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const notion = pgTable(
  "notion",
  {
    accessToken: text("accessToken").notNull(),
    databaseId: text("databaseId").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.databaseId, vt.userId] }),
  }),
);

// social media account which connected
export const socialMediaAccountProviderEnum = pgEnum("accountProvider", [
  "telegram",
]);

export const connectedAccount = pgTable(
  "connectedAccount",
  {
    accountId: text("accountId").notNull(),
    accountProvider:
      socialMediaAccountProviderEnum("accountProvider").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    session: text("session"),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.accountId, vt.accountProvider] }),
  }),
);

// export const tokenExchange = pgTable("tokenExchange", {
//   temporaryToken: text("temporaryToken").notNull().primaryKey(),
//   userId: text("userId")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   accessToken: text("accessToken").notNull(),
//   createdAt: timestamp("createdAt").defaultNow().notNull(),
//   expiresAt: timestamp("expiresAt")
//     .default(sql`NOW() + INTERVAL '5 minutes'`)
//     .notNull(),
//   invoked: boolean("invoked").default(false),
// });
