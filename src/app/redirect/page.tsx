import { SearchParams } from "@/types/component";

import CustomError from "./custom-error";
import ProceedRedirect from "./proceed-redirect";

interface Props {
  searchParams: SearchParams<"code" | "error">;
}

const Redirect = ({ searchParams: { code, error } }: Props) => {
  if (error) return <CustomError />;
  if (!code) return <p>The code does not exist</p>;
  return <ProceedRedirect {...{ code }} />;
};

export default Redirect;
