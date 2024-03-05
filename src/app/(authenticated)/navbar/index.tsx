import { User } from "../type";
import UserInfo from "./user-info";

interface Props {
  user: User;
}

const Navbar = ({ user }: Props) => {
  return <UserInfo {...{ user }} />;
};

export default Navbar;
