'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';
import { useSidebar } from './SidebarContext';

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
  const { isOpen, setIsOpen } = useSidebar();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Echo + SQL Sections': true,
    'Docker Compose Method': true,
    'Local Linux/WSL Method': false,
    'FAQs': false,
  });
  const { theme } = useTheme();
  const navigation = getNavigation(pathname || '');

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <>
      {/* Overlay - visible when sidebar is open on mobile/tablet */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Toggleable on all screens, integrated on desktop */}
      <aside
        key={theme}
        className={`
          fixed left-0 top-14 sm:top-16 z-50 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-64 sm:w-72 transform border-r border-zinc-200 bg-white transition-all duration-300 dark:border-zinc-800 dark:bg-black
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 lg:top-0 lg:h-auto lg:z-auto lg:w-64 lg:block
        `}
      >
        <div className="h-full lg:h-auto overflow-y-auto px-3 sm:px-4 py-4 sm:py-6">
          <nav className="space-y-1">
            {navigation.map((section) => {
              const isExpanded = expandedSections[section.title] ?? true;
              return (
                <div key={section.title} className="mb-4">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between mb-2 px-2 py-2 sm:py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors duration-200 touch-manipulation"
                  >
                    <span>{section.title}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  {isExpanded && (
                    <ul className="space-y-0.5 pl-2">
                      {section.items.map((item) => {
                        const isActive = pathname === item.href || pathname?.startsWith(item.href);
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className={`block rounded-lg px-3 py-2 sm:py-1.5 text-sm transition-colors duration-200 touch-manipulation ${
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
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

