import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Keploy Echo + SQL Tutorial",
  description: "Learn how to use Keploy with Echo framework and SQL databases",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 lg:ml-64">
            <div className="prose prose-lg mx-auto max-w-6xl px-6 py-8 dark:prose-invert">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
