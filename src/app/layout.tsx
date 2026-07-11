import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HealthGuard",
  description: "Smart Diabetes Management",
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