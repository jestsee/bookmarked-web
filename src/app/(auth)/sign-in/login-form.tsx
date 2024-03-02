"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { TRPCError } from "@trpc/server";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoginUserInput, loginUserSchema } from "@/server/auth/auth.schema";

import CustomAlert from "../custom-alert";
import CustomForm from "../custom-form";
import { FieldConfig } from "../type";

const fieldConfigs: FieldConfig<LoginUserInput>[] = [
  { name: "email", label: "Email" },
  { name: "password", label: "Password", isPassword: true },
];

const LoginForm = () => {
  const form = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (input: LoginUserInput) => {
      const response = await signIn("credentials", {
        ...input,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (!response?.ok && response?.error) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: response?.error });
      }

      router.push(callbackUrl);
    },
  });

  const { handleSubmit } = form;
  const onSubmit = handleSubmit((values) => mutate(values));

  return (
    <Form {...form}>
      <form {...{ onSubmit }} className="flex flex-col gap-y-4">
        {error && <CustomAlert message={error.message} />}
        {fieldConfigs.map((fieldConfig) => (
          <CustomForm key={fieldConfig.name} {...{ form, ...fieldConfig }} />
        ))}
        <Button className="mt-4" loading={isPending}>
          Sign in
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
