import { UseFormReturn } from "react-hook-form";

import { CreateUserInput } from "@/schema/user";

export interface RenderFormProps {
  form: UseFormReturn<CreateUserInput>;
  name: FieldType;
  label: string;
  placeholder?: string;
  isPassword?: boolean;
}

export type FieldType = keyof CreateUserInput;

export type FieldConfig = Omit<RenderFormProps, "form">;
