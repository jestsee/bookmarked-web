import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserInfo = () => {
  return (
    <nav className="group flex w-fit items-center gap-4 rounded-full border-2 border-primary-foreground bg-background p-2">
      <div className="hidden pl-3 text-left group-hover:block">
        <p className="text-sm font-semibold">Hi, Jesica</p>
        <p className="text-xs">Connected via Github</p>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </nav>
  );
};

export default UserInfo;
