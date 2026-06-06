import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LAN Fawzy For Import & Export | Premium Korean Décor Materials",
  description:
    "LAN Fawzy – Egypt's premium importer of Korean wood-alternative PS Louvers and Chipboard cladding. Wholesale and retail for architects, contractors, and interior designers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
