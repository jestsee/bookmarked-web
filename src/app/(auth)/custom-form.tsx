import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputPassword from "@/components/ui/input-password";

import { FormInput, RenderFormProps } from "./type";

const CustomForm = <T extends FormInput>(props: RenderFormProps<T>) => {
  const { form, name, label, placeholder, isPassword } = props;
  return (
    <FormField
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

export default CustomForm;
