import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql as NeonQueryFunction<boolean, boolean>);

export default db;
