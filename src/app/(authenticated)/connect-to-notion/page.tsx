import { redirect } from "next/navigation";

import { SearchParams } from "@/types/component";

import { getNotionStatus } from "../utils";

interface Props {
  searchParams: SearchParams<"callbackUrl">;
}

const ConnectToNotion = async ({ searchParams }: Props) => {
  const { callbackUrl = "/" } = searchParams;
  const data = await getNotionStatus();
  const isConnectedToNotion = !!(data?.accessToken && data.databaseId);

  if (!isConnectedToNotion) {
    const encodedUrl = encodeURIComponent(callbackUrl);
    const url = `${process.env.NEXT_PUBLIC_NOTION_AUTHORIZATION_URL}&state=${encodedUrl}`;
    return redirect(url);
  }

  redirect(callbackUrl);
};

export default ConnectToNotion;
