'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';

// Callout component for highlighting important information
export default function Callout({ 
  type = 'info', 
  children 
}: { 
  type?: 'info' | 'warning' | 'success' | 'error'; 
  children: React.ReactNode 
}) {
  const { theme } = useTheme();
  
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-black dark:bg-blue-100 dark:border-blue-300 dark:text-black',
    warning: 'bg-yellow-50 border-yellow-200 text-black dark:bg-yellow-100 dark:border-yellow-300 dark:text-black',
    success: 'bg-green-50 border-green-200 text-black dark:bg-green-100 dark:border-green-300 dark:text-black',
    error: 'bg-red-50 border-red-200 text-black dark:bg-red-100 dark:border-red-300 dark:text-black',
  };

  // Use theme to ensure component re-renders when theme changes
  // The dark: classes will apply based on the HTML dark class set by ThemeProvider
  return (
    <div 
      key={theme} // Force re-render when theme changes
      className={`my-4 sm:my-6 rounded-lg border-l-4 p-3 sm:p-4 transition-colors duration-200 ${styles[type]}`}
    >
      <div className="flex items-start">
        <div className="flex-1 [&_p]:my-0 [&_strong]:font-semibold [&_a]:underline [&_a]:font-medium transition-colors duration-200">{children}</div>
      </div>
    </div>
  );
}

