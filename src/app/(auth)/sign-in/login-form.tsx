"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const form = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (input: LoginUserInput) =>
      signIn("credentials", { ...input, callbackUrl: "/" }),
  });

  const error = searchParams.get("error");
  const { handleSubmit } = form;
  const onSubmit = handleSubmit((values) => mutate(values));

  return (
    <div>
      <Form {...form}>
        <form {...{ onSubmit }}>
          {error && <CustomAlert message={error} />}
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
