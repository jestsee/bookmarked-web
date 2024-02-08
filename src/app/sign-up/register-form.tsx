"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { CreateUserInput, createUserSchema } from "@/schema/user";
import { trpc } from "@/trpc-client/trpc";

const RegisterForm = () => {
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });
  const { reset, handleSubmit } = form;
  const { mutate } = trpc.registerUser.useMutation({
    onSuccess(data, variables, context) {},
    onError(error, variables, context) {},
  });

  const onSubmit = handleSubmit((values) => mutate(values));

  return (
    <Form {...form}>
      <form {...{ onSubmit }} className="w-[400px]">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <InputPassword {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Sign up</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
