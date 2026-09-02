import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Favorite Bands",
  description:
    "A collection of The Beatles, Maroon 5, and Queen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
