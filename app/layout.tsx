import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import TableOfContents from "@/components/TableOfContents";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/components/SidebarContext";

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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      theme = 'dark';
                    } else {
                      theme = 'light';
                    }
                  }
                  
                  var html = document.documentElement;
                  if (theme === 'dark') {
                    html.classList.add('dark');
                    html.style.backgroundColor = '#000000';
                    if (document.body) {
                      document.body.style.backgroundColor = '#000000';
                    }
                  } else {
                    html.classList.remove('dark');
                    html.style.backgroundColor = '';
                    if (document.body) {
                      document.body.style.backgroundColor = '';
                    }
                  }
                } catch (e) {
                  // Fallback to light theme on error
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
        <ThemeProvider>
          <SidebarProvider>
            <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors duration-200">
              <Header />
              <div className="flex flex-1 min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] bg-white dark:bg-black transition-colors duration-200 overflow-x-hidden">
                <Sidebar />
                <main className="flex-1 lg:ml-0 bg-white dark:bg-black transition-colors duration-200 min-w-0 overflow-x-hidden">
                  <div className="prose prose-sm sm:prose-base lg:prose-lg mx-auto max-w-full sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl px-3 sm:px-4 md:px-6 py-4 sm:py-6 lg:py-8 dark:prose-invert transition-colors duration-200">
                    {children}
                  </div>
                </main>
                <TableOfContents />
              </div>
              <Footer />
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
