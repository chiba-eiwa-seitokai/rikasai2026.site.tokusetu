import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "梨花祭2026 — Rikasai | 千葉英和高等学校",
  description:
    "千葉英和高等学校 文化祭「梨花祭」2026年7月17日（金）・18日（土）開催。CHALLENGE! みんなでやろうよ、梨花祭！",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Nav />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
