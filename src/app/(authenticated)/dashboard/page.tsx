import Link from "next/link";

import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div>
      <h3>dashboard</h3>
      <Button asChild>
        <Link href={process.env.NEXT_PUBLIC_NOTION_AUTHORIZATION_URL}>
          Connect to Notion
        </Link>
      </Button>
    </div>
  );
};

export default Dashboard;
