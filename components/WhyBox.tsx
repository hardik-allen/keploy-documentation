'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';

export default function WhyBox({ 
  title, 
  children 
}: { 
  title?: string;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <div
      key={theme}
      className="my-4 sm:my-6 rounded-xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-blue-50/50 p-4 sm:p-5 shadow-sm transition-all duration-200"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="text-xs sm:text-sm font-semibold text-blue-900 dark:text-blue-900 mb-1.5 sm:mb-2">
              {title}
            </h4>
          )}
          <div className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-700 [&_p]:my-0 [&_p]:dark:text-zinc-700 [&_strong]:font-semibold [&_strong]:text-zinc-900 [&_strong]:dark:text-zinc-900 [&_ul]:my-2 [&_li]:my-1 [&_li]:dark:text-zinc-700">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

