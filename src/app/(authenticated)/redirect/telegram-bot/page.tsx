import { SearchParams } from "@/types/component";

import ProceedRedirect from "./proceed-redirect";

interface Props {
  searchParams: SearchParams<"bot" | "telegramId">;
}

const RedirectTelegramBot = ({ searchParams: { bot, telegramId } }: Props) => {
  if (!bot || !telegramId) {
    return <p>Incomplete params💀</p>;
  }

  return <ProceedRedirect {...{ bot, telegramId }} />;
};

export default RedirectTelegramBot;
