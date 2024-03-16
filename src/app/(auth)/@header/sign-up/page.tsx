import Link from "next/link";

import { CardDescription, CardTitle } from "@/components/ui/card";
import { SearchParams } from "@/types/component";

interface Props {
  searchParams: SearchParams<"callbackUrl">;
}

const SignUpHeader = ({ searchParams: { callbackUrl } }: Props) => {
  return (
    <>
      <CardTitle className="mb-1 mt-4 font-bold">Create Account</CardTitle>
      <CardDescription>
        Already have an account?&nbsp;
        <Link
          className="font-semibold underline-offset-2 hover:underline"
          href={{ pathname: "/sign-in", query: { callbackUrl } }}
        >
          Sign in
        </Link>
      </CardDescription>
    </>
  );
};

export default SignUpHeader;
