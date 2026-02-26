import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MaxIt Loan Calculator",
  description: "Get your loan approved fast. Quick approval, competitive rates, flexible terms.",
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
