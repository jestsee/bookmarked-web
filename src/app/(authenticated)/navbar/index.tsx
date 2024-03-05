import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SignOutWrapper from "./sign-out-wrapper";
import UserInfo from "./user-info";

const Navbar = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="fixed right-8 top-8">
        <UserInfo />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-1">
        <SignOutWrapper>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </SignOutWrapper>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
