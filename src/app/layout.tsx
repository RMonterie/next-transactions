import Link from "next/link";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Transactions",
  description: "Next.js transactions app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-green-500 text-white py-3 px-2">
          <Link href="/">
            <h1 className="font-extrabold text-2xl">Next Transactions</h1>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
