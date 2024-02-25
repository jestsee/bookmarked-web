"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CreateUserInput, createUserSchema } from "@/server/auth/auth.schema";
import { trpc } from "@/trpc-client/trpc";

import CustomAlert from "../custom-alert";
import CustomForm from "../custom-form";
import { FieldConfig } from "../type";

const fieldConfigs: FieldConfig<CreateUserInput>[] = [
  { name: "name", label: "Name", placeholder: "John Doe" },
  { name: "email", label: "Email", placeholder: "example@gmail.com" },
  { name: "password", label: "Password", isPassword: true },
  { name: "passwordConfirm", label: "Confirm password", isPassword: true },
];

const RegisterForm = () => {
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { email: "", name: "", password: "", passwordConfirm: "" },
  });
  const { handleSubmit } = form;
  const { mutate, error, isPending } = trpc.registerUser.useMutation({
    onSuccess() {
      toast.success("Successfully signed up!");
    },
  });

  const onSubmit = handleSubmit((values) => mutate(values));

  return (
    <Form {...form}>
      <form {...{ onSubmit }} className="w-[400px] space-y-4">
        {error && <CustomAlert message={error.message} />}
        {fieldConfigs.map((fieldConfig) => (
          <CustomForm key={fieldConfig.name} {...{ form, ...fieldConfig }} />
        ))}
        <p>
          Already have an account? <Link href="/sign-in">Sign in</Link>
        </p>
        <Button loading={isPending}>Sign up</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
