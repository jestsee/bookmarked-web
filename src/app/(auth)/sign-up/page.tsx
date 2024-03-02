"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SimpleAlert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CreateUserInput, createUserSchema } from "@/server/auth/auth.schema";
import { trpc } from "@/trpc-client/trpc";

import CustomForm from "../components/custom-form";
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
  const { handleSubmit, reset } = form;
  const { mutate, error, isSuccess, isPending } = trpc.registerUser.useMutation(
    {
      onSuccess() {
        reset();
      },
    },
  );

  const onSubmit = handleSubmit((values) => mutate(values));

  return (
    <Form {...form}>
      <form {...{ onSubmit }} className="flex flex-col gap-y-2">
        {error && <SimpleAlert variant="destructive" message={error.message} />}
        {isSuccess && (
          <SimpleAlert
            variant="success"
            message="Your account has been successfully created"
          />
        )}
        {fieldConfigs.map((fieldConfig) => (
          <CustomForm key={fieldConfig.name} {...{ form, ...fieldConfig }} />
        ))}
        <Button className="mt-2" loading={isPending}>
          Sign up
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
