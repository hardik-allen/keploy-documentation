'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme by checking DOM first (set by pre-hydration script)
  // This ensures we match what's already rendered
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';
    
    try {
      // First, check if dark class is already on HTML (from pre-hydration script)
      if (document.documentElement.classList.contains('dark')) {
        return 'dark';
      }
      
      // Then check localStorage
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      
      // Finally, check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (e) {
      console.error('Error reading theme:', e);
    }
    return 'light';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Sync theme with DOM and ensure proper styling
    const html = document.documentElement;
    const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
    
    // If DOM state doesn't match our state, sync it
    if (currentTheme !== theme) {
      if (theme === 'dark') {
        html.classList.add('dark');
        html.style.backgroundColor = '#000000';
        document.body.style.backgroundColor = '#000000';
      } else {
        html.classList.remove('dark');
        html.style.backgroundColor = '';
        document.body.style.backgroundColor = '';
      }
    } else {
      // Ensure background colors are set correctly
      if (theme === 'dark') {
        html.style.backgroundColor = '#000000';
        document.body.style.backgroundColor = '#000000';
      } else {
        html.style.backgroundColor = '';
        document.body.style.backgroundColor = '';
      }
    }
    
    setMounted(true);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      try {
        localStorage.setItem('theme', newTheme);
        const html = document.documentElement;
        if (newTheme === 'dark') {
          html.classList.add('dark');
          // Force background color
          html.style.backgroundColor = '#000000';
          document.body.style.backgroundColor = '#000000';
        } else {
          html.classList.remove('dark');
          html.style.backgroundColor = '';
          document.body.style.backgroundColor = '';
        }
      } catch (e) {
        console.error('Error toggling theme:', e);
      }
      
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

