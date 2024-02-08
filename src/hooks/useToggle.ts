import { useState } from "react";

const useToggle = (defaultValue?: boolean) => {
  const [toggleValue, setToggleValue] = useState(defaultValue ?? false);

  const show = () => {
    setToggleValue(true);
  };

  const hide = () => {
    setToggleValue(false);
  };

  const toggle = () => {
    setToggleValue((previousValue) => !previousValue);
  };

  return { toggleValue, show, hide, toggle };
};

export default useToggle;
