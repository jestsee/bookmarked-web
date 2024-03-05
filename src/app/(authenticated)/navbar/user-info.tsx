import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { User } from "../type";
import SignOutWrapper from "./sign-out-wrapper";

interface Props {
  user: User;
}

const UserInfo = ({ user }: Props) => {
  const name = user.name ?? "there";
  return (
    <nav className="group absolute right-8 top-8 flex w-fit items-center gap-3 rounded-full border-2 border-primary-foreground bg-background p-2">
      <div className="hidden pl-3 text-left group-hover:block">
        <p className="text-sm font-semibold">Hi, {name}</p>
        {/* TODO still hardcoded */}
        <p className="text-xs">Connected via Github</p>
      </div>
      <Avatar>
        {user.image && <AvatarImage src={user.image} />}
        <AvatarFallback>{name[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <SignOutWrapper>
        <Button
          className="h-fit rounded-full p-3 hover:bg-destructive"
          variant="ghost"
        >
          <LogOut size="1rem" className="aspect-square" />
        </Button>
      </SignOutWrapper>
    </nav>
  );
};

export default UserInfo;
