import { getProviders } from "next-auth/react";
import { Path, UseFormReturn } from "react-hook-form";

import { CreateUserInput } from "@/server/auth/auth.schema";

export interface RenderFormProps<T extends FormInput> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  isPassword?: boolean;
}

export type FormInput = Partial<CreateUserInput>;

export type FieldConfig<T extends FormInput> = Omit<RenderFormProps<T>, "form">;

export type AuthProviders = Awaited<ReturnType<typeof getProviders>>;
