import { Logout } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { User } from "../type";
import { getNotionStatus } from "../utils";
import SignOutWrapper from "./sign-out-wrapper";

interface Props {
  user: User;
}

const UserInfo = async ({ user }: Props) => {
  const data = await getNotionStatus();
  const isConnectedToNotion = !!(data?.accessToken && data.databaseId);

  const name = user.name ?? "there";
  return (
    <nav className="group sticky top-8 ml-auto flex w-fit items-center gap-3 rounded-full border-2 border-primary-foreground bg-background p-2">
      <div className="hidden pl-3 text-left group-hover:block">
        <p className="text-sm font-semibold">Hi, {name}</p>
        <p className="text-xs">
          {isConnectedToNotion ? "C" : "Not yet c"}onnected to Notion
        </p>
      </div>
      <Avatar>
        {user.image && <AvatarImage src={user.image} />}
        <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <SignOutWrapper>
        <Button
          className="h-fit rounded-full py-3 pl-2 pr-3 hover:bg-rose-700"
          variant="ghost"
        >
          <Logout className="h-4 w-5" />
        </Button>
      </SignOutWrapper>
    </nav>
  );
};

export default UserInfo;
