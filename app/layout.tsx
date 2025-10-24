import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InsightBoard AI",
  description: "AI Meeting Action Item Extractor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
