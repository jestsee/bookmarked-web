import bcrypt from "bcryptjs";
import { getTableColumns } from "drizzle-orm";

import db from "@/database/client";
import { users } from "@/database/schema";
import { CreateUserInput } from "@/schema/user";

export const registerHandler = async ({
  input,
}: {
  input: CreateUserInput;
}) => {
  const hashedPassword = await bcrypt.hash(input.password, 12);

  const { password, ...rest } = getTableColumns(users);
  const user = await db
    .insert(users)
    .values({ ...input, password: hashedPassword, id: crypto.randomUUID() })
    .returning(rest);

  return { status: "success", data: { user } };

  // TODO register with registered email
};
