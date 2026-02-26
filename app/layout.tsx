import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Layout from "./layout/Layout";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "BlogAi",
  description: "AI로 더 스마트하게, 개발자용 기술 블로그 작성",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
