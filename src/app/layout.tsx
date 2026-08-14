import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI桌游",
  description: "和 AI 一起玩、一起改、一起创造桌游",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
