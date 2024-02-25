"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { TRPCError } from "@trpc/server";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoginUserInput, loginUserSchema } from "@/server/auth/auth.schema";

import CustomAlert from "../custom-alert";
import CustomForm from "../custom-form";
import { AuthProviders, FieldConfig } from "../type";

const fieldConfigs: FieldConfig<LoginUserInput>[] = [
  { name: "email", label: "Email" },
  { name: "password", label: "Password", isPassword: true },
];

interface Props {
  providers: AuthProviders;
}

const LoginForm = ({ providers }: Props) => {
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
    <div>
      <Form {...form}>
        <form {...{ onSubmit }}>
          {error && <CustomAlert message={error.message} />}
          {fieldConfigs.map((fieldConfig) => (
            <CustomForm key={fieldConfig.name} {...{ form, ...fieldConfig }} />
          ))}
          <p>
            Already have an account? <Link href="/sign-up">Sign up</Link>
          </p>
          <Button loading={isPending}>Sign in</Button>
        </form>
      </Form>
      {Object.values(providers ?? []).map(
        (provider) =>
          provider.id !== "credentials" && (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          ),
      )}
    </div>
  );
};

export default LoginForm;
