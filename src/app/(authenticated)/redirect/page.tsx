import { SearchParams } from "@/types/component";

import CustomError from "./custom-error";
import ProceedRedirect from "./proceed-redirect";

interface Props {
  searchParams: SearchParams<"code" | "error" | "state">;
}

const Redirect = ({ searchParams: { code, error, state } }: Props) => {
  if (error) return <CustomError />;

  if (!code) return <p>The code does not exist</p>;

  return <ProceedRedirect {...{ code, state }} />;
};

export default Redirect;
