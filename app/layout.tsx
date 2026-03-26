import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "豪大根｜江苏豪大根食品有限公司｜餐饮食材选品参谋",
  description: "江苏豪大根食品有限公司，专注为餐饮门店提供食材供应、选品策略与定制贴牌服务。产品覆盖烧烤夜市、西式、日式、台式、特色餐饮、火锅茶餐厅六大系列，帮助门店降本增效、稳定供货。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <h1 className="sr-only">豪大根｜江苏豪大根食品有限公司｜餐饮食材选品参谋</h1>
        {children}
      </body>
    </html>
  );
}
