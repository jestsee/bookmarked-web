import * as React from "react";

import useToggle from "@/hooks/useToggle";

import { Eye, EyeOff } from "../icons";
import { Input, InputProps } from "./input";

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { toggleValue, toggle } = useToggle();
    return (
      <div className="relative">
        <Input ref={ref} {...props} type={!toggleValue ? "password" : "text"} />
        <button
          type="button"
          className="absolute bottom-0 right-4 top-0 my-auto"
          onClick={() => toggle()}
        >
          {!toggleValue && <Eye className="text-[1.5rem]" />}
          {toggleValue && <EyeOff className="text-[1.5rem]" />}
        </button>
      </div>
    );
  },
);
InputPassword.displayName = "InputPassword";

export default InputPassword;
