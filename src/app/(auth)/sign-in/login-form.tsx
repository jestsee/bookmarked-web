"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { TRPCError } from "@trpc/server";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { LoginUserInput, loginUserSchema } from "@/server/auth/auth.schema";

import CustomAlert from "../custom-alert";
import CustomForm from "../custom-form";
import { AuthProviders, FieldConfig } from "../type";
import { AuthIcons } from "./auth-icons";

const fieldConfigs: FieldConfig<LoginUserInput>[] = [
  { name: "email", label: "Email" },
  { name: "password", label: "Password", isPassword: true },
];

const authIcons = [{}];

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
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="mb-1 mt-4 font-bold">Welcome Back</CardTitle>
        <CardDescription>
          Don&apos;t have an account yet?&nbsp;
          <Link
            className="font-semibold underline-offset-2 hover:underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form {...{ onSubmit }} className="flex flex-col gap-y-4">
            {error && <CustomAlert message={error.message} />}
            {fieldConfigs.map((fieldConfig) => (
              <CustomForm
                key={fieldConfig.name}
                {...{ form, ...fieldConfig }}
              />
            ))}
            <Button className="mt-4 w-full" loading={isPending}>
              Sign in
            </Button>
          </form>
        </Form>
      </CardContent>
      <Separator className="mb-2 gap-3">
        <p className="text-sm uppercase">or</p>
      </Separator>
      <CardFooter className="space-x-3">
        {Object.values(providers ?? []).map((provider) => {
          const Icon =
            AuthIcons[provider.id] ?? `Sign in with ${provider.name}`;
          return (
            provider.id !== "credentials" && (
              <Button
                variant="outline"
                className="w-full py-5"
                key={provider.name}
                onClick={() => signIn(provider.id)}
              >
                <Icon className="h-6 w-6" />
              </Button>
            )
          );
        })}
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
