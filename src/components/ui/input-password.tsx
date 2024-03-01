import * as React from "react";

import useToggle from "@/hooks/useToggle";

import { Eye, EyeOff } from "../icons";
import { Input, InputProps } from "./input";

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { toggleValue, toggle } = useToggle();
    const toggleIcon = (
      <button
        className="text-[1.5rem]"
        tabIndex={-1}
        type="button"
        onClick={() => toggle()}
      >
        {toggleValue ? <EyeOff /> : <Eye />}
      </button>
    );

    return (
      <Input
        ref={ref}
        {...props}
        type={!toggleValue ? "password" : "text"}
        suffixIcon={toggleIcon}
      />
    );
  },
);
InputPassword.displayName = "InputPassword";

export default InputPassword;
