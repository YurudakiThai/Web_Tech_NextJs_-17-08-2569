import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/src/components/Navbar";

export const metadata: Metadata = { title: "Game Backlog" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <body className="min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
