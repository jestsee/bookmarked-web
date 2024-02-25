"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoginUserInput, loginUserSchema } from "@/server/auth/auth.schema";

import CustomForm from "../custom-form";
import { FieldConfig } from "../type";

const fieldConfigs: FieldConfig<LoginUserInput>[] = [
  { name: "email", label: "Email" },
  { name: "password", label: "Password", isPassword: true },
];

const LoginForm = () => {
  const form = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (input: LoginUserInput) => signIn("credentials", input),
  });

  const { handleSubmit } = form;
  const onSubmit = handleSubmit((values) => mutate(values));

  return (
    <div>
      <Form {...form}>
        <form {...{ onSubmit }}>
          {fieldConfigs.map((fieldConfig) => (
            <CustomForm key={fieldConfig.name} {...{ form, ...fieldConfig }} />
          ))}
          <p>
            Already have an account? <Link href="/sign-up">Sign up</Link>
          </p>
          <Button loading={isPending}>Sign in</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
