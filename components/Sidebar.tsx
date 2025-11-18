'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const getNavigation = (pathname: string) => {
  // Since echo-sql is now the home page, always show the echo-sql navigation
  return [
    {
      title: 'Echo + SQL Sections',
      items: [
        { href: '/#why-echo-sql', label: 'Why Echo + SQL?' },
        { href: '/#prerequisites-echo', label: 'Prerequisites' },
        { href: '/#choose-echo-quickstart', label: 'Choose Quickstart' },
        { href: '/#setup-echo-app', label: 'Setup Application' },
        { href: '/#running-echo-app', label: 'Running with Keploy' },
        { href: '/#wrapping-up', label: 'Wrapping it up' },
        { href: '/#echo-best-practices', label: 'Best Practices' },
        { href: '/#echo-troubleshooting', label: 'Common FAQs' },
      ],
    },
    {
      title: 'Docker Compose Method',
      items: [
        { href: '/#docker-compose-method', label: 'Using Docker Compose' },
        { href: '/#echo-step-1', label: 'Step 1: Clone Sample App' },
        { href: '/#echo-step-2', label: 'Step 2: Start Postgres' },
        { href: '/#echo-step-3', label: 'Step 3: Build Application' },
        { href: '/#echo-step-4', label: 'Step 4: Capture Testcases' },
        { href: '/#echo-step-5', label: 'Step 5: Generate Testcases' },
        { href: '/#echo-step-6', label: 'Step 6: Run Testcases' },
      ],
    },
    {
      title: 'Local Linux/WSL Method',
      items: [
        { href: '/#local-linux-method', label: 'Running Locally' },
        { href: '/#local-step-1', label: 'Step 1: Clone Sample App' },
        { href: '/#local-step-2', label: 'Step 2: Start Postgres' },
        { href: '/#local-step-3', label: 'Step 3: Build Application' },
        { href: '/#local-step-4', label: 'Step 4: Capture Testcases' },
        { href: '/#local-step-5', label: 'Step 5: Generate Testcases' },
        { href: '/#local-step-6', label: 'Step 6: Run Testcases' },
      ],
    },
    {
      title: 'FAQs',
      items: [
        { href: '/#faq-1', label: 'SQL queries not captured' },
        { href: '/#faq-2', label: 'Timestamps/IDs causing failures' },
        { href: '/#faq-3', label: 'Database connection errors' },
        { href: '/#faq-4', label: 'Other Go frameworks' },
        { href: '/#faq-5', label: 'Updating test cases' },
        { href: '/#faq-6', label: 'CI/CD integration' },
        { href: '/#faq-7', label: 'Keploy vs unit tests' },
        { href: '/#faq-8', label: 'Tests failing in CI' },
      ],
    },
  ];
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navigation = getNavigation(pathname || '');

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-20 z-40 rounded-lg border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 lg:hidden"
        aria-label="Toggle sidebar"
      >
        <svg
          className="h-6 w-6 text-zinc-600 dark:text-zinc-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 transform border-r border-zinc-200 bg-white transition-transform duration-300 dark:border-zinc-800 dark:bg-zinc-900 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto px-4 py-6">
          <nav className="space-y-6">
            {navigation.map((section) => (
              <div key={section.title}>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                            isActive
                              ? 'bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                              : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

