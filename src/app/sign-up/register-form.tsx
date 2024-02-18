"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ExclamationCircle } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputPassword from "@/components/ui/input-password";
import { CreateUserInput, createUserSchema } from "@/server/auth/auth.schema";
import { trpc } from "@/trpc-client/trpc";

import { FieldConfig, RenderFormProps } from "./type";

const fieldConfigs: FieldConfig[] = [
  { name: "name", label: "Name", placeholder: "John Doe" },
  { name: "email", label: "Email", placeholder: "example@gmail.com" },
  { name: "password", label: "Password", isPassword: true },
  { name: "passwordConfirm", label: "Confirm password", isPassword: true },
];

const _renderForm = (props: RenderFormProps) => {
  const { form, name, label, placeholder, isPassword } = props;
  return (
    <FormField
      key={name}
      defaultValue=""
      control={form.control}
      {...{ name }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {!isPassword ? (
              <Input {...field} {...{ placeholder }} />
            ) : (
              <InputPassword {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const _renderErrorAlert = (message: string) => {
  return (
    <Alert variant="destructive">
      <ExclamationCircle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

const RegisterForm = () => {
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
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
        {error && _renderErrorAlert(error.message)}
        {fieldConfigs.map((fieldConfig) =>
          _renderForm({ form, ...fieldConfig }),
        )}
        <Button loading={isPending}>Sign up</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
