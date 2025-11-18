import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Keploy Go Quickstart Tutorial",
  description: "Learn how to get started with Keploy for Go applications",
};

export default function TutorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <div className="prose prose-lg mx-auto max-w-6xl px-6 py-8 dark:prose-invert">
          {children}
        </div>
      </main>
    </div>
  );
}

