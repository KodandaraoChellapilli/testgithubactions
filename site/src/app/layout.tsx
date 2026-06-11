import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vinny Chellapilli | Software Engineer",
  description: "Vinny Chellapilli's software engineering portfolio and Digital Twin.",
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
