import { getProviders } from "next-auth/react";
import { Suspense } from "react";

import LoginForm from "./login-form";

const SignIn = async () => {
  const providers = await getProviders();

  return (
    <Suspense>
      <LoginForm {...{ providers }} />
    </Suspense>
  );
};

export default SignIn;
