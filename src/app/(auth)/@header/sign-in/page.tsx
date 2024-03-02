import Link from "next/link";

import { CardDescription, CardTitle } from "@/components/ui/card";

const SignInHeader = () => {
  return (
    <>
      <CardTitle className="mb-1 mt-4 font-bold">Welcome Back</CardTitle>
      <CardDescription>
        Don&apos;t have an account yet?&nbsp;
        <Link
          className="font-semibold underline-offset-2 hover:underline"
          href="/sign-up"
        >
          Sign up
        </Link>
      </CardDescription>
    </>
  );
};

export default SignInHeader;
