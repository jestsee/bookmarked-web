"use client";

import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main>
      Help World
      <Input />
      <button onClick={() => signIn()}>Sign in</button>
    </main>
  );
}
