import { Session } from "next-auth";

export type User = Exclude<Session["user"], undefined>;
