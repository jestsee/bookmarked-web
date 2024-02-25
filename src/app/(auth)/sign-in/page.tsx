import { getProviders } from "next-auth/react";
import { Suspense } from "react";

import LoginForm from "./login-form";

const SignIn = async () => {
  const providers = await getProviders();

  return (
    <div>
      <h1>Sign in</h1>
      <h3>Welcome back! Enter your email and password below to sign in.</h3>
      <Suspense>
        <LoginForm {...{ providers }} />
      </Suspense>
    </div>
  );
};

export default SignIn;
