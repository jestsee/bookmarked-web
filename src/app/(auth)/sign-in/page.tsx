"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { TRPCError } from "@trpc/server";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { SimpleAlert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoginUserInput, loginUserSchema } from "@/server/auth/auth.schema";
import { SearchParams } from "@/types/component";

import CustomForm from "../components/custom-form";
import { FieldConfig } from "../type";

const fieldConfigs: FieldConfig<LoginUserInput>[] = [
  { name: "email", label: "Email" },
  { name: "password", label: "Password", isPassword: true },
];

interface Props {
  searchParams: SearchParams<"callbackUrl">;
}

const LoginForm = ({ searchParams }: Props) => {
  const form = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (input: LoginUserInput) => {
      const response = await signIn("credentials", {
        ...input,
        redirect: false,
      });

      if (!response?.ok && response?.error) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: response?.error });
      }
    },
    onSuccess: () => {
      toast.success("Successfully signed in");
      router.push(searchParams.callbackUrl ?? "/dashboard");
    },
  });

  const { handleSubmit } = form;
  const onSubmit = handleSubmit((values) => mutate(values));

  return (
    <Form {...form}>
      <form {...{ onSubmit }} className="flex flex-col gap-y-4">
        {error && <SimpleAlert variant="destructive" message={error.message} />}
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
