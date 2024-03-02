import Link from "next/link";

import { CardDescription, CardTitle } from "@/components/ui/card";

const SignUpHeader = () => {
  return (
    <>
      <CardTitle className="mb-1 mt-4 font-bold">Create Account</CardTitle>
      <CardDescription>
        Already have an account?&nbsp;
        <Link
          className="font-semibold underline-offset-2 hover:underline"
          href="/sign-in"
        >
          Sign in
        </Link>
      </CardDescription>
    </>
  );
};

export default SignUpHeader;
