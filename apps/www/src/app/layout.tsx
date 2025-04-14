import type { Metadata } from "next";
import { Providers } from "./components/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Don't Show - Hide what you don't want to show",
  description:
    "Don't Show is a tool that helps you choose what you want to show to others. Hide the rest.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* @ts-expect-error Async Server Component */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
