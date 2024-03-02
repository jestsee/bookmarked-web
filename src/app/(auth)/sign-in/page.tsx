import { Suspense } from "react";

import LoginForm from "./login-form";

const SignIn = async () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};

export default SignIn;
