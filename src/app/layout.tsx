import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bookmarked",
  description: "Save your tweets to Notion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        defer
        data-domain="bookmarked.jestsee.com"
        src="https://plausible.coolify.jestsee.com/js/script.js"
      />
      <body className={cn("mx-auto max-w-2xl px-4", inter.className)}>
        <Providers>
          {children}
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
