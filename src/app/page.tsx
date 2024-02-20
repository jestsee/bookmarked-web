import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      Landing page
      <Button asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    </main>
  );
}
