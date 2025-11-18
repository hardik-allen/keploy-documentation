'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-black/80">
      <div className="w-full">
        <div className="flex h-16 items-center pl-4 sm:pl-6 lg:pl-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-zinc-900 transition-colors hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300"
          >
            <span className="text-2xl">🚀</span>
            <span>Keploy Docs</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

